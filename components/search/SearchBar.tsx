"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { SEARCH_DATA, FUSE_OPTIONS, type SearchDataItem } from "@/lib/searchData";

interface FuseResult {
  item: SearchDataItem;
  score?: number;
}

interface SearchBarProps {
  onClose?: () => void;
  isOpen?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onClose,
  isOpen = true,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchDataItem[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
        // Hold for 1.5 seconds, then move to next category
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
      if (onClose) onClose();
    }
  };

  // Close search results
  const handleClose = () => {
    setQuery("");
    setShowResults(false);
    setResults([]);
    if (onClose) onClose();
  };

  const handleResultClick = () => {
    handleClose();
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <Search className="w-5 h-5 text-gray-400" />
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
            className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white text-sm placeholder-gray-400"
          />
          {query && (
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showResults && (
          <div
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto"
            role="listbox"
            aria-live="polite"
          >
            {results.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No services found. Try "balcony nets" or "pigeon".
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {results.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    onClick={handleResultClick}
                    className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    role="option"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-orange-500">
                        {item.category}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {item.description.slice(0, 80)}...
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
