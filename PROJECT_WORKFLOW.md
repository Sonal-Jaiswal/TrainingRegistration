PROJECT WORKFLOW — TrainingSchedule

This document explains the full project workflow from the very start (environment, development, refactor approach, build, and deploy). It's written to be easy to follow step-by-step.

1. Environment and prerequisites
- Install Node.js (recommended LTS 14/16/18 depending on SPFx compatibility).
- Install Git and configure `user.name` and `user.email`.
- Install global tools (optional): `npm i -g gulp-cli`
- Recommended editors: VS Code (with TypeScript and SPFx extensions).

2. Clone repository and prepare branch
1. Clone the repo:
   - `git clone <repo-url>`
   - `cd TrainingSchedule`
2. Create a working branch from main (we used `sonal`):
   - `git checkout -b sonal` or `git switch -c sonal`
3. Keep branches small and focused; push often:
   - `git add -A && git commit -m "your message" && git push origin sonal`

3. Install dependencies
- Run:
```
npm install
```
- This installs SPFx packages, Fluent UI, PnPjs, TypeScript, and dev tools.

4. Local development workflow
- Type-check often while coding:
```
npx tsc --noEmit -p tsconfig.json
```
- Start local dev server (if you need workbench):
```
gulp serve
```
- Build a production bundle (for packaging):
```
gulp bundle --ship
```

5. Feature/Refactor workflow (how to implement a change safely)
1. Create a small feature branch off `sonal` (or main): `git switch -c feat/my-change`
2. Make small commits that each do one logical thing (e.g., "refactor: extract TrainingCard component").
3. After each logical change run `npx tsc --noEmit -p tsconfig.json` to catch type errors early.
4. If moving UI code into a new file, preserve existing props and behavior first, then adjust internals.
5. When extracting styles, keep exact numeric/string values to avoid UI drift. Export style objects from `src/webparts/trainingPortal/components/styles/*.styles.ts` and import them in the component.
6. For Fluent UI `Button` `styles` props you may cast to `any` temporarily to avoid type friction: `styles={{ root: styles.myButton as any }}` — consider tightening types later.
7. Run `gulp bundle` to ensure bundling works before raising a PR.
8. Open a PR targeting the branch for review; include screenshots and short explanation.

6. How I performed the major refactor (step-by-step)
- Step A: Identify large files and inline styles (e.g., `TrainingDashboard.tsx`).
- Step B: Create new component files under `src/webparts/trainingPortal/components/` for each logical unit (`Header.tsx`, `TrainingList.tsx`, `TrainingCard.tsx`, `MyCourses.tsx`, `AdminBoard.tsx`).
- Step C: Move JSX and relevant logic into the new component, keep props interface stable (e.g., `ITraining`), and export default the component.
- Step D: Extract inline style objects into `components/styles/*.styles.ts` files. Import them as `import styles from './styles/TrainingCard.styles'`.
- Step E: Run `npx tsc` repeatedly. Fix issues: remove duplicate code, fix imports, cast styles when necessary.
- Step F: Commit frequently with descriptive messages and push to `sonal`.

7. SharePoint-specific steps (data lists and context)
- Data lists used by the app:
  - `Trainings-SAR` (fields: Id, Title, Description, Category, Trainer, TrainingDate, AvailableSeats, Status)
  - `Enrollments-SAR` (fields: Id, Employee, Training, EnrollmentDate, Status, CompletionStatus)
- The app uses `pnpjsConfig.ts` to create a PnPjs client using SPFx `WebPartContext`. Ensure the web part has list permissions if writing to lists.

8. Build, package and deploy
1. Build and bundle:
```
gulp bundle --ship
```
2. Package solution:
```
gulp package-solution --ship
```
3. Upload the generated `.sppkg` file (found under `sharepoint/solution` or `sharepoint/`) to your tenant App Catalog.
4. Add the app to a site or tenant app catalog as appropriate and add the web part to a page.

9. CI/CD suggestions (optional enhancements)
- Add a GitHub Actions workflow that runs:
  - `npm ci`
  - `npx tsc --noEmit -p tsconfig.json`
  - `gulp bundle` (optional, can be gated for release builds)
- Add lint step (ESLint). Add unit tests for critical logic (Jest + React Testing Library).

10. Testing and validation
- Run `npx tsc` to ensure types are clean.
- Manual UI checks: open the page and verify 'My Courses', 'Training List', enroll flow, admin flows.
- Verify list changes in SharePoint after enroll/cancel operations.

11. Debugging tips
- If TypeScript shows duplicate identifier errors, search for accidental duplicate blocks or files with the same exports.
- If styles cause typing errors with Fluent UI, cast to `any` temporarily and make a note to tighten types later.
- Use browser devtools to inspect computed styles to confirm extraction preserved layout.

12. Files to inspect first (for understanding)
- `src/webparts/trainingPortal/components/TrainingDashboard.tsx` — main orchestrator
- `src/webparts/trainingPortal/components/TrainingCard.tsx` — simple component + styles example
- `src/webparts/trainingPortal/components/styles/TrainingCard.styles.ts` — style module example
- `src/webparts/trainingPortal/components/MyCourses.tsx` — shows state & progress handling
- `src/webparts/trainingPortal/components/AdminBoard.tsx` — admin management

13. Commands summary (copy-paste)
```
# Install
npm install

# Type-check
npx tsc --noEmit -p tsconfig.json

# Build bundle
gulp bundle --ship

# Package solution
gulp package-solution --ship

# Serve for dev
gulp serve
```

14. Next steps I can do for you
- Extract remaining styles for `AdminBoard`, `EnrollmentModal`, `TrainingForm`, `Header`.
- Consolidate duplicate `ui/` and `modular/` folders.
- Add CI pipeline to run `npx tsc` on PRs.

If you'd like, I will commit this file and push it to `sonal` now.
