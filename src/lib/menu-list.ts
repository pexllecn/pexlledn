import {
  Tag,
  User,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  DollarSign,
  MessageCircleMore,
  Kanban,
  Briefcase,
  MessageSquareQuote,
  CirclePlay,
  SquareDashedBottomCode,
  Inbox,
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
      groupLabel: "Main Pages",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/mail",
          label: "Mail",
          active: pathname.includes("/mail"),
          icon: Inbox,
          submenus: [],
          notificationCount: "New",
        },
        // {
        //   href: "/timeline",
        //   label: "Timeline",
        //   active: pathname.includes("/timeline"),
        //   icon: MessageSquareQuote,
        //   submenus: [],
        //   notificationCount: "",
        // },
        {
          href: "/messages",
          label: "Messages",
          active: pathname.includes("/messages"),
          icon: MessageCircleMore,
          submenus: [],
          notificationCount: "32",
        },
        {
          href: "/kanban",
          label: "Kanban",
          active: pathname.includes("/kanban"),
          icon: Kanban,
          submenus: [],
        },
        {
          href: "/user/1",
          label: "User Profile",
          active: pathname.includes("/user/1"),
          icon: User,
          submenus: [],
          notificationCount: "",
        },
        {
          href: "/music",
          label: "Music",
          active: pathname.includes("/music"),
          icon: CirclePlay,
          submenus: [],
          notificationCount: "New",
        },
        {
          href: "/playground",
          label: "Playground",
          active: pathname.includes("/playground"),
          icon: SquareDashedBottomCode,
          submenus: [],
          notificationCount: "New",
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
              notificationCount: "",
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
        {
          href: "/work",
          label: "Work",
          active: pathname.includes("/work"),
          icon: Briefcase,
          submenus: [],
          notificationCount: "",
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
