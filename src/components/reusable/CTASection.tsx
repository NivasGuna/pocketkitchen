import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/reusable/Container";

type CTAButton = {
  label: string;
  href: string;
  external?: boolean;
};

type CTAContent = {
  eyebrow?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  primaryButton: CTAButton;
  secondaryButton?: CTAButton;
};

function CTAButtonLink({ button, secondary = false }: { button: CTAButton; secondary?: boolean }) {
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
      variant={secondary ? "outline" : "default"}
      size="lg"
      className={
        secondary
          ? "h-12 rounded-[8px] border-primary/25 bg-card/75 px-6 text-primary backdrop-blur-md transition-colors hover:bg-primary hover:text-primary-foreground"
          : "h-12 rounded-[8px] bg-primary px-6 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25"
      }
    >
      {button.label}
      {button.external ? <ExternalLink data-icon="inline-end" /> : <ArrowRight data-icon="inline-end" />}
    </Button>
  );
}

export function CTASection({ content }: { content: CTAContent }) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative flex min-h-[460px] w-full flex-col justify-center overflow-hidden rounded-[8px] border border-border/70 bg-card px-6 py-16 text-foreground shadow-2xl shadow-primary/10 sm:px-12 lg:px-20">
          {content.image && content.imageAlt ? (
            <Image
              src={content.image}
              alt={content.imageAlt}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/94 to-card/58" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,var(--color-accent)_0%,transparent_34%)] opacity-30" />

          <div className="relative z-10 max-w-2xl">
            {content.eyebrow ? (
              <span className="mb-6 inline-flex items-center rounded-full border border-primary/15 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-md">
                {content.eyebrow}
              </span>
            ) : null}
            <h2 className="font-heading text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl">
              {content.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              {content.description}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CTAButtonLink button={content.primaryButton} />
              {content.secondaryButton ? (
                <CTAButtonLink button={content.secondaryButton} secondary />
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
