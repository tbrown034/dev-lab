/**
 * XP Tracking System
 * localStorage-based XP tracker, namespaced by platform (xp-d3, xp-django, xp-sql).
 * Auto-initializes on import. Other components: window.awardXP(amount, reason)
 */

import { detectPlatform } from './platform-config.js';

const LEVELS = [
  { xp: 0, name: 'Intern' }, { xp: 50, name: 'Junior Dev' },
  { xp: 150, name: 'Mid-Level' }, { xp: 300, name: 'Senior Dev' },
  { xp: 500, name: 'Staff Engineer' }, { xp: 800, name: 'Principal' },
  { xp: 1200, name: 'Distinguished' }, { xp: 2000, name: 'Fellow' },
];

function getStorageKey() {
  const platform = detectPlatform();
  return platform === 'hub' ? 'learn-xp' : `xp-${platform}`;
}

function loadState() {
  try { const r = localStorage.getItem(getStorageKey()); if (r) return JSON.parse(r); } catch {}
  return { totalXP: 0, history: [], visitedLessons: [], streak: { current: 0, lastDate: null }, level: 'Intern' };
}
function saveState(s) { localStorage.setItem(getStorageKey(), JSON.stringify(s)); }
function getLevel(xp) { let l = LEVELS[0]; for (const v of LEVELS) { if (xp >= v.xp) l = v; else break; } return l; }
function getNextLevel(xp) { for (const v of LEVELS) { if (xp < v.xp) return v; } return null; }
function today() { return new Date().toISOString().slice(0, 10); }

function awardXP(amount, reason) {
  const state = loadState();
  const oldLevel = getLevel(state.totalXP);
  state.totalXP += amount;
  state.history.push({ date: today(), amount, reason });
  if (state.history.length > 50) state.history = state.history.slice(-50);
  // Streak
  const t = today();
  if (state.streak.lastDate !== t) {
    const y = new Date(); y.setDate(y.getDate() - 1);
    state.streak.current = state.streak.lastDate === y.toISOString().slice(0, 10) ? state.streak.current + 1 : 1;
    state.streak.lastDate = t;
  }
  const newLevel = getLevel(state.totalXP);
  state.level = newLevel.name;
  saveState(state);
  updateWidget(state);
  animateXPGain(amount);
  if (newLevel.name !== oldLevel.name) showLevelUpToast(newLevel.name);
}

window.awardXP = awardXP;

// -- Styles --

const STYLES = `
#xp-widget { position:fixed; bottom:24px; left:24px; z-index:9990; font-family:-apple-system,system-ui,sans-serif; user-select:none; }
#xp-pill { background:#141414; border:1px solid #333; border-radius:20px; padding:6px 14px; cursor:pointer; display:flex; align-items:center; gap:8px; transition:border-color .3s,box-shadow .3s; color:#ccc; font-size:13px; white-space:nowrap; }
#xp-pill:hover { border-color:#555; }
#xp-pill.glow { box-shadow:0 0 12px rgba(255,255,255,.25); border-color:#888; }
#xp-pill-level { font-weight:600; color:#fff; }
#xp-pill-xp { color:#999; font-size:12px; font-variant-numeric:tabular-nums; }
#xp-panel { position:absolute; bottom:44px; left:0; background:#141414; border:1px solid #333; border-radius:10px; padding:16px; width:240px; box-shadow:0 8px 30px #0006; display:none; flex-direction:column; gap:12px; color:#ccc; font-size:13px; }
#xp-panel.open { display:flex; }
#xp-panel-title { color:#fff; font-weight:600; font-size:15px; margin:0; }
.xp-stat-row { display:flex; justify-content:space-between; align-items:center; }
.xp-stat-label { color:#888; font-size:12px; }
.xp-stat-value { color:#fff; font-weight:500; font-size:13px; }
#xp-bar-track { width:100%; height:6px; background:#282828; border-radius:3px; overflow:hidden; }
#xp-bar-fill { height:100%; background:#fff; border-radius:3px; transition:width .6s cubic-bezier(.22,1,.36,1); }
#xp-bar-label { display:flex; justify-content:space-between; font-size:11px; color:#666; margin-top:2px; }
#xp-gain-pop { position:absolute; bottom:44px; left:50%; transform:translateX(-50%); color:#fff; font-size:13px; font-weight:600; opacity:0; pointer-events:none; transition:opacity .2s,transform .2s; text-shadow:0 1px 4px #000; }
#xp-gain-pop.show { opacity:1; transform:translateX(-50%) translateY(-8px); }
#xp-toast { position:fixed; bottom:80px; left:24px; z-index:9991; background:#1a1a1a; border:1px solid #555; border-radius:8px; padding:10px 16px; color:#fff; font-size:13px; font-family:-apple-system,system-ui,sans-serif; box-shadow:0 4px 20px #0008; opacity:0; transform:translateY(10px); transition:opacity .4s,transform .4s; pointer-events:none; }
#xp-toast.show { opacity:1; transform:translateY(0); }
`;

// -- Widget --

