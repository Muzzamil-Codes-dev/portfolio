import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { QuickScan } from "@/components/QuickScan";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { MoreProjects } from "@/components/MoreProjects";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <QuickScan />
        <FeaturedProjects />
        <Skills />
        <MoreProjects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
