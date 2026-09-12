"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutGrid,
  Columns3,
  MessageCircle,
  Mail,
  Search,
  PanelLeft,
  Moon,
  Sun,
  ArrowUpRight,
  Bell,
  Sparkles,
  Command,
  ChevronRight,
} from "lucide-react";
import { Avatar, IconButton, Modal, SearchField } from "./primitives";
import "./workspace.css";

const navigation = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutGrid,
    hint: "Your business at a glance",
  },
  {
    href: "/kanban",
    label: "Projects",
    icon: Columns3,
    hint: "Plan and organize your work",
  },
  {
    href: "/messages",
    label: "Messages",
    icon: MessageCircle,
    hint: "Keep the conversation going",
  },
  {
    href: "/mail",
    label: "Mail",
    icon: Mail,
    hint: "A little more focus for your inbox",
  },
];
export const isWorkspaceRoute = (path: string) =>
  navigation.some((item) => item.href === path);

export function WorkspaceShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [appsOpen, setAppsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setSearchOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
  const active = navigation.find((item) => item.href === path)!;
  return (
    <div
      className={`ws-theme ws-shell ${sidebarOpen ? "" : "sidebar-collapsed"}`}
    >
      <a className="ws-skip" href="#workspace-main">
        Skip to content
      </a>
      <aside className="ws-sidebar" aria-label="Workspace navigation">
        <Link href="/dashboard" className="ws-brand">
          <span className="ws-brand-icon">
            <Command size={22} />
          </span>
          <span>
            Pexlle
            <span className="ws-brand-caption">Your everyday workspace</span>
          </span>
        </Link>
        <button
          className="ws-search-trigger"
          onClick={() => setSearchOpen(true)}
        >
          <Search size={16} />
          <span>Search workspace</span>
          <kbd>⌘ K</kbd>
        </button>
        <p className="ws-nav-label">WORKSPACE</p>
        <nav>
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`ws-nav-item ${path === href ? "active" : ""}`}
              aria-current={path === href ? "page" : undefined}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
              {path === href && <span className="ws-active-dot" />}
            </Link>
          ))}
        </nav>
        <div className="ws-sidebar-divider" />
        <p className="ws-nav-label">DISCOVER</p>
        <Link href="/noti" className="ws-nav-item">
          <Sparkles size={19} />
          <span>Dynamic Island</span>
          <ArrowUpRight size={14} />
        </Link>
        <button className="ws-nav-item" onClick={() => setAppsOpen(true)}>
          <LayoutGrid size={19} />
          <span>All apps</span>
          <ChevronRight size={14} />
        </button>
        <div className="ws-sidebar-bottom">
          <div className="ws-workspace-note">
            <span className="ws-note-icon">
              <Sparkles size={18} />
            </span>
            <strong>A place for your best work.</strong>
            <p>Less noise. More possibility.</p>
          </div>
          <Link href="/account" className="ws-profile">
            <Avatar name="Khaled Alkurdi" />
            <span>
              <strong>Khaled Alkurdi</strong>
              <small>Personal workspace</small>
            </span>
            <ChevronRight size={15} />
          </Link>
        </div>
      </aside>
      <div className="ws-main-wrap">
        <header className="ws-toolbar">
          <div>
            <IconButton
              label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
              onClick={() => setSidebarOpen((value) => !value)}
            >
              <PanelLeft size={19} />
            </IconButton>
            <span className="ws-toolbar-divider" />
            <span className="ws-toolbar-parent">Workspace</span>
            <ChevronRight size={13} />
            <strong>{active.label}</strong>
          </div>
          <div>
            <span className="ws-demo-indicator">
              <span />
              Sample workspace
            </span>
            <IconButton
              label="Search workspace"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={18} />
            </IconButton>
            <IconButton
              label="Toggle light and dark appearance"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              <Sun className="ws-light-icon" size={18} />
              <Moon className="ws-dark-icon" size={18} />
            </IconButton>
            <Link
              href="/noti"
              className="ws-icon-button"
              aria-label="Open Dynamic Island notifications"
            >
              <Bell size={18} />
            </Link>
          </div>
        </header>
        <main id="workspace-main" tabIndex={-1} className="ws-main">
          {children}
        </main>
      </div>
      <nav className="ws-mobile-nav" aria-label="Main navigation">
        {navigation.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={path === href ? "page" : undefined}
          >
            <Icon size={21} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <Modal
        open={searchOpen}
        onOpenChange={setSearchOpen}
        title="Find your flow."
        description="Jump to a space in your workspace."
      >
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search pages…"
        />{" "}
        <div className="ws-jump-list">
          {navigation
            .filter((item) =>
              `${item.label} ${item.hint}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map(({ href, label, hint, icon: Icon }) => (
              <Link href={href} key={href} onClick={() => setSearchOpen(false)}>
                <Icon size={22} />
                <span>
                  <strong>{label}</strong>
                  <small>{hint}</small>
                </span>
                <ChevronRight size={17} />
              </Link>
            ))}
          {!navigation.some((item) =>
            `${item.label} ${item.hint}`
              .toLowerCase()
              .includes(query.toLowerCase()),
          ) && <p>No matching pages.</p>}
        </div>
      </Modal>
      <Modal
        open={appsOpen}
        onOpenChange={setAppsOpen}
        title="A world of possibilities."
        description="Explore the rest of your Pexlle workspace."
      >
        <div className="ws-app-grid">
          {[
            ["Apple Design", "apple"],
            ["Music", "music"],
            ["Banking", "banking"],
            ["Clinic", "clinic"],
            ["Education", "education"],
            ["Fitness", "fitness"],
            ["Logistics", "logistics"],
            ["Medical", "medical"],
            ["Real Estate", "realestate"],
            ["Restaurant", "restaurant"],
            ["Travel", "travel"],
            ["Work", "work"],
            ["Leads", "lead"],
            ["Social", "social"],
            ["Calculator", "cal"],
            ["Components", "comps"],
            ["Playground", "playground"],
            ["Settings", "account"],
          ].map(([name, route]) => (
            <Link
              key={route}
              href={`/${route}`}
              onClick={() => setAppsOpen(false)}
            >
              {name}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </div>
      </Modal>
    </div>
  );
}
