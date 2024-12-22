"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const components = [
  {
    name: "Accordion",
    href: "/comps/accordions",
    image:
      "https://images.unsplash.com/photo-1598791318878-10e76d178023?w=500&q=80",
  },
  {
    name: "Alert, Notification, and Banner",
    href: "/comps/alerts-notifications-banners",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80",
  },
  {
    name: "Avatar and Badge",
    href: "/comps/avatars-badges",
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&q=80",
  },
  {
    name: "Breadcrumb and Pagination",
    href: "/comps/breadcrumbs-paginations",
    image:
      "https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=500&q=80",
  },
  {
    name: "Button",
    href: "/comps/buttons",
    image:
      "https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?w=500&q=80",
  },
  {
    name: "Checkbox, Radio, and Switch",
    href: "/comps/checks-radios-switches",
    image:
      "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=500&q=80",
  },
  {
    name: "Dialog",
    href: "/comps/dialogs",
    image:
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=500&q=80",
  },
  {
    name: "Dropdown and Popover",
    href: "/comps/dropdowns-popovers",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&q=80",
  },
  {
    name: "Input and Textarea",
    href: "/comps/inputs",
    image:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&q=80",
  },
  {
    name: "Select",
    href: "/comps/selects",
    image:
      "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=500&q=80",
  },
  {
    name: "Slider",
    href: "/comps/sliders",
    image:
      "https://images.unsplash.com/photo-1595079676601-f1adf5be5dee?w=500&q=80",
  },
  {
    name: "Tab",
    href: "/comps/tabs",
    image:
      "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=500&q=80",
  },
  {
    name: "Tooltip",
    href: "/comps/tooltips",
    image:
      "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=500&q=80",
  },
];

const variants1 = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

export default function Page() {
  return (
    <ContentLayout title="Components">
      <main className="p-4">
        <div className="px-4 sm:px-6">
          <div className="mx-auto w-full max-w-7xl">
            <h2 className="mb-6 text-2xl font-bold">Components</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {components.map((component, index) => (
                <Link href={component.href} className="block">
                  <div className="overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-all hover:shadow-md">
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <Image
                        src={component.image}
                        alt={component.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">
                        {component.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </ContentLayout>
  );
}
