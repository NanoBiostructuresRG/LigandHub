# LigandHub
**Version dev-v0.1.1 - May, 2026. Monterrey**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Version](https://img.shields.io/badge/version-dev--v0.1.1-blue.svg)](https://github.com/NanoBiostructuresRG/LigandHub)

---

## Description

**LigandHub** is a browser-based frontend for molecular docking workflows. It supports three main tasks: single-ligand preparation, batch ligand preparation, and recovery of docked ligand outputs from docking result files. Users can submit **SMILES** strings or structure files for individual preparation, upload text-based SMILES libraries for batch processing, choose hydrogen handling and charge model settings, and upload docking result files to recover docked poses as **SDF**.

The frontend handles input collection, basic validation, `FormData` construction, backend communication, service-status display, prototype-limit visibility, error handling, and output download. This repository contains the **frontend** of the project:

```bash
https://NanoBiostructuresRG.github.io/LigandHub
```

## How the Frontend Works

The frontend currently provides three workflows:

### Single Ligand Preparation

1. The user chooses an input method: file upload or direct SMILES input.
2. The user selects hydrogen handling, a charge model, and optional energy-minimization settings.
3. The frontend checks that the required input is present.
4. The selected file or SMILES string is added to a `FormData` request.
5. The frontend sends `output_format="pdbqt"`, `merge_h`, `charge_model`, and optional `energy_minimization` / `minimization_max_iters` fields to the backend API using `fetch()`.
6. The backend processes the ligand and generates a **PDBQT** file.
7. The backend returns the generated file to the frontend.
8. The frontend triggers the download of the prepared ligand file.

### Batch Ligand Preparation

1. The user switches to **Batch ligand preparation** in the preparation view.
2. The frontend loads active prototype limits from `GET /limits` when the page opens.
3. The user uploads a `.smi`, `.smiles`, or `.txt` library file in `SMILES ligand_id` format.
4. The frontend validates the file extension and, when limits are available, checks the file size against `batch_upload_max_bytes`.
5. The selected file is added to a `FormData` request together with `filename`, `merge_h`, `charge_model`, and optional `energy_minimization` / `minimization_max_iters` fields.
6. The request is sent to `POST /prepare_ligand_batch`.
7. The backend processes the library and returns a **ZIP** archive containing multiple prepared `.pdbqt` files plus `summary.json`.
8. The frontend triggers the download of the batch archive and surfaces backend guidance when prototype limits are exceeded.

### Docking Result Recovery

1. The user selects a docking result file in `.pdbqt` or `.dlg` format.
2. The frontend checks that the file is present.
3. The selected file is added to a `FormData` request together with `filename`.
4. The request is sent to the backend API using `fetch()`.
5. The backend extracts or reconstructs the docked ligand coordinates.
6. The backend returns the recovered structure as an **SDF** file.
7. The frontend triggers the download of the recovered docking output.

## Backend Compatibility

Frontend `dev-v0.1.1` remains compatible with the deployed LigandHub-API backend at:

```bash
https://ligandhub-api.onrender.com
```

The frontend expects the following backend endpoints:

- `GET /health`
- `GET /limits`
- `POST /validate`
- `POST /prepare_ligand`
- `POST /prepare_ligand_batch`
- `POST /convert_pdbqt_to_sdf`

Requests to `POST /convert_pdbqt_to_sdf` send both `file` and `filename` fields.

## Features

- Browser-based interface
- Tabbed workflow for multiple docking tools
- Sub-mode switcher for individual vs batch ligand preparation
- Direct SMILES input
- Ligand file upload support
- Batch ligand library upload support
- Dedicated preparation settings section for hydrogen handling and charge model selection
- Charge model selection for ligand preparation: `gasteiger`, `nagl`, `espaloma`, `zero`
- Optional energy minimization mode for preparation: `Auto`, `On`, or `Off`
- Optional minimization iteration override from 1 to 2000 iterations, with 100 shown by default
- Docking result upload support
- Supported ligand input formats: `.sdf`, `.mol2`, `.pdb`, `.smi`, `.smiles`, `.txt`
- Supported batch input formats: `.smi`, `.smiles`, `.txt`
- Supported docking result formats: `.pdbqt`, `.dlg`
- Service status check
- Prototype limits panel loaded from `GET /limits`
- Automatic **PDBQT** download after ligand preparation
- Automatic **ZIP** download after batch ligand preparation
- Automatic **SDF** download after docking result recovery
- Structured batch error handling for backend `detail.message`, `detail.suggestion`, and `detail.limits`
- GitHub Pages deployment

The frontend expects the backend to return:

- a **PDBQT** file for single-ligand preparation
- a **ZIP** archive for batch preparation
- an **SDF** file for docking result recovery

The batch input file must follow the format:

```bash
SMILES LIGAND_ID
```

Example:

```bash
CCO ethanol
CCN ethylamine
c1ccccc1 benzene
```

## Example

Writing a **SMILES** string such as `CCO`, which corresponds to ethanol, and submitting it to the backend should return a **PDBQT** file generated from that input.

Input:

```bash
CCO
```

Example output:

```bash
REMARK SMILES CCO
REMARK SMILES IDX 1 1 2 2 3 3
REMARK H PARENT 3 4
ROOT
ATOM      1  C   UNL     1      -0.888   0.167  -0.027  1.00  0.00     0.034 C
ATOM      2  C   UNL     1       0.466  -0.512  -0.037  1.00  0.00     0.152 C
ENDROOT
BRANCH   2   3
ATOM      3  O   UNL     1       1.431   0.323   0.587  1.00  0.00    -0.397 OA
ATOM      4  H   UNL     1       1.467   1.155   0.085  1.00  0.00     0.210 HD
ENDBRANCH   2   3
TORSDOF 1
```

The returned file includes the original SMILES annotation, atom records, partial charges according to the selected charge model, AutoDock atom types, rotatable bond information, and the final **TORSDOF** value used by AutoDock/Vina.

## Prototype Limits

The current LigandHub-API deployment runs as a **prototype on Render**. The frontend calls `GET /limits` and surfaces the active backend limits for batch processing directly in the UI. Depending on backend configuration, these may include:

- maximum batch upload size
- maximum molecules per file
- maximum scrubbed states per ligand
- maximum generated `.pdbqt` files
- maximum total generated size before the ZIP response

If the frontend can load these limits, it validates the batch file size before upload. If the file exceeds `batch_upload_max_bytes`, the request is blocked locally and the UI asks the user to split the library into smaller batch files. If limits cannot be loaded, the batch request is still allowed and the backend performs validation.

When the backend rejects a batch job using a structured error payload, the frontend displays:

- `detail.message` as the main error
- `detail.suggestion` as a visible recommendation
- `detail.limits` as an additional prototype-limits block

## Limitations

- receptor preparation is not yet available in the frontend
- no ligand preview is shown before download
- no docking pose preview is shown before download
- no advanced validation of molecular chemistry or docking file content is performed in the browser

## Testing the Frontend

### Test Individual Preparation

1. Open the frontend and keep **Ligand preparation** selected.
2. Choose either **Upload file** or **Enter SMILES**.
3. Submit a simple ligand such as `CCO`.
4. Confirm that the request goes to `POST /prepare_ligand` and that a `.pdbqt` file is downloaded.

### Test Batch Preparation Success

1. Switch to **Batch ligand preparation**.
2. Confirm that the **Batch processing limits** panel loads data from `GET /limits`.
3. Upload a small `.smi`, `.smiles`, or `.txt` file using the format `SMILES ligand_id`.
4. Submit the batch form and confirm that the request goes to `POST /prepare_ligand_batch`.
5. Verify that a ZIP file is downloaded and contains prepared `.pdbqt` files plus `summary.json`.

### Test Batch Limit Errors

1. Load the frontend until the limits panel has been populated.
2. Try a file larger than `batch_upload_max_bytes` to trigger frontend validation.
3. Confirm that the UI blocks submission and asks you to split the library into smaller files.
4. Try a backend-rejected file, for example one exceeding the molecule-count limit, and confirm that the UI shows `detail.message`, `detail.suggestion`, and any returned `detail.limits`.

## Future Improvements

Possible frontend extensions include:

- ligand preview panel
- receptor preparation workflow
- drag-and-drop file upload
- downloadable preparation report
- atom-count summary
- charge and torsion summary
- docking output preview
- improved user guidance for supported formats
- mobile UI refinements

---

## Authors

[Flavio F. Contreras-Torres](https://orcid.org/0000-0003-2375-131X). Tecnologico de Monterrey.

---

## License

The educational content and tutorial materials in this repository are licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

The original LigandHub source code, including the frontend, backend logic, project-specific scripts, and repository files, is licensed under the [MIT License](https://github.com/NanoBiostructuresRG/LigandHub/blob/main/LICENSE), unless otherwise stated.

LigandHub also uses or interfaces with third-party open-source software. See the corresponding third-party software licenses for details.

### Third-Party Software

| Software | Use in LigandHub | License |
|----------|------------------|---------|
| **RDKit** | Molecular structure handling and cheminformatics operations | BSD 3-Clause License |
| **Meeko** | Ligand preparation and PDBQT generation | GNU LGPL v2.1 or later |
| **Open Babel** | Molecular file conversion and alternative preparation workflows | GNU GPL v2 |

### Attribution

If you use, adapt, or redistribute this material, please provide appropriate credit to the original author, [FFCT](https://orcid.org/0000-0003-2375-131X), and cite or link to the LigandHub repository [https://github.com/NanoBiostructuresRG/LigandHub](https://github.com/NanoBiostructuresRG/LigandHub).

### Contact

For questions, issues, suggestions, or collaboration inquiries, please use the [LigandHub GitHub repository](https://github.com/NanoBiostructuresRG/LigandHub).
