"""Convert flavorstudio.com/api into src/content/api-reference.json.

Every text node is carried over as-is (whitespace collapsed the way a browser
does); only the markup is renamed into the roles that
src/components/developers/api-reference.tsx renders. To refresh:

    curl -sL https://www.flavorstudio.com/api -o /tmp/api.html
    python3 -I scripts/api-reference.py /tmp/api.html src/content/api-reference.json
"""
import html
import json
import re
import sys
from html.parser import HTMLParser

VOID = {"br", "input", "col", "img", "hr", "meta", "link"}


class Node:
    def __init__(self, tag, attrs, parent):
        self.tag, self.attrs, self.parent, self.kids = tag, dict(attrs), parent, []

    @property
    def cls(self):
        return self.attrs.get("class", "").split()


class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("root", {}, None)
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        # The live markup leaves some <p> unclosed: a new block closes it.
        if tag in ("p", "div", "ul", "pre", "table") and self.cur.tag == "p":
            self.cur = self.cur.parent
        # And some <li> are left open: a new <li> closes the previous one in
        # the same list, as browsers do.
        if tag == "li":
            n = self.cur
            while n is not self.root and n.tag not in ("ul", "ol", "li"):
                n = n.parent
            if n.tag == "li":
                self.cur = n.parent
        n = Node(tag, attrs, self.cur)
        self.cur.kids.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        self.cur.kids.append(Node(tag, attrs, self.cur))

    def handle_endtag(self, tag):
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is not self.root:
            self.cur = n.parent

    def handle_data(self, data):
        self.cur.kids.append(data)


def text_of(n):
    if isinstance(n, str):
        return n
    return "".join(text_of(k) for k in n.kids)


def dedent(s):
    lines = s.replace("\r", "").split("\n")
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    pad = min((len(l) - len(l.lstrip(" \t")) for l in lines if l.strip()), default=0)
    return "\n".join(l[pad:].rstrip() for l in lines)


def key(h):
    return h.attrs.get("data-apid") or "title:" + re.sub(r"\s+", " ", text_of(h)).strip()


def slug(s):
    return re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", s.lower()))


INLINE_OK = {"p", "li", "td", "th", "b", "a", "code", "small", "sub", "pname", "indent", "phead"}

ids = {}  # live data-apid -> our anchor id


def conv_children(n, role):
    out = []
    for k in n.kids:
        if isinstance(k, str):
            t = re.sub(r"\s+", " ", k)
            if not t.strip() and role not in INLINE_OK:
                continue
            if out and isinstance(out[-1], str):
                out[-1] += t
            else:
                out.append(t)
        else:
            r = conv(k)
            if r is None:
                continue
            if isinstance(r, list):
                out.extend(r)
            else:
                out.append(r)
    return out


def node(role, n, **extra):
    d = {"t": role, **extra}
    c = conv_children(n, role)
    if c:
        d["c"] = c
    return d


def conv(n):
    tag, cls = n.tag, n.cls
    if tag in ("input", "label", "colgroup", "col", "script", "style", "textarea"):
        if tag == "textarea":
            return {"t": "codeblock", "code": dedent(html.unescape(text_of(n)))}
        return None
    if tag == "div":
        if {"editor-spinner", "copy-code-wrap", "clear"} & set(cls) or "api_spacer" in cls:
            return None
        if "api_container" in cls:
            return node("row", n)
        if "left_content" in cls:
            return node("left", n)
        if "right_content" in cls:
            return node("right", n)
        if "editor-wrapper" in cls:
            # Searched in depth: the live "Base URL" title is closed with
            # </h4>, so its textarea ends up inside the <h5>.
            title, code, kind = "", "", "default"

            def scan(m):
                nonlocal title, code, kind
                for k in m.kids:
                    if not isinstance(k, Node):
                        continue
                    if k.tag == "textarea":
                        code = dedent(html.unescape(text_of(k)))
                        kind = k.attrs.get("data-type", "default")
                    elif k.tag == "span" and "code-title" in (m.cls + m.parent.cls if m.parent else m.cls) and not title:
                        title = re.sub(r"\s+", " ", text_of(k)).strip()
                        scan(k)
                    else:
                        scan(k)

            scan(n)
            if kind == "endpoints":
                lines = []
                for line in code.split("\n"):
                    m = re.match(r'\s*(\S+)\s+(\S+)(?:\s+data-elem="([^"]+)")?', line)
                    if m:
                        lines.append({"method": m.group(1), "path": m.group(2), "elem": m.group(3)})
                return {"t": "endpoints", "title": title, "lines": lines}
            return {"t": "editor", "title": title, "code": code, "kind": kind}
        if "http-request" in cls:
            methods = [text_of(k).strip() for k in n.kids if isinstance(k, Node) and "request_method" in k.cls]
            url = "".join(text_of(k).strip() for k in n.kids if isinstance(k, Node) and "code" in k.cls)
            return {"t": "http", "methods": methods, "url": url}
        if "ml40" in cls or "ml20" in cls:
            return node("indent", n)
        if "mt20" in cls:
            return node("block", n)
        # api_content / error_content: transparent wrappers
        return conv_children(n, "block")
    if tag in ("h4", "h5") and "code-title" in cls:
        return {"t": "codetitle", "c": [re.sub(r"\s+", " ", text_of(n)).strip()]}
    if tag == "h5" and {"url-parameter", "json-parameter", "body-parameter"} & set(cls):
        return node("phead", n)
    if tag == "span":
        if "api_sub_title_2" in cls:
            return node("sub", n)
        if any(c.endswith("-parameter-parameter") for c in cls):
            return node("pname", n)
        if any(c.endswith("-parameter-type") for c in cls):
            return node("ptype", n)
        if any(c.endswith("-parameter-status") for c in cls):
            return node("pstatus", n, req="bold" in cls)
        if "invisible" in cls:
            return {"t": "spacer"}
        if "code" in cls:
            return node("code", n)
        if "smaller" in cls:
            return node("small", n)
        if "fs-icon-clipboard" in cls:
            return None
        return conv_children(n, "span")
    if tag == "ul":
        if {"url-parameters", "json-response", "body-parameters"} & set(cls):
            # The live markup has a stray empty <li> and a field whose <li> is
            # missing: drop the empty item, wrap the loose field in an item.
            d = node("params", n)
            items, loose = [], []
            for k in d.get("c", []):
                if isinstance(k, dict) and k["t"] == "li":
                    if loose:
                        items.append({"t": "li", "c": loose})
                        loose = []
                    if any(not isinstance(x, str) or x.strip() for x in k.get("c", [])):
                        items.append(k)
                elif isinstance(k, dict) or k.strip():
                    loose.append(k)
            if loose:
                items.append({"t": "li", "c": loose})
            d["c"] = items
            return d
        return node("ul", n)
    if tag == "li":
        return node("li", n)
    if tag == "a":
        elem = n.attrs.get("data-elem")
        href = n.attrs.get("href", "")
        return node("a", n, elem=elem) if elem else node("a", n, href=href)
    if tag == "pre":
        return {"t": "pre", "code": dedent(html.unescape(text_of(n)))}
    if tag in ("p", "b", "code", "br", "table", "thead", "tbody", "tr", "th", "td", "strong", "em", "i"):
        role = {"strong": "b", "em": "i"}.get(tag, tag)
        return node(role, n)
    if tag == "h4" and "api_title_elem" in cls:
        # A heading inside an article (the webhook events): keeps its anchor.
        return {"t": "h4", "id": ids[key(n)], "c": [re.sub(r"\s+", " ", text_of(n)).strip()]}
    if tag in ("h3", "h4"):
        return None  # section and article titles are lifted out
    print("UNHANDLED", tag, cls, file=sys.stderr)
    return conv_children(n, "block")


