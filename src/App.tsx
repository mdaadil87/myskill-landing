import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Skills from "@/components/Skills";
import Showcase from "@/components/Showcase";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-base-950 text-zinc-300">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-violet-600 px-5 py-2.5 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <SocialProof />
        <Skills />
        <Showcase />
        <Benefits />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
