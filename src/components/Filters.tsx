"use client";

import type { EquipmentKey } from "../types";
import { equipmentLabels, equipmentOptions } from "./equipment";
import styles from "./Filters.module.css";

type FiltersProps = {
  search: string;
  minCapacity: string;
  selectedEquipment: EquipmentKey[];
  showInactive: boolean;
  onSearchChange: (value: string) => void;
  onMinCapacityChange: (value: string) => void;
  onEquipmentToggle: (key: EquipmentKey) => void;
  onShowInactiveChange: (value: boolean) => void;
};

export default function Filters({
  search,
  minCapacity,
  selectedEquipment,
  showInactive,
  onSearchChange,
  onMinCapacityChange,
  onEquipmentToggle,
  onShowInactiveChange
}: FiltersProps) {
  return (
    <section className={styles.filters}>
      <label className={styles.field}>
        <span>Search rooms</span>
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Name or code"
        />
      </label>
      <label className={styles.field}>
        <span>Minimum seated capacity</span>
        <input
          type="number"
          min={0}
          value={minCapacity}
          onChange={(event) => onMinCapacityChange(event.target.value)}
          placeholder="e.g. 20"
        />
      </label>
      <fieldset className={styles.fieldset}>
        <legend>Equipment</legend>
        <div className={styles.checkboxGrid}>
          {equipmentOptions.map((key) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={selectedEquipment.includes(key)}
                onChange={() => onEquipmentToggle(key)}
              />
              {equipmentLabels[key]}
            </label>
          ))}
        </div>
      </fieldset>
      <label className={styles.toggle}>
        <input
          type="checkbox"
          checked={showInactive}
          onChange={(event) => onShowInactiveChange(event.target.checked)}
        />
        Show inactive rooms
      </label>
    </section>
  );
}
