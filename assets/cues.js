async function loadCues() {
  const res = await fetch('cues.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('cues.json not found');
  return res.json();
}

function render(data) {
  const q = document.getElementById('search').value.toLowerCase();
  const tag = document.getElementById('filter').value;
  const rows = document.getElementById('rows');
  rows.innerHTML = '';

  const filtered = data.filter(d => {
    const hay = (d.cue + ' ' + d.meaning + ' ' + d.response + ' ' + d.category).toLowerCase();
    return (!q || hay.includes(q)) && (!tag || d.category === tag);
  });

  if (!filtered.length) {
    rows.innerHTML = `<tr><td class="p-6 text-slate-500 dark:text-slate-300" colspan="5">No matches.</td></tr>`;
    return;
  }

  filtered.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="p-3 text-xl">${d.icon}</td>
      <td class="p-3 font-medium">${d.cue}</td>
      <td class="p-3 text-slate-600 dark:text-slate-300">${d.meaning}</td>
      <td class="p-3">${d.response}</td>
      <td class="p-3"><span class="chip chip--active !py-1 !px-2">${d.category}</span></td>`;
    rows.appendChild(tr);
  });
}

(async () => {
  try {
    const data = await loadCues();
    const rerender = () => render(data);
    document.getElementById('search').addEventListener('input', rerender);
    document.getElementById('filter').addEventListener('change', rerender);
    render(data);
  } catch {
    document.getElementById('rows').innerHTML =
      `<tr><td class="p-6 text-red-500" colspan="5">Could not load cues.json (serve via local server).</td></tr>`;
  }
})();
