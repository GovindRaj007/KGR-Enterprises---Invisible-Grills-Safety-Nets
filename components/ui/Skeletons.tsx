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
