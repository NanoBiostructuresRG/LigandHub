import { API_ENDPOINTS } from "../config/api";
import { getBatchErrorData, getErrorMessage } from "../utils/errors";

function appendMinimizationOptions(formData, options) {
  if (options.mode === "on") {
    formData.append("energy_minimization", "true");
  } else if (options.mode === "off") {
    formData.append("energy_minimization", "false");
  }

  if (options.shouldSendIterations) {
    formData.append("minimization_max_iters", String(Number(options.iterations)));
  }
}

export async function checkBackendHealth() {
  const response = await fetch(API_ENDPOINTS.health);
  if (!response.ok) {
    throw new Error("Backend unavailable");
  }

  const data = await response.json();
  if (data.status !== "ok") {
    throw new Error("Unexpected health response");
  }

  return data;
}

export async function loadPrototypeLimits() {
  const response = await fetch(API_ENDPOINTS.limits);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function validateSmiles(smiles) {
  const response = await fetch(API_ENDPOINTS.validate, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ smiles })
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function prepareLigand({ inputType, ligandData, filename, mergeH, chargeModel, minimizationOptions }) {
  const formData = new FormData();

  if (inputType === "file") {
    formData.append("file", ligandData);
  } else {
    formData.append("file", ligandData, "smiles.smi");
  }

  formData.append("filename", filename);
  formData.append("output_format", "pdbqt");
  formData.append("merge_h", mergeH.toString());
  formData.append("charge_model", chargeModel);
  appendMinimizationOptions(formData, minimizationOptions);

  const response = await fetch(API_ENDPOINTS.prepareLigand, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(message);
  }

  return response;
}

export async function convertDockingResult(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("filename", file.name);

  const response = await fetch(API_ENDPOINTS.convertDockingResult, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new Error(message);
  }

  return response;
}

export async function prepareLigandBatch({ file, mergeH, chargeModel, minimizationOptions }) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("filename", file.name.replace(/\.[^.]+$/, "") || "ligands_batch");
  formData.append("merge_h", String(mergeH));
  formData.append("charge_model", chargeModel);
  appendMinimizationOptions(formData, minimizationOptions);

  const response = await fetch(API_ENDPOINTS.prepareLigandBatch, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const errorData = await getBatchErrorData(response);
    const detail = errorData?.detail;

    if (detail && typeof detail === "object") {
      const error = {
        message: detail.message || "Batch processing failed.",
        errors: detail.errors || [],
        warnings: detail.warnings || [],
        suggestion: detail.suggestion || "",
        limits: detail.limits || null
      };
      throw error;
    }

    const fallbackMessage = typeof detail === "string" && detail.trim()
      ? detail
      : "Batch processing failed.";
    throw { message: fallbackMessage };
  }

  return response;
}
