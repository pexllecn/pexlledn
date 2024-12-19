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
  Truck,
  MessageSquareQuote,
  CirclePlay,
  SquareDashedBottomCode,
  Inbox,
  Banknote,
  BookOpenText,
  UserCog,
  GraduationCap,
  Store,
  Building,
  CalendarDays,
  LogIn,
  ScanFace,
  Vibrate,
  HeartPulse,
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
        // {
        //   href: "/calendar",
        //   label: "Calendar",
        //   active: pathname.includes("/calendar"),
        //   icon: CalendarDays,
        //   submenus: [],
        //   notificationCount: "New",
        // },
        {
          href: "/kanban",
          label: "Kanban",
          active: pathname.includes("/kanban"),
          icon: Kanban,
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
        {
          href: "/lead",
          label: "Leads",
          active: pathname.includes("/lead"),
          icon: Banknote,
          submenus: [],
          notificationCount: "",
        },
        {
          href: "/education",
          label: "Education",
          active: pathname.includes("/education"),
          icon: GraduationCap,
          submenus: [],
          notificationCount: "",
        },
        {
          href: "/logistics",
          label: "Logistics",
          active: pathname.includes("/logistics"),
          icon: Truck,
          submenus: [],
          notificationCount: "",
        },
        {
          href: "/medical",
          label: "Medical",
          active: pathname.includes("/medical"),
          icon: HeartPulse,
          submenus: [],
          notificationCount: "New",
        },
        {
          href: "",
          label: "Real Estate",
          active: pathname.includes("/realestate"),
          icon: Building,
          submenus: [
            {
              href: "/realestate",
              label: "Building Management",
              active: pathname === "/realestate",
            },
            {
              href: "/realestate/redetails",
              label: "Real Estate lisings",
              active: pathname === "/realestate/redetails",
            },
            {
              href: "/realestate/reresults",
              label: "Search Results",
              active: pathname === "/realestate/reresults",
              notificationCount: "New",
            },
          ],
          notificationCount: "New",
        },
        {
          href: "",
          label: "Social",
          active: pathname.includes("/social"),
          icon: BookOpenText,
          submenus: [
            {
              href: "/social",
              label: "Social Timeline",
              active: pathname === "/social",
            },
            {
              href: "/social/profile",
              label: "Profile",
              active: pathname === "/social/profile",
              notificationCount: "",
            },
          ],
          notificationCount: "",
        },
        {
          href: "",
          label: "E-commerce",
          active: pathname.includes("/user/1"),
          icon: Store,
          submenus: [
            {
              href: "/user/1",
              label: "User Profile",
              active: pathname.includes("/user/1"),
              notificationCount: "",
            },
            {
              href: "/posts",
              label: "Post Details",
              active: pathname === "/posts",
            },
            {
              href: "/posts/new",
              label: "All Posts",
              active: pathname === "/posts/new",
              notificationCount: "",
            },
            {
              href: "/categories",
              label: "Categories",
              active: pathname.includes("/categories"),
            },
            {
              href: "/filters",
              label: "Filters",
              active: pathname.includes("/filters"),
            },
          ],
          notificationCount: "",
        },
        {
          href: "",
          label: "Settings",
          active: pathname.includes("/users"),
          icon: Settings,
          submenus: [
            {
              href: "/users",
              label: "Users",
              active: pathname.includes("/users"),
            },
            {
              href: "/teams",
              label: "Team Members",
              active: pathname.includes("/teams"),
            },
            {
              href: "/account",
              label: "Account",
              active: pathname.includes("/account"),
            },
          ],
          notificationCount: "",
        },
        {
          href: "/noti",
          label: "Dynamic Island",
          active: pathname.includes("/noti"),
          icon: Vibrate,
          submenus: [],
          notificationCount: "New",
        },
      ],
    },
    {
      groupLabel: "Authentication",
      menus: [
        {
          href: "/signin",
          label: "Sign in",
          active: pathname.includes("/signin"),
          icon: LogIn,
          submenus: [],
          notificationCount: "",
        },
        {
          href: "/register",
          label: "Register",
          active: pathname.includes("/register"),
          icon: ScanFace,
          submenus: [],
          notificationCount: "",
        },
      ],
    },
    {
      groupLabel: "Shadcn Templates",
      menus: [
        {
          href: "/mail",
          label: "Mail",
          active: pathname.includes("/mail"),
          icon: Inbox,
          submenus: [],
          notificationCount: "",
        },
        {
          href: "/music",
          label: "Music",
          active: pathname.includes("/music"),
          icon: CirclePlay,
          submenus: [],
          notificationCount: "",
        },
        {
          href: "/playground",
          label: "Playground",
          active: pathname.includes("/playground"),
          icon: SquareDashedBottomCode,
          submenus: [],
          notificationCount: "",
        },
      ],
    },
  ];
}
