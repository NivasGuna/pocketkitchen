import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
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

type SupportingImage = {
  image: string;
  imageAlt: string;
};

export type HeroContent = {
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  primaryButton?: HeroButton;
  secondaryButton?: HeroButton;
  stats?: HeroStat[];
  supportingImages?: SupportingImage[];
};

function HeroAction({
  button,
  variant,
}: {
  button: HeroButton;
  variant: "primary" | "secondary";
}) {
  const icon =
    variant === "primary" ? (
      <ArrowRight data-icon="inline-end" />
    ) : button.external ? (
      <ExternalLink data-icon="inline-end" />
    ) : null;

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
      {icon}
    </Button>
  );
}

export function HeroBanner({
  content,
  priority = false,
  compact = false,
}: {
  content: HeroContent;
  priority?: boolean;
  compact?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative isolate flex min-h-screen min-h-[100svh] w-full overflow-hidden bg-ink text-white",
        compact ? "items-end pt-28 pb-14" : "items-end pt-32 pb-16"
      )}
    >
      <Image
        src={content.image}
        alt={content.imageAlt}
        fill
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: content.imagePosition ?? "center" }}
      />
      <div className="hero-overlay absolute inset-0" />
      <Container className="relative z-10 grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
        <div className="max-w-3xl">
          <Badge className="mb-5 border-white/20 bg-white/12 text-white backdrop-blur-md">
            {content.badge}
          </Badge>
          <h1 className="font-heading text-5xl font-semibold leading-[0.96] tracking-normal text-balance sm:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
            {content.description}
          </p>
          {(content.primaryButton || content.secondaryButton) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {content.primaryButton ? (
                <HeroAction button={content.primaryButton} variant="primary" />
              ) : null}
              {content.secondaryButton ? (
                <HeroAction button={content.secondaryButton} variant="secondary" />
              ) : null}
            </div>
          )}
          {content.stats?.length ? (
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/18 pt-6">
              {content.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs uppercase tracking-[0.18em] text-white/58">
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

        {content.supportingImages?.length ? (
          <div className="hidden min-h-[390px] items-end justify-end gap-4 lg:flex">
            {content.supportingImages.slice(0, 2).map((item, index) => (
              <div
                key={item.image}
                className={cn(
                  "relative overflow-hidden rounded-[8px] border border-white/18 bg-white/10 shadow-xl shadow-black/20 backdrop-blur-sm",
                  index === 0 ? "h-64 w-44 -translate-y-12" : "h-80 w-56"
                )}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 224px, 0px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
