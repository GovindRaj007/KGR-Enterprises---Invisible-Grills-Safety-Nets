"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import {
  SEARCH_DATA,
  FUSE_OPTIONS,
  extractLocationFromQuery,
  removeLocationFromQuery,
  buildSearchResultUrl,
  buildDisplayName,
  determineQueryType,
  getServicesByLocation,
  getServicesByCategoryAndLocation,
  getStatesFromLocations,
  type SearchDataItem,
} from "@/lib/searchData";

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
  const [detectedLocation, setDetectedLocation] = useState<string | null>(null);
  const [queryType, setQueryType] = useState<
    "location-only" | "service-only" | "service+location"
  >("service-only");

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

  // Enhanced search function with location and category context
  const runSearch = useCallback((searchQuery: string) => {
    if (!fuseInstanceRef.current) return;

    if (searchQuery.length < 2) {
      setResults([]);
      setShowResults(false);
      setDetectedLocation(null);
      setQueryType("service-only");
      return;
    }

    // Extract location from query if present
    const location = extractLocationFromQuery(searchQuery);
    setDetectedLocation(location);

    // Determine query type
    const type = determineQueryType(searchQuery, location);
    setQueryType(type);

    // CASE 1: Location-only search (e.g., "hyderabad", "bangalore")
    if (type === "location-only" && location) {
      const locationServices = getServicesByLocation(location).slice(0, 12);
      setResults(locationServices);
      setShowResults(true);
      return;
    }

    // CASE 2: Service + Location search (e.g., "safety nets bangalore")
    if (type === "service+location" && location) {
      const cleanQuery = removeLocationFromQuery(searchQuery).trim();

      // First, try to find by category
      let resultsData: SearchDataItem[] = [];

      // Search for category matches in that location
      const categoryMatches = getServicesByCategoryAndLocation(
        cleanQuery,
        location
      );

      if (categoryMatches.length > 0) {
        resultsData = categoryMatches;
      } else {
        // Fallback to fuzzy search in that location
        const allLocationServices = getServicesByLocation(location);
        const fuzzyResults = fuseInstanceRef.current
          .search(cleanQuery)
          .map((r: any) => r.item)
          .filter((item: SearchDataItem) =>
            allLocationServices.some((s) => s.id === item.id)
          );

        resultsData = fuzzyResults;
      }

      setResults(resultsData.slice(0, 12));
      setShowResults(true);
      return;
    }

    // CASE 3: Service-only search (e.g., "invisible grills")
    const cleanQuery = removeLocationFromQuery(searchQuery) || searchQuery;
    const searchResults = fuseInstanceRef.current
      .search(cleanQuery)
      .slice(0, 12);

    const resultsData = searchResults.map((r: any) => r.item);
    setResults(resultsData);
    setShowResults(true);
  }, []);

  // Debounced input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => runSearch(value.trim()), 200);
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
      {/* Backdrop - only renders when open */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 999,
            pointerEvents: "auto",
          }}
        />
      )}

      {/* Drawer - with stopPropagation to prevent backdrop from receiving clicks */}
      <div
        onClick={(e) => e.stopPropagation()}
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
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          visibility: isOpen || hasOpenedRef.current ? "visible" : "hidden",
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: isOpen ? "auto" : "none",
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
                      setResults([]);                      searchInputRef.current?.focus();                    }}
                    aria-label="Clear search"
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
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                  >
                    <X className="w-5 h-5" />
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
                    <p style={{ fontSize: "14px" }}>Try "pigeon nets", "invisible grills bangalore", or a city name.</p>
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
                        href={buildSearchResultUrl(item, queryType, detectedLocation || undefined)}
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
                            {buildDisplayName(item, queryType, detectedLocation || undefined)}
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
                          {/* Show locations for service-only searches */}
                          {queryType === "service-only" && (
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "6px",
                                marginTop: "6px",
                              }}
                            >
                              {getStatesFromLocations(item.locations).map((state) => (
                                <span
                                  key={state}
                                  style={{
                                    fontSize: "11px",
                                    backgroundColor: "#e0f2fe",
                                    color: "#0369a1",
                                    padding: "3px 6px",
                                    borderRadius: "3px",
                                  }}
                                >
                                  {state}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )
              ) : (
                <div style={{ textAlign: "center", color: "#6b7280", paddingTop: "32px" }}>
                  <p style={{ fontSize: "14px" }}>Start typing to search our services</p>
                  <p style={{ fontSize: "12px", marginTop: "8px", color: "#9ca3af" }}>
                    Try: "invisible grills", "safety nets hyderabad", or just "bangalore"
                  </p>
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