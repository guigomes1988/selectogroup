import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Operations } from "../sections/Operations";
import { Verticals } from "../sections/Verticals";
import { FAQ } from "../sections/FAQ";
import { Contact } from "../sections/Contact";
import { motion, useScroll, useSpring } from "motion/react";
import { siteConfig } from "../config/site";

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.title = siteConfig.seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", siteConfig.seo.description);
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = siteConfig.seo.description;
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black font-sans">
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white z-[60] origin-left"
        style={{ scaleX }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Operations />
        <Verticals />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
