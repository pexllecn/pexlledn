import { Metadata } from "next";
import Kanban from "./kanban";

export const metadata: Metadata = {
  title: "Kanban",
};

export default function SignInPage() {
  return <Kanban />;
}
