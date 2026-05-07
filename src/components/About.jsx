export function About() {
  return (
    <div className="card about-card">
      <h2>About</h2>
      <p>
        <strong>LigandHub</strong> is a prototype web-based platform for ligand preparation
        and docking output recovery. It converts molecular structures in <code>SDF</code>, <code>PDB</code>,{" "}
        <code>MOL2</code>, or <code>SMILES</code> format into <code>PDBQT</code> files and can recover
        docked ligand coordinates from <code>PDBQT</code> or <code>DLG</code> results into <code>SDF</code>{" "}
        format. Ligands can be processed individually or in batch through the Batch Ligand Preparation section
        using <code>SMILES</code> libraries. The batch workflow returns a <code>ZIP</code> archive containing
        prepared <code>PDBQT</code> ligands and a summary file. Large libraries should be split into smaller
        files before upload. This version applies conservative upload and library-size limits shown
        in the interface when available.
      </p>
      <p className="about-note">
        <strong>Data handling:</strong> Uploaded files, including SMILES-containing text files, are stored only
        temporarily during request processing and are not intentionally retained by the application afterward.
      </p>
      <p className="about-note">
        <strong>Processing:</strong> Ligand preparation is performed on the backend
        using <strong>Meeko</strong> (0.7.1) and RDKit (2025.9.2). Citing the software:{" "}
        <a href="https://doi.org/10.5281/zenodo.20065340" target="_blank" rel="noopener noreferrer">
          https://doi.org/10.5281/zenodo.20065340
        </a>.
      </p>
    </div>
  );
}
