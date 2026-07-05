import { Metadata } from "next";
import Reservations from "./reservations";

export const metadata: Metadata = {
  title: "Reservations",
};

export default function RestaurantReservationsPage() {
  return <Reservations />;
}
