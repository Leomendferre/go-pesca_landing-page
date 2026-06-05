import { cn } from "@/lib/utils"

interface BrandProps {
  /** Extra classes for the wrapper anchor/span */
  className?: string
  /** Tailwind text size for the wordmark (default: text-xl) */
  size?: string
  /** When set, renders inside an <a> pointing here */
  href?: string
}

/**
 * GoPesca brand lockup: circular line mark (water + fish) + "GOPESCA." wordmark.
 * Mirrors the brand book wordmark — "GO" bold, "PESCA" lighter & tracked, orange dot.
 */
export function Brand({ className, size = "text-xl", href }: BrandProps) {
  const content = (
    <>
      <span className="grid size-10 shrink-0 place-items-center text-white" aria-hidden="true">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-full"
        >
          <circle cx="24" cy="24" r="20" />
          <path d="M10 28c6-7 16-9 24-4 2 1 4 3 4 3s-3 2-6 2" />
          <path d="M14 22c3-4 8-5 12-3" />
          <circle cx="30" cy="26" r="1" fill="#fff" stroke="none" />
        </svg>
      </span>
      <span className={cn("font-display font-bold leading-none tracking-wide text-white", size)}>
        <span className="font-bold">GO</span>
        <span className="font-medium tracking-[0.18em]">PESCA</span>
        <span className="text-[#d9853c]">.</span>
      </span>
    </>
  )

  const classes = cn("inline-flex items-center gap-2", className)

  if (href) {
    return (
      <a href={href} className={classes} aria-label="GoPesca">
        {content}
      </a>
    )
  }
  return <span className={classes}>{content}</span>
}
