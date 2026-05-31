import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/reusable/Container";
import { CTASection } from "@/components/reusable/CTASection";
import { MenuItemCard } from "@/components/reusable/MenuItemCard";
import { SectionHeader } from "@/components/reusable/SectionHeader";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import data from "./menu.json";

export const metadata: Metadata = createPageMetadata(data.seo);

type MenuItem = {
  name: string;
  description?: string;
  image: string;
  imageAlt: string;
  tag?: string;
  sizes?: string[];
};

type MenuCategory = {
  name: string;
  slug: string;
  description: string;
  image: string;
  imageAlt: string;
  accent: string;
  items: MenuItem[];
};

const accentStyles: Record<string, string> = {
  leaf: "from-primary/20 via-secondary/70 to-accent/16",
  citrus: "from-accent/28 via-secondary/70 to-primary/10",
  clay: "from-berry/14 via-secondary/70 to-accent/18",
};

function HeroButton({
  button,
  variant,
}: {
  button: { label: string; href: string; external?: boolean };
  variant: "primary" | "secondary";
}) {
  return (
    <Button
      nativeButton={false}
      render={
        button.external ? (
          <a href={button.href} target="_blank" rel="noopener noreferrer" />
        ) : (
          <Link href={button.href} />
        )
      }
      variant={variant === "primary" ? "default" : "outline"}
      size="lg"
      className={cn(
        "h-12 rounded-[8px] px-5 text-sm font-semibold sm:h-13 sm:px-6",
        variant === "primary" &&
          "bg-accent text-accent-foreground shadow-lg shadow-black/20 hover:bg-citrus",
        variant === "secondary" &&
          "border-white/35 bg-white/8 text-white backdrop-blur-md hover:bg-white/15"
      )}
    >
      {button.label}
      {button.external ? (
        <ExternalLink data-icon="inline-end" />
      ) : (
        <ArrowRight data-icon="inline-end" />
      )}
    </Button>
  );
}

export default function MenuPage() {
  const categories = data.categories as MenuCategory[];
  const menuStructuredData = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Pockeat Kitchen Menu",
    url: absoluteUrl(data.seo.canonical),
    provider: {
      "@type": "Restaurant",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
    hasMenuSection: categories.map((category) => ({
      "@type": "MenuSection",
      name: category.name,
      description: category.description,
      image: absoluteUrl(category.image),
      hasMenuItem: category.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        image: absoluteUrl(item.image),
      })),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuStructuredData) }}
      />
      <section className="relative isolate flex min-h-[92svh] w-full items-end overflow-hidden bg-ink pt-28 pb-14 text-white lg:min-h-[100svh]">
        <Image
          src={data.hero.image}
          alt={data.hero.imageAlt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: data.hero.imagePosition ?? "center" }}
        />
        <div className="premium-hero-overlay absolute inset-0" />

        <Container className="relative z-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.56fr] lg:items-end">
            <div className="max-w-4xl">
              <Badge className="mb-5 border-white/20 bg-white/12 text-white backdrop-blur-md">
                {data.hero.badge}
              </Badge>
              <h1 className="font-heading text-6xl font-semibold leading-[0.9] text-balance sm:text-7xl lg:text-8xl">
                {data.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
                {data.hero.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <HeroButton button={data.hero.primaryButton} variant="primary" />
                <HeroButton button={data.hero.secondaryButton} variant="secondary" />
              </div>
              {data.hero.stats?.length ? (
                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/18 pt-6">
                  {data.hero.stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="text-xs font-bold uppercase tracking-[0.18em] text-white/58">
                        {stat.label}
                      </dt>
                      <dd className="mt-1 font-heading text-2xl font-semibold text-white sm:text-3xl">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>

            <div className="glass-panel hidden rounded-[8px] p-5 lg:block">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
                {data.sections[0].title}
              </p>
              <div className="mt-4 grid gap-2">
                {categories.slice(0, 7).map((category) => (
                  <a
                    key={category.slug}
                    href={`#${category.slug}`}
                    className="flex items-center justify-between rounded-[8px] border border-white/12 bg-white/6 px-4 py-3 text-sm font-semibold text-white/82 transition hover:bg-white/12 hover:text-white"
                  >
                    {category.name}
                    <ArrowRight className="size-4 text-accent" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div className="sticky top-16 z-30 border-b border-border/60 bg-background/92 backdrop-blur-xl supports-[backdrop-filter]:bg-background/78">
        <Container>
          <nav className="flex gap-2 overflow-x-auto py-3" aria-label="Menu categories">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="shrink-0 rounded-full border border-border/70 bg-card/84 px-4 py-2 text-sm font-semibold text-muted-foreground shadow-sm transition hover:border-primary/35 hover:bg-primary hover:text-primary-foreground"
              >
                {category.name}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow={data.sections[0].eyebrow}
            title={data.sections[0].title}
            description={data.sections[0].description}
            align="center"
          />
        </Container>
      </section>

      <div className="space-y-16 pb-16 sm:space-y-24 sm:pb-24">
        {categories.map((category, categoryIndex) => (
          <section
            key={category.slug}
            id={category.slug}
            className="scroll-mt-32"
          >
            <Container>
              <div
                className={cn(
                  "grid gap-5 rounded-[8px] bg-gradient-to-br p-3 shadow-2xl shadow-primary/8 lg:grid-cols-[0.42fr_0.58fr]",
                  accentStyles[category.accent] ?? accentStyles.leaf
                )}
              >
                <div className="relative overflow-hidden rounded-[8px] border border-border/70 bg-card text-foreground lg:min-h-[560px]">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/86 to-card/26" />
                  <div className="absolute left-5 top-5 rounded-full border border-primary/15 bg-card/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-md">
                    {String(categoryIndex + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <Badge
                      variant="secondary"
                      className="mb-4 border-primary/15 bg-primary/8 text-primary backdrop-blur-md"
                    >
                      {category.name}
                    </Badge>
                    <h2 className="font-heading text-4xl font-semibold leading-tight sm:text-5xl">
                      {category.name}
                    </h2>
                    <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                      {category.description}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
                      <Sparkles className="size-4" />
                      {category.items.length} picks
                    </div>
                  </div>
                </div>

                <div className="grid content-start gap-4 p-1 sm:grid-cols-2 lg:p-3 xl:grid-cols-2">
                  {category.items.map((item) => (
                    <MenuItemCard
                      key={item.name}
                      name={item.name}
                      description={item.description}
                      image={item.image}
                      imageAlt={item.imageAlt}
                      tag={item.tag}
                      sizes={item.sizes}
                    />
                  ))}
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <CTASection content={data.cta} />
    </>
  );
}
