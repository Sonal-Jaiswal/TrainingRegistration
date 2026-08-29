FILES AND WORKFLOW — TrainingSchedule

Purpose
- Quick reference: what each important file/folder does and the typical developer workflow for working with them.
- Saved locally, not committed.

Top-level files
- `package.json` — npm dependencies and scripts (install, build helpers). Run `npm install` to set up.
- `gulpfile.js` — SPFx/Gulp tasks used by the project (`bundle`, `package-solution`, `serve`).
- `tsconfig.json` — TypeScript compiler settings.
- `README.md` / `DEVELOPER_GUIDE.md` / `WORKFLOW_SUMMARY.md` — project docs (read these first).

Config folder
- `config/` — SPFx-specific build/serve/package configurations (`serve.json`, `package-solution.json`, `deploy-azure-storage.json`). You rarely edit these unless changing packaging or deployment.

Source code (main area)
- `src/index.ts` — web part entry point that wires into SPFx bootstrap.
- `src/webparts/trainingPortal/TrainingPortalWebPart.ts` — SPFx web part class (TrainingPortalWebPart); constructs the React root and supplies `WebPartContext`.
- `src/webparts/trainingPortal/TrainingPortalWebPart.manifest.json` — SPFx manifest, web part metadata and permissions.

Components folder: `src/webparts/trainingPortal/components/`
- `TrainingDashboard.tsx` — Main orchestrator: loads current user, trainings, enrollments, holds top-level state, routes between views (My Courses / Admin), and triggers data refreshes.
  Workflow: Edit to change high-level behavior, add data-loading logic, or change which child components render.

- `Header.tsx` — Top header UI: user initials, navigation toggles, admin create button.
  Workflow: Small presentational component. Edit for visual or nav changes.

- `TrainingList.tsx` — Renders a grid of training cards by mapping over trainings array.
  Workflow: Edit to change layout (e.g., responsive columns) or how cards are filtered/sorted.

- `TrainingCard.tsx` — Single training card (title, meta, seats, enroll button). Uses `TrainingCard.styles.ts` for styles.
  Workflow: Local UI changes should be done here and the corresponding styles file.

- `MyCourses.tsx` — Shows a user's enrollments, modules, progress and cancel button. Contains module-toggle logic.
  Workflow: Edit to change progress calculations or the module UI; run type-check after changes.

- `AdminBoard.tsx` — Admin overview (stats, training/enrollment tables) and management actions.
  Workflow: Edit for administrative features, ensure permission checks where needed.

- `EnrollmentModal.tsx` & `TrainingForm.tsx` — Modal dialogs for confirming enrollment and creating/editing trainings.
  Workflow: Edit markup and form validation here; preserve callback props used by `TrainingDashboard`.

- `TrainingService.ts` / `pnpjsConfig.ts` / `TrainingModels.ts`
  - `pnpjsConfig.ts` — creates the PnPjs client (`spfi`) using SPFx `WebPartContext`.
  - `TrainingService.ts` — wrapper functions that read/update SharePoint lists (Trainings-SAR, Enrollments-SAR).
  - `TrainingModels.ts` — TypeScript interfaces for `ITraining`, `IEnrollment`, etc.
  Workflow: Modify service functions when changing list schema. Keep models in sync with lists.

Styles folder: `src/webparts/trainingPortal/components/styles/`
- Files: `TrainingCard.styles.ts`, `MyCourses.styles.ts`, `TrainingDashboard.styles.ts`, etc.
- Purpose: Export plain objects or small functions returning style objects. Components import these to keep styles out of JSX.
- Workflow: Change spacing/colors here; run `npx tsc` and rebuild to verify.

Utilities & localization
- `loc/` — localized strings and `mystrings.d.ts`. Use for UI text to support translations.

Teams packaging (optional)
- `teams/` — Teams manifest and packaging if web part is packaged for Microsoft Teams.

Build & dev workflow (how to work on the project)
1. Install deps: `npm install`.
2. Type-check early and often: `npx tsc --noEmit -p tsconfig.json`.
3. Run local dev server: `gulp serve` (opens workbench or host page depending on `serve.json`).
4. Build/bundle before packaging: `gulp bundle` (add `--ship` for production).
5. Package solution for App Catalog: `gulp package-solution --ship`.

Branching and commits
- Work on feature branches: `git switch -c feat/your-change`.
- Make small commits with descriptive messages. Push frequently to `origin/sonal` or your branch.

Testing & validation
- Manual: open page in SharePoint workbench and exercise flows: list loading, enroll, cancel, admin create.
- Type-check: `npx tsc --noEmit -p tsconfig.json`.
- Linting/tests: not currently required but recommended to add ESLint and unit tests.

Debugging tips
- If a UI breaks after moving code: check imports/exports and default vs named exports.
- If TypeScript errors appear after refactor: search for duplicate identifiers or conflicting exports.
- For style regressions: compare computed styles in browser devtools with the previous UI.

Where to start when learning the codebase
1. Read `README.md` and `DEVELOPER_GUIDE.md`.
2. Open `TrainingDashboard.tsx` to see data flow and component composition.
3. Open `TrainingCard.tsx` and its styles file as a small example of component+styles.
4. Inspect `TrainingService.ts` and `pnpjsConfig.ts` to understand data calls.

Next actions you can request me to do (no commit unless you ask):
- Extract remaining styles into `styles/*.styles.ts` files.
- Consolidate duplicate `ui/` or `modular/` directories.
- Add inline comments to functions and components to explain their purpose.

---

File created locally at your request; not committed.

---

Simple Summary (easy to read)

- What this project does: A SharePoint web part that shows trainings, lets employees enroll, tracks progress, and provides admin management.
- Main files to look at:
  - `TrainingDashboard.tsx` — main page and data loader
  - `TrainingCard.tsx` — one training item (change card UI here)
  - `MyCourses.tsx` — user's enrollments and progress
  - `TrainingService.ts` / `pnpjsConfig.ts` — how data is read/written to SharePoint
  - `components/styles/*.styles.ts` — where styles live now
- Simple edit workflow:
  1. Make a branch: `git switch -c feat/your-change`
  2. Edit small pieces (one thing at a time).
  3. Quick type-check: `npx tsc --noEmit -p tsconfig.json`
  4. Preview: `gulp serve` (if you need the workbench)
  5. Bundle: `gulp bundle` and then commit/push.
- If something breaks: run the type-check and fix the first error, or compare styles in browser devtools.

If you want, I can add short comments inside key files to explain functions in plain words.
