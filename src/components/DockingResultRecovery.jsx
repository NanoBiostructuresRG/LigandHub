import { useRef, useState } from "react";
import { convertDockingResult } from "../services/ligandhubApi";
import { downloadBlob, getContentDispositionFilename } from "../utils/downloads";
import { ResultPanel } from "./ResultPanel";

export function DockingResultRecovery() {
  const fileRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [resultFile, setResultFile] = useState("");

  async function handleConvert() {
    setError("");
    setResultFile("");

    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Please select a PDBQT or DLG file.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await convertDockingResult(file);
      const blob = await response.blob();
      const downloadName = getContentDispositionFilename(response.headers.get("content-disposition"))
        || file.name.replace(/\.(pdbqt|dlg)$/i, "_docked.sdf");
      downloadBlob(blob, downloadName);
      setResultFile(file.name);
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <section className="tool-panel active" id="convertPanel" role="tabpanel" aria-labelledby="toolTabConvert">
      <p className="tool-panel-intro">Upload a docking output file to recover the docked ligand geometry as an <code>SDF</code> file. Use <code>PDBQT</code> for direct pose export or <code>DLG</code> for AutoDock log outputs.</p>

      <div className="input-group">
        <label htmlFor="dockingResultFile">Upload docking result (PDBQT or DLG)</label>
        <input type="file" id="dockingResultFile" accept=".pdbqt,.dlg" ref={fileRef} />
      </div>

      <button className="btn" type="button" style={{ background: "linear-gradient(135deg, #5f6fd8 0%, #6d5fc7 100%)" }} onClick={handleConvert} disabled={isProcessing}>
        Convert to SDF
      </button>

      {isProcessing ? (
        <div className="progress active">
          <div className="spinner"></div>
          <p>Converting docking result... this may take a few seconds</p>
        </div>
      ) : null}

      <ResultPanel type="error">{error}</ResultPanel>
      {resultFile ? (
        <ResultPanel title="Conversion successful!">
          <p>Successfully converted <code>{resultFile}</code> to SDF format with docked coordinates.</p>
        </ResultPanel>
      ) : null}
    </section>
  );
}
