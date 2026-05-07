import { useRef, useState } from "react";
import { prepareLigandBatch } from "../services/ligandhubApi";
import { downloadBlob, getContentDispositionFilename } from "../utils/downloads";
import { formatValidationFeedback } from "../utils/errors";
import { constrainMinimizationIterations, getMinimizationOptions } from "../utils/validation";
import { LimitEntries, LimitsPanel } from "./LimitsPanel";
import { PreparationOptions } from "./OptionGroups";
import { ResultPanel } from "./ResultPanel";

export function BatchLigandPreparation({ limits, notes, serviceMode, limitsLoading, limitsLoaded }) {
  const batchFileRef = useRef(null);
  const [hydrogenHandling, setHydrogenHandling] = useState("merge");
  const [chargeModel, setChargeModel] = useState("gasteiger");
  const [minimizationMode, setMinimizationMode] = useState("auto");
  const [minimizationIterations, setMinimizationIterations] = useState("100");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  function showBatchError(nextError) {
    setError(nextError);
    setResult(null);
  }

  async function handlePrepareBatch() {
    setError(null);
    setResult(null);

    const file = batchFileRef.current?.files?.[0];
    if (!file) {
      showBatchError({ message: "Please select a batch library file in .smi, .smiles, or .txt format." });
      return;
    }

    const validExtension = /\.(smi|smiles|txt)$/i.test(file.name);
    if (!validExtension) {
      showBatchError({ message: "Batch ligand preparation only accepts .smi, .smiles, or .txt files." });
      return;
    }

    if (limits?.batch_upload_max_bytes && file.size > limits.batch_upload_max_bytes) {
      showBatchError({
        message: "This library exceeds the current prototype upload limit.",
        suggestion: "Split it into smaller batch files before uploading.",
        limits
      });
      return;
    }

    const minimizationOptions = getMinimizationOptions(minimizationMode, minimizationIterations);
    if (minimizationOptions.error) {
      showBatchError({ message: minimizationOptions.error });
      return;
    }

    setIsProcessing(true);

    try {
      const response = await prepareLigandBatch({
        file,
        mergeH: hydrogenHandling === "merge",
        chargeModel,
        minimizationOptions
      });
      const blob = await response.blob();
      const downloadName = getContentDispositionFilename(response.headers.get("content-disposition"))
        || "ligands_pdbqt_batch.zip";
      downloadBlob(blob, downloadName);
      setResult({ downloadName });
    } catch (err) {
      if (err.errors || err.warnings) {
        showBatchError({
          message: formatValidationFeedback({
            message: err.message || "Batch processing failed.",
            errors: err.errors || [],
            warnings: err.warnings || []
          }) || err.message || "Batch processing failed.",
          suggestion: err.suggestion || "",
          limits: err.limits || null
        });
      } else {
        showBatchError({
          message: err.message || "Unexpected error",
          suggestion: err.suggestion || "",
          limits: err.limits || null
        });
      }
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <section className="workflow-panel active" id="batchWorkflowPanel" role="tabpanel" aria-labelledby="workflowTabBatch">
      <div className="input-group">
        <label>Input method:</label>
        <div className="info" style={{ marginTop: 8 }}>
          Upload a batch library file in <code>.smi</code>, <code>.smiles</code>, or <code>.txt</code> format.
        </div>
      </div>

      <LimitsPanel limits={limits} notes={notes} serviceMode={serviceMode} loading={limitsLoading} loaded={limitsLoaded} />

      <div className="input-group">
        <label htmlFor="batchFile">Upload library file</label>
        <input type="file" id="batchFile" accept=".smi,.smiles,.txt" ref={batchFileRef} />
      </div>

      <div className="info tool-note" style={{ fontSize: 12 }}>
        <strong>Notes:</strong> Use batch mode when you want to prepare many ligands at once from a text-based
        library file. If your library is too large for the current prototype, split it into smaller files
        before uploading.
      </div>

      <PreparationOptions
        prefix="batch"
        hydrogenName="batchHydrogenHandling"
        hydrogenValue={hydrogenHandling}
        onHydrogenChange={setHydrogenHandling}
        chargeName="batchChargeModel"
        chargeValue={chargeModel}
        onChargeChange={setChargeModel}
        minimizationName="batchEnergyMinimization"
        minimizationValue={minimizationMode}
        onMinimizationChange={setMinimizationMode}
        iterationsId="batchMinimizationMaxIters"
        iterationsValue={minimizationIterations}
        onIterationsChange={(value) => setMinimizationIterations(constrainMinimizationIterations(value))}
        batch
      />

      <button className="btn" type="button" style={{ background: "linear-gradient(135deg, #5f6fd8 0%, #6d5fc7 100%)" }} onClick={handlePrepareBatch} disabled={isProcessing}>Prepare Batch ZIP</button>

      {isProcessing ? (
        <div className="progress active">
          <div className="spinner"></div>
          <p>Processing batch library... this may take longer depending on the number of ligands.</p>
        </div>
      ) : null}

      {error ? (
        <div className="error active">
          <strong>Error:</strong>
          <div className="error-copy">{error.message}</div>
          {error.suggestion ? <div className="error-suggestion">{error.suggestion}</div> : null}
          {error.limits ? (
            <div className="error-limits">
              <h4>Current prototype limits</h4>
              <div className="error-limits-list">
                <LimitEntries limits={error.limits} itemClass="error-limit-item" labelClass="error-limit-label" valueClass="error-limit-value" />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {result ? (
        <ResultPanel title="Batch preparation successful!">
          <p>Batch ligand preparation completed successfully. The ZIP archive <code>{result.downloadName}</code> was downloaded automatically.</p>
        </ResultPanel>
      ) : null}
    </section>
  );
}
