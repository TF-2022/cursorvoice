import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Showcase } from "@/components/showcase";
import { PoeticInterlude } from "@/components/poetic-interlude";
import { Features } from "@/components/features";
import { DownloadSection } from "@/components/download-section";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CustomCursor } from "@/components/custom-cursor";
import { MouseSpotlight } from "@/components/mouse-spotlight";
import { VideoDemo } from "@/components/video-demo";
import { StackingSection } from "@/components/stacking-section";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-zinc-950 text-white overflow-x-hidden grain">
      <CustomCursor />
      <MouseSpotlight />
      <ScrollProgress />
      <Nav />

      {/* ═══ STACKING ZONE ═══ */}
      <StackingSection index={0} bg="#09090b">
        <Hero />
      </StackingSection>

      <StackingSection index={1} bg="#0c101c" borderColor="rgba(59,130,246,0.2)" rounded>
        <Showcase />
      </StackingSection>

      <StackingSection index={2} bg="#0a0e1a" borderColor="rgba(99,102,241,0.15)" rounded>
        <PoeticInterlude textKey="first" />
        <VideoDemo />
      </StackingSection>

      {/* ═══ NORMAL FLOW — Features pin works here ═══ */}
      <div
        className="relative z-10 rounded-t-[2.5rem]"
        style={{
          backgroundColor: "#0e0c1a",
          borderTop: "2px solid rgba(139,92,246,0.15)",
          boxShadow: "0 -16px 50px rgba(139,92,246,0.08)",
        }}
      >
        <Features />
      </div>

      {/* Interlude + Download + Footer */}
      <div
        className="relative z-11 rounded-t-[2.5rem]"
        style={{
          backgroundColor: "#0c0a18",
          borderTop: "2px solid rgba(139,92,246,0.2)",
          boxShadow: "0 -16px 50px rgba(139,92,246,0.1)",
        }}
      >
        <PoeticInterlude textKey="second" />
      </div>

      <div
        className="relative z-12 rounded-t-[2.5rem]"
        style={{
          backgroundColor: "#09091a",
          borderTop: "2px solid rgba(59,130,246,0.2)",
          boxShadow: "0 -16px 50px rgba(59,130,246,0.1)",
        }}
      >
        <DownloadSection />
        <Footer />
      </div>
    </main>
  );
}
