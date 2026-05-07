import { useState } from "react";
import { About } from "./components/About";
import { BackendStatus } from "./components/BackendStatus";
import { BatchLigandPreparation } from "./components/BatchLigandPreparation";
import { DockingResultRecovery } from "./components/DockingResultRecovery";
import { Footer } from "./components/Footer";
import { Header, HeroHeader } from "./components/Header";
import { LigandPreparation } from "./components/LigandPreparation";
import { ToolTabs } from "./components/ToolTabs";
import { useBackendHealth } from "./hooks/useBackendHealth";
import { usePrototypeLimits } from "./hooks/usePrototypeLimits";

export default function App() {
  const [activeTool, setActiveTool] = useState("prepare");
  const [activeWorkflow, setActiveWorkflow] = useState("single");
  const backendStatus = useBackendHealth();
  const { limits, notes, serviceMode, loading: limitsLoading, loaded: limitsLoaded } = usePrototypeLimits();

  return (
    <>
      <Header />
      <div className="container">
        <HeroHeader />
        <div className="card">
          <h2>Docking Tools</h2>

          <ToolTabs activeTool={activeTool} onSelect={setActiveTool} />
          <BackendStatus status={backendStatus} />

          {activeTool === "prepare" ? (
            <section className="tool-panel active" id="preparePanel" role="tabpanel" aria-labelledby="toolTabPrepare">
              <p className="tool-panel-intro">Choose between single-ligand preparation and batch library preparation. Individual mode keeps the current one-molecule workflow, while batch mode packages a full SMILES library into a ZIP of <code>PDBQT</code> files.</p>

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
                  <span className="workflow-copy">Prepare a single ligand from a structure file or a SMILES string.</span>
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
                  <span className="workflow-copy">Process a SMILES library and download a ZIP with prepared ligands.</span>
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

        <About />
        <Footer />
      </div>
    </>
  );
}
