"use client";

import { useEffect, useMemo, useState } from "react";
import MapCanvas from "../../src/components/MapCanvas";
import Filters from "../../src/components/Filters";
import RoomCard from "../../src/components/RoomCard";
import CompareTable from "../../src/components/CompareTable";
import type { EquipmentKey, Room } from "../../src/types";
import { getRooms } from "../../src/lib/api";
import styles from "./organizer.module.css";

export default function OrganizerPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [search, setSearch] = useState("");
  const [minCapacity, setMinCapacity] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentKey[]>(
    []
  );
  const [showInactive, setShowInactive] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [hoveredRoom, setHoveredRoom] = useState<Room | null>(null);
  const [compareRoomIds, setCompareRoomIds] = useState<string[]>([]);
  const [focusPolygonId, setFocusPolygonId] = useState<string | null>(null);

  useEffect(() => {
    const loadRooms = async () => {
      const data = await getRooms({ includeInactive: showInactive });
      setRooms(data);
    };

    loadRooms();
  }, [showInactive]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedRoom(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const minCapacityValue = minCapacity ? Number(minCapacity) : undefined;

  const matchesFilters = (room: Room) => {
    const searchValue = search.trim().toLowerCase();
    if (searchValue) {
      const matchesName = room.name.toLowerCase().includes(searchValue);
      const matchesCode = room.code.toLowerCase().includes(searchValue);
      if (!matchesName && !matchesCode) {
        return false;
      }
    }

    if (minCapacityValue !== undefined && !Number.isNaN(minCapacityValue)) {
      if (room.capacitySeated < minCapacityValue) {
        return false;
      }
    }

    if (selectedEquipment.length > 0) {
      const hasAll = selectedEquipment.every((item) =>
        room.equipment.includes(item)
      );
      if (!hasAll) {
        return false;
      }
    }

    return true;
  };

  const filteredRooms = useMemo(
    () => rooms.filter(matchesFilters),
    [rooms, search, minCapacityValue, selectedEquipment]
  );

  const dimmedRoomIds = useMemo(() => {
    const dimmed = new Set<string>();
    rooms.forEach((room) => {
      if (!matchesFilters(room)) {
        dimmed.add(room.id);
      }
    });
    return dimmed;
  }, [rooms, search, minCapacityValue, selectedEquipment]);

  const compareRooms = compareRoomIds
    .map((id) => rooms.find((room) => room.id === id))
    .filter((room): room is Room => Boolean(room));

  const handleToggleCompare = (room: Room) => {
    setCompareRoomIds((prev) => {
      if (prev.includes(room.id)) {
        return prev.filter((id) => id !== room.id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, room.id];
    });
  };

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    setFocusPolygonId(room.polygonId);
  };

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Organizer dashboard</h2>
          <p>Plan sessions and compare available rooms.</p>
        </div>
        <Filters
          search={search}
          minCapacity={minCapacity}
          selectedEquipment={selectedEquipment}
          showInactive={showInactive}
          onSearchChange={setSearch}
          onMinCapacityChange={setMinCapacity}
          onEquipmentToggle={(key) =>
            setSelectedEquipment((prev) =>
              prev.includes(key)
                ? prev.filter((item) => item !== key)
                : [...prev, key]
            )
          }
          onShowInactiveChange={setShowInactive}
        />
        <section className={styles.listSection}>
          <div className={styles.sectionHeader}>
            <h3>Rooms list</h3>
            <span>{filteredRooms.length} results</span>
          </div>
          {filteredRooms.length === 0 ? (
            <p className={styles.emptyState}>No rooms match filters.</p>
          ) : (
            <ul className={styles.roomList}>
              {filteredRooms.map((room) => (
                <li key={room.id}>
                  <button
                    type="button"
                    className={
                      selectedRoom?.id === room.id ? styles.activeRoom : ""
                    }
                    onClick={() => handleSelectRoom(room)}
                  >
                    <span>{room.code}</span>
                    <span>{room.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className={styles.sectionBlock}>
          <h3>Compare rooms (max 3)</h3>
          <CompareTable
            rooms={compareRooms}
            onRemove={(roomId) =>
              setCompareRoomIds((prev) => prev.filter((id) => id !== roomId))
            }
          />
        </section>
      </aside>
      <main className={styles.main}>
        <div className={styles.mapHeader}>
          <div>
            <h2>Floor 1 map</h2>
            <p className={styles.statusLine}>
              {hoveredRoom
                ? `Hovering: ${hoveredRoom.code} — ${hoveredRoom.name}`
                : "Hover over a room for quick info."}
            </p>
          </div>
          {selectedRoom && (
            <div className={styles.selectedBadge}>
              Selected: {selectedRoom.code}
            </div>
          )}
        </div>
        <div className={styles.mapArea}>
          <MapCanvas
            rooms={rooms}
            selectedRoomId={selectedRoom?.id}
            hoveredRoomId={hoveredRoom?.id}
            dimmedRoomIds={dimmedRoomIds}
            focusPolygonId={focusPolygonId}
            onSelectRoom={handleSelectRoom}
            onHoverRoom={setHoveredRoom}
          />
          <div className={styles.detailsPanel}>
            <RoomCard
              room={selectedRoom}
              isCompared={
                selectedRoom ? compareRoomIds.includes(selectedRoom.id) : false
              }
              onToggleCompare={handleToggleCompare}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
