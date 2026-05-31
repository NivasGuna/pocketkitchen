import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Dumbbell,
  HeartPulse,
  IndianRupee,
  Leaf,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/reusable/Container";
import { CTASection } from "@/components/reusable/CTASection";
import { HomeHeroCarousel } from "@/components/reusable/HomeHeroCarousel";
import { SectionHeader } from "@/components/reusable/SectionHeader";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";
import data from "./home.json";

export const metadata: Metadata = createPageMetadata(data.seo);

const iconMap = {
  Leaf,
  Dumbbell,
  IndianRupee,
  Sparkles,
  HeartPulse,
  MessageCircle,
};

export default function HomePage() {
  const heroImage = data.hero.slides[0]?.image ?? "/images/og-pocket-kitchen.jpeg";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.name,
    url: absoluteUrl(data.seo.canonical),
    image: absoluteUrl(heroImage),
    description: data.seo.description,
    servesCuisine: ["Healthy food", "Fruit bowls", "Juices", "Diet bowls", "Protein shakes"],
    priceRange: "Affordable",
    menu: absoluteUrl("/menu"),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    sameAs: [siteConfig.whatsappUrl, siteConfig.zomatoUrl],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeHeroCarousel slides={data.hero.slides} />

      <section className="section-band py-16 sm:py-24">
        <Container>
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow={data.categoryShowcase.eyebrow}
              title={data.categoryShowcase.title}
              description={data.categoryShowcase.description}
            />
            <Button
              nativeButton={false}
              render={<Link href={data.categoryShowcase.button.href} />}
              size="lg"
              className="h-12 w-fit rounded-[8px] bg-primary px-5 text-primary-foreground shadow-lg shadow-primary/15 hover:bg-primary/90"
            >
              {data.categoryShowcase.button.label}
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.categoryShowcase.items.map((item, index) => (
              <Link
                key={item.title}
                href={data.categoryShowcase.button.href}
                className="group overflow-hidden rounded-[8px] border border-border/70 bg-card/92 shadow-xl shadow-primary/8 transition hover:-translate-y-1 hover:border-primary/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/50">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <Badge className="border-white/20 bg-white/75 text-primary shadow-sm backdrop-blur-md">
                      {item.badge}
                    </Badge>
                    <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-bold text-primary backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <h2 className="font-heading text-3xl font-semibold leading-tight text-foreground">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                  <span className="mt-5 inline-flex size-10 items-center justify-center rounded-[8px] bg-accent text-accent-foreground transition group-hover:translate-x-1">
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="overflow-hidden py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="relative min-h-[560px] overflow-hidden rounded-[8px] bg-ink shadow-2xl shadow-primary/12">
              <Image
                src={data.wellness.image}
                alt={data.wellness.imageAlt}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-ink/14 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Taramani, Chennai
                </p>
                <h2 className="mt-3 max-w-md font-heading text-4xl font-semibold leading-tight">
                  Fresh food for office days, gym days and lighter nights.
                </h2>
              </div>
            </div>

            <div>
              <SectionHeader
                eyebrow={data.wellness.eyebrow}
                title={data.wellness.title}
                description={data.wellness.description}
              />
              <div className="mt-8 grid gap-4">
                {data.wellness.items.map((item) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap];

                  return (
                    <div
                      key={item.title}
                      className="group grid gap-4 rounded-[8px] border border-border/70 bg-card/86 p-5 shadow-lg shadow-primary/5 transition hover:-translate-y-1 hover:border-primary/30 sm:grid-cols-[auto_1fr]"
                    >
                      <div className="flex size-12 items-center justify-center rounded-[8px] bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                        <Icon className="size-6" />
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl font-semibold leading-tight text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-band py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionHeader
              eyebrow={data.why.eyebrow}
              title={data.why.title}
              description={data.why.description}
            />
            <div className="grid gap-4 md:grid-cols-3">
              {data.why.items.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];

                return (
                  <div
                    key={item.title}
                    className="rounded-[8px] border border-border/70 bg-card/88 p-6 shadow-xl shadow-primary/6 transition hover:-translate-y-1 hover:border-primary/30 hover:bg-card"
                  >
                    <div className="mb-8 flex size-12 items-center justify-center rounded-[8px] bg-primary text-primary-foreground">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="font-heading text-2xl font-semibold leading-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-[8px] border border-border/60 bg-card p-6 shadow-2xl shadow-primary/8 sm:p-8 lg:p-10">
            <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,var(--color-accent)_0%,transparent_62%)] opacity-20 lg:block" />
            <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <Badge
                  variant="secondary"
                  className="mb-4 border-primary/15 bg-primary/8 text-primary"
                >
                  {data.process.eyebrow}
                </Badge>
                <h2 className="font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                  {data.process.title}
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {data.process.steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-[8px] border border-border/70 bg-secondary/40 p-5"
                  >
                    <span className="font-heading text-5xl font-semibold text-primary/24">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-6 font-heading text-2xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-band py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <SectionHeader
                eyebrow={data.galleryPreview.eyebrow}
                title={data.galleryPreview.title}
                description={data.galleryPreview.description}
              />
              <Button
                nativeButton={false}
                render={<Link href={data.galleryPreview.button.href} />}
                variant="outline"
                size="lg"
                className="mt-8 h-12 rounded-[8px] border-primary/25 bg-card/70 px-5 text-primary hover:bg-primary hover:text-primary-foreground"
              >
                {data.galleryPreview.button.label}
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {data.galleryPreview.images.map((image, index) => (
                <Link
                  key={image.image}
                  href={data.galleryPreview.button.href}
                  className="group relative overflow-hidden rounded-[8px] bg-ink shadow-xl shadow-primary/8"
                  style={{
                    aspectRatio: index === 0 ? "1.35 / 1" : index === 3 ? "1.45 / 1" : "1 / 1.08",
                    gridColumn: index === 0 || index === 3 ? "span 2" : undefined,
                  }}
                >
                  <Image
                    src={image.image}
                    alt={image.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/76 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/14 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                    {image.caption}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTASection content={data.cta} />
    </>
  );
}
