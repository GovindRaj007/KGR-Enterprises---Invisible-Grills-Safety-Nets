"use client";

// Static imports so the services listing and the location slider are present in
// the server-rendered HTML. Both components are already imported directly by
// the homepage and render fine there; their only browser API use is inside
// effects and event handlers, so server rendering is safe.
import ServicesSection from './ServicesSection';
import ServiceLocationsSlider from './ServiceLocationsSlider';

interface ServicesSectionClientProps {
  showBreadcrumbs?: boolean;
}

export function ServicesSectionClient({ showBreadcrumbs = false }: ServicesSectionClientProps) {
  return <ServicesSection showBreadcrumbs={showBreadcrumbs} />;
}

export function ServiceLocationsSliderClient() {
  return <ServiceLocationsSlider />;
}
