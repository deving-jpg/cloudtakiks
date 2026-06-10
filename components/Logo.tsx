import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import logo from "@/public/logo.png";

/**
 * CloudTaktiks brand wordmark (official logo.png).
 * The PNG is the deep-blue version (for light backgrounds); on dark
 * backgrounds it is rendered white via a CSS filter. Mark itself is unchanged.
 */
export function Logo({
  className,
  onDark = true,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link href="/" aria-label="Cloud Taktiks home" className={clsx("inline-block", className)}>
      <Image
        src={logo}
        alt="Cloud Taktiks"
        priority
        sizes="160px"
        className={clsx(
          "h-9 w-auto transition-[filter] duration-300 md:h-10",
          onDark && "brightness-0 invert"
        )}
      />
    </Link>
  );
}

/** The signature ">" chevron mark (the K becomes an arrow). Mirrors in RTL. */
export function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" fill="none" className={clsx("rtl:-scale-x-100", className)} aria-hidden>
      <path
        d="M5 3 L19 16 L5 29"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
