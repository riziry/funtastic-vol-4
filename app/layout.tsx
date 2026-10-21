import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Manrope } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { event } from "@/content/event";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const title = `${event.fullName} | ${event.tagline}`;
const description =
  "Discover Funtastic Vol. 4, a magical school carnival featuring futsal, Try Out TKA, coloring competitions, event memories, and participant information.";

export const metadata: Metadata = {
  metadataBase: new URL(event.siteUrl),
  title,
  description,
  openGraph: {
    type: "website",
    title,
    description,
    siteName: event.fullName,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Funtastic Vol. 4 logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#140d12",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} ${manrope.variable} antialiased`}>
      <body className="min-h-dvh">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
