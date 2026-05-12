import { SiArxiv, SiZenodo } from "react-icons/si";
import { FaCode } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";

export function About() {
  return (
    <div className="about-card">
      <div className="card about-panel">
        <h2 className="home-card-title">Overview</h2>
        <p>
          <strong className="about-brand-highlight">LigandHub</strong> is a prototype web platform under active development — designed to explore, analyze, and prepare{" "}
          <strong className="home-tagline-accent">molecular data</strong>.
          The active Docking Tools area converts ligand structures in <code>SDF</code>, <code>PDB</code>,{" "}
          <code>MOL2</code>, or <code>SMILES</code> format into <code>PDBQT</code> files and recovers docked
          ligand coordinates from <code>PDBQT</code> or <code>DLG</code> results into <code>SDF</code> format.
          Ligands can be prepared individually or in batch from <code>SMILES</code> libraries. Batch preparation
          returns a <code>ZIP</code> archive with prepared <code>PDBQT</code> ligands and a summary file. Large
          libraries should be split into smaller files before upload. When available, current prototype limits
          are shown directly in the interface.
        </p>
      </div>
      <div className="card about-panel">
        <h2 className="home-card-title">Third parties</h2>
        <div className="app-area-card about-toolkit-card">
          <span className="app-area-title">
            <span className="app-area-icon about-citation-icon" aria-hidden="true">
              <VscWorkspaceTrusted size={23} />
            </span>
            Data handling
          </span>
          <p className="about-note">
            Uploaded files, including text files containing SMILES records, are used
            only during request processing and are not intentionally retained by the application afterward.
          </p>
        </div>
        <div className="app-area-card about-toolkit-card">
          <span className="app-area-title">
            <span className="app-area-icon about-citation-icon" aria-hidden="true">
              <FaCode size={23} />
            </span>
            Toolkits
          </span>
          <p className="about-toolkit-intro">
            This platform stands on the shoulders of{" "}
            <strong>the free and open-source software community</strong>. We gratefully acknowledge the
            developers of the following toolkits and libraries:
          </p>
          <ul className="about-toolkit-list">
            <li>Meeko (GNU LGP License)</li>
            <li>RDKit (BSD 3-Clause License)</li>
            <li>React (MIT License)</li>
            <li>Vite (MIT License)</li>
          </ul>
        </div>
      </div>
      <div className="card about-panel about-citations-panel">
        <h2 className="home-card-title">Citations</h2>
        <div className="about-citation-grid">
          <div className="app-area-card about-citation-card">
            <span className="app-area-title">
              <span className="app-area-icon about-citation-icon" aria-hidden="true">
                <SiArxiv size={23} />
              </span>
              Preprints
            </span>
            <p>
              F.I. Saldívar-González, A.C. Murrieta, D. Castro-Flores, F.F. Contreras-Torres.
              LigandHub: Web-Based Ligand Preparation and Docking Output Recovery Platform.
              ChemRxiv. 04 May 2026.
              DOI:{" "}
              <a href="https://doi.org/10.26434/chemrxiv.15002691/v1" target="_blank" rel="noopener noreferrer">
                https://doi.org/10.26434/chemrxiv.15002691/v1
              </a>
            </p>
          </div>
          <div className="app-area-card about-citation-card">
            <span className="app-area-title">
              <span className="app-area-icon about-citation-icon" aria-hidden="true">
                <SiZenodo size={23} />
              </span>
              Software
            </span>
            <p>
              F.F. Contreras-Torres. LigandHub-API. Version v0.1.14.{" "}
              <a href="https://doi.org/10.5281/zenodo.20065340" target="_blank" rel="noopener noreferrer">
                https://doi.org/10.5281/zenodo.20065340
              </a>
            </p>
            <p>
              F.F. Contreras-Torres. LigandHub: Frontend Web Interface. Version v0.2.0.{" "}
              <a href="https://doi.org/10.5281/zenodo.20074324" target="_blank" rel="noopener noreferrer">
                https://doi.org/10.5281/zenodo.20074324
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
