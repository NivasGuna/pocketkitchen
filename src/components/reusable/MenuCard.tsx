import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type MenuCardProps = {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  sizes?: string[];
  tag?: string;
};

export function MenuCard({
  name,
  description,
  image,
  imageAlt,
  sizes,
  tag,
}: MenuCardProps) {
  return (
    <Card className="group h-full overflow-hidden rounded-[8px] border-border/70 bg-card/95 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/8">
      <div className="relative aspect-[4/3] bg-secondary/55">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.025]"
        />
        {tag ? (
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
            {tag}
          </Badge>
        ) : null}
      </div>
      <CardContent className="p-5">
        <h3 className="font-heading text-2xl font-semibold leading-tight">{name}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
        {sizes?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {sizes.map((size) => (
              <span
                key={size}
                className="rounded-[8px] border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {size}
              </span>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
