import { Metadata } from "next";

export function generateMetadata(
  title: string,
  description?: string,
  baseMetadata: Metadata = {}
): Metadata {
  return {
    ...baseMetadata,
    title: title ? `${title}` : "Pexlle",
    description: description || baseMetadata.description,
  };
}
