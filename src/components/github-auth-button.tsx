"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Icons } from "./icons";

export default function GoogleSignInButton() {
  const router = useRouter();

  const handleSignIn = () => {
    // TODO: Implement actual GitHub sign-in logic
    console.log("GitHub sign-in clicked");
    router.push("/dashboard");
  };

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={handleSignIn}
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      With Github
    </Button>
  );
}
