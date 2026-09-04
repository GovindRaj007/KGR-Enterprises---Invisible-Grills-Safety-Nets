'use client';
import { useState, memo } from 'react';
import OptimizedImage from '@/components/shared/OptimizedImage';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Pointer } from 'lucide-react';
import { servicesData, serviceCategories } from '@/data/servicesData';

interface GallerySectionProps {
  showBreadcrumbs?: boolean;
}

const GallerySection = ({ showBreadcrumbs = false }: GallerySectionProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");

  // Generate gallery images from services data
  const generateGalleryImages = () => {
    const images: Array<{ src: string; category: string; alt: string }> = [];

    const getServiceAltText = (service: (typeof servicesData)[keyof typeof servicesData]) => {
      const title = service.title.toLowerCase();

      if (title.includes('invisible grill')) {
        return 'Invisible Grills installation for balcony and window safety in Bangalore, Hyderabad, Chennai and Andhra Pradesh';
      }

      if (title.includes('pigeon')) {
        return 'Pigeon nets installation for bird protection and balcony safety';
      }

      if (title.includes('balcony') || title.includes('safety net')) {
        return 'Balcony safety nets installation for child and pet protection';
      }

      if (title.includes('duct')) {
        return 'Duct area nets installation for construction and utility safety';
      }

      if (title.includes('cloth') || title.includes('hanger')) {
        return 'Ceiling cloth hanger installation for space-saving laundry drying';
      }

      if (title.includes('cricket')) {
        return 'Artificial cricket turf installation and cricket practice nets for sports safety';
      }

      return `${service.title} installation by KGR Enterprises for homes, apartments and commercial spaces`;
    };

    Object.values(servicesData).forEach((service) => {
      const categoryTitle = serviceCategories[service.category as keyof typeof serviceCategories]?.title || service.category;
      
      // Add main service image
      images.push({
        src: service.image,
        category: categoryTitle,
        alt: getServiceAltText(service)
      });

      // Add additional images
      if (service.images && service.images.length > 0) {
        service.images.forEach((img, idx) => {
          if (img !== service.image) {
            images.push({
              src: img,
              category: categoryTitle,
              alt: `${getServiceAltText(service)} - image ${idx + 1}`
            });
          }
        });
      }
    });

    // Remove duplicates
    const uniqueImages = images.filter((img, index, self) => 
      index === self.findIndex(t => t.src === img.src)
    );

    return uniqueImages;
  };

  const galleryImages = generateGalleryImages();
  const categories = [
    { key: "all", label: "All" },
    ...Object.values(serviceCategories).map((cat) => ({ key: cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), label: cat.title })),
  ];
  
  const IMAGES_PER_PAGE = 12;

  const isClothHangerImage = (image: { src: string; category: string; alt: string }) =>
    image.src.includes('/cloth-drying') || image.alt.toLowerCase().includes('cloth');

  // Filter images
  const filteredImages = activeCategory === "All"
    ? galleryImages
    : activeCategory === "Cloth Hangers"
    ? galleryImages.filter(isClothHangerImage)
    : galleryImages.filter(img => img.category === activeCategory);

  // Pagination
  const totalPages = Math.ceil(filteredImages.length / IMAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;
  const currentImages = filteredImages.slice(startIndex, endIndex);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="gallery" className="py-12 md:py-16 lg:py-24" style={{
      background: "linear-gradient(180deg, #121D2F 0%, #1E2A42 100%)"
    }}>
      <div className="container mx-auto px-4">
        {showBreadcrumbs && <Breadcrumbs items={[{ label: 'Gallery' }]} darkMode={true} />}
        {/* Header */}
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold" style={{ color: "#F0F6FF" }}>
            Our Work <span style={{ color: "#FF6B42" }}>Gallery</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto" style={{ color: "#C8D8EE" }}>
            Explore our portfolio of safety installations across residential and commercial projects
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
          {categories.map((category) => {
            const categoryCount = category.label === "All" 
              ? galleryImages.length 
              : category.label === "Cloth Hangers"
              ? galleryImages.filter(isClothHangerImage).length
              : galleryImages.filter(img => img.category === category.label).length;
            
            return (
              <button
                key={category.key}
                className="cursor-pointer transition-all hover:scale-105 text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-full font-semibold"
                onClick={() => handleCategoryChange(category.label)}
                style={{
                  backgroundColor: activeCategory === category.label ? "rgba(75, 159, 255, 0.2)" : "transparent",
                  color: activeCategory === category.label ? "#FF6B42" : "#C8D8EE",
                  border: activeCategory === category.label ? "1px solid rgba(75, 159, 255, 0.5)" : "1px solid rgba(36, 61, 99, 0.5)",
                  boxShadow: activeCategory === category.label ? "0 0 12px rgba(75, 159, 255, 0.2)" : "none"
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== category.label) {
                    e.currentTarget.style.backgroundColor = "rgba(75, 159, 255, 0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== category.label) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {category.label} ({categoryCount})
              </button>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto mb-6 px-4">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-transparent text-white/90 text-sm md:text-base font-semibold">
              <Pointer className="h-4 w-4 md:h-5 md:w-5 text-[#FF6B42] transform rotate-180" />
              Click to view full image
            </span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
          {currentImages.map((image, index) => (
            <div
              key={`${image.src}-${startIndex + index}`}
              className="group cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1"
              onClick={() => setSelectedImage(image.src)}
              style={{
                background: "linear-gradient(135deg, #1E2A42 0%, #121D2F 100%)",
                border: "1px solid rgba(75, 159, 255, 0.2)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(75, 159, 255, 0.2)";
                e.currentTarget.style.borderColor = "rgba(75, 159, 255, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.borderColor = "rgba(75, 159, 255, 0.2)";
              }}
            >
              <div className="relative overflow-hidden aspect-square">
                <OptimizedImage
                  src={image.src} 
                  alt={image.alt} 
                  loading="lazy"
                  className="object-cover group-hover:scale-110 transition-transform duration-500 w-full h-full absolute inset-0" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full" style={{
                  color: "#F0F6FF",
                  backgroundColor: "#034d5c",
                  border: "1px solid #034d5c"
                }}>
                  {isClothHangerImage(image) ? 'Cloth Hangers' : image.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-xs md:text-sm px-3 py-2 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              style={{
                backgroundColor: "transparent",
                color: "#FF6B42",
                border: "1px solid rgba(255, 107, 66, 0.5)"
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = "rgba(255, 107, 66, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            
            <div className="flex gap-1 md:gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className="w-8 h-8 md:w-10 md:h-10 p-0 text-xs md:text-sm rounded font-semibold transition-all"
                    style={{
                      backgroundColor: currentPage === page ? "#FF6B42" : "transparent",
                      color: currentPage === page ? "#ffffff" : "#FF6B42",
                      border: currentPage === page ? "1px solid #FF6B42" : "1px solid rgba(255, 107, 66, 0.5)"
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== page) {
                        e.currentTarget.style.backgroundColor = "rgba(75, 159, 255, 0.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== page) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-xs md:text-sm px-3 py-2 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              style={{
                backgroundColor: "transparent",
                color: "#FF6B42",
                border: "1px solid rgba(255, 107, 66, 0.5)"
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = "rgba(0, 212, 255, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>
        )}

        {/* Results Info */}
        <div className="text-center">
          <p className="text-xs md:text-sm" style={{ color: "#C8D8EE" }}>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredImages.length)} of {filteredImages.length} images
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>
        </div>

        {/* Image Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl p-0" style={{
            background: "linear-gradient(135deg, #1E2A42 0%, #121D2F 100%)",
            borderColor: "rgba(75, 159, 255, 0.3)",
            border: "1px solid rgba(75, 159, 255, 0.3)"
          }}>
            <DialogTitle className="sr-only">Gallery Image Preview</DialogTitle>
            {selectedImage && (
              <div className="relative w-full h-[70vh] md:h-[80vh]">
                <OptimizedImage
                  src={selectedImage} 
                  alt="Gallery Image Preview" 
                  loading="eager"
                  className="object-contain w-full h-full absolute inset-0" 
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default memo(GallerySection);