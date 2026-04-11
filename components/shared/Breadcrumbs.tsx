'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  darkMode?: boolean;
}

export function Breadcrumbs({ items, darkMode = true }: BreadcrumbsProps) {
  // Filter out any "Home" items from the input to avoid duplication
  const filteredItems = items.filter(
    (item) => item.label.toLowerCase() !== 'home'
  );
  const allItems = [{ label: 'Home', href: '/' }, ...filteredItems];

  // Generate Schema.org BreadcrumbList
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://invisiblegrillsandsafetynets.in${item.href}` : undefined,
    })),
  };

  const textColor = darkMode ? 'text-white/70' : 'text-muted-foreground';
  const activeColor = darkMode ? 'text-white' : 'text-foreground';
  const hoverColor = darkMode ? 'hover:text-white' : 'hover:text-primary';
  const iconColor = darkMode ? 'text-white/50' : 'text-muted-foreground';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex flex-wrap items-center gap-2 text-xs md:text-sm lg:text-base xl:text-lg">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center whitespace-nowrap">
              {index > 0 && (
                <ChevronRight className={`mx-2 h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 flex-shrink-0 ${iconColor}`} />
              )}
              {index === 0 && (
                <Home className={`mr-2 h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 flex-shrink-0 ${textColor}`} />
              )}
              {item.href && index !== allItems.length - 1 ? (
                <Link
                  href={item.href}
                  className={`${textColor} transition-colors ${hoverColor}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`font-medium ${activeColor}`}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
