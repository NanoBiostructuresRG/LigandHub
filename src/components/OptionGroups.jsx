export function PreparationOptions({
  prefix = "",
  hydrogenName,
  hydrogenValue,
  onHydrogenChange,
  chargeName,
  chargeValue,
  onChargeChange,
  minimizationName,
  minimizationValue,
  onMinimizationChange,
  iterationsId,
  iterationsValue,
  onIterationsChange,
  batch = false
}) {
  const hydrogenMergeId = `${prefix}HydrogenMerge`;
  const hydrogenKeepId = `${prefix}HydrogenKeep`;
  const chargePrefix = prefix ? `${prefix}ChargeModel` : "chargeModel";
  const minimizationPrefix = prefix ? `${prefix}EnergyMinimization` : "energyMinimization";

  return (
    <div className="options-card">
      <h3>Preparation options</h3>
      <p>{batch ? "Apply the same hydrogen and charge settings across the full ligand library before packaging the ZIP output." : "Choose how hydrogens and partial charges should be handled before generating the docking-ready output."}</p>

      <div className="options-grid">
        <div className="option-section">
          <h4>Hydrogen handling</h4>
          <p>{batch ? "Set how hydrogens should be treated for every ligand generated in the batch output." : "Use merged hydrogens for standard docking workflows, or keep them separate for specialized downstream analysis."}</p>
          <div className="option-list">
            <div className="option-item">
              <input type="radio" id={hydrogenMergeId} name={hydrogenName} value="merge" checked={hydrogenValue === "merge"} onChange={(event) => onHydrogenChange(event.target.value)} />
              <label htmlFor={hydrogenMergeId}>
                <span className="option-title">Merge hydrogens</span>
                <span className="option-copy">{batch ? "Recommended for standard batch preparation and docking workflows." : "Recommended for standard AutoDock and Vina preparation."}</span>
              </label>
            </div>
            <div className="option-item">
              <input type="radio" id={hydrogenKeepId} name={hydrogenName} value="keep" checked={hydrogenValue === "keep"} onChange={(event) => onHydrogenChange(event.target.value)} />
              <label htmlFor={hydrogenKeepId}>
                <span className="option-title">Keep hydrogens separate</span>
                <span className="option-copy">{batch ? "Use this only if the full library must retain explicit hydrogens." : "Use this only if your downstream analysis requires explicit hydrogens."}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="option-section">
          <h4>Charge model</h4>
          <p>{batch ? "Choose the charge assignment method applied uniformly across the uploaded batch library." : "Select the method used to assign ligand partial charges before exporting the final structure."}</p>
          <div className="option-list">
            {[
              ["gasteiger", "Gasteiger", batch ? "Default option with broad compatibility for batch docking preparation." : "Default option with broad compatibility for docking workflows."],
              ["nagl", "Nagl", batch ? "Neural-network-based assignment for more advanced ligand sets." : "Neural-network-based charge assignment for more advanced cases."],
              ["espaloma", "Espaloma", batch ? "Deep-learning-based model that may increase processing time." : "Deep-learning-based charge model that may increase processing time."],
              ["zero", "Zero", batch ? "Assign zero partial charges to all atoms in the batch." : "Assign zero partial charges to all atoms."]
            ].map(([value, title, copy]) => {
              const id = `${chargePrefix}${title}`;
              return (
                <div className="option-item" key={value}>
                  <input type="radio" id={id} name={chargeName} value={value} checked={chargeValue === value} onChange={(event) => onChargeChange(event.target.value)} />
                  <label htmlFor={id}>
                    <span className="option-title">{title}</span>
                    <span className="option-copy">{copy}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="option-section option-section-wide">
          <h4>Energy minimization</h4>
          <p>{batch ? "Auto follows the backend default behavior for generated ligands. On applies energy minimization across the batch using MMFF94, with UFF as a fallback." : "Auto follows the backend default behavior, minimizing generated or 2D inputs while preserving uploaded 3D geometries. On applies energy minimization to all inputs using MMFF94, with UFF as a fallback."}</p>
          <div className="minimization-settings">
            <div className="segmented-options" role="radiogroup" aria-label={batch ? "Batch energy minimization mode" : "Energy minimization mode"}>
              {["auto", "on", "off"].map((mode) => {
                const id = `${minimizationPrefix}${mode[0].toUpperCase()}${mode.slice(1)}`;
                return (
                  <div className="segmented-option" key={mode}>
                    <input type="radio" id={id} name={minimizationName} value={mode} checked={minimizationValue === mode} onChange={(event) => onMinimizationChange(event.target.value)} />
                    <label htmlFor={id}>
                      <span className="option-title">{mode[0].toUpperCase() + mode.slice(1)}</span>
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="minimization-iterations">
              <label htmlFor={iterationsId}>Max iterations</label>
              <input type="text" id={iterationsId} maxLength="4" value={iterationsValue} inputMode="numeric" pattern="[0-9]*" disabled={minimizationValue !== "on"} onChange={(event) => onIterationsChange(event.target.value)} onBlur={() => {
                if (iterationsValue === "") {
                  onIterationsChange("100");
                }
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
