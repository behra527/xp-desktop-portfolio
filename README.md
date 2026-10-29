# Muhammad Behram Hassan — XP Desktop Portfolio

An interactive Windows XP-inspired resume and AI engineering portfolio. Visitors explore the profile through desktop shortcuts, draggable application windows, a Start menu, and a live taskbar.

## Run locally

Open `index.html` in a browser, or use a local server (recommended so the GitHub app can fetch public repositories):

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

GitHub Pages: serve the repository root. No build step is required.

## What is included

- Desktop wallpaper, movable shortcuts, Start menu, taskbar, clock, and calendar
- Window manager: open, focus, drag, minimize, maximize, restore, close
- Applications: My Computer, About Me, Resume, Projects, GitHub, Skills, Certifications, Contact, Recycle Bin, Command Prompt, Behram AI Assistant
- Mobile layout: tap-to-open launcher and full-screen windows (no double-click)
- Resume PDF download (`CV.pdf`) and print stylesheet
- Contact form using the existing EmailJS configuration, with Formspree as a fallback and mailto if both fail

## Project files

```
index.html          Desktop shell
styles.css          XP visual system
js/data.js          Profile, experience, projects, skills, certifications
js/dom.js           Safe DOM helpers
js/icons.js         Desktop icons
js/wm.js            Window manager
js/apps.js          Application windows
js/main.js          Desktop, Start menu, taskbar
assets/bliss.svg    Wallpaper
assets/favicon.svg  Favicon
Behram_img.png      Profile photo
CV.pdf              Downloadable resume
```

`script.js` is leftover from the previous single-page portfolio and is not loaded.

## Contact form

EmailJS is already configured from the previous site (`service_yltnyjj`, templates `template_cf5ad0y` / `template_h1vukka`). The public key is a frontend key. If EmailJS is unavailable, the form tries Formspree (`https://formspree.io/f/mldoeyae`) and then a mailto draft.
