import type { Event } from "../types";

const buildTodayISO = (hour: number, minute: number) => {
  const now = new Date();
  const date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0,
    0
  );
  return date.toISOString();
};

export const events: Event[] = [
  {
    id: "event-001",
    title: "Admissions Briefing",
    description: "Overview of GSOM programs.",
    roomId: "a-1.02",
    startsAt: buildTodayISO(9, 0),
    endsAt: buildTodayISO(10, 0)
  },
  {
    id: "event-002",
    title: "Startup Pitch Practice",
    roomId: "a-1.04",
    startsAt: buildTodayISO(10, 30),
    endsAt: buildTodayISO(11, 30)
  },
  {
    id: "event-003",
    title: "Research Lab Tour",
    roomId: "a-1.05",
    startsAt: buildTodayISO(11, 0),
    endsAt: buildTodayISO(12, 0)
  },
  {
    id: "event-004",
    title: "MBA Info Session",
    roomId: "a-1.06",
    startsAt: buildTodayISO(12, 30),
    endsAt: buildTodayISO(13, 15)
  },
  {
    id: "event-005",
    title: "Faculty Roundtable",
    roomId: "a-1.08",
    startsAt: buildTodayISO(13, 30),
    endsAt: buildTodayISO(14, 30)
  },
  {
    id: "event-006",
    title: "Analytics Workshop",
    roomId: "a-1.07",
    startsAt: buildTodayISO(14, 0),
    endsAt: buildTodayISO(15, 30)
  },
  {
    id: "event-007",
    title: "Career Services Q&A",
    roomId: "a-1.10",
    startsAt: buildTodayISO(15, 0),
    endsAt: buildTodayISO(15, 45)
  },
  {
    id: "event-008",
    title: "Student Meet & Greet",
    roomId: "a-1.01",
    startsAt: buildTodayISO(16, 0),
    endsAt: buildTodayISO(17, 0)
  },
  {
    id: "event-009",
    title: "Media Demo",
    roomId: "a-1.11",
    startsAt: buildTodayISO(17, 15),
    endsAt: buildTodayISO(18, 0)
  },
  {
    id: "event-010",
    title: "Evening Networking",
    roomId: "a-1.04",
    startsAt: buildTodayISO(18, 30),
    endsAt: buildTodayISO(19, 30)
  }
];
