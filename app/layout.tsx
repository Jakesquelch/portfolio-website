import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { StarfieldSVG } from "@/components/starfield-svg";
import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_TITLE = "Jake Squelch — Software Engineer";
const SITE_DESCRIPTION =
  "Personal portfolio of Jake Squelch — final-year Computer Science student at Aston University, with placement experience at IBM (Ceph) and Civico.";

/**
 * Page metadata. `metadataBase` lets relative og:image paths resolve to an
 * absolute URL when crawlers fetch the OpenGraph card. The dynamic OG image
 * lives at `app/opengraph-image.tsx` and is auto-picked-up by Next — no
 * need to reference it here.
 */
export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | Jake Squelch",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL("https://jakesquelch.dev"),
  keywords: [
    "Jake Squelch",
    "Software Engineer",
    "Portfolio",
    "Aston University",
    "IBM",
    "Ceph",
    "C++",
    "TypeScript",
    "Next.js",
  ],
  authors: [{ name: "Jake Squelch" }],
  creator: "Jake Squelch",
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_GB",
    siteName: "Jake Squelch",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <StarfieldSVG />
          <Nav />
          <div className="flex flex-1 flex-col">
            {children}
            <Footer />
          </div>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
