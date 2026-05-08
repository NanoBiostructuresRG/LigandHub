# Changelog

## v0.2.1 - May 2026

- Added page-based navigation using React Router HashRouter.
- Added Home, Molecular Datasets, Docking Tools, Feature Engineering, ADMET, and About pages.
- Kept Docking Tools as a single application-level page.
- Added post-success input reset behavior for Docking Tools workflows.
- Preserved backend API contract.
- No backend changes.
- No API behavior changes.

## v0.2.0 - May 2026

- Migrated the frontend to React + Vite.
- Added a modular frontend structure under `src/`.
- Added a GitHub Actions workflow for Vite GitHub Pages deployment.
- Configured the Vite base path for GitHub Pages project deployment.
- Documented the frontend dependency versions in `README.md`.
- Preserved the existing backend API contract.
- No backend changes.
- No new API behavior.

## dev-v0.1.2 - May 2026

- Centralized backend API configuration in `index.html`.
- Preserved the existing backend endpoint contract.
- No backend changes.
- No React migration yet; migration is deferred because it would introduce build tooling and GitHub Pages deployment changes.

## v0.1.1 - May 2026

- Frontend compatibility and documentation update.
- Added the `filename` field to `POST /convert_pdbqt_to_sdf` requests.
- Documented compatibility with the deployed LigandHub-API backend.
- No new features.
- No backend changes.
- No production endpoint contract changes.
