import React from 'react';

type Props = {
  location: string;
};

export default function LocationHero({ location }: Props) {
  return (
    <section className="bg-gradient-to-b from-background/50 to-muted/10 py-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Invisible Grills and Safety Nets in {location}
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground">
          Trusted invisible grills and safety nets installation throughout {location}. Complimentary site inspection and reliable, quality workmanship guaranteed.
        </p>
      </div>
    </section>
  );
}
