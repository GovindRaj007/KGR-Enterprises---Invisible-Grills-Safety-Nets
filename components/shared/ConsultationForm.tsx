'use client';
import { useState } from 'react';
import { useFocusOrScrollEffect } from '@/hooks/useFocusOrScrollEffect';
import { ArrowRight, User, Phone, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ConsultationFormProps {
  onSubmit?: () => void;
  className?: string;
}

const ConsultationForm = ({ onSubmit, className }: ConsultationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: ''
  });
  // Check if all required fields are filled
  const isFormComplete = formData.name.trim() && formData.phone.trim() && formData.location.trim();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.phone.trim() || !formData.location.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to proceed.",
        variant: "destructive",
      });
      return;
    }

    // Validate name (at least 5 letters)
    const nameLetters = formData.name.replace(/[^a-zA-Z]/g, "");
    if (nameLetters.length < 5) {
      toast({
        title: "No Proper Name",
        description: "Enter valid full name",
        variant: "destructive",
      });
      return;
    }

    // Validate location (at least 6 letters)
    const locationLetters = formData.location.replace(/[^a-zA-Z]/g, "");
    if (locationLetters.length < 6) {
      toast({
        title: "No Proper Location",
        description: "Enter valid location.",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
  // Google Form POST endpoint (integrated with your actual form ID)
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfYrj2qTfRl14-89qaxG92_dtfNq94Sq5eub7fXEC8qdUtqKg/formResponse";
      const formDataToSend = new FormData();
      formDataToSend.append("entry.190556517", formData.name);
      formDataToSend.append("entry.946066566", formData.phone);
      formDataToSend.append("entry.1733138119", formData.location);

      await fetch(googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        body: formDataToSend,
      });

      // Show success toast
      toast({
        title: "Form Submitted Successfully! ✅",
        description: "We will call you within 15 minutes for your free consultation.",
        className: "bg-green-50 border-green-200 text-green-800",
      });

      // Reset form
      setFormData({
        name: '',
        phone: '',
        location: ''
      });

      // Call onSubmit callback if provided
      if (onSubmit) {
        onSubmit();
      }
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

  const [cardRef, isActive] = useFocusOrScrollEffect({ threshold: 0.3 });
  return (
    <div
      ref={cardRef as React.Ref<HTMLDivElement>}
      className={`backdrop-blur-sm transition-all duration-700 relative rounded-lg p-6 ${className}`}
      style={{
        background: "linear-gradient(135deg, #1E2A42 0%, #121D2F 100%)",
        border: `1px solid ${isActive ? 'rgba(75, 159, 255, 0.6)' : 'rgba(30, 42, 66, 0.5)'}`,
        boxShadow: isActive ? '0 0 32px 8px rgba(75, 159, 255, 0.2), 0 4px 32px 0 rgba(75, 159, 255, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
        transitionProperty: 'box-shadow, border',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      <div className="text-center pb-4">
        <h3 className="text-lg font-semibold" style={{ color: "#FF6B42" }}>
          Get Free Consultation
        </h3>
        <p className="text-sm" style={{ color: "#C8D8EE" }}>
          Share your details for instant callback
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10 pointer-events-none" style={{ color: "#C8D8EE" }} />
            <input 
              placeholder="Your Name" 
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="pl-10 w-full py-2 rounded-lg border px-3 transition-colors duration-200"
              style={{
                background: "rgba(30, 42, 66, 0.5)",
                borderColor: "rgba(75, 159, 255, 0.3)",
                color: "#F0F6FF"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(75, 159, 255, 0.6)";
                e.currentTarget.style.boxShadow = "0 0 12px rgba(75, 159, 255, 0.2)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(75, 159, 255, 0.3)";
                e.currentTarget.style.boxShadow = "none";
              }}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10 pointer-events-none" style={{ color: "#C8D8EE" }} />
            <input
              placeholder="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="pl-10 w-full py-2 rounded-lg border px-3 transition-colors duration-200"
              style={{
                background: "rgba(30, 42, 66, 0.5)",
                borderColor: "rgba(75, 159, 255, 0.3)",
                color: "#F0F6FF"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(75, 159, 255, 0.6)";
                e.currentTarget.style.boxShadow = "0 0 12px rgba(75, 159, 255, 0.2)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(75, 159, 255, 0.3)";
                e.currentTarget.style.boxShadow = "none";
              }}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10 pointer-events-none" style={{ color: "#C8D8EE" }} />
            <input
              placeholder="Your Location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="pl-10 w-full py-2 rounded-lg border px-3 transition-colors duration-200"
              style={{
                background: "rgba(30, 42, 66, 0.5)",
                borderColor: "rgba(75, 159, 255, 0.3)",
                color: "#F0F6FF"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(75, 159, 255, 0.6)";
                e.currentTarget.style.boxShadow = "0 0 12px rgba(75, 159, 255, 0.2)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(75, 159, 255, 0.3)";
                e.currentTarget.style.boxShadow = "none";
              }}
              disabled={isSubmitting}
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !isFormComplete}
            className="w-full gap-2 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2" style={{ borderBottomColor: "#ffffff" }}></div>
                Submitting...
              </>
            ) : (
              <>
                Submit Request
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
          
          <p className="text-xs text-center" style={{ color: "#8FAAC8" }}>
            We will call you within 15 minutes
          </p>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm;
