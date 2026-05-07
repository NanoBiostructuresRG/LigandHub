import { LIMIT_LABELS, formatLimitValue } from "../utils/validation";

const LIMIT_KEYS = [
  "batch_upload_max_bytes",
  "batch_max_molecules",
  "batch_max_scrubbed_states_per_ligand",
  "batch_max_generated_pdbqt_files",
  "batch_max_total_pdbqt_bytes"
];

export function LimitEntries({ limits, itemClass = "limits-item", labelClass = "limits-item-label", valueClass = "limits-item-value" }) {
  if (!limits) {
    return null;
  }

  return LIMIT_KEYS
    .filter((key) => limits[key] !== undefined)
    .map((key) => (
      <div className={itemClass} key={key}>
        <span className={labelClass}>{LIMIT_LABELS[key] || key}</span>
        <span className={valueClass}>{formatLimitValue(key, limits[key])}</span>
      </div>
    ));
}

export function LimitsPanel({ limits, notes, serviceMode, loading, loaded }) {
  const intro = loading
    ? "Loading active prototype limits from the backend..."
    : loaded
    ? `${serviceMode ? `Service mode: ${serviceMode}. ` : ""}These are the active backend limits for the current prototype deployment on Render.`
    : "Prototype limits could not be loaded right now. You can still submit a batch file and let the backend validate it.";

  return (
    <div className={`limits-card${loaded ? "" : " empty"}`}>
      <h3>Batch processing limits</h3>
      <p>{intro}</p>
      <div className="limits-list">
        <LimitEntries limits={limits} />
      </div>
      <ul className="notes-list">
        {(notes || []).map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
