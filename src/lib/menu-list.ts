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
  Component,
  Calculator,
  Dumbbell,
  Landmark,
  Stethoscope,
  Plane,
  UtensilsCrossed,
  Clapperboard,
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
      groupLabel: "Home",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/kanban",
          label: "Kanban",
          active: pathname.includes("/kanban"),
          icon: Kanban,
          submenus: [],
        },
        {
          href: "/messages",
          label: "Messages",
          active: pathname.includes("/messages"),
          icon: MessageCircleMore,
          submenus: [],
          notificationCount: "32",
        },
        {
          href: "/mail",
          label: "Mail",
          active: pathname.includes("/mail"),
          icon: Inbox,
          submenus: [],
          notificationCount: "",
        },
      ],
    },
    {
      groupLabel: "Apps",
      menus: [
        {
          href: "",
          label: "Media",
          active: pathname.includes("/media"),
          icon: Clapperboard,
          submenus: [
            {
              href: "/media",
              label: "Overview",
              active: pathname === "/media",
            },
            {
              href: "/media/photos",
              label: "Photos",
              active: pathname === "/media/photos",
            },
            {
              href: "/media/music",
              label: "Music",
              active: pathname === "/media/music",
            },
            {
              href: "/media/videos",
              label: "Videos",
              active: pathname === "/media/videos",
            },
            {
              href: "/media/podcasts",
              label: "Podcasts",
              active: pathname === "/media/podcasts",
            },
            {
              href: "/media/live",
              label: "Live TV",
              active: pathname === "/media/live",
            },
            {
              href: "/media/library",
              label: "Library",
              active: pathname === "/media/library",
            },
            {
              href: "/media/settings",
              label: "Settings",
              active: pathname === "/media/settings",
            },
          ],
          notificationCount: "New",
        },
        {
          href: "",
          label: "Banking",
          active: pathname.includes("/banking"),
          icon: Landmark,
          submenus: [
            {
              href: "/banking",
              label: "Overview",
              active: pathname === "/banking",
            },
            {
              href: "/banking/cards",
              label: "Cards",
              active: pathname === "/banking/cards",
            },
            {
              href: "/banking/transactions",
              label: "Transactions",
              active: pathname === "/banking/transactions",
            },
            {
              href: "/banking/payments",
              label: "Payments",
              active: pathname === "/banking/payments",
            },
            {
              href: "/banking/investments",
              label: "Investments",
              active: pathname === "/banking/investments",
            },
          ],
        },
        {
          href: "",
          label: "Clinic",
          active: pathname.includes("/clinic"),
          icon: Stethoscope,
          submenus: [
            {
              href: "/clinic",
              label: "Overview",
              active: pathname === "/clinic",
            },
            {
              href: "/clinic/appointments",
              label: "Appointments",
              active: pathname === "/clinic/appointments",
            },
            {
              href: "/clinic/patients",
              label: "Patients",
              active: pathname === "/clinic/patients",
            },
            {
              href: "/clinic/staff",
              label: "Staff",
              active: pathname === "/clinic/staff",
            },
            {
              href: "/clinic/billing",
              label: "Billing",
              active: pathname === "/clinic/billing",
            },
          ],
        },
        {
          href: "",
          label: "Fitness",
          active: pathname.includes("/fitness"),
          icon: Dumbbell,
          submenus: [
            {
              href: "/fitness",
              label: "Overview",
              active: pathname === "/fitness",
            },
            {
              href: "/fitness/workouts",
              label: "Workouts",
              active: pathname === "/fitness/workouts",
            },
            {
              href: "/fitness/schedule",
              label: "Schedule",
              active: pathname === "/fitness/schedule",
              notificationCount: "New",
            },
            {
              href: "/fitness/nutrition",
              label: "Nutrition",
              active: pathname === "/fitness/nutrition",
            },
            {
              href: "/fitness/progress",
              label: "Progress",
              active: pathname === "/fitness/progress",
            },
          ],
        },
        {
          href: "/education",
          label: "Education",
          active: pathname.includes("/education"),
          icon: GraduationCap,
          submenus: [],
        },
        {
          href: "/logistics",
          label: "Logistics",
          active: pathname.includes("/logistics"),
          icon: Truck,
          submenus: [],
        },
        {
          href: "/medical",
          label: "Medical",
          active: pathname.includes("/medical"),
          icon: HeartPulse,
          submenus: [],
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
              label: "Real Estate Listings",
              active: pathname === "/realestate/redetails",
            },
            {
              href: "/realestate/reresults",
              label: "Search Results",
              active: pathname === "/realestate/reresults",
            },
          ],
        },
        {
          href: "",
          label: "Restaurant",
          active: pathname.includes("/restaurant"),
          icon: UtensilsCrossed,
          submenus: [
            {
              href: "/restaurant",
              label: "Overview",
              active: pathname === "/restaurant",
            },
            {
              href: "/restaurant/orders",
              label: "Orders",
              active: pathname === "/restaurant/orders",
            },
            {
              href: "/restaurant/menu",
              label: "Menu",
              active: pathname === "/restaurant/menu",
            },
            {
              href: "/restaurant/reservations",
              label: "Reservations",
              active: pathname === "/restaurant/reservations",
            },
            {
              href: "/restaurant/reviews",
              label: "Reviews",
              active: pathname === "/restaurant/reviews",
            },
          ],
        },
        {
          href: "",
          label: "Travel",
          active: pathname.includes("/travel"),
          icon: Plane,
          submenus: [
            {
              href: "/travel",
              label: "Overview",
              active: pathname === "/travel",
            },
            {
              href: "/travel/trips",
              label: "Trips",
              active: pathname === "/travel/trips",
            },
            {
              href: "/travel/flights",
              label: "Flights",
              active: pathname === "/travel/flights",
            },
            {
              href: "/travel/stays",
              label: "Stays",
              active: pathname === "/travel/stays",
            },
            {
              href: "/travel/explore",
              label: "Explore",
              active: pathname === "/travel/explore",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Workspace",
      menus: [
        {
          href: "/work",
          label: "Work",
          active: pathname.includes("/work"),
          icon: Briefcase,
          submenus: [],
        },
        {
          href: "/lead",
          label: "Leads",
          active: pathname.includes("/lead"),
          icon: Banknote,
          submenus: [],
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
            },
          ],
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
        },
        {
          href: "/cal",
          label: "Calculator",
          active: pathname.includes("/cal"),
          icon: Calculator,
          submenus: [],
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
      groupLabel: "Settings",
      menus: [
        {
          href: "",
          label: "Settings",
          active:
            pathname.includes("/users") ||
            pathname.includes("/teams") ||
            pathname.includes("/account") ||
            pathname.includes("/pricing"),
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
            {
              href: "/pricing",
              label: "Pricing",
              active: pathname.includes("/pricing"),
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Templates",
      menus: [
        {
          href: "/comps",
          label: "Components",
          active: pathname.includes("/comps"),
          icon: Component,
          submenus: [],
          notificationCount: "New",
        },
        {
          href: "/music",
          label: "Music",
          active: pathname === "/music",
          icon: CirclePlay,
          submenus: [],
        },
        {
          href: "/playground",
          label: "Playground",
          active: pathname.includes("/playground"),
          icon: SquareDashedBottomCode,
          submenus: [],
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
        },
        {
          href: "/register",
          label: "Register",
          active: pathname.includes("/register"),
          icon: ScanFace,
          submenus: [],
        },
      ],
    },
  ];
}
