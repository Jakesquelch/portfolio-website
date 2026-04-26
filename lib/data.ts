/**
 * Site content lives here as typed data so the section components don't bake
 * copy into JSX. Edit a paragraph or a project below and the layout updates
 * automatically — no need to touch the components.
 */

// ---------- Socials -------------------------------------------------------

/**
 * Canonical social/contact URLs. Shared by the Hero (icon row + Contact me
 * mailto) and the Footer (icon row). Edit here once and both update.
 */
export const socials = {
  linkedin: "https://www.linkedin.com/in/jake-squelch",
  github: "https://github.com/Jakesquelch",
  email: "jakewsquelch@gmail.com",
} as const;

// ---------- About ---------------------------------------------------------

export const about = {
  heading: "About",
  paragraphs: [
    "Hello, I'm Jake! A final-year Computer Science student studying at Aston University in Birmingham. I work across the stack — for now I'm doing everything from low-level backend to UI work.",
    "Outside of work I like to play golf (usually only when the weather is good!), meet up with friends, and the gym fills in the rest of my time.",
  ],
} as const;

// ---------- Experience ----------------------------------------------------

/**
 * Each experience renders as a glass card with a circular duration ring.
 *
 * `months` controls how far the gradient stroke wraps around the ring (capped
 * at 12 = full circle). `durationLabel` is what shows in the middle of the
 * ring — keep it short ("6 mo", "1 yr") so it fits.
 *
 * Order matters: cards render left-to-right (or top-to-bottom on mobile) in
 * array order, so list them chronologically.
 */
export type Experience = {
  company: string;
  role: string;
  durationLabel: string;
  months: number;
  period: string;
  location: string;
  context: string;
};

export const experiences = [
  {
    company: "Civico",
    role: "Backend C++ Engineer",
    durationLabel: "4 mo",
    months: 4,
    period: "2024",
    location: "Birmingham, UK",
    context:
      "Part-time at a Birmingham startup, between my first and second year of uni.",
  },
  {
    company: "IBM",
    role: "Software Engineer · Ceph Team",
    durationLabel: "1 yr",
    months: 12,
    period: "2025 – 2026",
    location: "Southampton, UK",
    context:
      "Year-long placement on the Ceph distributed-storage team.",
  },
] as const satisfies readonly Experience[];

// ---------- Projects ------------------------------------------------------

/**
 * Each project renders as a glass card with a screenshot, blurb, and a link
 * to the repo.
 *
 * To add a real project: drop a screenshot in `public/projects/` (any
 * reasonable aspect ratio — the card crops to 16:10), then add an object to
 * the `projects` array below. The grid grows to fill, no component changes
 * needed.
 *
 * Set `image` to null to render the styled "Coming soon" placeholder, and
 * `github` to null to render a non-link "Repo coming soon" instead of the
 * GitHub link.
 */
export type Project = {
  title: string;
  description: string;
  image: string | null;
  github: string | null;
  tags?: readonly string[];
};

export const projects: readonly Project[] = [
  {
    title: "Project name pending",
    description:
      "Placeholder card — drop in a screenshot, a short blurb, and a repo link via lib/data.ts and this slot fills in. Add more entries to the array and the grid extends.",
    image: null,
    github: null,
  },
];
