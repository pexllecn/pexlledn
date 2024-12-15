"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

// Custom CheckIcon component
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path d="M8 12l2 2 4-4" stroke="white" />
  </svg>
);

interface PricingPlanProps {
  title: string;
  description: string;
  monthlyPrice: string;
  annualPrice: string;
  features: Array<{ text: string; isNew?: boolean }>;
  buttonText: string;
  isCurrentPlan?: boolean;
  isHighlighted?: boolean;
  billingPeriod: "monthly" | "annual";
  isDisabled?: boolean;
  hideBillingPeriod?: boolean;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  description,
  monthlyPrice,
  annualPrice,
  features,
  buttonText,
  isCurrentPlan,
  isHighlighted,
  billingPeriod,
  isDisabled,
  hideBillingPeriod,
}) => (
  <div
    className={`rounded-lg overflow-hidden border ${
      isHighlighted ? "border-ring" : "border-border"
    } flex flex-col h-full`}
  >
    <div className="bg-muted p-6 flex flex-col h-[250px]">
      <h2 className="text-2xl font-normal mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground font-light mb-4 flex-grow">
        {description}
      </p>
      <p className="text-3xl font-normal mb-4">
        {billingPeriod === "monthly" ? monthlyPrice : annualPrice}
        {!hideBillingPeriod && (
          <span className="text-lg font-normal text-muted-foreground">
            /{billingPeriod === "monthly" ? "mo" : "yr"}
          </span>
        )}
      </p>
      <Button
        className={`w-[90%] mx-auto ${
          isCurrentPlan
            ? ""
            : isHighlighted
            ? "bg-primary text-primary-foreground"
            : "text-foreground hover:bg-primary/10"
        }`}
        variant={isCurrentPlan || isHighlighted ? "outline" : "outline"}
        disabled={isDisabled}
      >
        {isCurrentPlan ? "Current Plan" : buttonText}
      </Button>
    </div>
    <div className="bg-background p-6 flex-grow">
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="text-primary mr-2 h-4 w-4 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">
              {feature.text}
            </span>
            {feature.isNew && (
              <Badge className="ml-2" variant="primary">
                New
              </Badge>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "monthly"
  );

  const handleBillingPeriodChange = (value: string) => {
    setBillingPeriod(value as "monthly" | "annual");
  };

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <ContentLayout title="Pricing">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        variants={variants1}
      >
        <div className="lg:container mx-auto px-2 py-6">
          <h1 className="text-4xl font-normal text-center mb-4">Pricing</h1>
          <p className="text-center text-muted-foreground font-light mb-8 max-w-3xl mx-auto">
            We want to empower every builder to learn coding best practices,
            create beautiful interfaces, and fully functioning apps. From
            individuals to enterprises, we have a plan that fits your use case.
          </p>

          {/* <Tabs
          value={billingPeriod}
          onValueChange={handleBillingPeriodChange}
          className="w-full mb-8"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
          </TabsList>
        </Tabs> */}
          <Tabs
            value={billingPeriod}
            onValueChange={handleBillingPeriodChange}
            className="w-full mb-8 flex justify-center"
          >
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">Annual</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingPlan
              title="Free"
              description="For individuals that just want to explore."
              monthlyPrice="$0"
              annualPrice="$0"
              features={[
                { text: "Access to v0.dev/chat", isNew: true },
                { text: "200 credits/month" },
              ]}
              buttonText="Current Plan"
              isCurrentPlan={true}
              billingPeriod={billingPeriod}
              isDisabled={true}
            />

            <PricingPlan
              title="Premium"
              description="For users that want more messages and generations."
              monthlyPrice="$20"
              annualPrice="$200"
              features={[
                { text: "Higher usage limits on v0.dev/chat", isNew: true },
                { text: "5000 credits/month" },
                { text: "Optional credits purchase" },
                { text: "Vision generations" },
                { text: "Custom themes" },
                { text: "Private generations" },
              ]}
              buttonText="Choose Premium"
              isHighlighted={true}
              billingPeriod={billingPeriod}
            />

            <PricingPlan
              title="Enterprise"
              description="For companies and teams that require robust features and higher limits."
              monthlyPrice="Contact Us"
              annualPrice="Contact Us"
              features={[
                { text: "Custom usage limits on v0.dev/chat", isNew: true },
                { text: "Custom credits/month" },
                { text: "Optional credits purchase" },
                { text: "Vision generations" },
                { text: "Custom themes" },
                { text: "Private generations" },
                { text: "SAML SSO" },
                { text: "7 other features" },
              ]}
              buttonText="Talk to Sales"
              billingPeriod={billingPeriod}
              hideBillingPeriod={true}
            />
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
