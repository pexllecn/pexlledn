// hooks/use-media-query.ts
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const getMatches = () =>
    typeof window !== "undefined" && window.matchMedia(query).matches;

  const [matches, setMatches] = useState<boolean>(getMatches);

  useEffect(() => {
    const media = window.matchMedia(query);

    const handleChange = () => setMatches(media.matches);

    handleChange();

    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    } else {
      media.addListener(handleChange);
      return () => media.removeListener(handleChange);
    }
  }, [query]);

  return matches;
}
