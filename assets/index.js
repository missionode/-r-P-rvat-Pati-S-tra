const KEY = 'parvati_highlights_v6';
const saved = new Set(JSON.parse(localStorage.getItem(KEY) || '[]'));

document.querySelectorAll('.highlightable').forEach((el, idx) => {
  if (saved.has(idx)) el.classList.add('ring-2','ring-brand-600');
  el.addEventListener('click', () => {
    const on = el.classList.toggle('ring-2');
    el.classList.toggle('ring-brand-600', on);
    if (on) saved.add(idx); else saved.delete(idx);
    localStorage.setItem(KEY, JSON.stringify([...saved]));
  });
});

document.getElementById('clearHighlights')?.addEventListener('click', () => {
  localStorage.removeItem(KEY);
  location.reload();
});
