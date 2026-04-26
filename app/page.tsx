import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <About />
      <Projects />
    </main>
  );
}
