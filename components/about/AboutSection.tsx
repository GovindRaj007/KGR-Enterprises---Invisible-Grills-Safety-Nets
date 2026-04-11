"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    const prevDigits = formData.phone.replace(/\D/g, "");
    const newDigits = newVal.replace(/\D/g, "");
    setFormData({ ...formData, phone: newVal });

    // When phone just reached 10 digits and matches the expected pattern, move focus
    if (prevDigits.length < 10 && newDigits.length === 10) {
      const phoneValid = /^[6-9]\d{9}$/.test(newDigits);
      if (phoneValid) {
        // small timeout helps on mobile to ensure keyboard/input state settles
        setTimeout(() => {
          if (locationRef.current) {
            locationRef.current.focus();
          } else {
            const el = document.getElementById("consult-location") as HTMLInputElement | null;
            el?.focus();
          }
        }, 50);
      }
    }
  };

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

    const nameLetters = formData.name.replace(/[^a-zA-Z]/g, "");
    if (nameLetters.length < 5) {
      toast({
        title: "No Proper Name",
        description: "Enter valid full name",
        variant: "destructive",
      });
      return;
    }

    const locationLetters = formData.location.replace(/[^a-zA-Z]/g, "");
    if (locationLetters.length < 6) {
      toast({
        title: "No Proper Location",
        description: "Enter valid location.",
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
      <section id="about" className="py-12 md:py-16 lg:py-24" style={{
        background: "linear-gradient(180deg, #0F1729 0%, #0F1729 100%)"
      }}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-4 md:space-y-6 lg:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center space-x-2" style={{ color: "#FF6B42" }}>
                  <Shield className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-sm md:text-base font-semibold uppercase tracking-wide">
                    About KGR Enterprises
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight" style={{ color: "#F0F6FF" }}>
                  We Believe In
                  <span className="block" style={{ color: "#FF6B42" }}>Quality & Safety</span>
                </h2>

                <p className="text-base md:text-lg lg:text-lg" style={{ color: "#C8D8EE" }}>
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
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: "#FF6B42" }} />
                    <span className="text-sm md:text-base lg:text-base" style={{ color: "#C8D8EE" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 gap-2 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #FF6B42 0%, #F25024 100%)",
                    color: "#ffffff",
                    boxShadow: "0 4px 12px rgba(255, 107, 66, 0.2)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 107, 66, 0.4)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 66, 0.2)";
                    e.currentTarget.style.transform = "none";
                  }}
                  onClick={handleConsultationClick}
                >
                  Get Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 border gap-2 flex items-center justify-center"
                  style={{
                    backgroundColor: "transparent",
                    color: "#FF6B42",
                    border: "1px solid rgba(255, 107, 66, 0.5)",
                    boxShadow: "0 0 0 transparent"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(75, 159, 255, 0.1)";
                    e.currentTarget.style.boxShadow = "0 0 12px rgba(75, 159, 255, 0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.boxShadow = "0 0 0 transparent";
                    e.currentTarget.style.transform = "none";
                  }}
                  onClick={() => {
                    document.getElementById("testimonials")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  <Star className="h-4 w-4" />
                  View Testimonials
                </button>
              </div>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={index}
                      className="group rounded-lg p-4 md:p-6 text-center space-y-2 md:space-y-3 transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: "linear-gradient(135deg, rgba(75, 159, 255, 0.1) 0%, rgba(75, 159, 255, 0.05) 100%)",
                        border: "1px solid rgba(75, 159, 255, 0.3)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
                      }}
                    >
                      <div
                        className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{
                          background: "linear-gradient(135deg, rgba(255, 107, 66, 0.2), rgba(255, 107, 66, 0.1))"
                        }}
                      >
                        <IconComponent className="h-5 w-5 md:h-6 md:w-6" style={{ color: stat.color === "text-primary" ? "#FF6B42" : stat.color === "text-safety" ? "#FF6B42" : "#2E7FD9" }} />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: "#F0F6FF" }}>
                          {stat.value}
                        </div>
                        <div className="text-xs md:text-sm" style={{ color: "#C8D8EE" }}>
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Company Highlights */}
              <div className="rounded-lg border p-4 md:p-6" style={{
                background: "linear-gradient(135deg, rgba(75, 159, 255, 0.08) 0%, rgba(46, 127, 217, 0.05) 100%)",
                borderColor: "rgba(75, 159, 255, 0.3)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
              }}>
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold" style={{ color: "#F0F6FF" }}>
                    Why Choose Us?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 text-sm md:text-base">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF6B42" }}></div>
                      <span style={{ color: "#C8D8EE" }}>ISI Certified Materials</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF6B42" }}></div>
                      <span style={{ color: "#C8D8EE" }}>Expert Installation Team</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF6B42" }}></div>
                      <span style={{ color: "#C8D8EE" }}>24/7 Customer Support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF6B42" }}></div>
                      <span style={{ color: "#C8D8EE" }}>Warranty-backed service</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Reviews Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm md:text-base" style={{ color: "#F0F6FF" }}>
                    Customer Reviews
                  </h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 md:h-4 md:w-4 fill-current"
                        style={{ color: "#FF6B42" }}
                      />
                    ))}
                    <span className="text-xs md:text-sm ml-2" style={{ color: "#C8D8EE" }}>
                      4.9/5
                    </span>
                  </div>
                </div>
                <blockquote className="text-xs md:text-sm italic pl-3 md:pl-4" style={{
                  color: "#C8D8EE",
                  borderLeft: "4px solid rgba(75, 159, 255, 0.3)"
                }}>
                  &ldquo;Excellent service and quality installation. The team
                  was professional and completed the work on time. Highly
                  recommended for safety nets!&rdquo;
                </blockquote>
                <div className="text-xs" style={{ color: "#8FAAC8" }}>
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
        <DialogContent className="sm:max-w-md rounded-lg sm:rounded-xl" style={{
          background: "linear-gradient(135deg, #1E2A42 0%, #121D2F 100%)",
          borderColor: "rgba(75, 159, 255, 0.3)",
          border: "1px solid rgba(75, 159, 255, 0.3)"
        }}>
          <DialogHeader className="text-center pb-4">
            <DialogTitle className="text-xl md:text-2xl font-bold" style={{ color: "#FF6B42" }}>
              Get Free Consultation
            </DialogTitle>
            <p className="text-xs md:text-sm mt-2" style={{ color: "#C8D8EE" }}>
              Share your details for instant callback
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10 pointer-events-none" style={{ color: "#C8D8EE" }} />
              <input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={isSubmitting}
                className="pl-10 w-full py-2 rounded-lg border px-3"
                style={{
                  background: "rgba(30, 42, 66, 0.5)",
                  borderColor: "rgba(75, 159, 255, 0.3)",
                  color: "#F0F6FF"
                }}
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10 pointer-events-none" style={{ color: "#C8D8EE" }} />
              <input
                placeholder="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                ref={phoneRef}
                className="pl-10 w-full py-2 rounded-lg border px-3"
                disabled={isSubmitting}
                style={{
                  background: "rgba(30, 42, 66, 0.5)",
                  borderColor: "rgba(75, 159, 255, 0.3)",
                  color: "#F0F6FF"
                }}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10 pointer-events-none" style={{ color: "#C8D8EE" }} />
              <input
                id="consult-location"
                placeholder="Your Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="pl-10 w-full py-2 rounded-lg border px-3"
                disabled={isSubmitting}
                ref={locationRef}
                style={{
                  background: "rgba(30, 42, 66, 0.5)",
                  borderColor: "rgba(75, 159, 255, 0.3)",
                  color: "#F0F6FF"
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full gap-2 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #FF6B42 0%, #F25024 100%)",
                color: "#ffffff",
                boxShadow: "0 4px 12px rgba(255, 107, 66, 0.2)"
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 107, 66, 0.4)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 107, 66, 0.2)";
                e.currentTarget.style.transform = "none";
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-current" style={{ color: "#ffffff" }}></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Request</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-xs text-center" style={{ color: "#C8D8EE" }}>
              We&apos;ll call you within 15 minutes
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AboutSection;
