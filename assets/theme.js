// assets/theme.js
const PREF_KEY = 'parvati_theme';
const root = document.documentElement;
const body = document.body;

function applyTheme(mode) {
  const isDark = mode === 'dark';
  // Toggle on both <html> and <body> to catch any component-level checks
  root.classList.toggle('dark', isDark);
  body.classList.toggle('dark', isDark);
  // Help browsers render native controls appropriately
  root.style.colorScheme = isDark ? 'dark' : 'light';
  localStorage.setItem(PREF_KEY, mode);
}

function initialTheme() {
  const saved = localStorage.getItem(PREF_KEY);
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Init
applyTheme(initialTheme());

// Bind desktop + mobile toggles (if present)
function bind(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('click', () => {
    applyTheme(root.classList.contains('dark') ? 'light' : 'dark');
  });
}
bind('themeToggle');
bind('themeToggleMobile');
