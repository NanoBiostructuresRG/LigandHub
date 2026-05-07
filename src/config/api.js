export const API_BASE_URL = "https://ligandhub-api.onrender.com";

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/health`,
  limits: `${API_BASE_URL}/limits`,
  validate: `${API_BASE_URL}/validate`,
  prepareLigand: `${API_BASE_URL}/prepare_ligand`,
  prepareLigandBatch: `${API_BASE_URL}/prepare_ligand_batch`,
  convertDockingResult: `${API_BASE_URL}/convert_pdbqt_to_sdf`
};
