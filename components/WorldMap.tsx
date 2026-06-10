"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

const GEO = "/countries-110m.json";

const HUB: [number, number] = [55.3, 25.2]; // Dubai
const OFFICES: { name: string; coords: [number, number] }[] = [
  { name: "Dubai", coords: [55.3, 25.2] },
  { name: "Europe", coords: [8, 48] },
  { name: "Costa Rica", coords: [-84, 9.9] },
  { name: "Singapore", coords: [103.8, 1.35] },
  { name: "New York", coords: [-74, 40.7] },
];

export default function WorldMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
  }, []);
  // desktop: re-triggers (rolls back on scroll up). mobile: lighter, plays once.
  const revealed = useInView(ref, { once: isMobile, margin: "-15% 0px -15% 0px" });
  const [hovered, setHovered] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className="relative w-full"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
    >
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 205, center: [0, 10] }}
        width={980}
        height={460}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO}>
          {({ geographies }: { geographies: Array<{ rsmKey: string; properties: { name: string } }> }) =>
            geographies.map((geo, i) => {
              // each country flies in from a scattered offset and collides into place
              const ang = i * 2.39996; // golden angle
              const dist = 70 + ((i * 53) % 90);
              const dx = Math.cos(ang) * dist;
              const dy = Math.sin(ang) * dist;
              const delay = Math.min(i, 170) * 6;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHovered(geo.properties.name)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    default: {
                      fill: "rgb(var(--c-surface))",
                      stroke: "rgb(var(--c-bg))",
                      strokeWidth: 0.5,
                      outline: "none",
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      opacity: revealed ? 1 : 0,
                      // mobile: opacity-only reveal (skip the heavy 177-path scatter transform)
                      transform: isMobile
                        ? undefined
                        : revealed
                          ? "translate(0px,0px) scale(1)"
                          : `translate(${dx}px,${dy}px) scale(0.35)`,
                      transition: isMobile
                        ? `opacity 450ms ease ${Math.min(delay, 300)}ms, fill 250ms ease`
                        : `transform 750ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, opacity 520ms ease ${delay}ms, fill 250ms ease, filter 250ms ease`,
                    },
                    hover: {
                      fill: "#4F7CFE",
                      stroke: "#4ADEDE",
                      strokeWidth: 0.9,
                      outline: "none",
                      cursor: "pointer",
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      filter: "drop-shadow(0 0 7px rgba(79,124,254,0.9))",
                      transition: "fill 200ms ease, filter 200ms ease",
                    },
                    pressed: { fill: "#172D9D", outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* connection arcs drawing out from the Dubai hub */}
        {revealed &&
          OFFICES.filter((o) => o.name !== "Dubai").map((o, i) => (
            <Line
              key={o.name}
              from={HUB}
              to={o.coords}
              stroke="#4ADEDE"
              strokeWidth={1.3}
              strokeLinecap="round"
              className="arc-draw"
              style={{ animationDelay: `${1100 + i * 220}ms`, pointerEvents: "none" }}
            />
          ))}

        {/* markers pop in after the map builds */}
        {revealed &&
          OFFICES.map((o, i) => (
            <Marker key={o.name} coordinates={o.coords} style={{ default: { pointerEvents: "none" } }}>
              <circle
                r={9}
                className="origin-center animate-ping fill-brand-cyan/40 [transform-box:fill-box]"
                style={{ animationDelay: `${900 + i * 120}ms` }}
              />
              <circle r={3.5} className="fill-brand-cyan" />
            </Marker>
          ))}
      </ComposableMap>

      {hovered && (
        <div
          className="pointer-events-none absolute z-10 rounded-md border border-content/10 bg-bg/90 px-2.5 py-1 text-xs font-bold text-content shadow-card backdrop-blur"
          style={{ left: pos.x + 14, top: pos.y + 14 }}
        >
          {hovered}
        </div>
      )}
    </div>
  );
}
