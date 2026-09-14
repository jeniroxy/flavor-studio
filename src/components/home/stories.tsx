import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { RevealStagger } from "@/components/reveal";
import { Container, Headline, Section, TextLink } from "@/components/ui";
import { stories } from "@/lib/data";
import { routes } from "@/lib/routes";

/*
 * Two customer stories (clickup.com's "See how great teams get more done"):
 * brand cover with the logo, the blurb, a faint quotation mark, a link.
 */
export function Stories() {
  const picks = stories.slice(0, 2);
  return (
    <Section className="pb-[var(--section-gap)]">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Headline size="lg" tail="with Flavor Studio." className="max-w-[560px]">
            See how great teams get more done
          </Headline>
          <TextLink href={routes.stories}>Read more stories</TextLink>
        </div>
        <RevealStagger stagger={0.1} className="mt-[clamp(28px,3.5vw,44px)] grid gap-6 md:grid-cols-2">
          {picks.map((s) => (
            <Link key={s.slug} href={s.href} className="group flex flex-col">
              <div className="relative aspect-[520/220] overflow-hidden rounded-[16px] bg-slate-800">
                <Image
                  src={s.img}
                  alt={s.imgAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(200deg, rgba(43,59,83,.15) 0%, rgba(43,59,83,.85) 100%)" }}
                />
                <div className="absolute bottom-5 left-5 rounded-[8px] bg-white/95 px-3 py-2">
                  <Image src={s.logo} alt={s.company} width={s.logoW} height={s.logoH} className="h-6 w-auto object-contain" />
                </div>
              </div>
              <div className="relative mt-5 pr-10">
                <span aria-hidden="true" className="font-display absolute top-[-6px] right-0 text-[64px] leading-none text-hairline">
                  ”
                </span>
                <div className="eyebrow eyebrow-muted text-[11px]">{s.eyebrow}</div>
                <div className="font-display mt-2 text-[20px] leading-[1.3] font-bold text-ink">{s.title}</div>
                <p className="mt-2 text-[14px] leading-[1.55] text-ink-2">{s.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[14px] font-semibold text-blue-700">
                  Read the story <Icon name="arrow-right" className="text-[14px]" />
                </span>
              </div>
            </Link>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}
