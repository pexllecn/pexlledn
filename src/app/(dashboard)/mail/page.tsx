import { Metadata } from "next";
import WorkspaceMail from "./workspace-mail";
export const metadata: Metadata = { title: "Mail" };
export default function MailPage() { return <WorkspaceMail />; }
