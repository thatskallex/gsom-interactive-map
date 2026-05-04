import type { EquipmentKey } from "../types";

export const equipmentLabels: Record<EquipmentKey, string> = {
  projector: "Projector",
  whiteboard: "Whiteboard",
  mics: "Microphones",
  speakers: "Speakers",
  sockets: "Power sockets",
  hybrid: "Hybrid setup",
  computers: "Computers"
};

export const equipmentOptions = Object.keys(
  equipmentLabels
) as EquipmentKey[];
