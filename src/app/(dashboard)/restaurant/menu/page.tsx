import { Metadata } from "next";
import Menu from "./menu";

export const metadata: Metadata = {
  title: "Menu",
};

export default function RestaurantMenuPage() {
  return <Menu />;
}
