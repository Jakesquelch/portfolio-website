export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-6xl md:text-8xl font-bold text-gradient tracking-tight">
        Jake Squelch
      </h1>
      <p className="text-muted-foreground text-lg max-w-md text-center">
        Software developer. Portfolio under construction — the cosmos is
        loading.
      </p>
      <div className="glass rounded-2xl px-6 py-4 text-sm text-foreground/80">
        Foundation smoke test — if this card is frosted and the heading is
        cyan-to-violet, the theme is wired up correctly.
      </div>
    </main>
  );
}
