import * as React from "react";

export const Select = ({ value, onValueChange, children }: { value: string; onValueChange: (v: string) => void; children: React.ReactNode }) => (
  <div className="relative">
    <select
      className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      value={value}
      onChange={e => onValueChange(e.target.value)}
    >
      {children}
    </select>
  </div>
);

export const SelectTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={"select-trigger " + (className || "")}>{children}</div>
);

export const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <option value={value}>{children}</option>
);
