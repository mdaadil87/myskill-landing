# MySkill portfolio — edited design integration

The Claude standalone HTML export has been applied as the Vite site's root `index.html`.

## What changed
- `index.html`: now serves the new purple/neon portfolio design exported from Claude.
- `backup/original-index.html`: original Vite/React entry HTML saved before replacement.
- `src/`, `public/`, `package.json`, `package-lock.json`, and `vite.config.ts` are retained from the GitHub project.
- The exported page is self-contained; its large visual assets are embedded as data URLs.

## Run locally
```bash
npm ci
npm run dev -- --host 0.0.0.0
```

## Build for Vercel
```bash
npm ci
npm run build
```

Vercel settings: Framework Preset `Vite`, Build Command `npm run build`, Output Directory `dist`.

## Important verification note
The inline JavaScript syntax was checked with Node. A full Vite production build could not be completed in the packaging environment because dependency installation (`npm ci`) timed out. Run the commands above before deploying. The original React components remain in `src/` and are not deleted.
