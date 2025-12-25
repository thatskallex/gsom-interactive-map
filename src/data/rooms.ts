import type { Room } from "../types";

export const rooms: Room[] = [
  {
    id: "a-1.01",
    code: "A-1.01",
    name: "Welcome Lounge",
    polygonId: "room-a-101",
    areaSqM: 42,
    capacitySeated: 18,
    equipment: ["sockets", "whiteboard"],
    notes: "Great for informal meetings.",
    isActive: true,
    floorId: "floor-1"
  },
  {
    id: "a-1.02",
    code: "A-1.02",
    name: "Seminar Room North",
    polygonId: "room-a-102",
    areaSqM: 56,
    capacitySeated: 28,
    equipment: ["projector", "whiteboard", "sockets"],
    notes: "Fixed seating in rows.",
    isActive: true,
    floorId: "floor-1"
  },
  {
    id: "a-1.03",
    code: "A-1.03",
    name: "Seminar Room South",
    polygonId: "room-a-103",
    areaSqM: 54,
    capacitySeated: 26,
    equipment: ["projector", "whiteboard", "mics"],
    isActive: true,
    floorId: "floor-1"
  },
  {
    id: "a-1.04",
    code: "A-1.04",
    name: "Hybrid Classroom",
    polygonId: "room-a-104",
    areaSqM: 62,
    capacitySeated: 30,
    equipment: ["projector", "whiteboard", "hybrid", "mics", "speakers"],
    notes: "Equipped for live streaming.",
    isActive: true,
    floorId: "floor-1"
  },
  {
    id: "a-1.05",
    code: "A-1.05",
    name: "Computer Lab",
    polygonId: "room-a-105",
    areaSqM: 72,
    capacitySeated: 24,
    equipment: ["computers", "projector", "sockets"],
    notes: "24 desktop stations.",
    isActive: true,
    floorId: "floor-1"
  },
  {
    id: "a-1.06",
    code: "A-1.06",
    name: "Case Room",
    polygonId: "room-a-106",
    areaSqM: 48,
    capacitySeated: 20,
    equipment: ["whiteboard", "projector"],
    notes: "U-shaped seating.",
    isActive: true,
    floorId: "floor-1"
  },
  {
    id: "a-1.07",
    code: "A-1.07",
    name: "Workshop Studio",
    polygonId: "room-a-107",
    areaSqM: 80,
    capacitySeated: 36,
    equipment: ["sockets", "whiteboard", "speakers"],
    notes: "Flexible furniture.",
    isActive: true,
    floorId: "floor-1"
  },
  {
    id: "a-1.08",
    code: "A-1.08",
    name: "Board Room",
    polygonId: "room-a-108",
    areaSqM: 40,
    capacitySeated: 16,
    equipment: ["projector", "whiteboard", "sockets"],
    notes: "Oval table.",
    isActive: true,
    floorId: "floor-1"
  },
  {
    id: "a-1.09",
    code: "A-1.09",
    name: "Quiet Study",
    polygonId: "room-a-109",
    areaSqM: 32,
    capacitySeated: 12,
    equipment: ["sockets"],
    isActive: false,
    floorId: "floor-1"
  },
  {
    id: "a-1.10",
    code: "A-1.10",
    name: "Innovation Hub",
    polygonId: "room-a-110",
    areaSqM: 68,
    capacitySeated: 32,
    equipment: ["projector", "whiteboard", "hybrid", "sockets"],
    notes: "Great for hackathons.",
    isActive: true,
    floorId: "floor-1"
  },
  {
    id: "a-1.11",
    code: "A-1.11",
    name: "Media Room",
    polygonId: "room-a-111",
    areaSqM: 46,
    capacitySeated: 18,
    equipment: ["speakers", "mics", "projector"],
    notes: "Recording-ready.",
    isActive: true,
    floorId: "floor-1"
  },
  {
    id: "a-1.12",
    code: "A-1.12",
    name: "Storage",
    polygonId: "room-a-112",
    areaSqM: 22,
    capacitySeated: 4,
    equipment: [],
    notes: "Staff only.",
    isActive: false,
    floorId: "floor-1"
  }
];
