import Image from "next/image";
import type { Metadata } from "next";
import type { ElementType } from "react";
import {
  ArrowRight,
  Camera,
  Clock,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/reusable/Container";
import { CTASection } from "@/components/reusable/CTASection";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";
import data from "./contact.json";

export const metadata: Metadata = createPageMetadata(data.seo);

const iconMap: Record<string, ElementType> = {
  Phone,
  MessageCircle,
  Mail,
  Instagram: Camera,
  Facebook: Globe,
};

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.name,
    url: absoluteUrl(data.seo.canonical),
    image: absoluteUrl(data.hero.image),
    description: data.seo.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
      streetAddress: data.location.address,
    },
    contactPoint: data.contactDetails.items.map((item) => ({
      "@type": "ContactPoint",
      contactType: item.title,
      telephone: item.icon === "Phone" ? item.value : undefined,
      email: item.icon === "Mail" ? item.value : undefined,
      url: item.href.startsWith("http") ? item.href : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
          <div className="max-w-4xl">
            <Badge className="mb-5 border-white/20 bg-white/12 text-white backdrop-blur-md">
              {data.hero.badge}
            </Badge>
            <h1 className="font-heading text-5xl font-semibold leading-[0.92] text-balance sm:text-6xl lg:text-7xl xl:text-8xl">
              {data.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
              {data.hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                nativeButton={false}
                render={
                  <a
                    href={data.hero.primaryButton.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                size="lg"
                className="h-12 rounded-[8px] bg-accent px-6 text-sm font-semibold text-accent-foreground shadow-lg shadow-black/20 hover:bg-citrus"
              >
                {data.hero.primaryButton.label}
                <ExternalLink data-icon="inline-end" />
              </Button>
              <Button
                nativeButton={false}
                render={<a href={data.hero.secondaryButton.href} />}
                variant="outline"
                size="lg"
                className="h-12 rounded-[8px] border-white/35 bg-white/8 px-6 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/15"
              >
                {data.hero.secondaryButton.label}
                <Phone data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="relative overflow-hidden rounded-[8px] border border-border/70 bg-card p-8 text-foreground shadow-2xl shadow-primary/10 sm:p-10">
              <Image
                src={data.businessTiming.image}
                alt={data.businessTiming.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-card via-card/94 to-card/76" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_12%,var(--color-accent)_0%,transparent_34%)] opacity-25" />
              <div className="relative z-10 flex min-h-[520px] flex-col justify-between gap-10">
                <div>
                  <Badge
                    variant="secondary"
                    className="mb-5 border-primary/15 bg-primary/8 text-primary"
                  >
                    {data.businessTiming.eyebrow}
                  </Badge>
                  <h2 className="font-heading text-4xl font-semibold leading-tight sm:text-5xl">
                    {data.businessTiming.title}
                  </h2>
                  <p className="mt-4 max-w-sm text-base leading-7 text-muted-foreground">
                    {data.businessTiming.description}
                  </p>
                </div>
                <ul className="grid gap-3">
                  {data.businessTiming.hours.map((hour) => (
                    <li
                      key={hour.day}
                      className="flex flex-col gap-3 rounded-[8px] border border-border/70 bg-background/82 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="flex items-center gap-3 font-semibold text-foreground">
                        <Clock className="size-4 text-primary" />
                        {hour.day}
                      </span>
                      <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground">
                        {hour.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-[8px] border border-border/70 bg-card/92 p-6 shadow-2xl shadow-primary/8 sm:p-8 lg:p-10">
              <Badge
                variant="secondary"
                className="mb-5 border-primary/15 bg-primary/8 text-primary"
              >
                {data.contactDetails.eyebrow}
              </Badge>
              <h2 className="font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                {data.contactDetails.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                {data.contactDetails.description}
              </p>

              <div className="mt-8 grid gap-3">
                {data.contactDetails.items.map((item) => {
                  const Icon = iconMap[item.icon] ?? Phone;
                  const isExternal = item.href.startsWith("http");

                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="group grid gap-4 rounded-[8px] border border-border/70 bg-secondary/42 p-5 transition hover:-translate-y-1 hover:border-primary/30 hover:bg-card sm:grid-cols-[auto_1fr_auto] sm:items-center"
                    >
                      <span className="flex size-12 items-center justify-center rounded-[8px] bg-primary text-primary-foreground shadow-lg shadow-primary/18">
                        <Icon className="size-6" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-base font-semibold text-foreground">
                          {item.value}
                        </span>
                      </span>
                      <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                    </a>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-border/60 pt-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-foreground">
                  {data.socials.title}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {data.socials.links.map((link) => {
                    const Icon = iconMap[link.icon] ?? Camera;

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:border-primary/35 hover:bg-primary hover:text-primary-foreground"
                      >
                        <Icon className="size-4" />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-band py-16 sm:py-24">
        <Container>
          <div className="overflow-hidden rounded-[8px] border border-border/70 bg-card shadow-2xl shadow-primary/10">
            <div className="grid lg:grid-cols-[0.44fr_0.56fr]">
              <div className="relative min-h-[420px] bg-card p-8 text-foreground sm:p-10">
                <Image
                  src={data.location.featureImage}
                  alt={data.location.featureImageAlt}
                  fill
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/84 to-card/30" />
                <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-end">
                  <Badge
                    variant="secondary"
                    className="mb-5 w-fit border-primary/15 bg-primary/8 text-primary backdrop-blur-md"
                  >
                    {data.location.eyebrow}
                  </Badge>
                  <h2 className="font-heading text-4xl font-semibold leading-tight sm:text-5xl">
                    {data.location.title}
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
                    {data.location.description}
                  </p>
                  <div className="mt-6 flex gap-4 rounded-[8px] border border-border/70 bg-background/82 p-4 backdrop-blur-md">
                    <MapPin className="mt-1 size-5 shrink-0 text-primary" />
                    <p className="text-sm leading-6 text-muted-foreground">
                      {data.location.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-3">
                <div className="h-[520px] overflow-hidden rounded-[8px] border border-border bg-card">
                  <iframe
                    title={data.location.mapTitle}
                    src={data.location.mapSrc}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection content={data.cta} />
    </>
  );
}
