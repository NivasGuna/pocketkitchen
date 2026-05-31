import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type MenuItemCardProps = {
  name: string;
  description?: string;
  image: string;
  imageAlt: string;
  tag?: string;
  sizes?: string[];
  className?: string;
};

export function MenuItemCard({
  name,
  description,
  image,
  imageAlt,
  tag,
  sizes,
  className,
}: MenuItemCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[8px] border border-border/70 bg-card/92",
        "shadow-lg shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10",
        className
      )}
    >
      <div className="image-sheen relative aspect-[4/3] overflow-hidden bg-secondary/50">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {tag && (
          <Badge className="absolute left-3 top-3 border-white/20 bg-white/16 text-xs font-semibold text-white shadow-md backdrop-blur-md">
            {tag}
          </Badge>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold leading-tight text-foreground">
          {name}
        </h3>
        {description && (
          <p className="mt-1 text-sm leading-5 text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
        {sizes && sizes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {sizes.map((size) => (
              <span
                key={size}
                className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground"
              >
                {size}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
