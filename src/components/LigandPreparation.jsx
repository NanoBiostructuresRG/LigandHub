import { useRef, useState } from "react";
import { prepareLigand, validateSmiles } from "../services/ligandhubApi";
import { downloadBlob, getContentDispositionFilename } from "../utils/downloads";
import { formatValidationFeedback, parseWarningHeader } from "../utils/errors";
import { constrainMinimizationIterations, getMinimizationOptions } from "../utils/validation";
import { PreparationOptions } from "./OptionGroups";
import { ResultPanel } from "./ResultPanel";

export function LigandPreparation() {
  const ligandFileRef = useRef(null);
  const [inputType, setInputType] = useState("file");
  const [smiles, setSmiles] = useState("");
  const [hydrogenHandling, setHydrogenHandling] = useState("merge");
  const [chargeModel, setChargeModel] = useState("gasteiger");
  const [minimizationMode, setMinimizationMode] = useState("auto");
  const [minimizationIterations, setMinimizationIterations] = useState("100");
  const [validation, setValidation] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleValidateSmiles({ allowUnavailable = false } = {}) {
    const trimmedSmiles = smiles.trim();
    if (!trimmedSmiles) {
      setValidation({ message: "Please enter a SMILES string.", type: "error" });
      return null;
    }

    setIsValidating(true);

    try {
      const data = await validateSmiles(trimmedSmiles);
      const warnings = data.warnings || [];

      if (data.valid) {
        const formatted = formatValidationFeedback({
          message: warnings.length ? "Valid SMILES with cautions." : "Valid SMILES.",
          warnings
        });
        setValidation({ message: formatted, type: warnings.length ? "warning" : "success" });
      } else {
        const formatted = formatValidationFeedback({
          message: "Invalid SMILES.",
          errors: data.errors || [],
          warnings
        }) || "Invalid SMILES syntax.";
        setValidation({ message: formatted, type: "error" });
      }

      return data;
    } catch (err) {
      const endpointMissing = err.status === 404;
      const message = endpointMissing
        ? "The validation endpoint is not available in the deployed backend yet."
        : `Validation server error: ${err.message || "Unexpected error"}`;

      setValidation({ message, type: endpointMissing || allowUnavailable ? "warning" : "error" });
      if (endpointMissing || allowUnavailable) {
        return { valid: null, validationUnavailable: true };
      }

      return null;
    } finally {
      setIsValidating(false);
    }
  }

  async function handlePrepareLigand() {
    setError("");
    setResult(null);

    const minimizationOptions = getMinimizationOptions(minimizationMode, minimizationIterations);
    if (minimizationOptions.error) {
      setError(minimizationOptions.error);
      return;
    }

    let ligandData = null;
    let filename = "ligand";

    if (inputType === "file") {
      const file = ligandFileRef.current?.files?.[0];
      if (!file) {
        setError("Please select a file to upload.");
        return;
      }

      ligandData = file;
      filename = file.name.includes(".")
        ? file.name.substring(0, file.name.lastIndexOf("."))
        : file.name;
    } else {
      const trimmedSmiles = smiles.trim();
      if (!trimmedSmiles) {
        setError("Please enter a SMILES string.");
        return;
      }

      const validationResult = await handleValidateSmiles({ allowUnavailable: true });
      if (validationResult && validationResult.valid === false) {
        setError("Please fix the SMILES validation errors before ligand preparation.");
        return;
      }

      ligandData = new Blob([trimmedSmiles], { type: "text/plain" });
      filename = "smiles_input";
    }

    setIsProcessing(true);

    try {
      const response = await prepareLigand({
        inputType,
        ligandData,
        filename,
        mergeH: hydrogenHandling === "merge",
        chargeModel,
        minimizationOptions
      });
      const blob = await response.blob();
      const warnings = parseWarningHeader(response);
      const downloadName = getContentDispositionFilename(response.headers.get("content-disposition")) || `${filename}_prepared.pdbqt`;
      downloadBlob(blob, downloadName);
      setResult({ message: "Your ligand has been processed successfully and the PDBQT file was downloaded.", warnings });
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <section className="workflow-panel active" id="singleWorkflowPanel" role="tabpanel" aria-labelledby="workflowTabSingle">
      <div className="input-group">
        <label>Input method:</label>
        <div className="radio-group">
          <label htmlFor="inputTypeFile">
            <input type="radio" id="inputTypeFile" name="inputType" value="file" checked={inputType === "file"} onChange={() => {
              setInputType("file");
              setValidation(null);
            }} />
            Upload file
          </label>
          <label htmlFor="inputTypeSmiles">
            <input type="radio" id="inputTypeSmiles" name="inputType" value="smiles" checked={inputType === "smiles"} onChange={() => setInputType("smiles")} />
            Enter SMILES
          </label>
        </div>
      </div>

      {inputType === "file" ? (
        <div className="input-group">
          <label htmlFor="ligandFile">Files: SDF, PDB, MOL2, SMI, SMILES and TXT</label>
          <input type="file" id="ligandFile" accept=".sdf,.pdb,.mol2,.smi,.smiles,.txt" ref={ligandFileRef} />
        </div>
      ) : (
        <div className="input-group">
          <label htmlFor="smilesInput">SMILES string</label>
          <textarea id="smilesInput" placeholder="Example: CCO (ethanol) or CC(=O)O (acetic acid)" value={smiles} onChange={(event) => {
            setSmiles(event.target.value);
            setValidation(null);
          }} />
          <div className="smiles-actions">
            <button className="smiles-action-btn primary" type="button" onClick={() => handleValidateSmiles()} disabled={isValidating}>
              {isValidating ? "Validating..." : "Validate SMILES"}
            </button>
            <button className="smiles-action-btn secondary" type="button" onClick={() => {
              setSmiles("");
              setValidation(null);
            }}>Clear</button>
          </div>
          {validation ? (
            <div className={`validation-message active ${validation.type}`} role="status" aria-live="polite">
              {validation.message}
            </div>
          ) : null}
        </div>
      )}

      <div className="input-group">
        <label>Output</label>
        <div className="info" style={{ marginTop: 8 }}>
          <strong>PDBQT</strong> format for AutoDock and Vina workflows.
        </div>
      </div>

      <PreparationOptions
        hydrogenName="hydrogenHandling"
        hydrogenValue={hydrogenHandling}
        onHydrogenChange={setHydrogenHandling}
        chargeName="chargeModel"
        chargeValue={chargeModel}
        onChargeChange={setChargeModel}
        minimizationName="energyMinimization"
        minimizationValue={minimizationMode}
        onMinimizationChange={setMinimizationMode}
        iterationsId="minimizationMaxIters"
        iterationsValue={minimizationIterations}
        onIterationsChange={(value) => setMinimizationIterations(constrainMinimizationIterations(value))}
      />

      <div className="info tool-note" style={{ fontSize: 12 }}>
        <strong>Notes:</strong> Use merged hydrogens for standard AutoDock and Vina workflows. Keep hydrogens
        separate only if your downstream analysis requires them. Gasteiger is the default charge model; Nagl
        and Espaloma may improve charge assignment for more complex ligands, but can increase processing time.
        Zero assigns partial charges of 0 to all atoms.
      </div>

      <button className="btn" type="button" onClick={handlePrepareLigand} disabled={isProcessing}>Prepare Ligand</button>

      {isProcessing ? (
        <div className="progress active">
          <div className="spinner"></div>
          <p>Processing ligand... this may take a few seconds</p>
        </div>
      ) : null}

      <ResultPanel type="error">{error}</ResultPanel>
      {result ? (
        <ResultPanel title="Ligand processed successfully!">
          <p>{result.message}</p>
          {result.warnings.length ? (
            <div className="validation-message active warning" style={{ display: "block" }}>
              {result.warnings.map((warning) => `Warning: ${warning}`).join("\n")}
            </div>
          ) : null}
        </ResultPanel>
      ) : null}
    </section>
  );
}
