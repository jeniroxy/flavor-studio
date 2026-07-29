/* Extract only the Icon Park icons this site uses into a small local subset,
   so the client never ships the full 3k-icon collection or hits the CDN. */
const fs = require("fs");
const path = require("path");

const NAMES =
  `all-application arrow-right attention box branch-one calculator-one calendar-three
caution chart-histogram check-one chef-hat-one click cloud-storage degree-hat doc-detail doc-search
experiment factory-building folder-open funds hamburger headset-one home income key-one knife-fork
leaves left lightning local-two lock mail mouse peoples phone-telephone protect quote right
search send setting-two star mouth weight`
    .split(/\s+/)
    .filter(Boolean);

const full = require("@iconify-json/icon-park-outline/icons.json");

const icons = {};
const missing = [];
for (const name of NAMES) {
  if (full.icons[name]) icons[name] = full.icons[name];
  else missing.push(name);
}

const subset = {
  prefix: full.prefix,
  icons,
  width: full.width,
  height: full.height,
};
const out = path.join(process.argv[2], "icon-park-subset.json");
fs.writeFileSync(out, JSON.stringify(subset));
console.log(
  `wrote ${Object.keys(icons).length}/${NAMES.length} icons -> ${out}`,
);
if (missing.length) console.log("MISSING:", missing.join(", "));
