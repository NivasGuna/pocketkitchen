import Image from "next/image";
import type { Metadata } from "next";
import type { ElementType } from "react";
import { Check, Clock, HeartPulse, Leaf, ShieldCheck, Sprout, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/reusable/Container";
import { CTASection } from "@/components/reusable/CTASection";
import { HeroBanner } from "@/components/reusable/HeroBanner";
import { SectionHeader } from "@/components/reusable/SectionHeader";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";
import data from "./about.json";

export const metadata: Metadata = createPageMetadata(data.seo);

const iconMap: Record<string, ElementType> = {
  Sprout,
  HeartPulse,
  Clock,
  ShieldCheck,
  Leaf,
  Star,
};

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: absoluteUrl(data.seo.canonical),
    logo: absoluteUrl("/images/pocket-kitchen-logo.jpeg"),
    image: absoluteUrl(data.hero.image),
    description: data.seo.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroBanner content={data.hero} compact priority />

      <section className="overflow-hidden py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[8px] bg-ink shadow-2xl shadow-primary/12">
                <Image
                  src={data.story.image}
                  alt={data.story.imageAlt}
                  width={900}
                  height={1080}
                  className="aspect-[4/5] w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                    {data.story.eyebrow}
                  </p>
                  <h2 className="mt-3 max-w-sm font-heading text-3xl font-semibold leading-tight">
                    Fresh food with a clear point of view.
                  </h2>
                </div>
              </div>
            </div>

            <div>
              <SectionHeader
                eyebrow={data.story.eyebrow}
                title={data.story.title}
                description={data.story.description}
              />
              <ul className="mt-8 grid gap-4">
                {data.story.points.map((point) => (
                  <li
                    key={point}
                    className="grid gap-4 rounded-[8px] border border-border/70 bg-card/88 p-5 shadow-lg shadow-primary/5 sm:grid-cols-[auto_1fr]"
                  >
                    <span className="flex size-10 items-center justify-center rounded-[8px] bg-primary text-primary-foreground shadow-lg shadow-primary/18">
                      <Check className="size-5" />
                    </span>
                    <span className="text-base font-medium leading-7 text-foreground">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-band py-16 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow={data.quality.eyebrow}
            title={data.quality.title}
            description={data.quality.description}
            align="center"
            className="mb-12"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {data.quality.cards.map((card) => {
              const Icon = iconMap[card.icon] ?? Check;

              return (
                <div
                  key={card.title}
                  className="group overflow-hidden rounded-[8px] border border-border/70 bg-card/88 p-6 shadow-xl shadow-primary/6 transition hover:-translate-y-1 hover:border-primary/30 hover:bg-card"
                >
                  <div className="mb-10 flex size-14 items-center justify-center rounded-[8px] bg-primary text-primary-foreground transition group-hover:scale-105">
                    <Icon className="size-7" />
                  </div>
                  <h3 className="font-heading text-2xl font-semibold leading-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-band py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <SectionHeader
              eyebrow={data.freshIngredients.eyebrow}
              title={data.freshIngredients.title}
              description={data.freshIngredients.description}
            />
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {data.freshIngredients.images.map((item, index) => (
                <div
                  key={item.src}
                  className="group relative overflow-hidden rounded-[8px] bg-ink shadow-xl shadow-primary/8"
                  style={{
                    aspectRatio: index === 0 || index === 3 ? "1 / 1.18" : "1 / 1",
                    transform: index % 2 === 1 ? "translateY(28px)" : undefined,
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 27vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/48 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="overflow-hidden rounded-[8px] border border-border/60 bg-card shadow-2xl shadow-primary/8">
            <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="bg-primary p-8 text-primary-foreground sm:p-10 lg:p-12">
                <Badge className="mb-5 border-white/20 bg-white/14 text-white">
                  {data.trustHighlights.eyebrow}
                </Badge>
                <h2 className="font-heading text-4xl font-semibold leading-tight sm:text-5xl">
                  {data.trustHighlights.title}
                </h2>
              </div>
              <div className="grid gap-0 md:grid-cols-3">
                {data.trustHighlights.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-b border-border/60 p-7 last:border-b-0 md:border-b-0 md:border-l"
                  >
                    <p className="font-heading text-5xl font-semibold text-primary">
                      {stat.value}
                    </p>
                    <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-foreground">
                      {stat.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container>
          <SectionHeader
            eyebrow={data.reasons.eyebrow}
            title={data.reasons.title}
            align="center"
            className="mb-12"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {data.reasons.items.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[8px] border border-border/70 bg-card/88 p-6 shadow-lg shadow-primary/5 transition hover:-translate-y-1 hover:border-primary/30"
              >
                <span className="font-heading text-6xl font-semibold text-primary/18">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 font-heading text-2xl font-semibold leading-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection content={data.cta} />
    </>
  );
}
