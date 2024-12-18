"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface Property {
  id: number;
  title: string;
  price: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface MapViewProps {
  properties: Property[];
}

export function MapView({ properties }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map, Marker } = await loader.importLibrary("maps");

      const map = new Map(mapRef.current as HTMLElement, {
        center: { lat: 40.7128, lng: -74.006 },
        zoom: 10,
      });

      properties.forEach((property) => {
        new Marker({
          position: property.coordinates,
          map: map,
          title: `${property.title} - $${property.price.toLocaleString()}`,
        });
      });
    };

    initMap();
  }, [properties]);

  return <div ref={mapRef} style={{ width: "100%", height: "600px" }} />;
}
