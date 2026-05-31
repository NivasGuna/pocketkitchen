import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="h-full rounded-[8px] border-border/70 bg-card/92 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/8">
      <CardContent className="p-6">
        <div className="mb-5 flex size-12 items-center justify-center rounded-[8px] bg-accent/20 text-primary">
          {icon}
        </div>
        <h3 className="font-heading text-2xl font-semibold leading-tight">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
