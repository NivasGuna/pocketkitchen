import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/reusable/Container";
import { CTASection } from "@/components/reusable/CTASection";
import { createPageMetadata } from "@/lib/seo";
import data from "./gallery.json";

export const metadata: Metadata = createPageMetadata(data.seo);

type GalleryImage = {
  image: string;
  imageAlt: string;
  caption: string;
  category: string;
  span: "normal" | "tall" | "wide";
};

export default function GalleryPage() {
  const images = data.images as GalleryImage[];

  // Split into featured (first 5) and secondary (rest)
  const featuredImages = images.slice(0, 5);
  const secondaryImages = images.slice(5);

  return (
    <>
      {/* ─── CINEMATIC HERO ─── */}
      <section className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink text-white">
        {/* Full bleed background */}
        <Image
          src={data.hero.image}
          alt={data.hero.imageAlt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center" }}
        />

        {/* Layered dark overlay — cinematic */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />

        {/* Content */}
        <Container className="relative z-10 text-center">
          <Badge className="mb-6 border-white/20 bg-white/12 px-5 py-2 text-sm text-white backdrop-blur-md">
            {data.hero.badge}
          </Badge>
          <h1 className="mx-auto max-w-4xl font-heading text-5xl font-semibold leading-[0.94] text-balance sm:text-6xl lg:text-7xl xl:text-8xl">
            {data.hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            {data.hero.description}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              nativeButton={false}
              render={<Link href={data.hero.primaryButton.href} />}
              size="lg"
              className="h-12 rounded-[8px] px-6 text-sm font-semibold bg-accent text-accent-foreground shadow-lg shadow-black/20 hover:bg-citrus"
            >
              {data.hero.primaryButton.label}
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              nativeButton={false}
              render={<Link href={data.hero.secondaryButton.href} />}
              variant="outline"
              size="lg"
              className="h-12 rounded-[8px] px-6 text-sm font-semibold border-white/35 bg-white/8 text-white backdrop-blur-md hover:bg-white/15"
            >
              {data.hero.secondaryButton.label}
            </Button>
          </div>

          {/* Scroll cue */}
          <div className="mt-16 flex flex-col items-center gap-2 text-white/40">
            <span className="text-xs tracking-[0.2em] uppercase">Scroll to explore</span>
            <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </Container>
      </section>

      {/* ─── SECTION INTRO ─── */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="secondary"
              className="mb-4 border border-primary/15 bg-primary/8 text-primary"
            >
              Visual menu
            </Badge>
            <h2 className="font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              A closer look at what leaves the kitchen.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              Every dish here is made fresh. These frames capture the textures, colors and craft behind Pockeat Kitchen.
            </p>
          </div>
        </Container>
      </section>

      {/* ─── FEATURED EDITORIAL GRID ─── */}
      <section className="pb-8">
        <Container>
          {/*
            Layout:
            - Row 1: wide card (col-span-2) + tall card (row-span-2) on right
            - Row 2: two normal cards filling under the wide card
            Mobile: single column stack
          */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 auto-rows-auto">

            {/* Card 1 — Wide feature card */}
            {featuredImages[0] && (
              <div className="group relative overflow-hidden rounded-3xl bg-secondary/40 lg:col-span-2 lg:row-span-1">
                <div className="relative h-72 sm:h-80 lg:h-72 w-full overflow-hidden">
                  <Image
                    src={featuredImages[0].image}
                    alt={featuredImages[0].imageAlt}
                    fill
                    sizes="(min-width: 1024px) 66vw, (min-width: 640px) 100vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <Badge className="mb-2 border-white/20 bg-white/15 text-white text-xs backdrop-blur-sm">
                      {featuredImages[0].category}
                    </Badge>
                    <p className="font-heading text-2xl font-semibold text-white">
                      {featuredImages[0].caption}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Card 2 — Tall card spanning 2 rows on right */}
            {featuredImages[1] && (
              <div className="group relative overflow-hidden rounded-3xl bg-secondary/40 lg:row-span-2">
                <div className="relative h-64 sm:h-80 lg:h-full w-full overflow-hidden" style={{ minHeight: "580px" }}>
                  <Image
                    src={featuredImages[1].image}
                    alt={featuredImages[1].imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <Badge className="mb-2 border-white/20 bg-white/15 text-white text-xs backdrop-blur-sm">
                      {featuredImages[1].category}
                    </Badge>
                    <p className="font-heading text-2xl font-semibold text-white">
                      {featuredImages[1].caption}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Cards 3 & 4 — Normal cards in row 2 under the wide card */}
            {featuredImages[2] && (
              <div className="group relative overflow-hidden rounded-3xl bg-secondary/40">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src={featuredImages[2].image}
                    alt={featuredImages[2].imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <Badge className="mb-2 border-white/20 bg-white/15 text-white text-xs backdrop-blur-sm">
                      {featuredImages[2].category}
                    </Badge>
                    <p className="font-heading text-xl font-semibold text-white">
                      {featuredImages[2].caption}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {featuredImages[3] && (
              <div className="group relative overflow-hidden rounded-3xl bg-secondary/40">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src={featuredImages[3].image}
                    alt={featuredImages[3].imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <Badge className="mb-2 border-white/20 bg-white/15 text-white text-xs backdrop-blur-sm">
                      {featuredImages[3].category}
                    </Badge>
                    <p className="font-heading text-xl font-semibold text-white">
                      {featuredImages[3].caption}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ─── SECONDARY GALLERY GRID ─── */}
      {secondaryImages.length > 0 && (
        <section className="py-6 pb-16 sm:pb-20">
          <Container>
            {/* Wide feature strip for image[4] if it exists */}
            {featuredImages[4] && (
              <div className="group relative mb-3 overflow-hidden rounded-3xl bg-secondary/40">
                <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                  <Image
                    src={featuredImages[4].image}
                    alt={featuredImages[4].imageAlt}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <Badge className="mb-2 border-white/20 bg-white/15 text-white text-xs backdrop-blur-sm">
                      {featuredImages[4].category}
                    </Badge>
                    <p className="font-heading text-3xl font-semibold text-white">
                      {featuredImages[4].caption}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3-col grid for remaining images */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {secondaryImages.map((item) => (
                <div
                  key={item.image}
                  className="group relative overflow-hidden rounded-3xl bg-secondary/40"
                >
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5">
                      <Badge className="mb-2 border-white/20 bg-white/15 text-white text-xs backdrop-blur-sm">
                        {item.category}
                      </Badge>
                      <p className="font-heading text-xl font-semibold text-white">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection content={data.cta} />
    </>
  );
}
