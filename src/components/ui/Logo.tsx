import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export function Logo({
  href = "/",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`${site.name} — home`}
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-[var(--radius-xs)] ring-1 ring-line transition-colors duration-[var(--bhq-dur-fast)] group-hover:ring-line-strong">
        <Image
          src="/bazalthq_logo.png"
          alt=""
          width={28}
          height={28}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      <span
        className="bhq-display text-[0.95rem] leading-none tracking-[0.04em] text-ink"
        style={{ fontWeight: 500 }}
      >
        {site.name}
      </span>
    </Link>
  );
}
