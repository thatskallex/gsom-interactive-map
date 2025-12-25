"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent
} from "react";
import type { Room } from "../types";
import styles from "./MapCanvas.module.css";

export type RoomStatus = "now" | "soon";

type MapCanvasProps = {
  rooms: Room[];
  selectedRoomId?: string | null;
  hoveredRoomId?: string | null;
  dimmedRoomIds?: Set<string>;
  statusByRoomId?: Record<string, RoomStatus>;
  onSelectRoom?: (room: Room) => void;
  onHoverRoom?: (room: Room | null) => void;
  focusPolygonId?: string | null;
};

export default function MapCanvas({
  rooms,
  selectedRoomId,
  hoveredRoomId,
  dimmedRoomIds,
  statusByRoomId,
  onSelectRoom,
  onHoverRoom,
  focusPolygonId
}: MapCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const panZoomRef = useRef<any>(null);
  const [svgContent, setSvgContent] = useState<string>("");

  const roomByPolygonId = useMemo(() => {
    const mapping = new Map<string, Room>();
    rooms.forEach((room) => mapping.set(room.polygonId, room));
    return mapping;
  }, [rooms]);

  const polygonIds = useMemo(
    () => new Set(rooms.map((room) => room.polygonId)),
    [rooms]
  );

  useEffect(() => {
    const loadSvg = async () => {
      const response = await fetch("/floors/floor-1.svg");
      const text = await response.text();
      setSvgContent(text);
    };

    loadSvg();
  }, []);

  useEffect(() => {
    if (!svgContent || !containerRef.current) {
      return;
    }

    const svgElement = containerRef.current.querySelector("svg");
    if (!svgElement) {
      return;
    }

    svgRef.current = svgElement as SVGSVGElement;

    const applyBaseClasses = () => {
      polygonIds.forEach((id) => {
        const element = svgElement.querySelector(`#${id}`);
        if (element) {
          element.classList.add(styles.roomShape);
        }
      });
    };

    applyBaseClasses();

    let isMounted = true;

    const initPanZoom = async () => {
      const svgPanZoom = (await import("svg-pan-zoom")).default;
      if (!isMounted) {
        return;
      }
      panZoomRef.current = svgPanZoom(svgElement, {
        zoomEnabled: true,
        controlIconsEnabled: false,
        fit: true,
        center: true,
        minZoom: 0.5,
        maxZoom: 6,
        zoomScaleSensitivity: 0.3,
        dblClickZoomEnabled: false,
        mouseWheelZoomEnabled: true
      });
    };

    initPanZoom();

    return () => {
      isMounted = false;
      panZoomRef.current?.destroy();
    };
  }, [svgContent, polygonIds]);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    rooms.forEach((room) => {
      const element = svgRef.current?.querySelector(`#${room.polygonId}`);
      if (!element) {
        return;
      }
      element.classList.toggle(
        styles.roomSelected,
        selectedRoomId === room.id
      );
      element.classList.toggle(
        styles.roomHovered,
        hoveredRoomId === room.id
      );
      element.classList.toggle(
        styles.roomDimmed,
        dimmedRoomIds?.has(room.id) ?? false
      );
      element.classList.toggle(
        styles.roomNow,
        statusByRoomId?.[room.id] === "now"
      );
      element.classList.toggle(
        styles.roomSoon,
        statusByRoomId?.[room.id] === "soon"
      );
    });
  }, [rooms, selectedRoomId, hoveredRoomId, dimmedRoomIds, statusByRoomId]);

  useEffect(() => {
    if (!focusPolygonId || !svgRef.current || !panZoomRef.current) {
      return;
    }

    const element = svgRef.current.querySelector(
      `#${focusPolygonId}`
    ) as SVGGraphicsElement | null;
    if (!element) {
      return;
    }

    const bbox = element.getBBox();
    const panZoom = panZoomRef.current;
    const sizes = panZoom.getSizes();
    const zoom = Math.min(
      3,
      Math.max(
        1.2,
        Math.min(sizes.width / bbox.width, sizes.height / bbox.height) * 0.6
      )
    );

    const center = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };

    panZoom.zoom(zoom);
    panZoom.pan({
      x: sizes.width / 2 - center.x * zoom,
      y: sizes.height / 2 - center.y * zoom
    });
  }, [focusPolygonId]);

  const resolveRoomFromEvent = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const target = event.target as Element | null;
      if (!target) {
        return null;
      }
      const roomElement = target.closest("[id]");
      if (!roomElement) {
        return null;
      }
      const polygonId = roomElement.getAttribute("id");
      if (!polygonId || !polygonIds.has(polygonId)) {
        return null;
      }
      return roomByPolygonId.get(polygonId) ?? null;
    },
    [polygonIds, roomByPolygonId]
  );

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const room = resolveRoomFromEvent(event);
    onHoverRoom?.(room ?? null);
  };

  const handlePointerLeave = () => {
    onHoverRoom?.(null);
  };

  const handleClick = (event: PointerEvent<HTMLDivElement>) => {
    const room = resolveRoomFromEvent(event);
    if (room) {
      onSelectRoom?.(room);
    }
  };

  const handleZoomIn = () => panZoomRef.current?.zoomIn();
  const handleZoomOut = () => panZoomRef.current?.zoomOut();
  const handleReset = () => {
    panZoomRef.current?.resetZoom();
    panZoomRef.current?.center();
    panZoomRef.current?.fit();
  };

  return (
    <div className={styles.canvasWrapper}>
      <div className={styles.controls}>
        <button type="button" onClick={handleZoomIn}>
          +
        </button>
        <button type="button" onClick={handleZoomOut}>
          −
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div
        ref={containerRef}
        className={styles.canvas}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
}
