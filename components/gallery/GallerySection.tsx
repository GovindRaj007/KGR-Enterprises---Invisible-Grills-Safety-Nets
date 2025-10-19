'use client';
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { servicesData, serviceCategories } from '@/data/servicesData';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");

  // Generate gallery images from services data
  const generateGalleryImages = () => {
    const images: Array<{ src: string; category: string; alt: string }> = [];

    Object.values(servicesData).forEach((service) => {
      const categoryTitle = serviceCategories[service.category as keyof typeof serviceCategories]?.title || service.category;
      
      // Add main service image
      images.push({
        src: service.image,
        category: categoryTitle,
        alt: `${service.title} installation`
      });

      // Add additional images
      if (service.images && service.images.length > 0) {
        service.images.forEach((img, idx) => {
          if (img !== service.image) {
            images.push({
              src: img,
              category: categoryTitle,
              alt: `${service.title} - Image ${idx + 1}`
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
  const categories = ["All", ...Object.values(serviceCategories).map(cat => cat.title)];
  
  const IMAGES_PER_PAGE = 12;

  // Filter images
  const filteredImages = activeCategory === "All" 
    ? galleryImages 
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
    <section id="gallery" className="py-12 md:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold">
            Our Work <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of safety installations across residential and commercial projects
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
          {categories.map((category) => {
            const categoryCount = category === "All" 
              ? galleryImages.length 
              : galleryImages.filter(img => img.category === category).length;
            
            return (
              <Badge
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105 text-xs px-2 py-1 md:px-3 md:py-1.5"
                onClick={() => handleCategoryChange(category)}
              >
                {category} ({categoryCount})
              </Badge>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
          {currentImages.map((image, index) => (
            <Card
              key={`${image.src}-${startIndex + index}`}
              className="group cursor-pointer overflow-hidden border-border/50 hover:shadow-strong transition-all duration-300 hover:-translate-y-1"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative overflow-hidden aspect-square">
                <img src={image.src} alt={image.alt} className="object-cover group-hover:scale-110 transition-transform duration-500 w-full h-full absolute inset-0" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <Badge className="absolute top-2 left-2 bg-primary/90 text-xs">
                  {image.category}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 md:gap-4 mb-6 md:mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-xs md:text-sm"
            >
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            
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
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="w-8 h-8 md:w-10 md:h-10 p-0 text-xs md:text-sm"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-xs md:text-sm"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Results Info */}
        <div className="text-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredImages.length)} of {filteredImages.length} images
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>
        </div>

        {/* Image Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl p-0">
            <DialogTitle className="sr-only">Gallery Image Preview</DialogTitle>
            {selectedImage && (
              <div className="relative w-full h-[70vh] md:h-[80vh]">
                <img src={selectedImage} alt="Gallery Image" className="object-contain w-full h-full absolute inset-0" />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;