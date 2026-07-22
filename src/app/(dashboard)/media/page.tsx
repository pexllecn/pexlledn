import { Metadata } from "next";
import Media from "./media";

export const metadata: Metadata = {
  title: "Media",
};

export default function MediaOverviewPage() {
  return <Media />;
}
