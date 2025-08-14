# -r-P-rvat-Pati-S-tra
A modern, responsive relationship skills trainer inspired by Parvati’s wisdom. Learn the Suprabhatham principles, master non-verbal cues, and sharpen your response speed through an interactive quick-match quiz. Built with TailwindCSS (latest browser version), light bluish-grey theme.

# Parvati’s Husband’s Guide – Interactive Web App

A modern, responsive relationship skills trainer inspired by the ancient wisdom of Goddess Parvati.  
This guided tutorial site helps users **learn**, **practice**, and **perfect** the art of identifying and responding to non-verbal cues in relationships — with a focus on healthy, independent, and mutual consent–based connection.

---

## Features

### 📖 Page 1 – Suprabhatham Reading
- A poetic, morning-style reading of the “Parvati’s Husband’s Guide.”
- Clean Google Keep–style layout with light bluish-grey tones.
- Highlight feature for saving important lines.

### 👀 Page 2 – Non-Verbal Cues Reference
- Easy-to-read table of cues, meanings, and healthy responses.
- Emoji and color-coded categories for quick recall.
- Search and filter options for faster lookup.
- Data loaded from external `cues.json` for easy updates.

### ⚡ Page 3 – Quick Match Quiz
- Randomized cues appear with multiple response options (with emojis).
- Timed modes: **Beginner** (10s), **Pro** (5s), **Rapid Fire** (3s).
- Tracks accuracy, average response time, and most-missed cues.
- Designed for mobile and desktop, with a responsive layout.

---

## Technology Stack
- **HTML5**
- **TailwindCSS (Latest Browser Version)**  
  `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`
- **JavaScript (Vanilla JS)** for interactivity
- **JSON** for external cue data storage

---

## Installation & Usage

1. **Download all files**:
   - `index.html`
   - `cues.html`
   - `practice.html`
   - `style.css` (optional custom styles)
   - `script.js` (main JS logic)
   - `cues.json` (editable cue database)

2. **Run locally**:
   - Open `index.html` directly in your browser.
   - If you face local fetch restrictions when loading `cues.json`, run a local server:
     ```bash
     npx serve
     ```
     or use VS Code **Live Server**.

3. **Update cues**:
   - Edit `cues.json` to add new cues, meanings, and responses without changing any HTML/JS.

---

## Design Notes
- Google Keep–inspired responsive card layout.
- Light bluish-grey background with soft shadows for cards.
- Hamburger menu for mobile navigation.
- Dark mode support (toggle in header).

---

## License
MIT License – Free to use and modify.

---

