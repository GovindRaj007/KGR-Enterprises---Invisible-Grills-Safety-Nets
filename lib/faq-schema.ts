import { baseUrl } from './organization-schema';

/**
 * FAQ Schema Generator for SEO
 * Generates structured FAQ data for Google Featured Snippets
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  } as const;
}

/**
 * Service-specific FAQs for all services
 * Used in service pages to improve SEO and UX
 */

export const serviceFAQs: { [key: string]: FAQItem[] } = {
  'invisible-grills': [
    {
      question: 'What are invisible grills?',
      answer: 'Invisible grills are transparent stainless steel mesh grilles installed on windows and balconies. They provide safety and security while maintaining unobstructed views.'
    },
    {
      question: 'How long do invisible grills last?',
      answer: 'KGR invisible grills are made from marine-grade stainless steel and come with a 10-year warranty. With proper maintenance, they can last 20-25 years.'
    },
    {
      question: 'Are invisible grills easy to clean?',
      answer: 'Yes, invisible grills are very easy to clean. Simply wipe with a damp cloth and mild detergent. The transparent mesh doesn\'t require special cleaning products.'
    },
    {
      question: 'Can invisible grills be installed on any window?',
      answer: 'Invisible grills can be installed on most window types including aluminum frames, wooden frames, and modern glass windows. We provide custom installations for all window sizes.'
    },
    {
      question: 'What is the cost of invisible grills?',
      answer: 'The cost of invisible grills typically ranges from ₹110 to ₹150 per square foot, depending on the window size, frame material, and customization requirements.'
    }
  ],
  'balcony-safety': [
    {
      question: 'Why do you need balcony safety nets?',
      answer: 'Balcony safety nets prevent accidental falls, especially important for children and pets. They provide protection without restricting views or ventilation.'
    },
    {
      question: 'What material are the safety nets made from?',
      answer: 'KGR safety nets are made from UV-resistant HDPE (High-Density Polyethylene) and marine-grade stainless steel. They are durable, weather-resistant, and safe.'
    },
    {
      question: 'Are balcony safety nets visible?',
      answer: 'Modern balcony safety nets are nearly invisible when installed correctly. They maintain the aesthetic appeal of your balcony while providing complete safety.'
    },
    {
      question: 'How often do safety nets need replacement?',
      answer: 'With proper maintenance, balcony safety nets can last 8-10 years. Annual inspection is recommended to ensure optimal condition.'
    },
    {
      question: 'What is the installation time?',
      answer: 'Installation typically takes 1-2 days depending on balcony size. We ensure minimal disruption and complete cleanup after installation.'
    }
  ],
  'pigeon-nets': [
    {
      question: 'How do pigeon nets work?',
      answer: 'Pigeon nets are installed over open areas like terraces and AC vents, creating a barrier that prevents birds from entering while allowing air circulation.'
    },
    {
      question: 'Are pigeon nets harmful to birds?',
      answer: 'No, pigeon nets are humane and don\'t harm birds. They simply prevent birds from entering enclosed spaces. No bird is trapped or injured.'
    },
    {
      question: 'Do pigeon nets require maintenance?',
      answer: 'Minimal maintenance is required. Occasional inspection and cleaning ensure longevity. KGR nets are designed to withstand weather and UV rays.'
    },
    {
      question: 'Can pigeon nets be installed on open terraces?',
      answer: 'Yes, pigeon nets are ideal for open terraces, balconies, and AC vents. Custom installation available for all terrace shapes and sizes.'
    },
    {
      question: 'What is the effectiveness rate?',
      answer: 'KGR pigeon nets have >95% effectiveness in preventing bird entry. Installation quality and proper maintenance ensure maximum efficiency.'
    }
  ],
  'children-protection': [
    {
      question: 'What makes a net safe for children?',
      answer: 'Safety nets for children are specially designed with strong mesh that can support weight, installed with reinforced frames, and tested for durability.'
    },
    {
      question: 'Are the materials child-safe?',
      answer: 'Yes, all materials used are non-toxic, UV-resistant, and tested for child safety. We use only certified materials that meet safety standards.'
    },
    {
      question: 'Can children climb on the nets?',
      answer: 'KGR safety nets are designed to support significant weight and handle active use. However, they should still be supervised during play.'
    },
    {
      question: 'How is the net installed to prevent accidents?',
      answer: 'Nets are securely anchored to window/balcony frames with stainless steel fittings. Professional installation ensures zero gaps or loose areas.'
    },
    {
      question: 'Is regular inspection needed?',
      answer: 'Annual inspection is recommended. We provide maintenance services to ensure continued safety and durability of the nets.'
    }
  ],
  'bird-nets': [
    {
      question: 'What types of birds do pigeon nets prevent?',
      answer: 'Our pigeon nets effectively prevent pigeons, crows, sparrows, and other common birds from entering your space.'
    },
    {
      question: 'Are pigeon nets environmentally friendly?',
      answer: 'Yes, pigeon nets are humane and eco-friendly. They don\'t harm birds or the environment. No chemicals or pesticides are used.'
    },
    {
      question: 'How long do pigeon nets last?',
      answer: 'High-quality pigeon nets last 8-10 years with minimal maintenance. UV-resistant materials ensure longevity in harsh weather conditions.'
    },
    {
      question: 'Can pigeon nets affect ventilation?',
      answer: 'No, pigeon nets have open mesh design that allows proper air circulation while preventing bird entry.'
    },
    {
      question: 'What areas can be protected with pigeon nets?',
      answer: 'Pigeon nets can be installed on terraces, balconies, AC vents, garden areas, warehouses, and any open area where bird control is needed.'
    }
  ]
};

/**
 * Generate location-specific FAQs
 */
export function generateLocationFAQs(location: string): FAQItem[] {
  return [
    {
      question: `Why choose KGR for invisible grills and safety nets in ${location}?`,
      answer: `KGR Enterprises has been serving ${location} for over 15 years with premium invisible grills and safety nets. We offer professional installation, backed by warranty, and expert support.`
    },
    {
      question: `What services does KGR provide in ${location}?`,
      answer: `In ${location}, we provide comprehensive services including invisible grills, balcony safety nets, pigeon nets, and custom safety installations.`
    },
    {
      question: `How do I get a quote for installation in ${location}?`,
      answer: `Contact us with details of your installation area. We provide free site inspection and customized quotes within 24 hours in ${location}.`
    },
    {
      question: `What is the installation timeline in ${location}?`,
      answer: `Installation typically takes 1-2 days depending on the scope. We schedule installations at your convenience with minimal disruption.`
    },
    {
      question: `Do you provide after-sales service in ${location}?`,
      answer: `Yes, we provide comprehensive after-sales support including maintenance, repairs, and warranty service in ${location} and surrounding areas.`
    }
  ];
}

/**
 * Generate breadcrumb schema for navigation
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${baseUrl}${item.url}`
    }))
  };
}
