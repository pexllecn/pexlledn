"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PremiumPage() {
  const searchParams = useSearchParams();
  const [hasPremium, setHasPremium] = useState(false);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      localStorage.setItem("premium", "true");
    }
    setHasPremium(localStorage.getItem("premium") === "true");
  }, [searchParams]);

  const handleCheckout = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url as string;
    }
  };

  if (hasPremium) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-normal">Premium Components</h1>
        <p>Welcome to the premium section. More components will appear here.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-normal">Go Premium</h1>
      <p>Unlock additional components with a premium subscription.</p>
      <Button onClick={handleCheckout}>Buy Premium</Button>
    </div>
  );
}
