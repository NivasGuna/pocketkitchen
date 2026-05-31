import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/reusable/Container";
import data from "./not-found.json";

export default function NotFound() {
  return (
    <section className="min-h-[70svh] py-32">
      <Container className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
          {data.eyebrow}
        </p>
        <h1 className="mx-auto mt-4 max-w-2xl font-heading text-5xl font-semibold leading-tight text-balance">
          {data.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          {data.description}
        </p>
        <Button
          nativeButton={false}
          render={<Link href={data.button.href} />}
          size="lg"
          className="mt-8 h-12 rounded-[8px] bg-primary px-5 text-primary-foreground"
        >
          <ArrowLeft data-icon="inline-start" />
          {data.button.label}
        </Button>
      </Container>
    </section>
  );
}
