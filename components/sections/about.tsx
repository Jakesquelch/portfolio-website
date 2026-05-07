"use client";

import { useId, type ComponentType, type SVGProps } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  SiBootstrap,
  SiCplusplus,
  SiDocker,
  SiGit,
  SiJavascript,
  SiKubernetes,
  SiLinux,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiPhp,
  SiPytest,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import { about, experiences, skills, type Experience } from "@/lib/data";

/**
 * Mapping from a skill name (as listed in `lib/data.ts`) to its
 * brand-coloured icon. The chip renders the icon at 14px with
 * `color="default"` so each one ships in its official brand colour.
 *
 * Notes:
 * - simple-icons has no "Java" entry (Oracle trademark), so we use OpenJDK.
 * - simple-icons has no "Unix" entry, so Linux serves as the closest match.
 * - Skills not present in the map render with no icon and the chip layout
 *   adjusts automatically (the icon slot is conditional).
 */
type IconComponent = ComponentType<
  { color?: string; size?: number; title?: string } & SVGProps<SVGSVGElement>
>;

const SKILL_ICONS: Record<string, IconComponent> = {
  Python: SiPython,
  Java: SiOpenjdk,
  "C++": SiCplusplus,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  PHP: SiPhp,
  React: SiReact,
  "Node.js": SiNodedotjs,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  Git: SiGit,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  MySQL: SiMysql,
  PyTest: SiPytest,
  Unix: SiLinux,
};

/**
 * About section — combines the bio (heading + photo + paragraphs) with a
 * visual experience timeline beneath. Replaces the old standalone Experience
 * section so the page reads as one continuous "who I am" block.
 *
 * Top half: photo on the left, bio paragraphs on the right (stacked on
 * mobile). The card's max-width is 5xl on lg+ so the wider layout has
 * breathing room.
 *
 * Middle: a subtle gradient divider, then a "Where I've worked" subheading,
 * then a row of glass experience cards. Each card has a circular duration
 * ring that fills proportionally to months worked (capped at 12 = full). On
 * md+ the cards sit side-by-side with a glowing gradient connector between
 * them; on mobile they stack with a vertical connector.
 *
 * Bottom: another divider, then a "Skills" subheading and three grouped
 * chip rows (languages / frameworks / tools) sourced from `skills` in
 * `lib/data.ts`. Groups render in the order declared.
 *
 * Scroll behaviour: heading and outer card fade up when the section enters
 * the viewport. Each subsequent piece (photo, paragraphs, divider,
 * subheadings, experience cards, skill groups) staggers in at increasing
 * delays so the eye reads top-to-bottom. Animations fire once (won't
 * re-trigger on re-scroll).
 */
