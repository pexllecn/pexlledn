"use client";

import { Navbar } from "@/components/admin-panel/navbar";
import { useEffect, useState } from "react";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  const [pageTitle, setPageTitle] = useState(title);

  useEffect(() => {
    const fullTitle = document.title;
    const mainTitle = fullTitle.split("|")[0].trim();
    setPageTitle(mainTitle);
  }, []);

  return (
    <div>
      <Navbar title={pageTitle} />
      <div className="px-2">{children}</div>
    </div>
  );
}
