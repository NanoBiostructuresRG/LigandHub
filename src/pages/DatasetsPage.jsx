import { TextSearch } from "lucide-react";

export function DatasetsPage() {
  return (
    <>
      <div className="docking-hero-spacer">
        <h1><TextSearch className="docking-title-icon" aria-hidden="true" />Datasets Tools</h1>
        <p>
          A basic workflow to <span className="datasets-tagline-accent">prepare</span> and{" "}
          <span className="datasets-tagline-accent">curate</span> tabular molecular datasets.
        </p>
      </div>
      <section className="card">
        <div className="docking-card-title-box datasets-title-box">
          <span className="docking-title-starfield" aria-hidden="true" />
          <span className="docking-title-starfield docking-title-starfield-dense" aria-hidden="true" />
          <span className="docking-title-starfield docking-title-starfield-dust" aria-hidden="true" />
          <h2 className="home-card-title docking-card-title">Molecular data in tabular format</h2>
          <p>A toolkit for data preparation</p>
        </div>
        <p className="page-intro">
          This area is reserved for molecular dataset workflows, including curated libraries, reference collections,
          and dataset preparation steps planned for future LigandHub releases.
        </p>
      </section>
    </>
  );
}
