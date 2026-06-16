import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muzzamil Rasully — Machine Learning & AI Engineer",
  description:
    "ML / AI / NLP engineer building deep-learning and generative-AI systems — models, RAG pipelines, and LLM apps — backed by a strong data-analytics foundation.",
  keywords: [
    "Machine Learning Engineer",
    "AI Engineer",
    "NLP",
    "Deep Learning",
    "Generative AI",
    "LLM",
    "RAG",
    "PyTorch",
    "Python",
    "Muzzamil Rasully",
  ],
  authors: [{ name: "Muzzamil Rasully" }],
  openGraph: {
    title: "Muzzamil Rasully — Machine Learning & AI Engineer",
    description:
      "Building deep-learning, NLP, and generative-AI systems end to end — from models to production RAG and LLM applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="bg-bg font-sans text-fg antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
