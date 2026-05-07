export const LIMIT_LABELS = {
  batch_upload_max_bytes: "Maximum batch upload size",
  batch_max_molecules: "Maximum molecules per file",
  batch_max_scrubbed_states_per_ligand: "Maximum states per ligand",
  batch_max_generated_pdbqt_files: "Maximum generated PDBQT files",
  batch_max_total_pdbqt_bytes: "Maximum total generated size",
  single_upload_max_bytes: "Maximum single upload size"
};

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) {
    return "Unavailable";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

export function formatLimitValue(key, value) {
  if (key.includes("_bytes")) {
    return formatBytes(value);
  }

  return String(value);
}

export function getMinimizationOptions(mode, rawIterations) {
  const iterationsValue = rawIterations?.trim() || "";
  const defaultIterations = "100";
  const shouldSendIterations = mode === "on";

  if (shouldSendIterations) {
    const iterations = Number(iterationsValue);
    if (!Number.isInteger(iterations) || iterations < 1 || iterations > 2000) {
      return {
        error: "Minimization iterations must be a whole number between 1 and 2000."
      };
    }
  }

  return {
    mode,
    iterations: iterationsValue || defaultIterations,
    shouldSendIterations
  };
}

export function constrainMinimizationIterations(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  const numberValue = Number(digits);

  if (digits && numberValue > 2000) {
    return "2000";
  }

  return digits;
}
