# LigandHub
**Version 0.0.1 - April, 2026. Monterrey**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

[![Version](https://img.shields.io/badge/version-v0.1-blue.svg)]()

---

## Description
**LigandHub** is a browser-based frontend for preparing small-molecule ligands for molecular docking. It provides a simple interface to submit **SMILES strings** or upload structure files, sends them to the backend API, and downloads a ready-to-use **PDBQT** file for docking workflows.

This repository contains the **frontend** of the project and is deployed with **GitHub Pages**.

---

## Frontend URL

```text
https://NanoBiostructuresRG.github.io/LigandHub
```

---

## What LigandHub Does

LigandHub allows users to:

- enter a ligand as a **SMILES string**
- upload ligand files such as:
  - `.sdf`
  - `.mol2`
  - `.pdb`
  - `.smi`
  - `.smiles`
  - `.txt`
- send the ligand to the backend API for preparation
- receive a **PDBQT** file ready for:
  - AutoDock
  - AutoDock Vina
  - Smina

---

## Current Features

- Simple web interface
- Direct SMILES input
- File upload support
- Backend connection status check
- Automatic file download after successful processing
- GitHub Pages deployment

---

## Project Role

This repository contains only the **frontend layer** of LigandHub.

Its responsibilities are:

- collecting user input
- validating basic input presence
- building the `FormData` request
- calling the backend API
- displaying status and error messages
- downloading the generated ligand file

The actual ligand preparation is performed by the backend service.

---

## Backend API

LigandHub connects to the backend deployed at Render.com:


---

## Supported Inputs in the Frontend

| Input type | Supported |
|-----------|-----------|
| SMILES text input | Yes |
| `.sdf` | Yes |
| `.mol2` | Yes |
| `.pdb` | Yes |
| `.smi` | Yes |
| `.smiles` | Yes |
| `.txt` | Yes |

---

## Output

The frontend currently expects the backend to return:

- **PDBQT**

Downloaded file example:

```text
smiles_input_prepared.pdbqt
```


---

## How the Frontend Works

1. The user selects an input mode:
   - upload file
   - enter SMILES
2. The frontend collects the input
3. A `FormData` object is created
4. The ligand is sent to the backend with `fetch()`
5. The backend processes the molecule
6. The generated PDBQT file is returned
7. The frontend triggers the file download

---

## Example Usage

### Example SMILES

```text
CCO
```

This corresponds to ethanol.

### Expected result

- successful processing message
- automatic download of a `.pdbqt` file


---

## Known Limitations

- frontend output option is currently limited to **PDBQT**
- no ligand preview is shown before download
- no batch processing yet
- no advanced validation of molecular chemistry is performed in the browser

---

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

**Authors:** 
[Flavio F. Contreras-Torres](https://orcid.org/0000-0003-2375-131X). Tecnológico de Monterrey.


---

### License  
The content of this tutorial itself is licensed under the terms and conditions of the [Creative Commons Attribution (CC BY 4.0) license](https://creativecommons.org/licenses/by/4.0/legalcode.en), and the underlying source code used to format and display that content is licensed under the [MIT license](https://github.com/NanoBiostructuresRG/AutodockTutorial/blob/main/LICENSE). See the LICENSE files for full details.

### Attribution
If you use or adapt this material, please provide appropriate credit to the original authors, [FFCT](https://orcid.org/0000-0003-2375-131X), as well as to the repository: [https://github.com/NanoBiostructuresRG](https://github.com/NanoBiostructuresRG).

---

## Contact

For issues, suggestions, or collaboration, please use the GitHub repository.
