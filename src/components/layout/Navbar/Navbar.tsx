"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toolbar } from "@base-ui/react/toolbar";
import { Menu, Phone, ShoppingBag } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn } from "@/lib/utils";
import data from "./navbar.json";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback);

  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

function getScrollSnapshot() {
  return window.scrollY;
}

function getServerScrollSnapshot() {
  return 0;
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const sheetOpen = !isDesktop && open;
  const scrollY = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerScrollSnapshot
  );
  const scrolled = scrollY > 16 || sheetOpen;
  useScrollLock(sheetOpen);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-white transition-all duration-500",
        scrolled
          ? "border-b border-white/12 bg-ink/90 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={data.brand.name}>
          <Image
            src={data.brand.logo}
            alt={data.brand.logoAlt}
            width={64}
            height={64}
            priority
            className="size-12 object-contain lg:size-14"
          />
          <span className="font-heading text-xl font-semibold leading-none tracking-normal">
            {data.brand.name}
          </span>
        </Link>

        <Toolbar.Root className="hidden items-center gap-1 md:flex" aria-label={data.mobile.description}>
          <Toolbar.Group className="flex items-center gap-1">
            {data.links.map((link) => (
              <Toolbar.Link
                key={link.href}
                render={<Link href={link.href} />}
                className={cn(
                  "rounded-[8px] px-3 py-2 text-sm font-semibold text-white/78 transition hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/45",
                  isActive(pathname, link.href) && "bg-white/14 text-white"
                )}
              >
                {link.label}
              </Toolbar.Link>
            ))}
          </Toolbar.Group>
        </Toolbar.Root>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            nativeButton={false}
            render={<a href={data.secondaryCta.href} />}
            variant="outline"
            size="lg"
            className="h-10 rounded-[8px] border-white/30 bg-white/10 px-4 text-white backdrop-blur-md hover:bg-white/16"
          >
            <Phone data-icon="inline-start" />
            {data.secondaryCta.label}
          </Button>
          <Button
            nativeButton={false}
            render={
              <a
                href={data.cta.href}
                target={data.cta.external ? "_blank" : undefined}
                rel={data.cta.external ? "noopener noreferrer" : undefined}
              />
            }
            size="lg"
            className="h-10 rounded-[8px] bg-accent px-4 text-accent-foreground shadow-sm shadow-black/10 hover:bg-citrus"
          >
            <ShoppingBag data-icon="inline-start" />
            {data.cta.label}
          </Button>
        </div>

        <Sheet open={sheetOpen} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon-lg"
                className="rounded-[8px] border-white/28 bg-white/10 text-white backdrop-blur-md hover:bg-white/16 md:hidden"
                aria-label={data.mobile.openLabel}
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-[86vw] max-w-sm border-border bg-background/95 p-0 text-foreground backdrop-blur-xl">
            <SheetHeader className="border-b border-border p-5">
              <SheetTitle>{data.mobile.title}</SheetTitle>
              <SheetDescription>{data.mobile.description}</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-2 p-5">
              {data.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-[8px] px-4 py-3 text-base font-semibold transition hover:bg-secondary",
                    isActive(pathname, link.href) && "bg-secondary text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto grid gap-3 border-t border-border p-5">
              <Button
                nativeButton={false}
                render={
                  <a
                    href={data.cta.href}
                    target={data.cta.external ? "_blank" : undefined}
                    rel={data.cta.external ? "noopener noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                  />
                }
                className="h-12 rounded-[8px] bg-primary text-primary-foreground"
              >
                <ShoppingBag data-icon="inline-start" />
                {data.cta.label}
              </Button>
              <Button
                nativeButton={false}
                render={<a href={data.secondaryCta.href} onClick={() => setOpen(false)} />}
                variant="outline"
                className="h-12 rounded-[8px]"
              >
                <Phone data-icon="inline-start" />
                {data.secondaryCta.label}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
