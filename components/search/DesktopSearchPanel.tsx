"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { SEARCH_DATA, FUSE_OPTIONS, type SearchDataItem } from "@/lib/searchData";

interface FuseResult {
  item: SearchDataItem;
  score?: number;
}

interface DesktopSearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const DesktopSearchPanel: React.FC<DesktopSearchPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchDataItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const categories = [
    "invisible grills",
    "balcony nets",
    "pigeon control",
    "bird protection",
    "cricket nets",
    "sports nets",
    "safety nets",
    "industrial nets",
  ];
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // Focus management
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Animated typing placeholder effect
  useEffect(() => {
    if (!query && isOpen) {
      const currentCategory = categories[currentCategoryIndex];
      const targetLength = currentCategory.length;

      if (displayedPlaceholder.length < targetLength && isTyping) {
        typingTimeoutRef.current = setTimeout(() => {
          setDisplayedPlaceholder(
            currentCategory.substring(0, displayedPlaceholder.length + 1)
          );
        }, 50);
      } else if (displayedPlaceholder.length === targetLength && isTyping) {
        typingTimeoutRef.current = setTimeout(() => {
          setDisplayedPlaceholder("");
          setCurrentCategoryIndex(
            (prev) => (prev + 1) % categories.length
          );
        }, 1500);
      }
    } else if (query) {
      setDisplayedPlaceholder("");
      setIsTyping(false);
    } else {
      setIsTyping(true);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [displayedPlaceholder, query, currentCategoryIndex, isOpen, isTyping]);

  // Initialize Fuse.js
  const fuseInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).Fuse) {
      fuseInstanceRef.current = new (window as any).Fuse(
        SEARCH_DATA,
        FUSE_OPTIONS
      );
    }
  }, []);

  // Search function
  const runSearch = useCallback((searchQuery: string) => {
    if (!fuseInstanceRef.current) return;

    if (searchQuery.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const searchResults = fuseInstanceRef.current
      .search(searchQuery)
      .slice(0, 6);

    const resultsData = searchResults.map((result: FuseResult) => result.item);
    setResults(resultsData);
    setShowResults(true);
  }, []);

  // Debounced search handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setQuery(value);

    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      runSearch(value);
    }, 200);
  };

  // Keyboard event handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setQuery("");
      setShowResults(false);
      setResults([]);
      onClose();
    }
  };

  // Close search results
  const handleClose = () => {
    setQuery("");
    setShowResults(false);
    setResults([]);
    onClose();
  };

  const handleResultClick = () => {
    handleClose();
  };

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop Search - Only visible on large screens */}
      <div className="hidden md:block">
        {/* Overlay */}
        {isOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 999,
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? "auto" : "none",
              transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onClick={handleClose}
            role="button"
            aria-label="Close search"
          />
        )}

        {/* Desktop Search Panel - White Background with Left Rounded Corners */}
        <div
          ref={panelRef}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            height: "100vh",
            width: "100%",
            maxWidth: "480px",
            zIndex: 1000,
            backgroundColor: "#ffffff",
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
            boxShadow: "-4px 0 16px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "transform",
          }}
        >
        {/* Header */}
        <div
          style={{
            padding: "24px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827" }}>
            Search
          </h2>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#6b7280",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
            aria-label="Close search"
          >
            <ChevronRight className="w-6 h-6" style={{ transform: "rotate(90deg)" }} />
          </button>
        </div>

        {/* Search Input */}
        <div style={{ padding: "24px", borderBottom: "1px solid #e5e7eb" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "#f3f4f6",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          >
            <Search className="w-5 h-5" style={{ color: "#9ca3af", flexShrink: 0 }} />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={
                query
                  ? undefined
                  : displayedPlaceholder || "Search services..."
              }
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
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Clear search"
              >
                <ChevronRight className="w-5 h-5" style={{ transform: "rotate(90deg)" }} />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
          }}
        >
          {showResults ? (
            <>
              {results.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "#6b7280",
                    paddingTop: "48px",
                  }}
                >
                  <Search
                    className="w-12 h-12 mx-auto mb-3"
                    style={{ opacity: 0.3, color: "#9ca3af" }}
                  />
                  <p style={{ fontWeight: "500", color: "#111827" }}>
                    No services found.
                  </p>
                  <p style={{ fontSize: "14px", marginTop: "4px" }}>
                    Try "balcony nets", "pigeon", or "cricket".
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                  role="listbox"
                  aria-live="polite"
                >
                  {results.map((item) => (
                    <Link
                      key={item.id}
                      href={item.url}
                      onClick={handleResultClick}
                      style={{
                        display: "block",
                        padding: "16px",
                        backgroundColor: "#f9fafb",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        textDecoration: "none",
                        transition: "all 200ms",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(0, 0, 0, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#f9fafb";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                      role="option"
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              color: "#ea580c",
                            }}
                          >
                            {item.category}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#111827",
                          }}
                        >
                          {item.name}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#6b7280",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.description}
                        </span>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "4px",
                            marginTop: "8px",
                          }}
                        >
                          {item.locations
                            .split(" ")
                            .slice(0, 3)
                            .map((location, idx) => (
                              <span
                                key={idx}
                                style={{
                                  fontSize: "12px",
                                  backgroundColor: "#cffafe",
                                  color: "#0369a1",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                }}
                              >
                                {location}
                              </span>
                            ))}
                          {item.locations.split(" ").length > 3 && (
                            <span
                              style={{
                                fontSize: "12px",
                                color: "#9ca3af",
                              }}
                            >
                              +{item.locations.split(" ").length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#6b7280",
                paddingTop: "48px",
              }}
            >
              <Search
                className="w-12 h-12 mx-auto mb-3"
                style={{ opacity: 0.3, color: "#9ca3af" }}
              />
              <p style={{ fontWeight: "500", color: "#111827" }}>
                Find our services
              </p>
              <p style={{ fontSize: "14px", marginTop: "4px" }}>
                Type to search across all categories
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e5e7eb",
            fontSize: "12px",
            color: "#9ca3af",
          }}
        >
          <p>Available in Hyderabad, Bangalore, Chennai & more</p>
        </div>
        </div>
      </div>
    </>
  );
};

export default DesktopSearchPanel;
