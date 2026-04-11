"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { SEARCH_DATA, FUSE_OPTIONS, type SearchDataItem } from "@/lib/searchData";

interface FuseResult {
  item: SearchDataItem;
  score?: number;
}

interface MobileSearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  "invisible grills",
  "balcony nets",
  "pigeon control",
  "bird protection",
  "cricket nets",
  "sports nets",
  "safety nets",
  "industrial nets",
];

const MobileSearchDrawer: React.FC<MobileSearchDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchDataItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fuseInstanceRef = useRef<any>(null);
  // Prevents drawer from rendering or being visible before first intentional open
  const hasOpenedRef = useRef(false);

  // Mark as opened once — stays true for the session
  useEffect(() => {
    if (isOpen) hasOpenedRef.current = true;
  }, [isOpen]);

  // Initialize Fuse.js once on mount
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).Fuse) {
      fuseInstanceRef.current = new (window as any).Fuse(SEARCH_DATA, FUSE_OPTIONS);
    }
  }, []);

  // Focus input when drawer opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Typing placeholder animation — only runs when drawer is open and no query
  useEffect(() => {
    if (!isOpen) {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      return;
    }

    if (query) {
      setDisplayedPlaceholder("");
      setIsTyping(false);
      return;
    }

    if (!isTyping) {
      setIsTyping(true);
      return;
    }

    const currentCategory = CATEGORIES[currentCategoryIndex];
    const targetLength = currentCategory.length;

    if (displayedPlaceholder.length < targetLength) {
      typingTimeoutRef.current = setTimeout(() => {
        setDisplayedPlaceholder(
          currentCategory.substring(0, displayedPlaceholder.length + 1)
        );
      }, 50);
    } else {
      typingTimeoutRef.current = setTimeout(() => {
        setDisplayedPlaceholder("");
        setCurrentCategoryIndex((prev) => (prev + 1) % CATEGORIES.length);
      }, 1500);
    }

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [displayedPlaceholder, query, currentCategoryIndex, isOpen, isTyping]);

  // Search function
  const runSearch = useCallback((searchQuery: string) => {
    if (!fuseInstanceRef.current) return;

    if (searchQuery.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const searchResults = fuseInstanceRef.current.search(searchQuery).slice(0, 6);
    setResults(searchResults.map((r: FuseResult) => r.item));
    setShowResults(true);
  }, []);

  // Debounced input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setQuery(value);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => runSearch(value), 200);
  };

  // Keyboard handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") handleClose();
  };

  // Reset state and close
  const handleClose = () => {
    setQuery("");
    setShowResults(false);
    setResults([]);
    onClose();
  };

  return (
    <div className="md:hidden">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        role="button"
        aria-label="Close search"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 999,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "#ffffff",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.1)",
          height: "90vh",
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          touchAction: "pan-y",
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          visibility: isOpen || hasOpenedRef.current ? "visible" : "hidden",
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Only mount contents after first intentional open */}
        {(isOpen || hasOpenedRef.current) && (
          <>
            {/* Drag Handle */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "8px 0",
                backgroundColor: "#ffffff",
                position: "sticky",
                top: 0,
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "4px",
                  backgroundColor: "#d1d5db",
                  borderRadius: "2px",
                }}
              />
            </div>

            {/* Header */}
            <div style={{ padding: "16px", borderBottom: "1px solid #e5e7eb" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827" }}>
                Search
              </h2>
            </div>

            {/* Input */}
            <div style={{ padding: "16px", borderBottom: "1px solid #e5e7eb" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#f3f4f6",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <Search className="w-5 h-5" style={{ color: "#9ca3af" }} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={displayedPlaceholder || "Search services..."}
                  autoComplete="off"
                  aria-label="Search services"
                  style={{
                    flex: 1,
                    backgroundColor: "transparent",
                    outline: "none",
                    fontSize: "14px",
                    color: "#111827",
                    border: "none",
                  }}
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setShowResults(false);
                      setResults([]);
                    }}
                    aria-label="Clear search"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#9ca3af",
                      padding: "4px",
                    }}
                  >
                    <ChevronRight
                      className="w-5 h-5"
                      style={{ transform: "rotate(90deg)" }}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              {showResults ? (
                results.length === 0 ? (
                  <div style={{ textAlign: "center", color: "#6b7280", paddingTop: "32px" }}>
                    <p>No services found.</p>
                    <p style={{ fontSize: "14px" }}>Try "balcony nets" or "pigeon".</p>
                  </div>
                ) : (
                  <div
                    role="listbox"
                    aria-live="polite"
                    style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                  >
                    {results.map((item) => (
                      <Link
                        key={item.id}
                        href={item.url}
                        onClick={handleClose}
                        role="option"
                        style={{
                          display: "block",
                          padding: "12px",
                          backgroundColor: "#f9fafb",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                          textDecoration: "none",
                          transition: "background-color 200ms",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f3f4f6")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f9fafb")
                        }
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <span style={{ fontSize: "12px", fontWeight: "600", color: "#ea580c" }}>
                            {item.category}
                          </span>
                          <span style={{ fontSize: "14px", fontWeight: "500", color: "#111827" }}>
                            {item.name}
                          </span>
                          <span
                            style={{
                              fontSize: "12px",
                              color: "#6b7280",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.description.slice(0, 80)}...
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )
              ) : (
                <div style={{ textAlign: "center", color: "#6b7280", paddingTop: "32px" }}>
                  <p style={{ fontSize: "14px" }}>Start typing to search our services</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileSearchDrawer;