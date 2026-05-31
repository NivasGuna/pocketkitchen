import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type FoodCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  badge?: string;
  href?: string;
};

export function FoodCard({
  title,
  description,
  image,
  imageAlt,
  badge,
  href,
}: FoodCardProps) {
  const content = (
    <Card className="h-full overflow-hidden rounded-[8px] border-border/70 bg-card/95 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/8">
      <div className="relative aspect-[4/3] bg-secondary/50">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.025]"
        />
      </div>
      <CardContent className="p-5">
        {badge ? (
          <Badge variant="outline" className="mb-3 border-accent/35 text-clay">
            {badge}
          </Badge>
        ) : null}
        <h3 className="font-heading text-2xl font-semibold leading-tight">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
        {href ? (
          <div className="mt-5 inline-flex size-9 items-center justify-center rounded-[8px] bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowRight className="size-4" />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );

  if (!href) {
    return <div className="group h-full">{content}</div>;
  }

  return (
    <Link href={href} className="group block h-full" aria-label={title}>
      {content}
    </Link>
  );
}
