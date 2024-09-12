import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  DollarSign,
  MessageCircleMore,
  Kanban,
  MessageSquareQuote,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  notificationCount?: string | number; // Allow both string and number
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
  notificationCount?: string | number; // Allow both string and number
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/timeline",
          label: "Timeline",
          active: pathname.includes("/timeline"),
          icon: MessageSquareQuote,
          submenus: [],
          notificationCount: "New",
        },
        {
          href: "/messages",
          label: "Messages",
          active: pathname.includes("/messages"),
          icon: MessageCircleMore,
          submenus: [],
          notificationCount: 3,
        },
        {
          href: "/kanban",
          label: "Kanban",
          active: pathname.includes("/kanban"),
          icon: Kanban,
          submenus: [],
          notificationCount: 546,
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          active: pathname.includes("/posts"),
          icon: SquarePen,
          submenus: [
            {
              href: "/posts",
              label: "All Posts",
              active: pathname === "/posts",
            },
            {
              href: "/posts/new",
              label: "New Post",
              active: pathname === "/posts/new",
              notificationCount: "draft",
            },
          ],
        },
        {
          href: "/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/filters",
          label: "Filters",
          active: pathname.includes("/filters"),
          icon: Tag,
          submenus: [],
        },
        {
          href: "/pricing",
          label: "Pricing",
          active: pathname.includes("/pricing"),
          icon: DollarSign,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
