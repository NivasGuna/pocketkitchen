"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/reusable/Container";
import { cn } from "@/lib/utils";

type HeroButton = {
  label: string;
  href: string;
  external?: boolean;
};

type HeroStat = {
  value: string;
  label: string;
};

type HeroSlide = {
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  primaryButton: HeroButton;
  secondaryButton?: HeroButton;
  stats?: HeroStat[];
};

function HeroLink({
  button,
  variant,
}: {
  button: HeroButton;
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
          "bg-accent text-accent-foreground shadow-xl shadow-black/20 hover:bg-citrus",
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

export function HomeHeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex] ?? slides[0];

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!activeSlide) {
    return null;
  }

  return (
    <section className="relative isolate flex min-h-[92svh] w-full items-end overflow-hidden bg-ink pt-28 pb-10 text-white sm:pt-32 sm:pb-14 lg:min-h-[100svh]">
      {slides.map((slide, index) => (
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.imageAlt}
          fill
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          sizes="100vw"
          className={cn(
            "object-cover transition-opacity duration-1000 ease-out",
            index === activeIndex ? "opacity-100" : "opacity-0"
          )}
          style={{ objectPosition: slide.imagePosition ?? "center" }}
        />
      ))}
      <div className="premium-hero-overlay absolute inset-0" />

      <Container className="relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.68fr] lg:items-end">
          <div className="max-w-4xl">
            <Badge className="mb-5 border-white/20 bg-white/12 px-4 py-1.5 text-white shadow-lg shadow-black/10 backdrop-blur-md">
              {activeSlide.badge}
            </Badge>
            <h1 className="max-w-4xl font-heading text-5xl font-semibold leading-[0.92] text-balance sm:text-6xl lg:text-7xl xl:text-8xl">
              {activeSlide.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
              {activeSlide.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <HeroLink button={activeSlide.primaryButton} variant="primary" />
              {activeSlide.secondaryButton ? (
                <HeroLink button={activeSlide.secondaryButton} variant="secondary" />
              ) : null}
            </div>

            {activeSlide.stats?.length ? (
              <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/18 pt-6">
                {activeSlide.stats.map((stat) => (
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
              Fresh rotation
            </p>
            <div className="mt-4 grid gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "grid grid-cols-[auto_1fr] items-center gap-3 rounded-[8px] border p-3 text-left transition",
                    index === activeIndex
                      ? "border-accent/60 bg-white/14"
                      : "border-white/12 bg-white/6 hover:bg-white/10"
                  )}
                  aria-label={`Show slide ${index + 1}`}
                >
                  <span className="flex size-8 items-center justify-center rounded-[8px] bg-accent text-sm font-bold text-accent-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold leading-5 text-white/86">
                    {slide.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 lg:hidden">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                index === activeIndex ? "w-9 bg-accent" : "w-2.5 bg-white/38"
              )}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
