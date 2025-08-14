const PREF_KEY = 'parvati_theme';
const root = document.documentElement;

function setTheme(mode) {
  root.classList.toggle('dark', mode === 'dark');
  localStorage.setItem(PREF_KEY, mode);
}
function getInitialTheme() {
  const stored = localStorage.getItem(PREF_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Init
setTheme(getInitialTheme());

// Bind both desktop and mobile toggles (if present)
function wireToggle(id) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = root.classList.contains('dark') ? 'light' : 'dark';
    setTheme(next);
  });
}
wireToggle('themeToggle');
wireToggle('themeToggleMobile');
