import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { socials } from "@/lib/data";

/**
 * Footer — sits below the last page section. A faint horizontal divider, two
 * social icon buttons (LinkedIn + GitHub), and a copyright line. Bookends the
 * page nicely and saves visitors scrolling back up to find the socials.
 *
 * Year is computed at render time so it stays current without anyone having
 * to remember to bump it. Server component (no "use client") since nothing
 * here is interactive beyond the plain anchor tags.
 */
export function Footer() {
  return (
    <footer className="relative px-6 pb-12 md:pb-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 border-t border-white/10 pt-10 md:pt-12">
        <div className="flex items-center gap-3">
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-all hover:-translate-y-px hover:bg-white/10 hover:text-foreground"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-all hover:-translate-y-px hover:bg-white/10 hover:text-foreground"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
        </div>
        <p className="text-xs text-foreground/55">
          © {new Date().getFullYear()} Jake Squelch
        </p>
      </div>
    </footer>
  );
}
