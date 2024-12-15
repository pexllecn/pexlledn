export interface CalendarEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  type: "standup" | "meeting" | "work" | "social" | "other";
  tab: "all-events" | "shared" | "public" | "archived";
  description?: string;
}

export type ViewType = "day" | "week" | "month" | "year";
