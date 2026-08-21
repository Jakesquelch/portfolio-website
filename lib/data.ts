/**
 * Site content lives here as typed data so the section components don't bake
 * copy into JSX. Edit a paragraph or a project below and the layout updates
 * automatically — no need to touch the components.
 *
 * Section headings ("About", "Experience", "Projects") are the exception:
 * they're literals in the components, since they name the layout rather than
 * being content you'd ever edit.
 */

// ---------- Socials -------------------------------------------------------

/**
 * Canonical social/contact URLs. Shared by the Nav (Contact mailto), the
 * Hero (icon row + Contact button) and the Footer (icon row). Edit here
 * once and all update.
 */
export const socials = {
  linkedin: "https://www.linkedin.com/in/jake-squelch",
  github: "https://github.com/Jakesquelch",
  email: "jakewsquelch@gmail.com",
} as const;

// ---------- About ---------------------------------------------------------

/** Bio paragraphs, rendered in order as the opening block of the About section. */
export const aboutParagraphs = [
  "Hello, I'm Jake! A final-year Computer Science student studying in Birmingham. I work across the stack, for now I'm doing everything from low-level backend to UI work.",
  "I recently completed a year-long placement with IBM on the Ceph distributed-storage team, writing C++ in a genuinely large codebase and getting my changes through real-world code review. Before that I worked part-time at Civico, a Birmingham startup, building backend C++.",
  "I'm currently looking for a graduate role and exploring which opportunities there are for me!",
] as const;

// ---------- Experience ----------------------------------------------------

/**
 * Each experience renders as one row: company wordmark on a light chip,
 * role + one-liner of context in the middle, period and location on the
 * right in mono.
 *
 * `logo` is the company wordmark: drop the image in `public/` and record
 * its natural width/height here so next/image knows the aspect ratio (the
 * component scales it down by height).
 *
 * Rows render top-to-bottom in array order — list most recent first.
 * Adding an entry here is all it takes, no component changes needed.
 */
export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  context: string;
  logo: { src: string; width: number; height: number };
};

export const experiences = [
  {
    company: "IBM",
    role: "Software Engineer · Ceph Team",
    period: "2025 – 26",
    location: "Southampton, UK",
    context: "Year-long placement on the Ceph distributed-storage team.",
    logo: { src: "/ibm.png", width: 1280, height: 478 },
  },
  {
    company: "Civico",
    role: "Backend C++ Engineer",
    period: "2024",
    location: "Birmingham, UK",
    context:
      "Part-time at a Birmingham startup, between my first and second year of uni.",
    logo: { src: "/civico.png", width: 502, height: 150 },
  },
] as const satisfies readonly Experience[];

// ---------- Skills --------------------------------------------------------

/**
 * Skills render as one line per group: a mono label on the left, the items
 * joined with separators on the right. Order within each group is rendered
 * as-is — list the things you most want highlighted first.
 *
 * To add a new group: append an entry below. The component iterates the
 * array, so no markup change required.
 */
export const skillGroups = [
  {
    label: "Languages",
    items: ["Python", "Java", "C++", "JavaScript", "TypeScript", "PHP"],
  },
  {
    label: "Frameworks",
    items: [
      "React",
      "Angular",
      "Node.js",
      "FastAPI",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    label: "Tools",
    items: ["Git", "Docker", "Kubernetes", "MySQL", "PyTest", "Unix"],
  },
] as const;

// ---------- Projects ------------------------------------------------------

/**
 * Each project renders as a wide horizontal card — image on the left
 * (~38%), content on the right, stacking vertically on mobile.
 *
 * To add a project: drop a screenshot in `public/` (any reasonable aspect
 * ratio — the card crops to 16:10 on mobile), then add an object to the
 * `projects` array below.
 *
 * Set `image` to null to render the "Coming soon" placeholder, and
 * `github` to null to render a non-link "Repo coming soon" instead of the
 * GitHub link.
 *
 * `imageFit` defaults to "cover" — best for landscape browser screenshots
 * where minor cropping looks polished. Use "contain" for screenshots that
 * shouldn't be cropped; the image then sits padded on a backdrop.
 *
 * `imageBg` sets that backdrop for "contain" images (any CSS colour).
 * Match it to the screenshot's own background so the letterboxing blends
 * in seamlessly. Defaults to the light chip colour, which suits
 * light-background screenshots.
 *
 * `imagePosition` is any CSS object-position — it decides which part of a
 * "cover" screenshot survives the crop (e.g. "top" keeps the header and
 * crops the footer; "50% 25%" nudges it finer, where 0% is the top edge
 * and 100% the bottom). Defaults to centred. It also shifts a "contain"
 * image within its letterboxing, though centred is usually right there.
 *
 * `imageScale` zooms relative to whatever `imageFit` already does — 1 is
 * that default framing, 0.8 pulls back to show ~25% more of the shot, 1.2
 * pushes in. Zooming out past the panel edges reveals `imageBg`, so set
 * that to the screenshot's own background when going below 1. Zooming
 * anchors on `imagePosition`, so "top" holds the top edge steady and opens
 * the gap at the bottom.
 */
export type Project = {
  title: string;
  description: string;
  image: string | null;
  imageFit?: "cover" | "contain";
  imageBg?: string;
  imagePosition?: string;
  imageScale?: number;
  github: string | null;
  tags?: readonly string[];
};

export const projects: readonly Project[] = [
  {
    title: "Pulse",
    description:
      "An all-in-one productivity web app built to organise my own day. Includes a to-do list with priorities and grouping, a journal, and a habit tracker, all in one place. Angular 21 frontend, FastAPI backend, and the services are covered by Vitest specs.",
    image: "/pulse-app.png",
    imageBg: "#2a2218",
    imageFit: "contain",
    github: "https://github.com/Jakesquelch/Pulse",
    tags: ["Angular", "TypeScript", "FastAPI", "Python"],
  },
  {
    title: "This Website",
    description:
      "The site you're on right now! Built from scratch with Next.js 16 and designed to easily update: every section renders from typed data, most of the page ships zero JavaScript as server components, includes dark and light theme.",
    image: "/portfolio-project.png",
    imageFit: "contain",
    imageBg: "#161618",
    github: "https://github.com/Jakesquelch/portfolio-website",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Weather App",
    description:
      "Java desktop app that pulls real-time weather data from the Open-Meteo API and surfaces it through a Swing GUI. Temperature, wind, and condition icons refreshing every ~2s. Custom HTTP layer (HttpURLConnection) with retry-on-failure to keep flaky network calls from breaking the UI; JSON Simple for parsing the API responses.",
    image: "/weather-project.png",
    imageFit: "contain",
    github: "https://github.com/Jakesquelch/WeatherApp",
    tags: ["Java", "Swing", "REST API", "JSON"],
  },
];
