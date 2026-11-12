import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Muzzamil Rasully is an AI engineer in London. He works with client teams to get LLM systems into production: APIs, agents, retrieval and the evaluation tests that check them.";

export const metadata: Metadata = {
  title: "Muzzamil Rasully — AI Engineer",
  description,
  authors: [{ name: "Muzzamil Rasully" }],
  openGraph: {
    title: "Muzzamil Rasully — AI Engineer",
    description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      {/* Browser extensions (e.g. Grammarly) add attributes to <body> before hydration. */}
      <body className="bg-bg font-sans text-ink antialiased" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
