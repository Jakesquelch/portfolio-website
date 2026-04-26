/**
 * Site content lives here as typed data so the section components don't bake
 * copy into JSX. Edit a paragraph or a project below and the layout updates
 * automatically — no need to touch the components.
 */

// ---------- About ---------------------------------------------------------

export const about = {
  heading: "About",
  paragraphs: [
    "Hello, I'm Jake! A final-year Computer Science student studying at Aston University in Birmingham. I work across the stack — for now I'm doing everything from low-level backend to UI work.",
    "Between my second and third year at university I spent a year-long placement at IBM in Southampton, being apart of the Ceph team. Before that, between my first and second year, I spent six months part-time at Civico — a Birmingham startup — as a backend C++ engineer.",
    "Outside of work I like to play golf (usually only when the weather is good!), meet up with friends, and the gym fills in the rest of my time.",
  ],
} as const;
