GAME CREATOR v0.17 - PWA PACKAGE

Files:
- index.html: Game Creator application
- manifest.webmanifest: installable app settings
- sw.js: offline app-shell cache and update handling
- icons/: Android/PWA app icons

IMPORTANT
This package must be hosted on a stable HTTPS website before Android Chrome can install it as a PWA. Opening index.html directly from a downloaded file will not enable installation or service-worker offline support.

Suggested free hosting options: GitHub Pages, Netlify, or Cloudflare Pages.
Upload the contents of this folder (not the parent folder) to the hosting provider's site root.

Android installation:
1. Open the published HTTPS address in Chrome.
2. Open Chrome's menu and choose Install app (or Add to Home screen, depending on Chrome version).
3. Launch Game Creator from the new home-screen icon.
4. Open it once while online so the service worker can cache the app shell; then test Airplane Mode.

DATA SAFETY
The current application still stores tournament data in browser LocalStorage. Do not clear Chrome/site data or change the site's domain without first exporting a Game Creator backup. PWA installation does not convert LocalStorage to SQLite. Keep using Export Backup regularly.

UPDATE NOTE
When publishing a newer version, update the CACHE_NAME in sw.js so installed devices fetch the new app shell. Keep the same website origin to retain the existing LocalStorage data.
