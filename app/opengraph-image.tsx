import { ImageResponse } from "next/og";

/**
 * Dynamic OpenGraph image — Next.js auto-picks this up at /opengraph-image
 * and references it from page metadata so social platforms (Twitter, Slack,
 * LinkedIn, iMessage, Discord…) render a card instead of a bare URL.
 *
 * Matches the "Violet Thread" design: white ground, near-black ink, violet
 * accents, mono-style eyebrow label. Rendered at build time as a
 * static PNG. Uses simple flex + hex colours because Satori (the underlying
 * renderer) has limited CSS support — every flex container needs an
 * explicit `display: flex`.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jake Squelch";

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
          background: "#ffffff",
          color: "#1c1c1e",
          fontFamily: "ui-sans-serif",
          borderBottom: "14px solid #6d28d9",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 30,
              color: "#6d28d9",
              display: "flex",
              marginBottom: 20,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.24em",
            }}
          >
            SOFTWARE ENGINEER
          </div>
          <div
            style={{
              fontSize: 150,
              fontWeight: 700,
              color: "#1c1c1e",
              display: "flex",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Jake Squelch
          </div>
          <div
            style={{
              fontSize: 42,
              color: "#6a6a70",
              display: "flex",
              marginTop: 28,
            }}
          >
            Final-year Computer Science student · IBM Ceph placement
          </div>
        </div>
      </div>
    ),
    size,
  );
}
