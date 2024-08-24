"use client";
import React from "react";

interface ItemFeedProps {
  items: { name: string; image: string; price: string }[];
}

export const ItemFeed: React.FC<ItemFeedProps> = React.memo(({ items }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4">Item Feed</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-2">
            <p className="font-medium text-sm">{item.name}</p>
            <p className="text-muted-foreground text-sm">{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
));

ItemFeed.displayName = "ItemFeed";
