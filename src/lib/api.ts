import type { EquipmentKey, Event, Room } from "../types";
import { events } from "../data/events";
import { rooms } from "../data/rooms";

export type GetRoomsParams = {
  search?: string;
  minCapacity?: number;
  equipment?: EquipmentKey[];
  floorId?: string;
  includeInactive?: boolean;
};

export type GetEventsParams = {
  dateISO?: string;
  search?: string;
};

const normalize = (value: string) => value.trim().toLowerCase();

export const getRooms = async (params: GetRoomsParams = {}): Promise<Room[]> => {
  const {
    search = "",
    minCapacity,
    equipment = [],
    floorId,
    includeInactive = false
  } = params;
  const searchValue = normalize(search);

  return rooms.filter((room) => {
    if (!includeInactive && !room.isActive) {
      return false;
    }

    if (floorId && room.floorId !== floorId) {
      return false;
    }

    if (Number.isFinite(minCapacity) && minCapacity !== undefined) {
      if (room.capacitySeated < minCapacity) {
        return false;
      }
    }

    if (equipment.length > 0) {
      const hasAll = equipment.every((item) => room.equipment.includes(item));
      if (!hasAll) {
        return false;
      }
    }

    if (searchValue.length > 0) {
      const matchesName = normalize(room.name).includes(searchValue);
      const matchesCode = normalize(room.code).includes(searchValue);
      if (!matchesName && !matchesCode) {
        return false;
      }
    }

    return true;
  });
};

export const getRoom = async (id: string): Promise<Room | null> => {
  return rooms.find((room) => room.id === id) ?? null;
};

export const getEvents = async (params: GetEventsParams = {}): Promise<Event[]> => {
  const { dateISO, search = "" } = params;
  const searchValue = normalize(search);

  return events.filter((event) => {
    if (dateISO) {
      const eventDate = event.startsAt.slice(0, 10);
      if (eventDate !== dateISO.slice(0, 10)) {
        return false;
      }
    }

    if (searchValue.length > 0) {
      const matchesTitle = normalize(event.title).includes(searchValue);
      if (!matchesTitle) {
        return false;
      }
    }

    return true;
  });
};

export const getEventsForRoom = async (roomId: string): Promise<Event[]> => {
  return events.filter((event) => event.roomId === roomId);
};
