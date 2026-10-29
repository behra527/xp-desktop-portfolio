# Muhammad Behram Hassan  XP Desktop Portfolio

An interactive Windows XP-inspired desktop portfolio showcasing my resume, AI engineering expertise, projects, technical skills, certifications, and professional experience through a nostalgic desktop environment.

Instead of a conventional portfolio website, visitors can explore my profile using desktop shortcuts, draggable application windows, a functional Start menu, and a live taskbar.

## Features

- **Windows XP-inspired UI** — Classic desktop aesthetics, wallpaper, icons, and window styling.
- **Interactive Desktop** — Movable shortcuts and a functional Start menu.
- **Window Management** — Open, focus, drag, minimize, maximize, restore, and close application windows.
- **Portfolio Applications** — About Me, Resume, Projects, GitHub, Skills, Certifications, Contact, My Computer, Recycle Bin, Command Prompt, and Behram AI Assistant.
- **AI Engineering Portfolio** — Explore my work and expertise across AI/ML systems, LLM applications, RAG pipelines, AI agents, and production-ready AI solutions.
- **Responsive Experience** — Mobile-friendly launcher and full-screen application windows.
- **Resume Download** — Download my resume as a PDF and print it using the print stylesheet.
- **Contact Form** — EmailJS integration with Formspree fallback and a `mailto:` alternative.
- **Live Taskbar** — Desktop task management, clock, and calendar.
- **Lightweight Architecture** — Vanilla HTML, CSS, and JavaScript with no build step required.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- EmailJS
- Formspree
- GitHub Pages

## Getting Started

### Prerequisites

- A modern web browser.
- Python 3 for running the optional local development server.

### Run Locally

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/xp-desktop-portfolio.git
cd xp-desktop-portfolio
```

Start a local HTTP server:

```bash
python -m http.server 8000
```

Open the following URL in your browser:

```text
http://localhost:8000
```

You can also open `index.html` directly in a browser. However, using a local HTTP server is recommended for features that fetch public GitHub repositories or other resources.

No package installation, bundler, or build process is required.

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

### Key Files

| File | Responsibility |
| --- | --- |
| `index.html` | Desktop shell and application entry point |
| `styles.css` | Windows XP-inspired styling and responsive layout |
| `js/data.js` | Profile, experience, projects, skills, and certifications |
| `js/dom.js` | DOM utilities and safe DOM helpers |
| `js/icons.js` | Desktop application icons |
| `js/wm.js` | Window management and interaction logic |
| `js/apps.js` | Application window content and behavior |
| `js/main.js` | Desktop initialization, Start menu, and taskbar |
| `assets/bliss.svg` | Desktop wallpaper |
| `assets/favicon.svg` | Browser favicon |
| `Behram_img.png` | Profile photograph |
| `CV.pdf` | Downloadable resume |

> Note: `script.js` belongs to the previous portfolio implementation and is not loaded by the current application.

## Deployment — GitHub Pages

This project can be hosted directly on GitHub Pages without a build step.

1. Push the project files to your GitHub repository.
2. Open the repository's **Settings**.
3. Navigate to **Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select your deployment branch, typically `main`, and the `/ (root)` folder.
6. Save the configuration and wait for deployment.

Your portfolio will be available at:

```text
https://YOUR_USERNAME.github.io/xp-desktop-portfolio/
```

Replace `YOUR_USERNAME` with your GitHub username.

## Contact Form Configuration

The contact form supports EmailJS, Formspree, and a `mailto:` fallback.

### EmailJS

The existing integration uses the following configuration:

- Service ID: `service_yltnyjj`
- Primary template: `template_cf5ad0y`
- Secondary template: `template_h1vukka`

The EmailJS public key is intended for client-side use. Keep private credentials, secret keys, and administrative tokens out of frontend code.

### Formspree Fallback

The configured fallback endpoint is:

```text
https://formspree.io/f/mldoeyae
```

If EmailJS is unavailable, the form attempts Formspree and then falls back to opening a prefilled email draft.

**Before deploying:** verify that the EmailJS templates, public key, Formspree endpoint, and fallback behavior are correct. Publicly exposed endpoints may be abused, so configure provider-side spam protection and rate limiting where available.

## Customization

To personalize the portfolio:

1. Update profile details, work experience, projects, skills, and certifications in `js/data.js`.
2. Replace `Behram_img.png` with your preferred profile photograph.
3. Replace `CV.pdf` with your latest resume.
4. Customize desktop styling, colors, and responsive behavior in `styles.css`.
5. Update contact form provider settings if you use different services.

## Browser Compatibility

Designed for modern browsers that support standard HTML5, CSS3, and JavaScript features. Test desktop interactions, touch input, external API requests, and contact form submissions before production deployment.

## License

Unless a license is added to this repository, all rights are reserved by the author. Contact the repository owner for permission to reuse the project or its original assets.

## Author

**Muhammad Behram Hassan**  
AI Engineer | Generative AI | Machine Learning | LLM Applications | AI Systems Architecture

- GitHub: https://github.com/YOUR_USERNAME
- Portfolio: https://YOUR_USERNAME.github.io/xp-desktop-portfolio/

---

Built with HTML, CSS, JavaScript, and a nostalgic Windows XP-inspired desktop experience.
