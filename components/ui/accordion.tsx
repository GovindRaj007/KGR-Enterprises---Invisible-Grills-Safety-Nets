"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// AccordionItemProps is used for type definition in accordion items
type AccordionItemProps = {
  value: string;
  triggerContent: React.ReactNode;
  content: React.ReactNode;
  className?: string;
};

const Accordion = React.forwardRef<
  HTMLDivElement,
  {
    type?: "single" | "multiple";
    collapsible?: boolean;
    children: React.ReactNode;
    className?: string;
  }
>(({ type = "single", children, className }, ref) => {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  const toggleItem = (value: string) => {
    const newOpen = new Set(openItems);
    if (type === "single") {
      setOpenItems(newOpen.has(value) ? new Set() : new Set([value]));
    } else {
      if (newOpen.has(value)) {
        newOpen.delete(value);
      } else {
        newOpen.add(value);
      }
      setOpenItems(newOpen);
    }
  };

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<any>, { openItems, toggleItem });
      })}
    </div>
  );
});
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  {
    value: string;
    className?: string;
    children: React.ReactNode;
    openItems?: Set<string>;
    toggleItem?: (value: string) => void;
  }
>(({ value, className, children, openItems, toggleItem }, ref) => (
  <div ref={ref} className={cn("border-b", className)}>
    {React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      return React.cloneElement(child as React.ReactElement<any>, { value, openItems, toggleItem });
    })}
  </div>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  {
    className?: string;
    children: React.ReactNode;
    value?: string;
    openItems?: Set<string>;
    toggleItem?: (value: string) => void;
  }
>(({ className, children, value, openItems, toggleItem }, ref) => {
  const isOpen = value ? openItems?.has(value) : false;
  
  return (
    <button
      ref={ref}
      onClick={() => value && toggleItem?.(value)}
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline",
        className
      )}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  {
    className?: string;
    children: React.ReactNode;
    value?: string;
    openItems?: Set<string>;
  }
>(({ className, children, value, openItems }, ref) => {
  const isOpen = value ? openItems?.has(value) : false;
  
  return (
    <div
      ref={ref}
      className={cn("overflow-hidden transition-all", !isOpen && "max-h-0", className)}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export type { AccordionItemProps };
