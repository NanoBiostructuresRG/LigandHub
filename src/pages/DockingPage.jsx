import { useState } from "react";
import { Blocks } from "lucide-react";
import { BackendStatus } from "../components/BackendStatus";
import { BatchLigandPreparation } from "../components/BatchLigandPreparation";
import { DockingResultRecovery } from "../components/DockingResultRecovery";
import { LigandPreparation } from "../components/LigandPreparation";
import { ToolTabs } from "../components/ToolTabs";
import { useBackendHealth } from "../hooks/useBackendHealth";
import { usePrototypeLimits } from "../hooks/usePrototypeLimits";

export function DockingPage() {
  const [activeTool, setActiveTool] = useState("prepare");
  const [activeWorkflow, setActiveWorkflow] = useState("single");
  const backendStatus = useBackendHealth();
  const { limits, notes, serviceMode, loading: limitsLoading, loaded: limitsLoaded } = usePrototypeLimits();

  return (
    <>
      <div className="docking-hero-spacer">
        <h1><Blocks className="docking-title-icon" aria-hidden="true" />Docking Tools</h1>
        <p>
          Input <span className="docking-tagline-accent">preparation</span> and output{" "}
          <span className="docking-tagline-accent">transformation</span> for docking workflows.
        </p>
      </div>
      <div className="card">
        <div className="docking-card-title-box">
          <span className="docking-title-starfield" aria-hidden="true" />
          <span className="docking-title-starfield docking-title-starfield-dense" aria-hidden="true" />
          <span className="docking-title-starfield docking-title-starfield-dust" aria-hidden="true" />
          <h2 className="home-card-title docking-card-title">Molecular format converter</h2>
          <p>A toolkit for AutoDock Vina</p>
        </div>

        <ToolTabs activeTool={activeTool} onSelect={setActiveTool} />
        <BackendStatus status={backendStatus} />

        {activeTool === "prepare" ? (
          <section className="tool-panel active" id="preparePanel" role="tabpanel" aria-labelledby="toolTabPrepare">
            <p className="tool-panel-intro">Choose single-ligand preparation for one structure or SMILES string, or batch preparation to process a SMILES library and download a ZIP of <code>PDBQT</code> files.</p>

            <div className="workflow-switcher" role="tablist" aria-label="Ligand preparation workflows">
              <button
                className={`workflow-tab${activeWorkflow === "single" ? " active" : ""}`}
                id="workflowTabSingle"
                type="button"
                role="tab"
                aria-selected={activeWorkflow === "single"}
                aria-controls="singleWorkflowPanel"
                onClick={() => setActiveWorkflow("single")}
              >
                <span className="workflow-title">Ligand preparation</span>
                <span className="workflow-copy">Validate SMILES input when needed and prepare one ligand for docking.</span>
              </button>
              <button
                className={`workflow-tab${activeWorkflow === "batch" ? " active" : ""}`}
                id="workflowTabBatch"
                type="button"
                role="tab"
                aria-selected={activeWorkflow === "batch"}
                aria-controls="batchWorkflowPanel"
                onClick={() => setActiveWorkflow("batch")}
              >
                <span className="workflow-title">Batch ligand preparation</span>
                <span className="workflow-copy">Process a SMILES library and download prepared ligands as a ZIP archive.</span>
              </button>
            </div>

            {activeWorkflow === "single" ? (
              <LigandPreparation />
            ) : (
              <BatchLigandPreparation limits={limits} notes={notes} serviceMode={serviceMode} limitsLoading={limitsLoading} limitsLoaded={limitsLoaded} />
            )}
          </section>
        ) : (
          <DockingResultRecovery />
        )}
      </div>
    </>
  );
}
