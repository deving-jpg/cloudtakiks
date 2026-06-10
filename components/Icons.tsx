import type { SVGProps } from "react";

/** Line-style icon set echoing the brand iconography sheet. */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export type IconName =
  | "cloud"
  | "shield"
  | "lock"
  | "remote"
  | "key"
  | "grid"
  | "arrow"
  | "mail"
  | "phone"
  | "pin"
  | "clock"
  | "search"
  | "bell";

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  const paths: Record<IconName, React.ReactNode> = {
    cloud: <path d="M7 18a4 4 0 0 1 .5-7.97A5 5 0 0 1 17.5 10 3.5 3.5 0 0 1 17 18H7Z" />,
    shield: <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Zm-3 9 2 2 4-4" />,
    lock: (
      <>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
    remote: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
    key: (
      <>
        <circle cx="8" cy="8" r="3.5" />
        <path d="M10.5 10.5 20 20m-3-3 2-2m-4 0 2-2" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" />
      </>
    ),
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    phone: <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
    pin: (
      <>
        <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
    bell: <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2Zm4 4h4" />,
  };

  return (
    <svg {...base} {...props}>
      {paths[name]}
    </svg>
  );
}
