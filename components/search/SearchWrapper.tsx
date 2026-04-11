"use client";

import React, { useState } from "react";
import MobileSearchDrawer from "./MobileSearchDrawer";
import DesktopSearchPanel from "./DesktopSearchPanel";

interface SearchWrapperProps {}

const SearchWrapper: React.FC<SearchWrapperProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = () => {
    setIsOpen(true);
    // Prevent body scroll when search is open
    document.body.style.overflow = "hidden";
  };

  const closeSearch = () => {
    setIsOpen(false);
    // Re-enable body scroll
    document.body.style.overflow = "auto";
  };

  // Listen for keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
      // ESC to close search
      if (e.key === "Escape") {
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <>
      {/* Mobile Search Drawer */}
      <MobileSearchDrawer isOpen={isOpen} onClose={closeSearch} />

      {/* Desktop Search Panel */}
      <DesktopSearchPanel isOpen={isOpen} onClose={closeSearch} />

      {/* Expose open function to parent */}
      <div
        data-search-trigger-open={isOpen}
        onClick={(e) => {
          if ((e.target as HTMLElement).getAttribute("data-search-open") === "true") {
            openSearch();
          }
        }}
      />
    </>
  );
};

export default SearchWrapper;

// Export a hook to open search from anywhere
export const useSearch = () => {
  return {
    open: () => {
      const event = new CustomEvent("search:open");
      window.dispatchEvent(event);
    },
  };
};
