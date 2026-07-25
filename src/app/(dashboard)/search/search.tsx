"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import {
  Search,
  FileText,
  Link as LinkIcon,
  ArrowRight,
  Clock,
  TrendingUp,
  Sparkles,
  CornerDownLeft,
  LayoutDashboard,
  Clapperboard,
  Landmark,
  Users,
  KanbanSquare,
  Component,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

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

const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

const popular = [
  "Dashboard",
  "Media player",
  "Banking",
  "Components",
  "Pricing",
  "Team members",
];

const quickLinks = [
  { icon: LayoutDashboard, label: "Dashboard", desc: "Overview & analytics", href: "/dashboard", tint: "bg-primary/10 text-primary" },
  { icon: Clapperboard, label: "Media", desc: "Photos, music & video", href: "/media", tint: "bg-rose-500/10 text-rose-500" },
  { icon: Landmark, label: "Banking", desc: "Accounts & transactions", href: "/banking", tint: "bg-emerald-500/10 text-emerald-500" },
  { icon: Users, label: "Team members", desc: "People & roles", href: "/teams", tint: "bg-sky-500/10 text-sky-500" },
  { icon: KanbanSquare, label: "Kanban", desc: "Boards & tasks", href: "/kanban", tint: "bg-violet-500/10 text-violet-500" },
  { icon: Component, label: "Components", desc: "The UI library", href: "/comps", tint: "bg-amber-500/10 text-amber-500" },
];

const matchMeta: Record<
  SearchResult["matchType"],
  { icon: React.ElementType; tint: string; label: string }
> = {
  route: { icon: LinkIcon, tint: "bg-primary/10 text-primary", label: "Page" },
  title: { icon: FileText, tint: "bg-sky-500/10 text-sky-500", label: "Title" },
  content: { icon: Search, tint: "bg-violet-500/10 text-violet-500", label: "Content" },
};

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
    setSearchInput(query);
  }, [query]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      setError(null);
      fetch(
        `/api/search?q=${encodeURIComponent(debouncedSearchTerm)}&page=${page}`
      )
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch search results");
          return response.json();
        })
        .then((data: SearchResponse) => {
          setResults(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Search error:", err);
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

  const runSearch = (term: string) => {
    setSearchInput(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  const renderResultItem = (result: SearchResult) => {
    let href = result.route;
    if (result.matchType === "content" && result.contentKey) {
      href += `#${result.contentKey}`;
    }
    const meta = matchMeta[result.matchType];

    return (
      <Link
        key={`${result.id}-${result.matchType}-${result.contentKey || ""}`}
        href={href}
        className="group block"
      >
        <div className="flex gap-4 rounded-2xl bg-muted p-4 transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-muted/70">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              meta.tint
            )}
          >
            <meta.icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-semibold group-hover:text-primary">
                {result.title}
              </h3>
              <Badge variant="secondary" className="shrink-0 text-1xs">
                {meta.label}
              </Badge>
            </div>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {result.route}
              {result.contentKey ? `#${result.contentKey}` : ""}
            </p>
            <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
              {result.snippet}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 self-center text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </div>
      </Link>
    );
  };

  const hasQuery = Boolean(query);

  return (
    <ContentLayout title="Search">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        variants={variants}
      >
        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-12 z-0 flex justify-center"
          >
            <div className="h-56 w-[560px] rounded-full bg-primary/15 blur-[120px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl px-2 py-8">
            {/* Search hero */}
            <div className="text-center">
              <div className="flex justify-center">
                <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Search everything
                </Badge>
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                What are you looking for?
              </h1>
              <form onSubmit={handleSearch} className="mx-auto mt-6 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    autoFocus
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search pages, content and more…"
                    className="h-12 rounded-full border-none bg-muted pl-12 pr-24 text-base shadow-sm focus-visible:ring-primary/40"
                  />
                  {searchInput ? (
                    <button
                      type="button"
                      onClick={() => setSearchInput("")}
                      className="absolute right-14 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted"
                      aria-label="Clear"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                  <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md bg-background px-2 py-1 text-1xs text-muted-foreground sm:flex">
                    <CornerDownLeft className="h-3 w-3" /> Enter
                  </span>
                </div>
              </form>
            </div>

            {/* Loading skeletons */}
            {isLoading && (
              <div className="mt-10 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex gap-4 rounded-2xl bg-muted p-4"
                  >
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/4" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && !isLoading && (
              <div className="mt-10 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Results */}
            {!isLoading && results && (
              <div className="mt-10">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground tabular-nums">
                      {results.totalCount}
                    </span>{" "}
                    results for{" "}
                    <span className="font-medium text-foreground">
                      &#34;{query}&#34;
                    </span>
                  </p>
                </div>

                {results.results.length > 0 ? (
                  <>
                    <div className="space-y-3">
                      {results.results.map(renderResultItem)}
                    </div>
                    {results.totalPages > 1 && (
                      <div className="mt-8 flex flex-wrap justify-center gap-2">
                        {Array.from(
                          { length: results.totalPages },
                          (_, i) => i + 1
                        ).map((pageNum) => (
                          <Button
                            key={pageNum}
                            size="icon"
                            onClick={() => handlePageChange(pageNum)}
                            variant={
                              pageNum === results.currentPage
                                ? "default"
                                : "outline"
                            }
                          >
                            {pageNum}
                          </Button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded-2xl bg-muted py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                      <Search className="h-6 w-6" />
                    </div>
                    <p className="mt-4 text-base font-medium">No results found</p>
                    <p className="text-sm text-muted-foreground">
                      Try different keywords or browse the quick links below.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Empty state */}
            {!hasQuery && !isLoading && !results && (
              <div className="mt-12 space-y-10">
                <div>
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <TrendingUp className="h-4 w-4" /> Popular searches
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {popular.map((term) => (
                      <button
                        key={term}
                        onClick={() => runSearch(term)}
                        className="flex items-center gap-1.5 rounded-full bg-muted px-4 py-2 text-sm transition-colors hover:bg-primary/10"
                      >
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <Sparkles className="h-4 w-4" /> Quick links
                  </h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {quickLinks.map((q) => (
                      <Link key={q.label} href={q.href} className="group">
                        <div className="flex items-center gap-3 rounded-2xl bg-muted p-4 transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-muted/70">
                          <div
                            className={cn(
                              "flex h-11 w-11 items-center justify-center rounded-xl",
                              q.tint
                            )}
                          >
                            <q.icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium group-hover:text-primary">
                              {q.label}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {q.desc}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
