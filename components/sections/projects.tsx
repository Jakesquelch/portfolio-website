"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { projects, type Project } from "@/lib/data";

/**
 * Projects section — grid of glass cards driven by lib/data.ts.
 *
 * Layout: 1 column on mobile, 2 on md+, 3 on lg+. The grid grows to fill
 * the available cells as more entries are added, so adding a project is a
 * data-only change.
 *
 * Each card has a 3D mouse-tilt on hover (perspective + rotateX/rotateY
 * driven by cursor offset). The tilt is applied via inline `style.transform`
 * in a mousemove handler — no React re-renders, runs on the compositor.
 *
 * Entrance: heading fades up first, then each card staggers in by ~100ms.
 */
export function Projects() {
  return (
    <section
      id="projects"
      className="relative px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-3xl lg:max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:mb-10 lg:text-6xl"
        >
          Projects
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Single project card. The outer wrapper handles entrance animation
 * (motion.div with `whileInView` y-fade) and provides the 3D perspective.
 * The inner `<article>` is the element that actually tilts on mousemove —
 * keeping the two transforms on different elements stops the entrance
 * animation and the tilt from fighting over the same `transform` value.
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
    // ±4deg feels lively without disorienting the eye on a static card.
    const rotateY = x * 8;
    const rotateX = -y * 8;
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
        delay: 0.1 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1100 }}
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
        className="glass group flex h-full flex-col overflow-hidden rounded-2xl"
      >
        {/* Image / placeholder */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-6">
          <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
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
                className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan transition-colors hover:text-foreground"
              >
                View on GitHub
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground/70">
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
