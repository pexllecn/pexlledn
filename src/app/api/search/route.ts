// src/app/api/search/route.ts

import { NextResponse } from "next/server";
import { mockPages, MockPage } from "@/lib/mockData";

interface SearchResult {
  id: number;
  route: string;
  title: string;
  snippet: string;
  matchType: "route" | "title" | "content";
  contentKey?: string;
}

function searchContent(
  query: string,
  page: number = 1,
  pageSize: number = 5
): {
  results: SearchResult[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
} {
  const lowerQuery = query.toLowerCase();

  const results: SearchResult[] = [];

  mockPages.forEach((item) => {
    // Check route
    if (item.route.toLowerCase().includes(lowerQuery)) {
      results.push({
        id: item.id,
        route: item.route,
        title: item.title,
        snippet: `Route: ${item.route}`,
        matchType: "route"
      });
    }

    // Check title
    if (item.title.toLowerCase().includes(lowerQuery)) {
      results.push({
        id: item.id,
        route: item.route,
        title: item.title,
        snippet: item.content.main.slice(0, 150) + "...",
        matchType: "title"
      });
    }

    // Check content
    Object.entries(item.content).forEach(([key, value]) => {
      if (value.toLowerCase().includes(lowerQuery)) {
        results.push({
          id: item.id,
          route: item.route,
          title: item.title,
          snippet: value.slice(0, 150) + "...",
          matchType: "content",
          contentKey: key
        });
      }
    });
  });

  // Sort results (prioritize route matches, then title matches, then content matches)
  results.sort((a, b) => {
    const typeOrder = { route: 0, title: 1, content: 2 };
    return typeOrder[a.matchType] - typeOrder[b.matchType];
  });

  // Paginate results
  const startIndex = (page - 1) * pageSize;
  const paginatedResults = results.slice(startIndex, startIndex + pageSize);

  return {
    results: paginatedResults,
    totalCount: results.length,
    currentPage: page,
    totalPages: Math.ceil(results.length / pageSize)
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "5");

  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter" },
      { status: 400 }
    );
  }

  try {
    const results = searchContent(query, page, pageSize);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Error processing search request" },
      { status: 500 }
    );
  }
}
