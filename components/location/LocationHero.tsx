// using native <img> instead of next/image

// Server component: renders the hero (title + description) so the main business
// heading is present in server HTML for SEO and crawler indexing.
type Props = {
  location: string;
};

export default function LocationHero({ location }: Props) {
  return (
    <section className="relative overflow-hidden mb-6">
      <img src="/images/hero-image.jpg" alt={`Invisible Grills in ${location}`} className="object-cover w-full h-full absolute inset-0" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative container mx-auto px-4 py-20 md:py-28 lg:py-36 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
          Invisible Grills and Safety Nets in {location}
        </h1>
        <p className="mt-4 text-base md:text-lg text-white/90 max-w-3xl mx-auto">
          Trusted invisible grills and safety nets installation throughout {location}. Complimentary site inspection and reliable, quality workmanship guaranteed.
        </p>
      </div>
    </section>
  );
}
