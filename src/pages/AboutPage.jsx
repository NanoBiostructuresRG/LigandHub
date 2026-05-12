import { ChevronRight } from "lucide-react";
import { About } from "../components/About";

export function AboutPage() {
  return (
    <>
      <section className="card home-sphere-block about-sphere-block" aria-hidden="true">
        <div className="home-sphere-copy">
          <div className="home-sphere-headline">
            <ChevronRight className="home-sphere-prompt-icon" aria-hidden="true" />
            While others struggle, you arrive.
          </div>
          <div className="home-sphere-subline">... and then, the next discovery begins.</div>
        </div>
        <span className="home-sphere-field" />
        <span className="home-sphere-field home-sphere-field-deep" />
        <span className="home-sphere-field home-sphere-field-stars" />
        <span className="home-sphere-field home-sphere-field-dust" />
        <span className="home-sphere home-sphere-lg" />
        <span className="home-sphere home-sphere-sm" />
        <span className="home-sphere home-sphere-md" />
        <span className="home-sphere home-sphere-xs" />
        <span className="home-sphere home-sphere-xl" />
        <span className="home-sphere home-sphere-sm home-sphere-muted" />
        <span className="home-sphere home-sphere-md home-sphere-bright" />
      </section>
      <About />
    </>
  );
}
