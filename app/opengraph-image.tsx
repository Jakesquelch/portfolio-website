import { ImageResponse } from "next/og";

/**
 * Dynamic OpenGraph image — Next.js auto-picks this up at /opengraph-image
 * and references it from page metadata so social platforms (Twitter, Slack,
 * LinkedIn, iMessage, Discord…) render a card instead of a bare URL.
 *
 * Rendered at build time as a static PNG. Uses simple flex + hex colours
 * because Satori (the underlying renderer) has limited CSS support — no
 * oklch, no background-clip text gradients, every flex container needs an
 * explicit `display: flex`.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jake Squelch — Software Engineer";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 100px",
          background:
            "radial-gradient(ellipse 70% 60% at 25% 25%, #1c1e3f 0%, #0a0d1f 70%)",
          color: "#dcdde6",
          fontFamily: "ui-sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 48,
              color: "#a3a4b8",
              display: "flex",
              marginBottom: 16,
            }}
          >
            {"Hello, I'm"}
          </div>
          <div
            style={{
              fontSize: 156,
              fontWeight: 700,
              color: "#7dd3fc",
              display: "flex",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Jake Squelch
          </div>
          <div
            style={{
              fontSize: 60,
              color: "#dcdde6",
              display: "flex",
              marginTop: 24,
            }}
          >
            Software Engineer
          </div>
          <div
            style={{
              height: 6,
              width: 280,
              marginTop: 40,
              background: "linear-gradient(to right, #7dd3fc, #a78bfa)",
              borderRadius: 4,
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
