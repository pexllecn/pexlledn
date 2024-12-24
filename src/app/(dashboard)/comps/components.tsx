"use client";

import React, { useState } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Image from "next/image";
import Link from "next/link";
import {
  Layout,
  AlertCircle,
  User,
  Navigation,
  ToggleLeft,
  MessageSquare,
  ChevronDown,
  List,
  Sliders,
  HelpCircle,
  Sparkles,
  Search,
  ChevronRight,
  BetweenVerticalEnd,
} from "lucide-react";
import { ButtonIcon, InputIcon } from "@radix-ui/react-icons";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";

interface Component {
  name: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  category: string;
  highlight?: boolean;
}

const components: Component[] = [
  {
    name: "Accordion",
    href: "/comps/accordions",
    icon: <Layout className="w-6 h-6" />,
    description: "Expandable content sections",
    category: "Layout",
  },
  {
    name: "Alert, Notification, and Banner",
    href: "/comps/alerts-notifications-banners",
    icon: <AlertCircle className="w-6 h-6" />,
    description: "User feedback components",
    category: "Feedback",
  },
  {
    name: "Avatar and Badge",
    href: "/comps/avatars-badges",
    icon: <User className="w-6 h-6" />,
    description: "User representation elements",
    category: "Data Display",
  },
  {
    name: "Breadcrumb and Pagination",
    href: "/comps/breadcrumbs-paginations",
    icon: <Navigation className="w-6 h-6" />,
    description: "Navigation helpers",
    category: "Navigation",
  },
  {
    name: "Button",
    href: "/comps/buttons",
    icon: <ButtonIcon className="w-6 h-6" />,
    description: "Interactive buttons",
    category: "Input",
  },
  {
    name: "Checkbox, Radio, and Switch",
    href: "/comps/checks-radios-switches",
    icon: <ToggleLeft className="w-6 h-6" />,
    description: "Selection controls",
    category: "Input",
  },
  {
    name: "Dialog",
    href: "/comps/dialogs",
    icon: <MessageSquare className="w-6 h-6" />,
    description: "Modal windows",
    category: "Overlay",
  },
  {
    name: "Dropdown and Popover",
    href: "/comps/dropdowns-popovers",
    icon: <ChevronDown className="w-6 h-6" />,
    description: "Contextual menus",
    category: "Overlay",
  },
  {
    name: "Input and Textarea",
    href: "/comps/inputs",
    icon: <InputIcon className="w-6 h-6" />,
    description: "Text input fields",
    category: "Input",
  },
  {
    name: "Select",
    href: "/comps/selects",
    icon: <List className="w-6 h-6" />,
    description: "Option selection",
    category: "Input",
  },
  {
    name: "Slider",
    href: "/comps/sliders",
    icon: <Sliders className="w-6 h-6" />,
    description: "Range selection",
    category: "Input",
  },
  {
    name: "Tab",
    href: "/comps/tabs",
    icon: <BetweenVerticalEnd className="w-6 h-6" />,
    description: "Content organization",
    category: "Navigation",
  },
  {
    name: "Tooltip",
    href: "/comps/tooltips",
    icon: <HelpCircle className="w-6 h-6" />,
    description: "Contextual information",
    category: "Overlay",
  },
];

interface CategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
  counts: Record<string, number>;
}

const Categories: React.FC<CategoriesProps> = ({
  activeCategory,
  setActiveCategory,
  categories,
  counts,
}) => (
  <div className="my-8 flex flex-wrap justify-center  gap-2">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => setActiveCategory(category)}
        className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
          activeCategory === category
            ? "bg-primary text-primary-foreground shadow-lg"
            : "bg-muted hover:bg-muted/80"
        }`}
      >
        {category}
      </button>
    ))}
  </div>
);

const ComponentCard: React.FC<{ component: Component }> = ({ component }) => (
  <div className="group relative">
    <div className="" />
    <Link href={component.href}>
      <div className="relative group-hover:text-primary rounded-lg border border-muted bg-muted p-6 shadow-none transition-all duration-200 hover:bg-primary/10  hover:border-ring hover:ring-ring/30 hover:ring-[3px]">
        <div className=" flex items-center justify-between">
          <div className="rounded-lg bg-primary/10 p-2 text-spcolor">
            {component.icon}
          </div>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {component.category}
          </span>
        </div>
        <h3 className="mt-2 text-lg font-semibold">{component.name}</h3>
        <p className="text-sm text-muted-foreground">{component.description}</p>
        <div className="mt-4 flex items-center text-sm font-medium text-foreground/50 group-hover:text-primary">
          Explore component
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  </div>
);

export default function Page() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Get unique categories and add "All"
  const categories = [
    "All",
    ...Array.from(new Set(components.map((c) => c.category))),
  ];

  // Filter components based on category and search query
  const filteredComponents = components.filter((component) => {
    const matchesCategory =
      activeCategory === "All" || component.category === activeCategory;
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate counts for each category
  const counts = categories.reduce((acc, category) => {
    if (category === "All") {
      acc[category] = components.length;
    } else {
      acc[category] = components.filter((c) => c.category === category).length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <ContentLayout title="Components">
      <div className="min-h-screen bg-background">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-5xl">
            <div className="relative mb-4 text-center">
              <div className="relative z-10">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <AnimatedGradientText>
                    <Sparkles className="h-4 w-4 text-primary" />
                    <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
                    <span
                      className={cn(
                        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                      )}
                    >
                      Beautifully crafted UI components
                    </span>
                    <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </AnimatedGradientText>
                </div>
                <h1 className="mb-4 text-spcolor text-4xl font-bold tracking-tight  sm:text-5xl">
                  Component Library
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                  Explore our collection of beautiful and functional UI
                  components ported from OriginUI
                </p>
              </div>

              {/* Category Filters */}
              <Categories
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                categories={categories}
                counts={counts}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredComponents.map((component) => (
                <ComponentCard key={component.name} component={component} />
              ))}
            </div>

            {/* Empty State */}
            {filteredComponents.length === 0 && (
              <div className="mt-12 text-center">
                <p className="text-lg text-muted-foreground">
                  No components found matching your criteria
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </ContentLayout>
  );
}
