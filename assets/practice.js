const MODES = { beginner: 10, pro: 5, rapid: 3 };
let mode = 'rapid', timeLimit = MODES[mode];

let data = [];
let total = 0, correct = 0, streak = 0, best = 0, times = [], miss = {};
let t0 = 0, raf = null;
let current = null;

async function loadCues() {
  const res = await fetch('cues.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('missing cues.json');
  return res.json();
}
function startTimer(){
  t0 = performance.now(); cancelAnimationFrame(raf);
  const tick = () => {
    const s = (performance.now() - t0)/1000;
    document.getElementById('timer').textContent = s.toFixed(2) + 's';
    raf = requestAnimationFrame(tick);
  }; raf = requestAnimationFrame(tick);
}
function stopTimer(){ cancelAnimationFrame(raf); }

function pickRandom(n, excludeId){
  const pool = data.filter(d => d.id !== excludeId);
  const out = [];
  while(out.length < n && pool.length){
    const i = Math.floor(Math.random()*pool.length);
    out.push(pool.splice(i,1)[0]);
  }
  return out;
}

function newRound(){
  document.getElementById('timer').textContent = '0.00s';
  const cueItem = data[Math.floor(Math.random()*data.length)];
  const options = [cueItem, ...pickRandom(3, cueItem.id)].sort(()=>Math.random()-0.5);
  current = { cueItem, options };

  document.getElementById('cue').textContent = cueItem.cue;
  document.getElementById('meaning').textContent = cueItem.meaning;

  const box = document.getElementById('options');
  box.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'w-full text-left p-4 rounded-lg border border-slate-200/70 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 hover:-translate-y-[1px] transition';
    btn.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="text-2xl">${opt.icon}</div>
        <div>
          <div class="font-medium">${opt.response}</div>
          <div class="text-xs text-slate-500 dark:text-slate-400">Tag: ${opt.category}</div>
        </div>
      </div>`;
    btn.onclick = () => choose(opt.id === cueItem.id, btn);
    box.appendChild(btn);
  });
  startTimer();
}

function choose(ok, btn){
  stopTimer();
  const secs = (performance.now() - t0)/1000;
  total++; times.push(secs);

  if (ok) { correct++; streak++; best = Math.max(best, streak); btn.style.boxShadow='0 0 0 6px rgba(16,185,129,.2)'; }
  else { streak=0; miss[current.cueItem.id]=(miss[current.cueItem.id]||0)+1; btn.style.boxShadow='0 0 0 6px rgba(239,68,68,.2)'; }

  document.getElementById('acc').textContent = `${correct}/${total}`;
  document.getElementById('streak').textContent = `${streak}`;
  setTimeout(newRound, 500);
}

function endSession(){
  stopTimer();
  const avg = times.length ? times.reduce((a,b)=>a+b,0)/times.length : 0;
  const acc = total ? Math.round((correct/total)*100) : 0;
  document.getElementById('avg').textContent = avg.toFixed(2)+'s';
  document.getElementById('acc2').textContent = acc+'%';
  document.getElementById('best').textContent = String(best);

  const ul = document.getElementById('missed'); ul.innerHTML = '';
  Object.entries(miss).sort((a,b)=>b[1]-a[1]).slice(0,5).forEach(([id,count])=>{
    const d = data.find(x=>x.id===id); if (!d) return;
    const li = document.createElement('li'); li.textContent = `${d.icon} ${d.cue} — misses: ${count}`; ul.appendChild(li);
  });

  document.getElementById('summary').classList.remove('hidden');
  document.getElementById('card').classList.add('opacity-50','pointer-events-none');
}

/* Modes */
document.querySelectorAll('.mode').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.mode').forEach(b => b.classList.remove('chip--primary'));
  btn.classList.add('chip--primary');
  mode = btn.dataset.mode; timeLimit = MODES[mode];
}));

document.getElementById('next')?.addEventListener('click', newRound);
document.getElementById('end')?.addEventListener('click', endSession);
document.getElementById('restart')?.addEventListener('click', () => location.reload());
document.addEventListener('keydown', e => { if (e.key === ' ') { e.preventDefault(); newRound(); } });

(async () => {
  try { data = await loadCues(); newRound(); }
  catch { document.getElementById('cue').textContent = 'Could not load cues.json — run a local server.'; }
})();
