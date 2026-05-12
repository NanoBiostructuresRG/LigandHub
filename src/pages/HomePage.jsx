import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa6";
import { ArrowDown10, Blocks, ChevronRight, Pill, TextSearch } from "lucide-react";
import { HeroHeader } from "../components/Header";
import tlr9Image from "../../assets/TLR9.png";

const applicationAreas = [
  {
    title: "Datasets Tools",
    description: "Exploration and curation of molecular collections.",
    path: "/datasets",
    icon: TextSearch
  },
  {
    title: "Features Tools",
    description: "Computation and engineering of molecular features for ML.",
    path: "/features",
    icon: ArrowDown10
  },
  {
    title: "Docking Tools",
    description: "File preparation and transformation for docking.",
    path: "/docking",
    icon: Blocks
  },
  {
    title: "ADME Tools",
    description: "Data curation & 3D conversion for ADMET.",
    path: "/admet",
    icon: Pill
  }
];

const iconComponents = new Set([ArrowDown10, Blocks, Pill, TextSearch]);

export function HomePage() {
  return (
    <>
      <HeroHeader
        className="home-hero"
        subtitle={(
          <>
            <span className="home-tagline-lead">Chemical Prototyping</span>
            <span className="home-tagline-detail">
              Explore, analyze, and prepare{" "}
              <span className="home-tagline-accent">molecular data</span>
              {" "}&mdash; all through a chemoinformatics API
            </span>
          </>
        )}
      />
      <section className="card home-card">
        <div className="docking-card-title-box home-prototyping-title-box">
          <span className="docking-title-starfield" aria-hidden="true" />
          <span className="docking-title-starfield docking-title-starfield-dense" aria-hidden="true" />
          <span className="docking-title-starfield docking-title-starfield-dust" aria-hidden="true" />
          <h2 className="home-card-title docking-card-title">The Prototyping Suite</h2>
        </div>
        <p className="page-intro">
          <strong className="about-brand-highlight">LigandHub</strong> organizes molecular preparation and analysis workflows in a shared browser-based workspace.
          Docking Tools is the active application area in this release.
        </p>
        <div className="app-area-grid">
          {applicationAreas.map((area) => (
            <Link className="app-area-card" to={area.path} key={area.path}>
              <span className="app-area-title">
                <span className="app-area-icon" aria-hidden="true">
                  {iconComponents.has(area.icon) ? <area.icon size={29} strokeWidth={2.75} /> : area.icon}
                </span>
                {area.title}
              </span>
              <span className="app-area-copy">{area.description}</span>
            </Link>
          ))}
        </div>
      </section>
      <div className="home-tlr9-image-wrap">
        <div className="home-target-copy">
          <div>Define your <span className="home-target-highlight home-target-highlight-target">TARGET</span>.</div>
          <div>LigandHub handles the <span className="home-target-highlight home-target-highlight-data">DATA</span>.</div>
          <div>Explore your <span className="home-target-highlight home-target-highlight-possibilities">POSSIBILITIES</span>.</div>
        </div>
        <img src={tlr9Image} alt="" className="home-tlr9-image" />
      </div>
      <section className="card home-sphere-block" aria-hidden="true">
        <div className="home-sphere-copy">
          <div className="home-sphere-headline">
            <ChevronRight className="home-sphere-prompt-icon" aria-hidden="true" />
            Your journey, streamlined.
          </div>
          <div className="home-sphere-subline">We build the engine. You explore the chemical space.</div>
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
      <div className="home-code-card-wrap">
        <a className="app-area-card home-code-card" href="https://nanobiostructuresrg.github.io/" target="_blank" rel="noopener noreferrer">
          <span className="app-area-title">
            <span className="app-area-icon home-code-icon" aria-hidden="true">
              <FaRegFolderOpen size={29} />
            </span>
            Portfolio
          </span>
          <span className="app-area-copy">Research Group</span>
        </a>
        <a className="app-area-card home-code-card" href="https://github.com/NanoBiostructuresRG/LigandHub-API" target="_blank" rel="noopener noreferrer">
          <span className="app-area-title">
            <span className="app-area-icon home-code-icon" aria-hidden="true">
              <FaGithub size={29} />
            </span>
            GitHub
          </span>
          <span className="app-area-copy">View Code</span>
        </a>
      </div>
    </>
  );
}
