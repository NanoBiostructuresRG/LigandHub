# LigandHub
**Version v0.1.0 - April, 2026. Monterrey**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Version](https://img.shields.io/badge/version-v0.1.0-blue.svg)](https://github.com/NanoBiostructuresRG/LigandHub)

---

## Description

**LigandHub** is a browser-based frontend for molecular docking workflows. It currently supports two core tasks: preparing small-molecule structures for docking and recovering docked ligand outputs from docking result files. Users can submit **SMILES strings** or upload structure files for ligand preparation, choose hydrogen handling and charge model settings, and upload docking result files to recover docked poses as **SDF**.

The frontend is responsible for collecting user input, validating basic input presence, building the `FormData` request, calling the backend API, displaying service status and error messages, and downloading the generated output files. The preparation form currently sends `output_format`, `merge_h`, and `charge_model` parameters to the backend. This repository contains the **frontend** of the project:

```bash
https://NanoBiostructuresRG.github.io/LigandHub
```

## What LigandHub Does

**LigandHub** is a browser-based frontend for submitting molecular docking inputs and recovering docking outputs through a backend service. Users can either enter a ligand as a **SMILES string** or upload a molecular structure file in formats such as `.sdf`, `.mol2`, `.pdb`, `.smi`, `.smiles`, or `.txt`. During ligand preparation, the frontend also lets the user choose hydrogen handling and the partial-charge model before sending the request to the backend API, which returns a **PDBQT** file intended for **AutoDock / Vina** workflows.

LigandHub also supports recovery of docked ligand coordinates from docking result files in `.pdbqt` and `.dlg` formats. These are sent to the backend API and returned as **SDF** files for downstream inspection, analysis, or visualization.

LigandHub does not perform chemical preparation or docking result conversion locally in the browser. It connects to a backend service deployed on **Render.com**, which handles molecular processing, file conversion, and output generation.

## How the Frontend Works

The frontend currently provides two workflows:

### Ligand Preparation

1. The user chooses an input method: file upload or direct SMILES input.
2. The user selects hydrogen handling and a charge model.
3. The frontend checks that the required input is present.
4. The selected file or SMILES string is added to a `FormData` request.
5. The frontend sends `output_format="pdbqt"`, `merge_h`, and `charge_model` to the backend API using `fetch()`.
6. The backend processes the ligand and generates a **PDBQT** file.
7. The backend returns the generated file to the frontend.
8. The frontend triggers the download of the prepared ligand file.

### Docking Result Recovery

1. The user selects a docking result file in `.pdbqt` or `.dlg` format.
2. The frontend checks that the file is present.
3. The selected file is added to a `FormData` request.
4. The request is sent to the backend API using `fetch()`.
5. The backend extracts or reconstructs the docked ligand coordinates.
6. The backend returns the recovered structure as an **SDF** file.
7. The frontend triggers the download of the recovered docking output.

## Current Features

- Browser-based interface
- Tabbed workflow for multiple docking tools
- Direct SMILES input
- Ligand file upload support
- Hydrogen handling selection for ligand preparation
- Charge model selection for ligand preparation: `gasteiger`, `nagl`, `espaloma`, `zero`
- Docking result upload support
- Supported ligand input formats: `.sdf`, `.mol2`, `.pdb`, `.smi`, `.smiles`, `.txt`
- Supported docking result formats: `.pdbqt`, `.dlg`
- Service status check
- Automatic **PDBQT** download after ligand preparation
- Automatic **SDF** download after docking result recovery
- GitHub Pages deployment

For ligand preparation, the frontend expects the backend to return a **PDBQT** file, which is automatically downloaded by the browser. The output filename is derived from the input ligand name and includes a suffix indicating that the ligand has been processed for docking. The default UI configuration uses merged hydrogens and the `gasteiger` charge model, while also allowing `nagl`, `espaloma`, or `zero` as backend options.

```bash
smiles_input_prepared.pdbqt
```

For docking result recovery, the frontend expects the backend to return an **SDF** file derived from the uploaded docking result file.

```bash
example_docked.sdf
```

## Example SMILES

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

## Current Limitations

- receptor preparation is not yet available in the frontend
- no ligand preview is shown before download
- no docking pose preview is shown before download
- no batch processing yet
- no advanced validation of molecular chemistry or docking file content is performed in the browser

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
