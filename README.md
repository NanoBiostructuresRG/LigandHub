# LigandHub
**Version 0.0.1 - April, 2026. Monterrey**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

[![Version](https://img.shields.io/badge/version-v0.1-blue.svg)]()

---

## Description
**LigandHub** is a browser-based frontend for preparing small-molecule ligands for molecular docking. It provides a simple interface to submit **SMILES strings** or upload structure files, sends them to the backend API, and downloads a ready-to-use **PDBQT** file for docking workflows.

- collecting user input
- validating basic input presence
- building the `FormData` request
- calling the backend API
- displaying status and error messages
- downloading the generated ligand file



## Description

**LigandHub** is a browser-based frontend for preparing small-molecule ligands for molecular docking. It provides a simple interface to submit **SMILES strings** or upload structure files, sends them to the backend API, and downloads a ready-to-use **PDBQT** file for docking workflows. 

The frontend is responsible for collecting user input, validating basic input presence, building the `FormData` request, calling the backend API, displaying status and error messages, and downloading the generated ligand file. This repository contains the **frontend** of the project: 

```bash
https://NanoBiostructuresRG.github.io/LigandHub
```



## What LigandHub Does

**LigandHub** is a browser-based frontend for submitting small-molecule ligand inputs to a backend preparation service. Users can either enter a ligand as a **SMILES string** or upload a molecular structure file in formats such as `.sdf`, `.mol2`, `.pdb`, `.smi`, `.smiles`, or `.txt`. The frontend sends the submitted ligand to a backend API, where ligand preparation is performed, and receives a **PDBQT** file intended for **AutoDock / Vina** docking workflows.

LigandHub does not perform chemical preparation locally in the browser. It connects to a backend service deployed on **Render.com**, which handles molecular processing and PDBQT file generation.


## How the Frontend Works

The frontend workflow is organized as follows:

1. The user chooses an input method: file upload or direct SMILES input.
2. The frontend checks that the required input is present.
3. The selected file or SMILES string is added to a `FormData` request.
4. The request is sent to the backend API using `fetch()`.
5. The backend processes the ligand and generates a PDBQT file.
6. The backend returns the generated file to the frontend.
7. The frontend triggers the download of the prepared ligand file.


## Current Features

- Browser-based interface
- Direct SMILES input
- Ligand file upload support
- Supported input formats: `.sdf`, `.mol2`, `.pdb`, `.smi`, `.smiles`, `.txt`
- Backend connection status check
- Automatic PDBQT download after backend processing
- GitHub Pages deployment


The frontend currently expects the backend to return a **PDBQT** file, which is automatically downloaded by the browser. The output filename is derived from the input ligand name and includes a suffix indicating that the ligand has been processed for docking.

```bash
smiles_input_prepared.pdbqt
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

The returned file includes the original SMILES annotation, atom records, partial charges, AutoDock atom types, rotatable bond information, and the final **TORSDOF** value used by AutoDock/Vina.


## Current Limitations

- frontend output option is currently limited to **PDBQT**
- no ligand preview is shown before download
- no batch processing yet
- no advanced validation of molecular chemistry is performed in the browser



## Future Improvements

Possible frontend extensions include:

- ligand preview panel
- drag-and-drop file upload
- downloadable preparation report
- atom-count summary
- charge and torsion summary
- improved user guidance for supported formats
- mobile UI refinements

---

## Software Licenses

**LigandHub** integrates open-source tools for cheminformatics and molecular docking workflows.  
The application does not claim ownership over these third-party tools, and each component remains governed by its respective license. Below is a summary of the software components used in the backend preparation service, along with their functions and licenses:

| Software | Function in the workflow | License |
|----------|---------------------------|---------|
| **RDKit** | Cheminformatics operations, molecular structure handling, reading SMILES/SDF files | **BSD 3-Clause License** |
| **Meeko** | Ligand and receptor preparation for docking, generation of PDBQT files | **GNU LGPL v2.1 or later** |
| **AutoDock Vina** | Molecular docking engine | **Apache License 2.0** |
| **Open Babel** | Molecular file conversion and alternative structure preparation | **GNU GPL v2** |


---

**Authors:** 
[Flavio F. Contreras-Torres](https://orcid.org/0000-0003-2375-131X). Tecnológico de Monterrey.


---

### License

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

If you use, adapt, or redistribute this material, please provide appropriate credit to the original author, [FFCT](https://orcid.org/0000-0003-2375-131X), and cite or link to the LigandHub repository:

[https://github.com/NanoBiostructuresRG/LigandHub](https://github.com/NanoBiostructuresRG/LigandHub)



### Contact

For questions, issues, suggestions, or collaboration inquiries, please use the [LigandHub GitHub repository](https://github.com/NanoBiostructuresRG/LigandHub).
