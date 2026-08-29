import { Metadata } from "next";
import Files from "./files";

export const metadata: Metadata = {
  title: "Files",
};

export default function FilesPage() {
  return <Files />;
}
