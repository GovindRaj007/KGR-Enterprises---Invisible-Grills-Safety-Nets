'use client';
import { useState } from 'react';
import { useFocusOrScrollEffect } from '@/hooks/useFocusOrScrollEffect';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card
      ref={cardRef as React.Ref<HTMLDivElement>}
      className={`bg-background/95 backdrop-blur-sm border-2 border-primary/80 transition-all duration-700 relative
        ${isActive ? 'ring-4 ring-primary/40 shadow-[0_0_32px_8px_rgba(59,130,246,0.25),0_4px_32px_0_rgba(59,130,246,0.10)] border-primary animate-[pulse-glow_1.5s_ease-in-out]' : 'ring-0 shadow border-border/80'}
        ${className}`}
      style={{ transitionProperty: 'box-shadow, border, ring', transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg font-semibold text-primary">
          Get Free Consultation
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Share your details for instant callback
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
            <Input 
              placeholder="Your Name" 
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="pl-10 bg-background transition-colors duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
            <Input 
              placeholder="Phone Number" 
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="pl-10 bg-background transition-colors duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
            <Input 
              placeholder="Your Location" 
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="pl-10 bg-background transition-colors duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              disabled={isSubmitting}
            />
          </div>
          
          <Button 
            type="submit"
            className="w-full gap-2 shadow-safety hover:scale-105 transition-all duration-300"
            disabled={isSubmitting || !isFormComplete}
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
            We will call you within 15 minutes
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConsultationForm;
