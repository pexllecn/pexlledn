import { Metadata } from "next";
import User from "./user";
import userProfilesData from "@/data/userProfiles.json";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const user = userProfilesData[params.id as keyof typeof userProfilesData];
  return {
    title: user ? `${user.name}` : "User Profile",
  };
}

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  return <User params={params} />;
}
