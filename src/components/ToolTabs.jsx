export function ToolTabs({ activeTool, onSelect }) {
  return (
    <div className="tool-switcher" role="tablist" aria-label="LigandHub tools">
      <button
        className={`tool-tab${activeTool === "prepare" ? " active" : ""}`}
        id="toolTabPrepare"
        type="button"
        role="tab"
        aria-selected={activeTool === "prepare"}
        aria-controls="preparePanel"
        onClick={() => onSelect("prepare")}
      >
        <span className="tool-tab-title">Prepare Ligand</span>
        <span className="tool-tab-copy">Generate <code>PDBQT</code> from ligand structures or SMILES.</span>
      </button>
      <button
        className={`tool-tab${activeTool === "convert" ? " active" : ""}`}
        id="toolTabConvert"
        type="button"
        role="tab"
        aria-selected={activeTool === "convert"}
        aria-controls="convertPanel"
        onClick={() => onSelect("convert")}
      >
        <span className="tool-tab-title">Convert Docking Results</span>
        <span className="tool-tab-copy">Recover docked ligand coordinates from <code>PDBQT</code> or <code>DLG</code> into <code>SDF</code>.</span>
      </button>
    </div>
  );
}
