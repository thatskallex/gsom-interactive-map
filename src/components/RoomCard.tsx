"use client";

import type { Room } from "../types";
import { equipmentLabels } from "./equipment";
import styles from "./RoomCard.module.css";

type RoomCardProps = {
  room: Room | null;
  isCompared: boolean;
  onToggleCompare: (room: Room) => void;
};

export default function RoomCard({
  room,
  isCompared,
  onToggleCompare
}: RoomCardProps) {
  if (!room) {
    return (
      <section className={styles.emptyState}>
        <h3>No room selected</h3>
        <p>Select a room on the map or list to see details.</p>
      </section>
    );
  }

  return (
    <section className={styles.card}>
      <header>
        <div>
          <p className={styles.code}>{room.code}</p>
          <h3>{room.name}</h3>
        </div>
        {!room.isActive && <span className={styles.inactive}>Inactive</span>}
      </header>
      <dl>
        <div>
          <dt>Seated capacity</dt>
          <dd>{room.capacitySeated}</dd>
        </div>
        <div>
          <dt>Area</dt>
          <dd>{room.areaSqM} m²</dd>
        </div>
        {room.capacityStanding && (
          <div>
            <dt>Standing capacity</dt>
            <dd>{room.capacityStanding}</dd>
          </div>
        )}
      </dl>
      <div>
        <h4>Equipment</h4>
        {room.equipment.length ? (
          <ul>
            {room.equipment.map((item) => (
              <li key={item}>{equipmentLabels[item]}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.muted}>No equipment listed.</p>
        )}
      </div>
      {room.notes && (
        <div>
          <h4>Notes</h4>
          <p>{room.notes}</p>
        </div>
      )}
      <button
        type="button"
        className={styles.compareButton}
        onClick={() => onToggleCompare(room)}
      >
        {isCompared ? "Remove from compare" : "Add to compare"}
      </button>
    </section>
  );
}