export function About() {
  return (
    <section
      id="about"
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
          {about.heading}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-2xl p-8 md:p-10 lg:p-14"
        >
          {/* ---------- Top: photo + bio ---------- */}
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10 lg:gap-14">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-44 shrink-0 sm:w-52 md:w-48 lg:w-60"
            >
              {/* Halo */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.86 0.13 220 / 0.35) 0%, oklch(0.74 0.16 295 / 0.2) 50%, transparent 75%)",
                  transform: "scale(1.3)",
                }}
              />
              {/* Frame */}
              <div
                className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/15"
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.14), 0 10px 28px rgba(0,0,0,0.4)",
                }}
              >
                <Image
                  src="/about-pic.png"
                  alt="Jake Squelch"
                  fill
                  sizes="(min-width: 1024px) 240px, (min-width: 768px) 192px, 208px"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
            </motion.div>

            {/* Bio */}
            <div className="space-y-5 text-lg leading-relaxed text-foreground/85 lg:space-y-6 lg:text-xl">
              {about.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* ---------- Internal divider ---------- */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="my-10 h-px origin-center bg-gradient-to-r from-transparent via-white/15 to-transparent lg:my-14"
          />

          {/* ---------- Bottom: experience timeline ---------- */}
          <div className="flex flex-col items-center gap-8 lg:gap-10">
            <motion.h3
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
            >
              Where I&apos;ve worked
            </motion.h3>

            <div className="flex w-full flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-2 lg:gap-4">
              <ExperienceCard exp={experiences[0]} index={0} />
              <Connector />
              <ExperienceCard exp={experiences[1]} index={1} />
            </div>
          </div>

          {/* ---------- Internal divider ---------- */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="my-10 h-px origin-center bg-gradient-to-r from-transparent via-white/15 to-transparent lg:my-14"
          />

          {/* ---------- Bottom: skills ---------- */}
          <div className="flex flex-col items-center gap-8 lg:gap-10">
            <motion.h3
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
            >
              {skills.heading}
            </motion.h3>

            <div className="flex w-full flex-col items-center gap-7 lg:gap-9">
              {skills.groups.map((group, i) => (
                <SkillGroup
                  key={group.label}
                  label={group.label}
                  items={group.items}
                  index={i}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Brand wordmark rendered next to the company name in each experience
 * card. Logos are dropped in /public and sized by height — the natural
 * width/height props give next/image the aspect ratio for layout-shift
 * avoidance, then `h-7 w-auto md:h-8` scales them to match the gradient
 * heading they sit beside.
 */
function CompanyLogo({ company }: { company: string }) {
  if (company === "IBM") {
    return (
      <Image
        src="/ibm.png"
        alt="IBM logo"
        width={1280}
        height={478}
        className="h-8 w-auto md:h-10"
      />
    );
  }
  if (company === "Civico") {
    return (
      <Image
        src="/civico.png"
        alt="Civico logo"
        width={502}
        height={150}
        className="h-8 w-auto md:h-10"
      />
    );
  }
  return null;
}

/**
 * One row of the skills block — a small uppercase category label above a
 * wrapped row of pill-style chips. Centred horizontally so the three groups
 * stack as a tidy column under the "Skills" heading.
 *
 * `index` controls the entrance delay so each group lands a beat after the
 * one above. Hover lifts each chip a hair and brightens its rim — same idiom
 * as the experience cards, just understated.
 */
function SkillGroup({
  label,
  items,
  index,
}: {
  label: string;
  items: readonly string[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-center gap-3"
    >
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-foreground/55">
        {label}
      </span>
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((item) => {
          const Icon = SKILL_ICONS[item];
          return (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm font-medium text-foreground/80 transition-all hover:-translate-y-px hover:border-white/25 hover:bg-white/[0.06] hover:text-foreground"
            >
              {Icon && <Icon color="default" size={14} aria-hidden />}
              {item}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

/**
 * Single experience card — duration ring at the top, then company name in
 * gradient text, role, period · location, and a one-liner of context.
 *
 * `index` controls the entrance delay so the second card lands after the
 * first.
 */
function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.85,
        delay: 0.25 + index * 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-1 flex-col items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05] md:p-7"
    >
      <DurationRing months={exp.months} label={exp.durationLabel} />

      <div className="flex flex-col items-center gap-2">
        <h4 className="flex items-center justify-center">
          <CompanyLogo company={exp.company} />
        </h4>
        <p className="text-sm font-medium text-foreground/85 md:text-base">
          {exp.role}
        </p>
      </div>

      <div className="text-xs text-muted-foreground md:text-sm">
        {exp.period} · {exp.location}
      </div>

      <p className="max-w-xs text-sm leading-relaxed text-foreground/70">
        {exp.context}
      </p>
    </motion.div>
  );
}

/**
 * Circular duration ring. The track is a faint full circle; the progress
 * stroke is a cyan→violet gradient that wraps `months / 12` of the way
 * around (so 6mo = half a ring, 12mo = full). The stroke draws on scroll-in
 * via strokeDashoffset.
 *
 * `useId()` gives each instance a unique gradient id so multiple rings on
 * the same page don't collide.
 */
function DurationRing({ months, label }: { months: number; label: string }) {
  const gradientId = useId();
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const fillPct = Math.min(months / 12, 1);
  const targetOffset = circumference * (1 - fillPct);

  return (
    <div className="relative">
      {/* Soft cyan→violet glow behind the ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -m-3 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.86 0.13 220 / 0.3) 0%, oklch(0.74 0.16 295 / 0.18) 50%, transparent 75%)",
        }}
      />
      <div className="relative h-24 w-24">
        <svg
          viewBox="0 0 100 100"
          className="-rotate-90"
          aria-hidden
          focusable="false"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.86 0.13 220)" />
              <stop offset="100%" stopColor="oklch(0.74 0.16 295)" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="oklch(1 0 0 / 0.08)"
            strokeWidth="4"
            fill="none"
          />
          {/* Progress stroke — animated draw on scroll-in */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: targetOffset }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-xl font-semibold text-foreground">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * The thin gradient line that joins the two experience cards. Vertical (and
 * short) on mobile, horizontal (and longer) on md+. Animates in from one end
 * via scaleX/scaleY — both axes are animated together so the same component
 * works in both orientations without conditional logic.
 */
function Connector() {
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, scaleY: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto h-10 w-px origin-top bg-gradient-to-b from-cyan/50 via-violet/70 to-cyan/50 md:mx-0 md:h-px md:w-12 md:origin-left md:bg-gradient-to-r lg:w-20"
    />
  );
}
