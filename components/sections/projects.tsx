"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { projects, type Project } from "@/lib/data";

/**
 * Projects section — vertical stack of wide horizontal glass cards driven
 * by lib/data.ts.
 *
 * Layout: each card is full container-width and stacks on top of the next.
 * On md+ the image sits on the left (≈40%) with content on the right; on
 * mobile the image stacks above the content. This way a single card
 * doesn't look stranded the way a 1/3-width grid cell would, and adding
 * more entries just extends the stack downward.
 *
 * Each card has a subtle 3D mouse-tilt on hover (perspective + rotateX/
 * rotateY from cursor offset). The tilt is applied via inline
 * `style.transform` in a mousemove handler — no React re-renders, runs on
 * the compositor.
 *
 * Entrance: heading fades up first, then each card staggers in by ~120ms.
 */
export function Projects() {
  return (
    <section
      id="projects"
      className="relative px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-3xl lg:max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:mb-10 lg:text-6xl"
        >
          Projects
        </motion.h2>

        <div className="flex flex-col gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Single horizontal project card. The outer wrapper handles entrance
 * animation (motion.div with `whileInView` y-fade) and provides the 3D
 * perspective. The inner `<article>` is the element that actually tilts on
 * mousemove — keeping the two transforms on different elements stops the
 * entrance animation and the tilt from fighting over the same `transform`
 * value.
 *
 * On md+ the article is `flex-row` (image left, content right). On mobile
 * it falls back to `flex-col` so the image sits on top of the content.
 */
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const tiltRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // ±2.5deg — subtler than a square card needs, since the wide footprint
    // makes any rotation feel more pronounced.
    const rotateY = x * 5;
    const rotateX = -y * 5;
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.75,
        delay: 0.1 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1400 }}
    >
      <article
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.25s ease-out",
          willChange: "transform",
        }}
        className="glass group flex flex-col overflow-hidden rounded-2xl md:flex-row md:min-h-[260px] lg:min-h-[280px]"
      >
        {/* Image / placeholder — full width on mobile, ~40% on md+ */}
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 md:aspect-auto md:w-[42%] md:flex-none md:border-r md:border-b-0">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-6 md:gap-5 md:p-8 lg:p-10">
          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl lg:text-3xl">
            {project.title}
          </h3>
          <p className="flex-1 text-sm leading-relaxed text-foreground/75 md:text-base">
            {project.description}
          </p>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs font-medium text-foreground/75"
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
                className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan transition-colors hover:text-foreground md:text-base"
              >
                View on GitHub
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px md:h-5 md:w-5" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground/70 md:text-base">
                Repo coming soon
              </span>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

/**
 * Stylised fallback shown when a project has no `image` set — soft cyan→
 * violet gradient with a folder-git glyph centred and a "Coming soon" badge
 * pinned to the bottom-right. Keeps the card silhouette consistent with
 * cards that do have screenshots.
 */
function PlaceholderImage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan/15 via-violet/10 to-transparent">
      <FolderGit2 className="h-14 w-14 text-foreground/30" strokeWidth={1.5} />
      <span className="absolute right-3 bottom-3 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-0.5 text-[0.7rem] font-medium text-foreground/70 backdrop-blur-sm">
        Coming soon
      </span>
    </div>
  );
}
