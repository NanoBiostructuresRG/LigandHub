import { Pill } from "lucide-react";

export function AdmetPage() {
  return (
    <>
      <div className="docking-hero-spacer">
        <h1><Pill className="docking-title-icon" aria-hidden="true" />ADME Tools</h1>
        <p>
          <span className="admet-tagline-accent">Clean</span>,{" "}
          <span className="admet-tagline-accent">validate</span>, and{" "}
          <span className="admet-tagline-accent">convert</span> to 3D formats.
        </p>
      </div>
      <section className="card">
        <div className="docking-card-title-box admet-title-box">
          <span className="docking-title-starfield" aria-hidden="true" />
          <span className="docking-title-starfield docking-title-starfield-dense" aria-hidden="true" />
          <span className="docking-title-starfield docking-title-starfield-dust" aria-hidden="true" />
          <h2 className="home-card-title docking-card-title">Molecular 3D structure converter</h2>
          <p>A toolkit for ADMET analysis</p>
        </div>
        <p className="page-intro">
          This area is reserved for ADMET workflows covering absorption, distribution, metabolism, excretion, and
          toxicity analyses planned for future LigandHub releases.
        </p>
      </section>
    </>
  );
}
