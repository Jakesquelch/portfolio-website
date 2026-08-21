import Image from "next/image";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { SectionLabel } from "@/components/section-label";

/**
 * Projects section — vertical stack of wide horizontal cards driven by
 * lib/data.ts. Each card is full container-width: image on the left (~38%)
 * with content on the right on md+, stacking image-above-content on mobile.
 * Adding more entries just extends the stack downward.
 *
 * Server component — the cards are plain links, no interactivity.
 */
export function Projects() {
  return (
    <section id="projects" className="px-6 py-16 pb-24 md:py-20 md:pb-28">
      <div className="mx-auto max-w-3xl lg:max-w-4xl">
        <SectionLabel>Projects</SectionLabel>

        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Single horizontal project card — hairline border, soft surface fill, no
 * shadow. Screenshots are letterboxed rather than cropped, sitting on a
 * backdrop (`imageBg`, defaulting to the light `--chip`) so they read as
 * deliberately framed rather than sized-wrong.
 */
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface md:min-h-[220px] md:flex-row">
      {/* Image / placeholder — full width on mobile, ~38% on md+. The
          backdrop defaults to the light chip; projects can override it via
          `imageBg` so the letterboxing matches their screenshot. */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-chip md:aspect-auto md:w-[38%] md:flex-none md:border-r md:border-b-0"
        style={project.imageBg ? { backgroundColor: project.imageBg } : undefined}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 38vw, 100vw"
            className="object-contain p-3"
          />
        ) : (
          <PlaceholderImage />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
        <h3 className="text-xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="flex-1 text-sm/relaxed text-muted-foreground md:text-base/relaxed">
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Repo link — disabled-look fallback when github is null */}
        <div className="pt-1">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:underline"
            >
              View on GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : (
            <span className="text-sm font-medium text-muted-foreground/70">
              Repo coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * Fallback shown when a project has no `image` set — folder glyph centred
 * on the chip background with a "Coming soon" badge. Keeps the card
 * silhouette consistent with cards that do have screenshots.
 */
function PlaceholderImage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <FolderGit2
        className="h-12 w-12 text-muted-foreground/40"
        strokeWidth={1.5}
      />
      <span className="absolute right-3 bottom-3 rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
        Coming soon
      </span>
    </div>
  );
}
