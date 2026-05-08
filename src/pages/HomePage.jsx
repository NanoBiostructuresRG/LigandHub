import { Link } from "react-router-dom";
import { HeroHeader } from "../components/Header";

const applicationAreas = [
  {
    title: "Molecular Datasets",
    description: "Organize molecular dataset workflows for future LigandHub modules.",
    path: "/datasets"
  },
  {
    title: "Docking Tools",
    description: "Prepare ligands, process batch libraries, and recover docking output coordinates.",
    path: "/docking"
  },
  {
    title: "Feature Engineering",
    description: "Explore descriptor and feature preparation workflows as they are added.",
    path: "/features"
  },
  {
    title: "ADMET",
    description: "Reserve space for ADMET-oriented analysis workflows in the LigandHub hub.",
    path: "/admet"
  }
];

export function HomePage() {
  return (
    <>
      <HeroHeader subtitle="A shared browser workspace for molecular datasets, docking tools, feature engineering, and ADMET workflows" />
      <section className="card home-card">
        <h2>Scientific Web Applications Hub</h2>
        <p className="page-intro">
          LigandHub brings molecular preparation and analysis workflows into a shared browser-based workspace.
          The current production-ready application area is Docking Tools.
        </p>
        <div className="app-area-grid">
          {applicationAreas.map((area) => (
            <Link className="app-area-card" to={area.path} key={area.path}>
              <span className="app-area-title">{area.title}</span>
              <span className="app-area-copy">{area.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
