// app/(public)/components/navbar/SearchBar.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { HiDocumentText } from "react-icons/hi";

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  image: string;
  created_at: string;
  type: "blog";
  url: string;
  category: string;
  category_slug: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setQuery("");
        setResults([]);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim() === "") {
      setResults([]);
      return;
    }

    setIsLoading(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/api/v1/search?q=${encodeURIComponent(query)}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const handleResultClick = () => {
    handleClose();
  };

  return (
    <>
      {/* Search Icon / Close Button */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
        aria-label={isOpen ? "Close search" : "Open search"}
      >
        {isOpen ? (
          <X size={24} className="text-gray-300" />
        ) : (
          <Search size={24} className="text-gray-300" />
        )}
      </button>

      {/* Search Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={handleClose} />

          {/* Search Container */}
          <div
            ref={searchRef}
            className="fixed left-0 right-0 bg-[#030712] z-50 animate-slideDown overflow-hidden"
            style={{
              top: "var(--header-height, 60px)",
              maxHeight: "calc(100vh - var(--header-height, 80px))",
            }}
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 h-full overflow-y-auto">
              {/* Search Input Section */}
              <div className="flex items-center gap-4 ">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search blogs..."
                    className="w-full px-5 py-2 pl-12 bg-gray-800 border border-gray-700 text-gray-100 placeholder:text-gray-500 rounded-lg focus:outline-none focus:bg-gray-800 ring-0 focus:ring-0 transition-all text-base"
                  />
                </div>
              </div>

              {/* Search Results */}
              {query && (
                <div className="mt-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-700 border-t-[#FE4F70]"></div>
                        <p className="text-sm text-gray-400">
                          Searching...
                        </p>
                      </div>
                    </div>
                  ) : results.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm text-gray-400">
                          Found{" "}
                          <span className="font-semibold text-gray-100">
                            {results.length}
                          </span>{" "}
                          {results.length === 1 ? "result" : "results"}
                        </p>
                      </div>
                      <div className="grid gap-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 scrollbar-thin">
                        {results.map((result) => (
                          <Link
                            key={result.id}
                            href={result.url}
                            onClick={handleResultClick}
                            className="flex items-start gap-4 p-4 rounded-lg transition-all border border-transparent hover:border-gray-700 group"
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden relative shrink-0 bg-gray-800">
                              <Image
                                src={`/storage/blogpostimages/${result.image}`}
                                alt={result.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="96px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <HiDocumentText className="text-green-500" size={18} />
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                  Blog
                                </span>
                                <span className="text-gray-600">
                                  •
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(
                                    result.created_at.replace(" ", "T")
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                              <h4 className="font-semibold text-base text-gray-100 line-clamp-2 mb-2 group-hover:text-[#FE4F70] transition-colors">
                                {result.title}
                              </h4>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <Search
                          size={28}
                          className="text-gray-500"
                        />
                      </div>
                      <p className="text-gray-100 font-medium text-base mb-1">
                        No results found
                      </p>
                      <p className="text-gray-400 text-sm">
                        Try different keywords or check your spelling
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease-out;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </>
  );
};

export default SearchBar;