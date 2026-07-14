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

const AccordionContext = React.createContext<{
  openItems: Set<string>;
  toggleItem: (value: string) => void;
} | null>(null);

const AccordionItemContext = React.createContext<string | null>(null);

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
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div ref={ref} className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  );
});
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  {
    value: string;
    className?: string;
    children: React.ReactNode;
  }
>(({ value, className, children }, ref) => {
  const accordion = React.useContext(AccordionContext);
  const isOpen = accordion?.openItems.has(value);

  return (
    <div
      ref={ref}
      className={cn("border-b", className)}
      data-state={isOpen ? "open" : "closed"}
    >
      <AccordionItemContext.Provider value={value}>{children}</AccordionItemContext.Provider>
    </div>
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  {
    className?: string;
    children: React.ReactNode;
    value?: string;
  }
>(({ className, children, value, ...props }, ref) => {
  const accordion = React.useContext(AccordionContext);
  const itemValue = value ?? React.useContext(AccordionItemContext);
  const isOpen = itemValue ? accordion?.openItems.has(itemValue) : false;

  return (
    <button
      ref={ref}
      onClick={() => itemValue && accordion?.toggleItem(itemValue)}
      aria-expanded={isOpen}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline",
        className
      )}
      {...props}
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
  }
>(({ className, children, value, ...props }, ref) => {
  const accordion = React.useContext(AccordionContext);
  const itemValue = value ?? React.useContext(AccordionItemContext);
  const isOpen = itemValue ? accordion?.openItems.has(itemValue) : false;

  return (
    <div
      ref={ref}
      aria-hidden={!isOpen}
      className={cn(
        "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        !isOpen && "hidden max-h-0 opacity-0 pointer-events-none",
        isOpen && "block max-h-[2000px] opacity-100 pointer-events-auto",
        className
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export type { AccordionItemProps };
