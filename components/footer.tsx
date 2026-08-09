import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { socials } from "@/lib/data";

/**
 * Footer — sits below the last page section. A hairline top rule, two
 * social icon buttons (GitHub + LinkedIn), and a copyright line. Bookends
 * the page and saves visitors scrolling back up to find the socials.
 *
 * Year is computed at render time so it stays current without anyone having
 * to remember to bump it (note: the page prerenders statically, so in
 * practice it updates on each deploy). Server component — nothing here is
 * interactive beyond the plain anchor tags.
 */
export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 lg:max-w-4xl">
        <div className="flex items-center gap-2.5">
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Jake Squelch
        </p>
      </div>
    </footer>
  );
}
