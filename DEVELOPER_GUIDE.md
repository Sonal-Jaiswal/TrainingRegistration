DEVELOPER GUIDE — TrainingSchedule

This guide explains, in plain language, what was changed and how you can work with the project even if you're not very technical.

1) What's in this project
- A SharePoint Framework (SPFx) web part called TrainingSchedule.
- It displays trainings, allows employees to enroll, tracks simple progress, and provides admin screens.
- The code is TypeScript + React components under src/webparts/helloWorld/components.

2) What I changed (short story)
- I split large files into smaller components so each file does one job (easier to read).
- I moved big inline style objects into small TypeScript files in components/styles. This keeps UI the same but styles are easier to find.
- I fixed TypeScript errors that came up during the changes and repeated type-checking to ensure nothing broke.
- I pushed all changes to the branch named 'sonal'.

3) How to read the code (step by step)
- Open src/webparts/helloWorld/components/TrainingDashboard.tsx — this is the main page. It loads data and shows other components.
- Header: shows user info and navigation.
- TrainingList: shows the grid of trainings.
- TrainingCard: a single training item. If you want to change how a card looks, edit TrainingCard.tsx and the style file components/styles/TrainingCard.styles.ts.
- MyCourses: shows the logged-in user's enrollments.
- AdminBoard: admin view to manage trainings and enrollments.

4) How styles are organized
- Instead of SCSS files, small TypeScript files export plain objects with style values. Example: components/styles/TrainingCard.styles.ts
- If you need to tweak colors or spacing, edit these style files — the changes are immediate when you rebuild.

5) Simple commands you can run (copy-paste into terminal)
- Install dependencies: npm install
- Type-check: npx tsc --noEmit -p tsconfig.json
- Build (bundle): gulp bundle
- Serve locally (dev): gulp serve
- Commit & push changes:
  git add -A
  git commit -m "brief message"
  git push origin sonal

6) Making a tiny change (example: change card title font size)
- Open src/webparts/helloWorld/components/styles/TrainingCard.styles.ts
- Find the title style and change the fontSize value (e.g., from 19 to 20)
- Save, then run npx tsc --noEmit -p tsconfig.json and gulp bundle (or gulp serve)

7) If you see TypeScript errors
- Run: npx tsc --noEmit -p tsconfig.json
- Read the error — it tells you the file and a line number.
- If it mentions types for styles, you can temporarily cast the style to any (as I did) like: styles.whatever as any.

8) How I can help next (ask me to)
- Extract styles for AdminBoard, EnrollmentModal, TrainingForm, Header.
- Clean up duplicate folders and remove unused files.
- Add comments to any file to explain what each function does.

9) Glossary (plain words)
- SPFx: SharePoint Framework — Microsoft’s way to host custom UI in SharePoint pages.
- React: JavaScript library for UI pieces.
- TypeScript: JavaScript with types; helpful to catch mistakes early.
- PnPjs: Library to talk to SharePoint lists.

If anything is confusing, tell me which file or which line and I'll explain it in even simpler terms.