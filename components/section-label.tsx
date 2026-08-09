/**
 * Mono section label — the design's one recurring motif. Small uppercase
 * monospace heading in the accent green with a hairline rule underneath.
 * Used for every section heading so the page scans like an index.
 */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 border-b border-line pb-3 font-mono text-sm font-semibold uppercase tracking-[0.22em] text-accent md:text-base">
      {children}
    </h2>
  );
}
