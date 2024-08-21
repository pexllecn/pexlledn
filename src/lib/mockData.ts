// src/lib/mockData.ts

export interface MockPage {
  id: number;
  route: string;
  title: string;
  content: {
    [key: string]: string;
  };
}

export const mockPages: MockPage[] = [
  {
    id: 1,
    route: "/dashboard",
    title: "Dashboard Overview",
    content: {
      main: "This is the main dashboard page. It provides an overview of key metrics and recent activity.",
      metrics:
        "View your daily active users, revenue, and conversion rates at a glance.",
      activity: "Recent user signups and purchases are displayed here."
    }
  },
  {
    id: 2,
    route: "/users",
    title: "User Management",
    content: {
      main: "Manage user accounts and permissions from this central hub.",
      list: "View a list of all registered users with options to edit or delete accounts.",
      roles: "Assign and manage user roles and permissions."
    }
  },
  {
    id: 3,
    route: "/content",
    title: "Content Management",
    content: {
      main: "Create and edit website content, including pages and blog posts.",
      editor: "Use our rich text editor to create engaging content.",
      media: "Manage your media library, including images and videos."
    }
  },
  {
    id: 4,
    route: "/analytics",
    title: "Analytics",
    content: {
      main: "View detailed website analytics and statistics.",
      traffic: "Analyze your website traffic patterns and sources.",
      conversion: "Track conversion rates and optimize your funnel."
    }
  },
  {
    id: 5,
    route: "/account",
    title: "Account",
    content: {
      main: "Configure application settings and preferences.",
      general: "Adjust global parameters like site name and timezone.",
      integrations: "Set up and manage third-party integrations."
    }
  }
];
