import { ArrowDown10 } from "lucide-react";

export function FeaturesPage() {
  return (
    <>
      <div className="docking-hero-spacer">
        <h1><ArrowDown10 className="docking-title-icon" aria-hidden="true" />Features Tools</h1>
        <p>
          <span className="features-tagline-accent">Transform</span> and{" "}
          <span className="features-tagline-accent">analize</span> raw molecular data into ML-ready features.
        </p>
      </div>
      <section className="card">
        <div className="docking-card-title-box features-title-box">
          <span className="docking-title-starfield" aria-hidden="true" />
          <span className="docking-title-starfield docking-title-starfield-dense" aria-hidden="true" />
          <span className="docking-title-starfield docking-title-starfield-dust" aria-hidden="true" />
          <h2 className="home-card-title docking-card-title">Molecular descriptors</h2>
          <p>A toolkit for feature engineering</p>
        </div>
        <p className="page-intro">
          This area is reserved for feature engineering workflows, including molecular descriptors and structured
          feature tables planned for future LigandHub releases.
        </p>
      </section>
    </>
  );
}
