"use client";

export function CarouselSkeleton() {
  return (
    <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] bg-muted animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3/4 h-48 bg-muted-foreground/10 rounded" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] bg-gradient-to-b from-muted via-muted/80 to-muted/60 animate-pulse">
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 px-4">
        <div className="h-12 w-3/4 bg-muted-foreground/10 rounded" />
        <div className="h-6 w-1/2 bg-muted-foreground/10 rounded" />
        <div className="h-10 w-40 bg-muted-foreground/10 rounded" />
      </div>
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square bg-muted rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function AboutSkeleton() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4">
      <div className="h-8 bg-muted rounded w-1/3 mb-4 animate-pulse" />
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-full animate-pulse" />
        <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
        <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
      </div>
    </div>
  );
}

export function ServiceListSkeleton() {
  return (
    <div className="py-12">
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function CTASkeleton() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl text-center space-y-4">
        <div className="h-8 w-3/4 mx-auto bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-5/6 mx-auto bg-muted rounded animate-pulse" />
        <div className="flex gap-4 justify-center pt-4">
          <div className="h-10 w-32 bg-muted rounded animate-pulse" />
          <div className="h-10 w-32 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ServiceCardsSkeleton() {
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSkeleton() {
  return (
    <div className="py-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="p-4 bg-muted rounded animate-pulse h-36" />
        ))}
      </div>
    </div>
  );
}

export function FooterSkeleton() {
  return (
    <div className="bg-[hsl(220_39%_11%)] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
              <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
              <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PageSectionSkeleton() {
  return (
    <div className="py-12 md:py-16 space-y-6">
      <div className="h-6 w-1/3 bg-muted rounded animate-pulse" />
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-full animate-pulse" />
        <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
      </div>
    </div>
  );
}
