"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Award,
  Users,
  Clock,
  Shield,
  CheckCircle2,
  Star,
  ArrowRight,
  Phone,
  MapPin,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AboutSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const stats = [
    {
      icon: Users,
      value: "5000+",
      label: "Happy Customers",
      color: "text-primary",
    },
    {
      icon: Award,
      value: "15+",
      label: "Years Experience",
      color: "text-safety",
    },
    {
      icon: Shield,
      value: "99.9%",
      label: "Success Rate",
      color: "text-accent",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Support Available",
      color: "text-primary",
    },
  ];

  const features = [
    "Certified installation team with 15+ years experience",
    "High-quality materials sourced from trusted manufacturers",
    "Free site inspection and consultation services",
    "Emergency installation and repair services available",
    "Competitive pricing with transparent quotation system",
  ];

  const handleConsultationClick = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({ name: "", phone: "", location: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.location.trim()
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ""))) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const googleFormUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLSfYrj2qTfRl14-89qaxG92_dtfNq94Sq5eub7fXEC8qdUtqKg/formResponse";
      const formDataToSend = new FormData();
      formDataToSend.append("entry.190556517", formData.name);
      formDataToSend.append("entry.946066566", formData.phone);
      formDataToSend.append("entry.1733138119", formData.location);

      await fetch(googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        body: formDataToSend,
      });

      toast({
        title: "Form Submitted Successfully! ✅",
        description: "We will call you within 15 minutes.",
        className: "bg-green-50 border-green-200 text-green-800",
      });

      handleModalClose();
    } catch {
      toast({
        title: "Submission Failed",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="about" className=" bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-4 md:space-y-6 lg:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center space-x-2 text-safety">
                  <Shield className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-sm md:text-base font-semibold uppercase tracking-wide">
                    About KGR Enterprises
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
                  We Believe In
                  <span className="text-gradient block">Quality & Safety</span>
                </h2>

                <p className="text-base md:text-lg lg:text-lg text-muted-foreground">
                  KGR Enterprises is a trusted partner, delivering the best
                  quality services in invisible grills and safety nets across
                  Hyderabad, Bangalore, Chennai, and Andhra Pradesh. We
                  specialize in premium safety solutions for homes, apartments,
                  and commercial properties.
                </p>
              </div>

              <div className="space-y-2 md:space-y-3 ">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-accent flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button
                  size="lg"
                  className="gap-2 shadow-safety hover:scale-105 transition-all duration-300"
                  onClick={handleConsultationClick}
                >
                  Get Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 hover:shadow-medium transition-all duration-300"
                  onClick={() => {
                    document.getElementById("testimonials")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  <Star className="h-4 w-4" />
                  View Testimonials
                </Button>
              </div>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <Card
                      key={index}
                      className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-muted/30 border-border/50"
                    >
                      <CardContent className="p-4 md:p-6 text-center space-y-2 md:space-y-3">
                        <div
                          className={`w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full bg-gradient-to-br from-background to-muted flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}
                        >
                          <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">
                            {stat.value}
                          </div>
                          <div className="text-xs md:text-sm text-muted-foreground">
                            {stat.label}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Company Highlights */}
              <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold">
                      Why Choose Us?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 text-sm md:text-base">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span>ISI Certified Materials</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span>Expert Installation Team</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span>24/7 Customer Support</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span>Warranty-backed service</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Reviews Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm md:text-base">
                    Customer Reviews
                  </h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 md:h-4 md:w-4 fill-safety text-safety"
                      />
                    ))}
                    <span className="text-xs md:text-sm text-muted-foreground ml-2">
                      4.9/5
                    </span>
                  </div>
                </div>
                <blockquote className="text-xs md:text-sm text-muted-foreground italic border-l-4 border-primary/30 pl-3 md:pl-4">
                  &ldquo;Excellent service and quality installation. The team
                  was professional and completed the work on time. Highly
                  recommended for safety nets!&rdquo;
                </blockquote>
                <div className="text-xs text-muted-foreground">
                  - Rajesh Kumar, Hyderabad
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
        {/* Reduce transparency and add rounded corners on mobile */}
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-background to-muted/60 border-primary/20 rounded-lg sm:rounded-xl">
          <DialogHeader className="text-center pb-4">
            <DialogTitle className="text-xl md:text-2xl font-bold text-primary">
              Get Free Consultation
            </DialogTitle>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">
              Share your details for instant callback
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="pl-10 bg-background"
                disabled={isSubmitting}
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
              <Input
                placeholder="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="pl-10 bg-background"
                disabled={isSubmitting}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
              <Input
                placeholder="Your Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="pl-10 bg-background"
                disabled={isSubmitting}
              />
            </div>

            <Button
              type="submit"
              className="w-full gap-2 shadow-safety hover:scale-105 transition-all duration-300"
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Request
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              We&apos;ll call you within 15 minutes
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AboutSection;
