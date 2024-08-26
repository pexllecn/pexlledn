"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Link as LinkIcon } from "lucide-react";

interface SearchResult {
  id: number;
  route: string;
  title: string;
  snippet: string;
  matchType: "route" | "title" | "content";
  contentKey?: string;
}

interface SearchResponse {
  results: SearchResult[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const [searchInput, setSearchInput] = useState(query);
  const debouncedSearchTerm = useDebounce(searchInput, 300);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      setError(null);
      fetch(
        `/api/search?q=${encodeURIComponent(debouncedSearchTerm)}&page=${page}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch search results");
          }
          return response.json();
        })
        .then((data: SearchResponse) => {
          setResults(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Search error:", error);
          setError(
            "An error occurred while fetching search results. Please try again."
          );
          setIsLoading(false);
        });
    } else {
      setResults(null);
    }
  }, [debouncedSearchTerm, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchInput)}`);
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  const renderResultItem = (result: SearchResult) => {
    let href = result.route;
    if (result.matchType === "content" && result.contentKey) {
      href += `#${result.contentKey}`;
    }

    return (
      <Card
        key={`${result.id}-${result.matchType}-${result.contentKey || ""}`}
        className="mb-4"
      >
        <CardHeader>
          <CardTitle className="flex items-center">
            <Link
              href={href}
              className="text-xl font-normal hover:underline flex-grow"
            >
              {result.title}
            </Link>
            <Badge
              variant={
                result.matchType === "route"
                  ? "default"
                  : result.matchType === "title"
                  ? "secondary"
                  : "outline"
              }
              className="ml-2"
            >
              {result.matchType === "route" && (
                <LinkIcon size={10} className="mr-1" />
              )}
              {result.matchType === "title" && (
                <FileText size={10} className="mr-1" />
              )}
              {result.matchType === "content" && (
                <Search size={10} className="mr-1" />
              )}
              {result.matchType}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">
            {result.route}
            {result.contentKey ? `#${result.contentKey}` : ""}
          </p>
          <p className="text-sm">{result.snippet}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <ContentLayout title="Search Results">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
            </div>
            <Button type="submit" className="ml-2">
              Search
            </Button>
          </div>
        </form>

        {isLoading && (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {results && (
          <>
            <h1 className="text-3xl font-normal mb-6 text-center">
              Search Results for &#34;{query}&#34;
            </h1>
            {results.results.length > 0 ? (
              <>
                <div className="space-y-4">
                  {results.results.map(renderResultItem)}
                </div>
                <div className="mt-8 flex justify-center space-x-2">
                  {Array.from(
                    { length: results.totalPages },
                    (_, i) => i + 1
                  ).map((pageNum) => (
                    <Button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      variant={
                        pageNum === results.currentPage ? "default" : "outline"
                      }
                    >
                      {pageNum}
                    </Button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground">
                No results found.
              </p>
            )}
          </>
        )}
      </div>
    </ContentLayout>
  );
}
