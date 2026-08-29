import { Metadata } from "next";
import Team from "./team";

export const metadata: Metadata = {
  title: "HR Team",
};

export default function TeamPage() {
  return <Team />;
}
