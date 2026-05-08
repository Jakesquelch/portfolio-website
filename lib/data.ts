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
    "Hello, I'm Jake! A final-year Computer Science student studying in Birmingham. I work across the stack — for now I'm doing everything from low-level backend to UI work.",
    "I recently completed a year long placement with IBM working on Ceph Storage which I really enjoyed.",
    "I'm currently looking for a graduate role and exploring which opportunities there are for me!",
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

// ---------- Skills --------------------------------------------------------

/**
 * Skills are grouped (languages / frameworks / tools) and rendered as a
 * stack of chip rows under the experience timeline. Order within each group
 * is rendered as-is — list the things you most want highlighted first.
 *
 * To add a new group: append an entry to `skills.groups`. The component
 * iterates the array, so no markup change required.
 */
export const skills = {
  heading: "Skills",
  groups: [
    {
      label: "Programming Languages",
      items: ["Python", "Java", "C++", "JavaScript", "TypeScript", "PHP"],
    },
    {
      label: "Frameworks & Libraries",
      items: ["React", "Node.js", "Tailwind CSS", "Bootstrap"],
    },
    {
      label: "Technologies & Tools",
      items: ["Git", "Docker", "Kubernetes", "MySQL", "PyTest", "Unix"],
    },
  ],
} as const;

// ---------- Projects ------------------------------------------------------

/**
 * Each project renders as a glass card with a screenshot, blurb, and a link
 * to the repo.
 *
 * To add a real project: drop a screenshot in `public/` (any reasonable
 * aspect ratio — the card crops to 16:10), then add an object to the
 * `projects` array below. The grid grows to fill, no component changes
 * needed.
 *
 * Set `image` to null to render the styled "Coming soon" placeholder, and
 * `github` to null to render a non-link "Repo coming soon" instead of the
 * GitHub link.
 *
 * `imageFit` defaults to "cover" — best for landscape browser screenshots
 * where minor cropping looks polished. Use "contain" for square / portrait
 * screenshots (e.g. desktop app windows) where cropping would hide the
 * subject; the image then sits on the cyan→violet gradient backdrop.
 */
export type Project = {
  title: string;
  description: string;
  image: string | null;
  imageFit?: "cover" | "contain";
  github: string | null;
  tags?: readonly string[];
};

export const projects: readonly Project[] = [
  {
    title: "Weather App",
    description:
      "Java desktop app that pulls real-time weather data from the Open-Meteo API and surfaces it through a Swing GUI — temperature, wind, and condition icons refreshing every ~2s. Custom HTTP layer (HttpURLConnection) with retry-on-failure to keep flaky network calls from breaking the UI; JSON Simple for parsing the API responses.",
    image: "/weather-project.png",
    imageFit: "contain",
    github: "https://github.com/Jakesquelch/WeatherApp",
    tags: ["Java", "Swing", "REST API", "JSON"],
  },
];
