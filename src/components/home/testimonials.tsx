import Image from "next/image";
import { RevealStagger } from "@/components/reveal";
import { Container, Headline, Section, TextLink } from "@/components/ui";
import { testimonials } from "@/lib/data";
import { routes } from "@/lib/routes";

/*
 * Three portrait quote tiles (clickup.com S9): photo, bottom scrim, the
 * quote in white, name and title. ClickUp's are video stills that open a
 * player; ours are the real customer portraits from flavorstudio.com, and
 * the quotes are the ones already published there.
 */

export const PORTRAITS: Record<string, string> = {
  "Andrew Hunter": "/testimonials/andrew_hunter.png",
  "Charles Hayes": "/testimonials/charles_hayes.png",
  "Stefan Czapalay": "/testimonials/stefan_czapalay.png",
  "Greg Grisanti": "/testimonials/greg_grisanti.png",
  "Kari Baker": "/testimonials/kari_baker.png",
  "Michael Cheng, PhD., CHE": "/testimonials/michael_cheng.png",
  "Chef Rob Corliss": "/testimonials/chef_rob_corliss.png",
};

export function Testimonials({
  names = ["Andrew Hunter", "Charles Hayes", "Kari Baker"],
}: {
  names?: string[];
}) {
  const picks = names
    .map((n) => testimonials.find((t) => t.name === n))
    .filter((t): t is NonNullable<typeof t> => !!t);

  return (
    <Section className="py-[var(--section-gap)]">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Headline size="lg" className="max-w-[560px]">
            In their own words.
          </Headline>
          <TextLink href={routes.customers}>Read customer stories</TextLink>
        </div>

        <RevealStagger
          stagger={0.08}
          className="mt-[clamp(28px,3.5vw,44px)] grid gap-5 md:grid-cols-3"
        >
          {picks.map((t) => (
            <figure
              key={t.name}
              className="relative m-0 aspect-[347/520] overflow-hidden rounded-[16px] bg-slate-800"
            >
              <Image
                src={PORTRAITS[t.name]}
                alt={t.name}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,12,16,0) 35%, rgba(10,12,16,.92) 100%)",
                }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                <blockquote className="font-display m-0 text-[19px] leading-[1.35] font-semibold">
                  {t.quote}
                </blockquote>
                <div className="mt-4 text-[14px] font-semibold">{t.name}</div>
                <div className="text-[13px] text-white/75">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}
