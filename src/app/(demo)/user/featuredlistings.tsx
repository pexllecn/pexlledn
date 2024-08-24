"use client";
import React from "react";

interface FeaturedListingsProps {
  listings: { name: string; image: string }[];
}

export const FeaturedListings: React.FC<FeaturedListingsProps> = React.memo(
  ({ listings }) => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Featured Listings</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {listings.map((listing, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <img
              src={listing.image}
              alt={listing.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <p className="text-sm font-medium">{listing.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
);

FeaturedListings.displayName = "FeaturedListings";
