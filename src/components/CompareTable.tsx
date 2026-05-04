"use client";

import type { Room } from "../types";
import { equipmentLabels } from "./equipment";
import styles from "./CompareTable.module.css";

type CompareTableProps = {
  rooms: Room[];
  onRemove: (roomId: string) => void;
};

export default function CompareTable({ rooms, onRemove }: CompareTableProps) {
  if (rooms.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No rooms selected for comparison.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Capacity</th>
            <th>Equipment</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.code}</td>
              <td>{room.name}</td>
              <td>{room.capacitySeated}</td>
              <td className={styles.equipmentCell}>
                {room.equipment.length
                  ? room.equipment.map((item) => equipmentLabels[item]).join(", ")
                  : "—"}
              </td>
              <td>
                <button type="button" onClick={() => onRemove(room.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
