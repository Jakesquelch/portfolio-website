/**
 * Site content lives here as typed data so the section components don't bake
 * copy into JSX. Edit a paragraph or a project below and the layout updates
 * automatically — no need to touch the components.
 */

// ---------- About ---------------------------------------------------------

export const about = {
  heading: "About",
  paragraphs: [
    "I'm a final-year Computer Science student at Aston University in Birmingham. I work across the stack — for now I'm sampling everything from low-level backend to UI work, figuring out which corner of the field I want to live in.",
    "Before this year I spent a year-long placement at IBM in Southampton, building software at enterprise scale. Before that, six months part-time at Civico — a Birmingham startup — as a backend C++ engineer. Two roles, two very different views of the industry: how a big shop builds, and how a small team ships.",
    "Off-screen I'm usually on a golf course or on a motorbike. Hiking, football, and the gym fill in the rest — anything that keeps me outside and moving.",
  ],
} as const;
