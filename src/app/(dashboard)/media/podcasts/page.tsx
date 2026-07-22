import { Metadata } from "next";
import Podcasts from "./podcasts";

export const metadata: Metadata = {
  title: "Podcasts",
};

export default function MediaPodcastsPage() {
  return <Podcasts />;
}
