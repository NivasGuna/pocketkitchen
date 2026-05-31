"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone, ShoppingBag } from "lucide-react";
import { Container } from "@/components/reusable/Container";
import { Separator } from "@/components/ui/separator";
import data from "./footer.json";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,var(--color-accent)_0%,transparent_32%)] opacity-25" />
      <Container className="relative py-14 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.7fr_0.95fr_0.85fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={data.brand.logo}
                alt={data.brand.logoAlt}
                width={72}
                height={72}
                className="size-14 rounded-[8px] object-contain shadow-lg shadow-primary/10"
              />
              <span className="font-heading text-2xl font-semibold leading-none">
                {data.brand.name}
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
              {data.brand.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={data.whatsappCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-primary px-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/15 transition hover:bg-primary/90"
              >
                <MessageCircle className="size-4" />
                {data.whatsappCta.label}
              </a>
              <a
                href={data.orderCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-primary/20 bg-background/80 px-4 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                <ShoppingBag className="size-4" />
                {data.orderCta.label}
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              {data.columns.quickLinks}
            </h2>
            <nav className="mt-5 grid gap-3">
              {data.quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-muted-foreground transition hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              {data.columns.contact}
            </h2>
            <div className="mt-5 grid gap-4 text-sm text-muted-foreground">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{data.contact.address}</span>
              </p>
              <a href={data.contact.phoneHref} className="flex gap-3 transition hover:text-primary">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{data.contact.phone}</span>
              </a>
              <a
                href={data.contact.emailHref}
                className="flex gap-3 break-all transition hover:text-primary"
              >
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{data.contact.email}</span>
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              {data.columns.order}
            </h2>
            <div className="mt-5 rounded-[8px] border border-primary/15 bg-secondary/55 p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-[8px] bg-primary/10 text-primary">
                  <Clock className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">{data.swiggy.label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {data.swiggy.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {data.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[8px] border border-border bg-background/70 px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:border-primary/30 hover:bg-primary hover:text-primary-foreground"
                >
                  {link.label}
                  <ExternalLink className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-border" />
        <p className="text-center text-xs text-muted-foreground">
          {data.copyright.prefix} {currentYear} {data.copyright.brand}. {data.copyright.suffix}
        </p>
      </Container>
    </footer>
  );
}
