export type EquipmentKey =
  | "projector"
  | "whiteboard"
  | "mics"
  | "speakers"
  | "sockets"
  | "hybrid"
  | "computers";

export type Room = {
  id: string;
  code: string;
  name: string;
  polygonId: string;
  areaSqM: number;
  capacitySeated: number;
  capacityStanding?: number;
  equipment: EquipmentKey[];
  notes?: string;
  isActive: boolean;
  floorId: "floor-1";
};

export type Event = {
  id: string;
  title: string;
  description?: string;
  roomId: string;
  startsAt: string;
  endsAt: string;
};
