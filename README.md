<div align="center">

# ✦ WASHI BIO

### A personal portfolio with a cinematic, animated experience.

**Personal website · HTML · CSS · JavaScript · Vercel**

<br>

[![Static Website](https://img.shields.io/badge/Website-Static-8B7BFF?style=for-the-badge)](#-technology)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](#-deploy-to-vercel)
[![Responsive](https://img.shields.io/badge/Layout-Responsive-58C4DD?style=for-the-badge)](#-responsive-design)

*A personal space for profile, projects, character galleries, music, and visual themes.*

</div>

---

## 📖 About the project

**Washi Bio** is a static personal portfolio website built with HTML, CSS, and vanilla JavaScript. It combines a profile page with animated backgrounds, selectable visual themes, music playback, project cards, character previews, and image galleries.

The project is intentionally organized into separate CSS and JavaScript files so individual parts can be found and edited without digging through one giant file.

### Highlights

- ✨ Intro experience and loading interface.
- 🌌 Animated star field, particles, cursor spotlight, and card effects.
- 🎨 Multiple visual themes and background presets.
- 🎵 Separate music player with matching audio tracks.
- 🗂️ Profile, projects, character/album section, and image lightbox.
- 📱 Responsive styling for desktop and mobile screens.
- ⚡ Static hosting: no Node.js build step or backend server is required for production.
- 🚀 Ready to deploy on Vercel or another static web host.

> **Note:** This repository contains a front-end website. It does not include a server-side API, database, authentication system, or private admin dashboard.

---

## 🗂️ Project structure

```text
BioWashi/
├── index.html
├── README.md
├── vercel.json
│
├── css/
│   ├── base.css
│   ├── background.css
│   ├── intro-loader.css
│   ├── site-layout.css
│   ├── sections.css
│   ├── albums-lightbox.css
│   ├── music-player.css
│   ├── responsive-themes-effects.css
│   └── themes/
│       ├── theme-222.css
│       ├── theme-noir.css
│       ├── theme-capitano.css
│       ├── theme-alucard.css
│       ├── theme-aegir.css
│       ├── theme-secret.css
│       └── theme-character-colors.css
│
├── js/
│   └── modules/
│       ├── 01-intro-music.js
│       ├── 02-theme-background-hotkeys.js
│       ├── 03-stars.js
│       ├── 04-particles.js
│       ├── 05-navigation.js
│       ├── 06-albums.js
│       ├── 07-lightbox.js
│       ├── 08-characters.js
│       ├── 09-profile-card.js
│       ├── 10-cursor-spotlight.js
│       ├── 11-card-reflection.js
│       └── 12-audio-visualizer.js
│
├── images/
│   ├── photo.webp
│   ├── qr-promptpay.png
│   ├── vid-1.1.jpg
│   ├── game-1.png
│   └── work-lightcity.png
│
└── assets/
    ├── audio/
    │   ├── Carthethyia.mp3
    │   ├── Hiyuki.mp3
    │   ├── Kurumi.mp3
    │   ├── Roxy.mp3
    │   └── Sandrone.mp3
    └── videos/
        ├── Carthethyia.mp4
        ├── Hiyuki.mp4
        ├── Kurumi.mp4
        ├── Roxy.mp4
        └── Sandrone.mp4
```

*The tree above summarizes the main files. Keep any additional assets already present in the repository.*

---

## 🧭 What each file does

### 1. `index.html` — the page structure

This is the website's entry point and the main place to edit content written directly in HTML.

It contains:
- The document title and metadata.
- Links to CSS files and external fonts/icons.
- The intro and loading interface.
- The navigation bar and music-player markup.
- The main sections: About/Profile, Projects, and Characters.
- Album modal, image lightbox, background video layers, and audio element.
- Script tags that load JavaScript modules in the required order.

**Edit this file when:** changing visible text, section headings, profile details, social links, project cards, element IDs, or the order of sections.

**Important:** JavaScript relies on specific element IDs such as `bgVideo`, `bgMusic`, `albumModal`, and `lightbox`. If you rename an ID in HTML, update every JavaScript reference to it too.

### 2. `css/` — appearance and layout

CSS controls colors, typography, spacing, responsive layouts, animation, and visual states.

| File | Responsibility |
|---|---|
| `base.css` | Base styles, global defaults, and foundational typography/layout rules. |
| `background.css` | Background layers and their visual presentation. |
| `intro-loader.css` | Intro screen, loading UI, progress indicators, and related effects. |
| `site-layout.css` | Main site shell, navigation, general layout, and shared containers. |
| `sections.css` | Styling for the primary page sections and their cards/content. |
| `albums-lightbox.css` | Album modal, gallery, and lightbox presentation. |
| `music-player.css` | Audio player controls, progress bar, and visualizer layout. |
| `responsive-themes-effects.css` | Responsive rules, theme-related overrides, and additional visual effects. |

#### `css/themes/` — theme-specific styles

These files hold the individual theme stylesheets. They allow theme-specific colors and effects to be adjusted separately.

- `theme-222.css`
- `theme-noir.css`
- `theme-capitano.css`
- `theme-alucard.css`
- `theme-aegir.css`
- `theme-secret.css`
- `theme-character-colors.css`

**Edit CSS when:** changing colors, gradients, rounded corners, blur/glass effects, typography, spacing, animation speed, hover states, or mobile breakpoints.

**Tip:** If a style seems to have no effect, another stylesheet loaded later may override it. Search for the same selector across `css/` before adding duplicate rules.

### 3. `js/modules/` — interactive behavior

The JavaScript is split into numbered files and loaded as **classic scripts in order**.

| File | Responsibility |
|---|---|
| `01-intro-music.js` | Intro/loading flow and music-player behavior. |
| `02-theme-background-hotkeys.js` | Theme/background switching and keyboard shortcuts. |
| `03-stars.js` | Animated star-field effect. |
| `04-particles.js` | Decorative particles effect. |
| `05-navigation.js` | Navigation interactions and section movement. |
| `06-albums.js` | Album/character gallery data and opening album content. |
| `07-lightbox.js` | Image lightbox controls, including navigation and closing. |
| `08-characters.js` | Character-section interactions. |
| `09-profile-card.js` | Interactive profile-card behavior. |
| `10-cursor-spotlight.js` | Cursor-following spotlight effect. |
| `11-card-reflection.js` | Card reflection/hover effect. |
| `12-audio-visualizer.js` | Audio visualizer animation. |

**Why script order matters:** modules may share global functions and variables. They are deliberately loaded as regular scripts rather than `type="module"`. Reordering them or converting one to a module can break functionality unless dependencies are refactored.

**Edit JavaScript when:** changing interactions, shortcut keys, theme mappings, gallery entries, animation behavior, or music logic.

### 4. `images/` — image files

Store website images here and reference them with relative paths such as:

```html
<img src="images/photo.webp" alt="Washi profile">
```

Common assets in this project include:

- `photo.webp` — optimized animated profile image.
- `qr-promptpay.png` — PromptPay/payment QR image.
- `vid-1.1.jpg` — image asset used by the page.
- `game-1.png` — game-related image asset.
- `work-lightcity.png` — work/project image asset.

If you replace an image but keep the same filename and file format, existing references generally continue to work. If you change the filename or extension, update every matching reference in HTML, CSS, and JavaScript.

### 5. `assets/videos/` — background videos

Contains the video backgrounds used by the theme/background system:

- `Carthethyia.mp4`
- `Hiyuki.mp4`
- `Kurumi.mp4`
- `Roxy.mp4`
- `Sandrone.mp4`

Keep filenames and capitalization consistent. Hosting platforms use case-sensitive paths, so `Roxy.mp4` and `roxy.mp4` are not the same path.

### 6. `assets/audio/` — music tracks

Contains the MP3 tracks associated with the background themes. The audio basename is intended to match its video basename:

| Video | Matching audio |
|---|---|
| `Carthethyia.mp4` | `Carthethyia.mp3` |
| `Hiyuki.mp4` | `Hiyuki.mp3` |
| `Kurumi.mp4` | `Kurumi.mp3` |
| `Roxy.mp4` | `Roxy.mp3` |
| `Sandrone.mp4` | `Sandrone.mp3` |

The background videos are intended to stay muted; the separate audio player is responsible for music playback. Browsers may block autoplay with sound until the visitor interacts with the page.

### 7. `vercel.json` — hosting configuration

This file contains Vercel-specific configuration for serving the static site and setting response headers/cache behavior.

**Edit this file when:** adjusting hosting headers, cache policies, or other Vercel routing behavior. Be careful with rewrites and redirects because they can change how assets and pages are served.

---

## 🛠️ Editing common things

### Change the page title

Open `index.html` and edit the `<title>` element:

```html
<title>Washi · Portfolio</title>
```

### Change social links

Search in `index.html` for the relevant social platform URL, then replace the `href` with the correct profile link. Check both the intro/social area and the profile section if the link appears more than once.

### Change profile or project text

Search `index.html` for the visible text or section heading you want to change. Keep the surrounding HTML tags and class names unless you intend to change the layout too.

### Change the profile image

1. Put the new image in `images/`.
2. Find `photo.webp` references in the project.
3. Update the path and file extension if necessary.
4. Test the image locally before pushing the change.

### Change a theme's colors

1. Find the relevant theme file under `css/themes/`.
2. Search for CSS custom properties, color values, gradients, and theme selectors.
3. Edit only the values needed.
4. Test the theme and check that other themes still look correct.

### Add or replace an album image

1. Open `js/modules/06-albums.js`.
2. Find the relevant album/character entry and its image paths.
3. Place the image in `images/` or the project's existing asset location.
4. Use the exact case-sensitive path in the entry.
5. Open the album and lightbox to verify it.

### Change background video or matching music

1. Add the video to `assets/videos/`.
2. Add the matching MP3 to `assets/audio/` if that theme should have music.
3. Update the theme/background mapping in `js/modules/02-theme-background-hotkeys.js` if adding a new theme.
4. Update any theme selection logic or labels that depend on the theme list.
5. Test video switching, audio switching, and mobile playback.

### Change animation or performance settings

Look in `js/modules/03-stars.js`, `js/modules/04-particles.js`, `js/modules/10-cursor-spotlight.js`, `js/modules/11-card-reflection.js`, and the relevant CSS files. Prefer reducing particle counts or effect frequency before adding more continuous animations.

---

## ⚡ Performance notes

- The profile animation is stored as `images/photo.webp` to reduce transfer size compared with the original GIF.
- Audio elements use deferred loading (`preload="none"`) where configured, so tracks are not intentionally downloaded before they are needed.
- Background video layers use `preload="none"` and are muted.
- Star and particle effects are designed to avoid unnecessary work when the page is not visible.
- Keep media files compressed and reasonably sized, especially for visitors using mobile data.
- Avoid adding multiple large autoplay videos or loading all gallery images eagerly.

Performance varies by device, network, browser, and the size of any new media you add. Always test on a real mobile browser after making changes.

---

## 💻 Run locally

This is a static site, so you do not need `npm install` or a build command.

### Option A — Python HTTP server

Install Python in Termux if needed, then from the directory containing `index.html` run:

```bash
python -m http.server 8080
```

Open this address in the same device's browser:

```text
http://127.0.0.1:8080
```

Stop the server with `Ctrl + C`.

### Option B — Node.js static server

If Node.js is installed, you can use a simple static server tool of your choice. A local HTTP server is recommended over opening `index.html` directly as a `file://` URL, because browsers can restrict some media and script behavior for local files.

---

## 🚀 Deploy to Vercel

### Deploy through GitHub

1. Push the project folder to a GitHub repository.
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the GitHub repository.
4. Set **Framework Preset** to `Other` if Vercel does not detect a framework.
5. Set the **Root Directory** to the folder that contains `index.html`.
6. Leave **Build Command** empty for this plain static site.
7. Set **Output Directory** to `.` if Vercel asks for it and accepts it.
8. Click **Deploy**.

### Deploy with the Vercel CLI

Install and sign in to the Vercel CLI, then run this from the directory containing `index.html` and `vercel.json`:

```bash
vercel
```

For a production deployment:

```bash
vercel --prod
```

After connecting a Git repository to Vercel, pushing a new commit to the configured production branch can trigger a new deployment automatically.

---

## 🔄 Upload updates to GitHub

From the project root:

```bash
git add .
git commit -m "Update Washi Bio"
git push
```

Vercel can deploy the new version automatically if the repository is connected.

If Git says there is nothing to commit, there may be no changed files. If `git push` fails, check that the remote repository URL and GitHub authentication are configured correctly.

---

## 🧪 Testing checklist

After editing, check the following:

- [ ] The page opens without a blank screen.
- [ ] The intro/loading experience completes.
- [ ] Navigation links move to the correct sections.
- [ ] Profile and project cards render correctly.
- [ ] All theme/background options work.
- [ ] Videos load and remain muted.
- [ ] Music play/pause and track switching work after user interaction.
- [ ] Album modal opens and closes.
- [ ] Lightbox next/previous/close controls work.
- [ ] Images and media paths load on the deployed site.
- [ ] Layout is usable on mobile and desktop.
- [ ] Browser console contains no new errors.

For a quick JavaScript syntax check, run this from the project root if Node.js is installed:

```bash
find js -type f -name '*.js' -print0 | while IFS= read -r -d '' file; do
  node --check "$file" || exit 1
done
```

Syntax checks do not verify the full browser experience. Test actual interactions in a browser too.

---

## ❗ Troubleshooting

### Images, CSS, or JavaScript return 404

- Confirm the file exists in the repository.
- Check the path relative to `index.html`.
- Match filename capitalization exactly.
- Ensure Vercel's Root Directory points to the folder containing `index.html`.

### Music does not start automatically

Browsers commonly restrict autoplay with sound. Tap the site's play control or interact with the page, then try again.

### A background video does not play on mobile

Check that the video path is correct and the element retains `muted` and `playsinline`. Large videos may take longer on a slow connection; consider compressing them.

### A theme or effect stops working after editing

Check the browser console, confirm script order in `index.html`, and look for missing element IDs or CSS selectors. The numbered JavaScript files may depend on earlier scripts.

### Changes do not appear after deployment

Confirm the latest commit is pushed, check the Vercel deployment status, and hard-refresh the page. Cached assets may take time to update depending on the configured headers.

---

## 🔐 Security and privacy

- Never commit API keys, access tokens, passwords, private credentials, or `.env` files containing secrets.
- Treat anything shipped in HTML, CSS, or browser JavaScript as public: visitors can inspect it.
- If `qr-promptpay.png` contains your payment information, remember it will be publicly accessible when deployed.
- Only upload images, audio, video, and fonts that you have permission to publish.
- A public GitHub repository makes its source code and committed assets visible to everyone. Use a private repository if you do not want the source publicly browsable; the deployed website itself may still be public.

---

## 📜 Credits and license

This repository is a personal portfolio project for **Washi**. Add credits for any third-party artwork, fonts, music, images, libraries, or other assets you use.

No license is implied unless a `LICENSE` file is added. If you want others to reuse the code, choose and add a license explicitly.

---

<div align="center">

**Made with ✦ by Washi**

*Personal portfolio · Visual experiments · Music · Projects*

</div>


## 🗃️ Albums — separate media folders

Album media is managed from the `albums/` directory, separately from the site's UI code.

```text
albums/
├── manifest.json       # List of albums and files shown on the website
├── README.md           # How to add media
├── clips/              # Put .mp4 clips here
├── games/              # Put game images here
├── scenes/             # Put project/scene media here
└── my-luv/             # Personal album; empty by default
```

Supported file types: **`.mp4`, `.png`, `.jpg`, `.jpeg`, `.gif`** and `.webp` images.

To add a file, place it in the relevant folder and add its path to `albums/manifest.json`. Example:

```json
{
  "src": "albums/games/my-game.gif",
  "title": "My Game"
}
```

Add that object to the desired album's `items` array. The site detects `.mp4` as video and the supported image extensions as images. You do not need to change JavaScript for routine additions.

**Why use a manifest?** Vercel serves this as a static website, and browser JavaScript cannot automatically enumerate the files in a deployed directory. `manifest.json` is the list the gallery reads, so new files must be registered there.
