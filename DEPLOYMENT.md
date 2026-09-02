# Production Deployment Guide — Ghana Youth Parliament Platform

This document details deployment instructions for publishing the **Ghana Youth Parliament Digital Information & Engagement Platform** to production.

---

## 1. Build Verification & Output

The project uses Vite 8 and TypeScript 5. The production build generates optimized static HTML, CSS, and JS chunks in the `dist/` directory.

### Build Command:
```bash
npm run build
```

---

## 2. Deploying to Vercel (Recommended)

1. Connect your GitHub repository to Vercel.
2. Select **Vite** as the Framework Preset.
3. Build & Output Settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. The included [`vercel.json`](file:///C:/Users/Rich_Hajia/.gemini/antigravity/scratch/ghana-youth-parliament/vercel.json) handles all SPA route fallbacks automatically.

---

## 3. Deploying to Netlify

1. Create a new site from GitHub on Netlify.
2. Build Settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. SPA Redirect Rule: Add a `_redirects` file to `public/` containing:
   ```text
   /* /index.html 200
   ```

---

## 4. Official Election Portals Reference

The platform integrates external links to official election platforms:
- **Official Voting Portal**: `https://ypgvote.vercel.app/`
- **Official Results Platform**: `https://ypgvote.vercel.app/results`
