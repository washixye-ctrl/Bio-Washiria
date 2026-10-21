# Web Bio — Refactored Structure

## What changed
- Split the large stylesheet into ordered CSS files under `css/`.
- Moved the six theme stylesheets into `css/themes/`.
- Split the original JavaScript into ordered, purpose-named files under `js/modules/`.
- Updated `index.html` stylesheet/script paths.
- Kept the existing design and code bodies unchanged inside the split files.

## Important implementation detail
The JavaScript files are deliberately loaded as classic scripts (not ES modules) and in their original order. The original code shares top-level variables and functions across sections; switching to `type="module"` without a full dependency refactor would break that shared scope.

## Media assets
The five background videos and matching MP3 files are included in `assets/videos/` and `assets/audio/`. Profile/gallery images other than `qr-promptpay.png` were not included in the supplied archive; add them to `images/` using the filenames referenced by the HTML and album configuration.

## Validation
Run `node --check` on each JavaScript file for syntax checks. Then open the site through a local HTTP server and test intro/loader, all themes, music, album modal, lightbox, character preview, and mobile layout. A syntax check does not replace browser testing.


## Video and music audio behavior

Background videos are forced to `muted`, `defaultMuted`, and `volume = 0` on both crossfade layers, including when switching themes. The separate `#bgMusic` audio element remains responsible for music playback.


## Media folders and matching theme tracks

- Put site images in `images/` and reference them as `images/<filename>`.
- Background videos are in `assets/videos/`.
- Music is in `assets/audio/`; each soundtrack is selected by matching the video basename:
  `Carthethyia.mp4` → `Carthethyia.mp3`, `Hiyuki.mp4` → `Hiyuki.mp3`, `Kurumi.mp4` → `Kurumi.mp3`, `Roxy.mp4` → `Roxy.mp3`, `Sandrone.mp4` → `Sandrone.mp3`.
- Number keys `1`–`5` switch videos, matching music, and their color themes (ice blue, sakura pink/blue, crimson, violet, red/steel cyan). Video audio remains muted; only the MP3 track plays.
- Place missing gallery images in `images/` using the exact filenames referenced in `js/modules/06-albums.js`.
