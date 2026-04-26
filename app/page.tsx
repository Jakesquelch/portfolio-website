import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <About />
    </main>
  );
}