function createWidget() {
  const s = document.createElement('style'); s.textContent = STYLES; document.head.appendChild(s);
  const w = document.createElement('div'); w.id = 'xp-widget';
  w.innerHTML = `
    <div id="xp-pill"><span id="xp-pill-level"></span><span id="xp-pill-xp"></span></div>
    <div id="xp-gain-pop"></div>
    <div id="xp-panel">
      <div class="xp-stat-row"><span id="xp-panel-title"></span></div>
      <div>
        <div id="xp-bar-track"><div id="xp-bar-fill"></div></div>
        <div id="xp-bar-label"><span id="xp-bar-current"></span><span id="xp-bar-next"></span></div>
      </div>
      <div class="xp-stat-row"><span class="xp-stat-label">Total XP</span><span class="xp-stat-value" id="xp-total"></span></div>
      <div class="xp-stat-row"><span class="xp-stat-label">Lessons visited</span><span class="xp-stat-value" id="xp-lessons"></span></div>
      <div class="xp-stat-row"><span class="xp-stat-label">Streak</span><span class="xp-stat-value" id="xp-streak"></span></div>
    </div>`;
  document.body.appendChild(w);
  const toast = document.createElement('div'); toast.id = 'xp-toast'; document.body.appendChild(toast);

  document.getElementById('xp-pill').addEventListener('click', () => {
    document.getElementById('xp-panel').classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!w.contains(e.target)) document.getElementById('xp-panel').classList.remove('open');
  });
  updateWidget(loadState());
}

function updateWidget(state) {
  const level = getLevel(state.totalXP), next = getNextLevel(state.totalXP);
  const el = (id) => document.getElementById(id);
  const set = (id, txt) => { const e = el(id); if (e) e.textContent = txt; };

  set('xp-pill-level', level.name);
  set('xp-pill-xp', `${state.totalXP} XP`);
  set('xp-panel-title', level.name);
  set('xp-total', state.totalXP);
  set('xp-lessons', state.visitedLessons.length);

  const days = state.streak.current;
  set('xp-streak', days ? `${days} day${days > 1 ? 's' : ''}` : '--');

  const fill = el('xp-bar-fill');
  if (fill) {
    if (next) {
      fill.style.width = `${Math.min(((state.totalXP - level.xp) / (next.xp - level.xp)) * 100, 100)}%`;
    } else {
      fill.style.width = '100%';
    }
  }
  set('xp-bar-current', next ? `${state.totalXP - level.xp}` : 'MAX');
  set('xp-bar-next', next ? `${next.xp - level.xp}` : '');
}

function animateXPGain(amount) {
  const pop = document.getElementById('xp-gain-pop');
  if (!pop) return;
  pop.textContent = `+${amount} XP`;
  pop.classList.add('show');
  setTimeout(() => pop.classList.remove('show'), 1200);
}

function showLevelUpToast(levelName) {
  const pill = document.getElementById('xp-pill');
  if (pill) { pill.classList.add('glow'); setTimeout(() => pill.classList.remove('glow'), 3000); }
  const toast = document.getElementById('xp-toast');
  if (!toast) return;
  toast.textContent = `Level up! You're now ${levelName}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// -- Auto-hooks --

function hookLessonVisit() {
  const path = window.location.pathname;
  if (!path.includes('/lessons/')) return;
  const state = loadState();
  if (!state.visitedLessons.includes(path)) {
    state.visitedLessons.push(path);
    saveState(state);
    awardXP(10, 'Lesson opened');
  }
}

function hookQuizButtons() {
  document.querySelectorAll('button').forEach((btn) => {
    const text = btn.textContent.trim();
    if (text === 'Show Answer' || text === 'Show answer') {
      btn.addEventListener('click', function xpQuiz() {
        awardXP(5, 'Quiz answer');
        btn.removeEventListener('click', xpQuiz);
      });
    }
  });
}

function hookTutorMessages() {
  const observer = new MutationObserver(() => {
    const sendBtn = document.getElementById('tutor-send');
    if (sendBtn && !sendBtn.__xpHooked) {
      sendBtn.__xpHooked = true;
      sendBtn.addEventListener('click', () => awardXP(3, 'AI tutor message'));
    }
    const input = document.getElementById('tutor-input');
    if (input && !input.__xpHooked) {
      input.__xpHooked = true;
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim()) awardXP(3, 'AI tutor message');
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function hookAudio(audio) {
  if (audio.__xpHooked) return;
  audio.__xpHooked = true;
  let awarded = false;
  audio.addEventListener('timeupdate', () => {
    if (!awarded && audio.currentTime >= 120) { awarded = true; awardXP(10, 'Audio lesson listened'); }
  });
}

function hookAudioLessons() {
  document.querySelectorAll('audio').forEach(hookAudio);
  new MutationObserver(() => document.querySelectorAll('audio').forEach(hookAudio))
    .observe(document.body, { childList: true, subtree: true });
}

// -- Init --

export function initXPTracker() {
  createWidget();
  hookLessonVisit();
  hookQuizButtons();
  hookTutorMessages();
  hookAudioLessons();
}
