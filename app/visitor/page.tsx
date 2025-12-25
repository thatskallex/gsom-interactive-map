"use client";

import { useEffect, useMemo, useState } from "react";
import MapCanvas, { type RoomStatus } from "../../src/components/MapCanvas";
import type { Event, Room } from "../../src/types";
import { getEvents, getRooms } from "../../src/lib/api";
import styles from "./visitor.module.css";

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

export default function VisitorPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<Room | null>(null);
  const [focusPolygonId, setFocusPolygonId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const [roomData, eventData] = await Promise.all([
        getRooms({ includeInactive: false }),
        getEvents()
      ]);
      setRooms(roomData);
      setEvents(eventData);
    };

    loadData();
  }, []);

  const roomsById = useMemo(() => {
    const map = new Map<string, Room>();
    rooms.forEach((room) => map.set(room.id, room));
    return map;
  }, [rooms]);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return events;
    }
    return events.filter((event) => {
      const room = roomsById.get(event.roomId);
      const matchesTitle = event.title.toLowerCase().includes(query);
      const matchesRoom = room?.code.toLowerCase().includes(query) ?? false;
      return matchesTitle || matchesRoom;
    });
  }, [events, roomsById, search]);

  const statusByRoomId = useMemo(() => {
    const map: Record<string, RoomStatus> = {};
    const now = new Date();
    const soonThreshold = new Date(now.getTime() + 30 * 60 * 1000);

    events.forEach((event) => {
      const start = new Date(event.startsAt);
      const end = new Date(event.endsAt);
      if (start <= now && end >= now) {
        map[event.roomId] = "now";
      } else if (start > now && start <= soonThreshold) {
        if (!map[event.roomId]) {
          map[event.roomId] = "soon";
        }
      }
    });

    return map;
  }, [events]);

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    setFocusPolygonId(room.polygonId);
  };

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Visitor guide</h2>
          <p>See what is happening on the floor right now.</p>
        </div>
        <label className={styles.searchField}>
          <span>Search events or rooms</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="e.g. MBA, A-1.04"
          />
        </label>
        <section className={styles.legend}>
          <h3>Status legend</h3>
          <div>
            <span className={`${styles.dot} ${styles.now}`} /> Now
          </div>
          <div>
            <span className={`${styles.dot} ${styles.soon}`} /> Starting soon
          </div>
        </section>
        <section className={styles.eventList}>
          <h3>Today&apos;s events</h3>
          {filteredEvents.length === 0 ? (
            <p className={styles.emptyState}>No events match your search.</p>
          ) : (
            <ul>
              {filteredEvents.map((event) => {
                const room = roomsById.get(event.roomId);
                return (
                  <li key={event.id}>
                    <button
                      type="button"
                      onClick={() => room && handleSelectRoom(room)}
                    >
                      <div>
                        <strong>{event.title}</strong>
                        <span>
                          {formatTime(event.startsAt)} - {formatTime(event.endsAt)}
                        </span>
                      </div>
                      <span className={styles.roomBadge}>
                        {room?.code ?? "Unknown"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </aside>
      <main className={styles.main}>
        <div className={styles.mapHeader}>
          <div>
            <h2>Floor 1 map</h2>
            <p>
              {hoveredRoom
                ? `Hovering: ${hoveredRoom.code} — ${hoveredRoom.name}`
                : "Hover over a room to see details."}
            </p>
          </div>
          {selectedRoom && (
            <div className={styles.selectedBadge}>
              Selected: {selectedRoom.code}
            </div>
          )}
        </div>
        <MapCanvas
          rooms={rooms}
          selectedRoomId={selectedRoom?.id}
          hoveredRoomId={hoveredRoom?.id}
          statusByRoomId={statusByRoomId}
          focusPolygonId={focusPolygonId}
          onSelectRoom={handleSelectRoom}
          onHoverRoom={setHoveredRoom}
        />
      </main>
    </div>
  );
}