def main(src, dst):
    page = open(src, encoding="utf-8").read()
    right = page[page.find('<div class="api_right_side">') : page.find('<div id="search-popup-content">')]
    nav_html = page[page.find('<ul id="api_left_side_ul">') : page.find('<div class="api_right_side">')]
    t = Tree()
    t.feed(right)

    def find(n, tag):
        for k in n.kids:
            if isinstance(k, Node):
                if k.tag == tag:
                    yield k
                else:
                    yield from find(k, tag)

    # First pass: anchor ids for every title.
    for h in list(find(t.root, "h3")) + list(find(t.root, "h4")):
        if "api_title_elem" in h.cls:
            title = re.sub(r"\s+", " ", text_of(h)).strip()
            ids[key(h)] = slug(title)
    assert len(set(ids.values())) == len(ids), "duplicate anchor ids"

    sections = []
    for s in find(t.root, "section"):
        h3 = next(k for k in s.kids if isinstance(k, Node) and k.tag == "h3")
        sec = {"id": ids[key(h3)], "title": text_of(h3).strip(), "body": [], "articles": []}
        for k in s.kids:
            if not isinstance(k, Node) or k is h3:
                continue
            if k.tag == "article":
                h4 = next(x for x in k.kids if isinstance(x, Node) and x.tag == "h4")
                body = []
                for x in k.kids:
                    if x is h4 or isinstance(x, str):
                        continue
                    r = conv(x)
                    if r is not None:
                        body.extend(r if isinstance(r, list) else [r])
                sec["articles"].append({"id": ids[key(h4)], "title": text_of(h4).strip(), "body": body})
            else:
                r = conv(k)
                if r is None:
                    continue
                sec["body"].extend(r if isinstance(r, list) else [r])
        sections.append(sec)

    # The live sidebar: top-level entries with their sub-entries.
    nav = []
    for m in re.finditer(r'<li id="api_title_lnk_[^"]+" class="api_title_lnk( api_sub_title)?[^"]*" data-elem="([^"]+)">(.*?)</li>', nav_html):
        entry = {"id": ids[m.group(2)], "label": html.unescape(m.group(3)).strip()}
        if m.group(1):
            nav[-1].setdefault("children", []).append(entry)
        else:
            nav.append(entry)

    # Resolve data-elem references (in-text links, endpoint lines) to anchors.
    def resolve(x):
        if isinstance(x, list):
            for y in x:
                resolve(y)
        elif isinstance(x, dict):
            if x.get("t") == "a" and x.get("elem"):
                x["href"] = "#" + ids[x.pop("elem")]
            if x.get("t") == "endpoints":
                for line in x["lines"]:
                    e = line.pop("elem", None)
                    if e:
                        line["href"] = "#" + ids[e]
            for v in x.values():
                resolve(v)

    resolve(sections)
    h1 = re.search(r"<h1>(.*?)</h1>", page).group(1)
    json.dump({"title": h1, "nav": nav, "sections": sections}, open(dst, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
