# Muhammad Behram Hassan  XP Desktop Portfolio


## Overview

**XP Desktop Portfolio** is an interactive personal portfolio inspired by the classic Windows XP desktop environment. Instead of navigating a conventional portfolio website, visitors can explore my professional profile through desktop shortcuts, draggable application windows, a functional Start menu, and a live taskbar.

The project combines nostalgic desktop design with a modern, responsive experience to present my work as an AI Engineer.

## Features

- **Windows XP-Inspired Interface**  Classic desktop wallpaper, icons, window styling, and visual elements.
- **Interactive Desktop**  Desktop shortcuts and a functional Start menu.
- **Window Manager**  Open, focus, drag, minimize, maximize, restore, and close application windows.
- **Portfolio Applications**  My Computer, About Me, Resume, Projects, GitHub, Skills, Certifications, Contact, Recycle Bin, Command Prompt, and Behram AI Assistant.
- **AI Engineering Showcase**  Professional work and expertise across AI/ML, LLM applications, RAG pipelines, AI agents, and production AI systems.
- **Responsive Design**  Mobile-friendly launcher and full-screen application windows.
- **Resume Download**  Downloadable PDF resume and print stylesheet.
- **Contact Form**  EmailJS integration with Formspree fallback and `mailto:` alternative.
- **Live Taskbar**  Task management, clock, and calendar.
- **GitHub Integration**  Explore public repositories.
- **Lightweight Implementation** — Vanilla HTML, CSS, and JavaScript; no build process required.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Application structure |
| CSS3 | Styling, desktop layout, and responsive design |
| JavaScript | Window management and interactive applications |
| EmailJS | Contact form integration |
| Formspree | Contact form fallback |
| GitHub Pages | Static website hosting |

## Project Structure

```text
xp-desktop-portfolio/
├── index.html
├── styles.css
├── js/
│   ├── data.js
│   ├── dom.js
│   ├── icons.js
│   ├── wm.js
│   ├── apps.js
│   └── main.js
├── assets/
│   ├── bliss.svg
│   └── favicon.svg
├── Behram_img.png
├── CV.pdf
└── README.md
```

### Core Modules

- `index.html`  Desktop shell and application entry point.
- `styles.css`  Windows XP visual system and responsive styling.
- `js/data.js`  Profile, experience, projects, skills, and certifications.
- `js/dom.js`  DOM utilities and safe DOM helpers.
- `js/icons.js`  Desktop application icons.
- `js/wm.js`  Window management and interaction logic.
- `js/apps.js`  Application windows and their functionality.
- `js/main.js`  Desktop initialization, Start menu, and taskbar.
- `assets/bliss.svg`  Desktop wallpaper.
- `assets/favicon.svg`  Browser favicon.
- `Behram_img.png` Profile photograph.
- `CV.pdf`  Downloadable resume.

> `script.js` belongs to the previous portfolio implementation and is not loaded by the current application.

## Deployment

This portfolio is designed for static hosting and can be deployed through GitHub Pages without a build step.

1. Push the project files to your GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` directory.
5. Save the settings and wait for deployment.

Once published, your portfolio URL will follow this format:

`https://YOUR_USERNAME.github.io/xp-desktop-portfolio/`

## Contact Form Configuration

The contact form supports EmailJS, Formspree, and a `mailto:` fallback.

### EmailJS

The existing configuration uses:

- Service ID: `service_yltnyjj`
- Primary template: `template_cf5ad0y`
- Secondary template: `template_h1vukka`

### Formspree

Configured fallback endpoint:

`https://formspree.io/f/mldoeyae`

Before deployment, verify the provider configuration and test form submissions. Keep private credentials and secret keys out of client-side code. Configure spam protection where available.

## Customization

1. Update profile information, experience, projects, skills, and certifications in `js/data.js`.
2. Replace `Behram_img.png` with your preferred profile image.
3. Replace `CV.pdf` with your latest resume.
4. Customize the interface in `styles.css`.
5. Update the contact form configuration if using different providers.

## Browser Compatibility

Designed for modern browsers supporting standard HTML5, CSS3, and JavaScript features. Test desktop interactions, mobile touch input, repository fetching, and contact form submissions before publishing.
</p>
