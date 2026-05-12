# Changelog

## v0.2.3 - May 2026

- Added a small frontend maintenance patch focused on mobile responsiveness.
- Improved Home mobile layout, including hero sizing, tagline wrapping, TLR9 visual scaling, decorative card spacing, and GitHub/Portfolio card stacking.
- Improved About mobile layout by collapsing desktop-oriented card grids and reducing spacing on narrow screens.
- Adjusted fixed-header spacing and navigation behavior for small screens.
- Improved footer spacing and icon sizing on narrow screens while preserving the full-width footer layout.
- Updated the browser/social preview title to `LigandHub`.
- No backend/API behavior changes.
- No route changes.
- No dependency changes.
- No Vite config changes.

## v0.2.2 - May 2026

- Refined frontend visual identity, user-facing copy, and page layout.
- Polished page copy across Home, Datasets Tools, Features Tools, Docking Tools, ADME Tools, and About.
- Refined the header LigandHub branding and removed the header subtitle.
- Improved Home hero logo and wordmark sizing without changing the logo asset or typeface.
- Added `assets/TLR9.png` as a decorative Home visual asset.
- Refined title cards, page heroes, icon usage, and decorative visual treatments.
- Added icon-based visual refinements using `lucide-react` and `react-icons`.
- Updated the footer to a full-width sticky-footer layout with a LigandHub-aligned gradient, softened footer text, and improved hyperlink visibility.
- Preserved the backend API contract: `API_BASE_URL`, `API_ENDPOINTS`, backend routes, HTTP methods, `FormData` field names, file handling, and download logic are unchanged.
- Preserved HashRouter routing and the Vite base path `/LigandHub/`.
- No backend changes.
- No API behavior changes.

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
