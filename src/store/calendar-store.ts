import { create } from "zustand";
import { addDays, addMonths, setHours, setMinutes } from "date-fns";
import { CalendarEvent, ViewType } from "../types/calendar";

interface CalendarStore {
  events: CalendarEvent[];
  view: ViewType;
  selectedDate: Date;
  activeTab: "all-events" | "shared" | "public" | "archived";
  selectedEvent: CalendarEvent | null;
  addEvent: (event: CalendarEvent) => void;
  setView: (view: ViewType) => void;
  setSelectedDate: (date: Date) => void;
  setActiveTab: (tab: "all-events" | "shared" | "public" | "archived") => void;
  setSelectedEvent: (event: CalendarEvent | null) => void;
  isAddEventOpen: boolean;
  setAddEventOpen: (isOpen: boolean) => void;
  editEvent: (updatedEvent: CalendarEvent) => void;
}

const today = new Date();

const generateRandomEvents = (
  startDate: Date,
  count: number
): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const eventTypes: CalendarEvent["type"][] = [
    "standup",
    "meeting",
    "work",
    "social",
    "other",
  ];
  const eventTabs: CalendarEvent["tab"][] = [
    "all-events",
    "shared",
    "public",
    "archived",
  ];

  for (let i = 0; i < count; i++) {
    const randomDays = Math.floor(Math.random() * 60); // Random day within next 60 days
    const eventDate = addDays(startDate, randomDays);
    const startHour = Math.floor(Math.random() * 12) + 8; // Random hour between 8 AM and 8 PM
    const duration = Math.floor(Math.random() * 3) + 1; // Random duration between 1 and 3 hours

    const event: CalendarEvent = {
      id: `event-${i + 1}`,
      title: `Event ${i + 1}`,
      startTime: setMinutes(setHours(eventDate, startHour), 0),
      endTime: setMinutes(setHours(eventDate, startHour + duration), 0),
      type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      tab: eventTabs[Math.floor(Math.random() * eventTabs.length)],
      description: `This is a randomly generated event ${i + 1}.`,
    };

    events.push(event);
  }

  return events;
};

export const useCalendarStore = create<CalendarStore>((set) => ({
  events: [
    {
      id: "1",
      title: "Team Meeting",
      startTime: setHours(setMinutes(today, 0), 10),
      endTime: setHours(setMinutes(today, 0), 11),
      type: "meeting",
      tab: "all-events",
      description: "Weekly team sync to discuss progress and blockers.",
    },
    ...generateRandomEvents(today, 15), // Generate 15 random events
  ],
  view: "month", // Set default view to 'month'
  selectedDate: today,
  activeTab: "all-events",
  selectedEvent: null,
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  setView: (view) => set({ view }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  isAddEventOpen: false,
  setAddEventOpen: (isOpen) => set({ isAddEventOpen: isOpen }),
  editEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    })),
}));
