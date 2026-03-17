/**
 * Skill Assessment Test
 * AI-powered adaptive quiz: 10 questions, difficulty adjusts per answer.
 * Saves history to localStorage (namespaced by platform), awards XP, shows past results.
 * Only activates on the homepage.
 */

import { detectPlatform, PLATFORM_CONFIG } from './platform-config.js';

const TIERS = [
  [0, 'Novice'], [4, 'Familiar'], [6, 'Competent'], [8, 'Proficient'], [10, 'Expert'],
];

function getTier(score) {
  let t = TIERS[0][1];
  for (const [min, name] of TIERS) { if (score >= min) t = name; }
  return t;
}

function getPlatformInfo() {
  const platform = detectPlatform();
  if (platform === 'django') return { name: 'Django', topics: 'Python syntax, Django ORM, views, templates, REST framework, URL routing, middleware' };
  if (platform === 'sql') return { name: 'SQL', topics: 'SELECT, JOINs, aggregation, window functions, indexes, subqueries, CTEs' };
  return { name: 'D3.js', topics: 'SVG elements, d3.select/selectAll, scales (linear/band/time), data binding (.data/.join), axes, maps/projections, transitions, path generators' };
}

function getSkillStorageKey() {
  const platform = detectPlatform();
  return platform === 'hub' ? 'skill-tests' : `skill-tests-${platform}`;
}

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(getSkillStorageKey())) || []; } catch { return []; }
}
function saveHistory(h) { localStorage.setItem(getSkillStorageKey(), JSON.stringify(h.slice(-20))); }

const STYLES = `
#st-btn{position:fixed;bottom:24px;right:96px;z-index:9997;background:#1a1a1a;border:1px solid #444;border-radius:20px;padding:8px 16px;color:#ccc;font-size:13px;font-family:-apple-system,system-ui,sans-serif;cursor:pointer;transition:all .2s;white-space:nowrap}
#st-btn:hover{border-color:#fff;color:#fff;box-shadow:0 2px 12px #fff2}
#st-overlay{position:fixed;inset:0;z-index:10000;background:#0a0a0aee;display:none;align-items:center;justify-content:center;font-family:-apple-system,system-ui,sans-serif;overflow-y:auto}
#st-overlay.open{display:flex}
#st-card{background:#141414;border:1px solid #333;border-radius:12px;width:100%;max-width:600px;margin:24px;padding:32px;position:relative;animation:st-in .3s ease}
@keyframes st-in{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
.st-close{position:absolute;top:12px;right:16px;background:none;border:none;color:#666;font-size:22px;cursor:pointer;line-height:1}
.st-close:hover{color:#fff}
.st-timer{position:absolute;top:14px;right:52px;color:#888;font-size:12px;font-variant-numeric:tabular-nums}
.st-progress{height:4px;background:#222;border-radius:2px;margin-bottom:24px;overflow:hidden}
.st-progress-fill{height:100%;background:#fff;transition:width .3s;border-radius:2px}
.st-q-num{color:#888;font-size:12px;margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em}
.st-question{color:#e5e5e5;font-size:16px;line-height:1.6;margin-bottom:20px}
.st-options{display:flex;flex-direction:column;gap:10px}
.st-opt{background:#1a1a1a;border:1px solid #333;border-radius:8px;padding:14px 16px;color:#ccc;font-size:14px;cursor:pointer;text-align:left;transition:all .15s;display:flex;gap:10px;line-height:1.4}
.st-opt:hover:not(.locked){border-color:#888;color:#fff}
.st-opt .st-key{color:#888;font-weight:600;flex-shrink:0;min-width:18px}
.st-opt.correct{border-color:#4ade80;background:#4ade8015;color:#4ade80}
.st-opt.wrong{border-color:#f87171;background:#f8717115;color:#f87171}
.st-opt.locked{cursor:default}
.st-explain{margin-top:16px;padding:12px 16px;background:#1a1a1a;border-radius:8px;font-size:13px;color:#aaa;line-height:1.5;border-left:3px solid #555}
.st-next{margin-top:20px;background:#fff;color:#000;border:none;border-radius:8px;padding:10px 24px;font-size:14px;font-weight:600;cursor:pointer;transition:background .2s}
.st-next:hover{background:#ddd}
.st-loading{color:#888;text-align:center;padding:40px 0;font-size:14px}
.st-loading::after{content:'';display:inline-block;width:16px;height:16px;border:2px solid #555;border-top-color:#fff;border-radius:50%;margin-left:8px;vertical-align:middle;animation:st-spin .8s linear infinite}
@keyframes st-spin{to{transform:rotate(360deg)}}
.st-results h2{color:#fff;font-size:22px;margin-bottom:4px}
.st-results .st-tier{font-size:14px;margin-bottom:20px}
.st-results .st-score-big{font-size:48px;font-weight:700;color:#fff;margin-bottom:4px}
.st-stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px}
.st-stat{background:#1a1a1a;border-radius:8px;padding:12px;text-align:center}
.st-stat .val{color:#fff;font-size:18px;font-weight:600}
.st-stat .lbl{color:#888;font-size:11px;margin-top:2px;text-transform:uppercase}
.st-history h3{color:#ccc;font-size:14px;margin-bottom:10px}
.st-bars{display:flex;align-items:flex-end;gap:6px;height:80px;margin-bottom:8px}
.st-bar{flex:1;max-width:32px;border-radius:3px 3px 0 0;background:#333;transition:height .3s;position:relative;min-height:4px}
.st-bar.current{background:#fff}
.st-bar-label{position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);font-size:9px;color:#888;white-space:nowrap}
.st-best{color:#888;font-size:12px;margin-top:18px}
.st-retry{margin-top:16px;background:#fff;color:#000;border:none;border-radius:8px;padding:10px 24px;font-size:14px;font-weight:600;cursor:pointer}
.st-retry:hover{background:#ddd}
.st-error{color:#f87171;text-align:center;padding:20px 0;font-size:13px}
`;

async function fetchQuestion(platformInfo, difficulty) {
  const platform = detectPlatform();
  const prompt = `You are generating a skill assessment question for ${platformInfo.name}.
Difficulty level: ${difficulty}
Topics to cover: ${platformInfo.topics}
Generate a multiple choice question with exactly 4 options labeled A, B, C, D.
Respond in this exact JSON format:
{"question": "...", "options": {"A": "...", "B": "...", "C": "...", "D": "..."}, "correct": "A", "explanation": "..."}
Only respond with the JSON, nothing else.`;

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
      lessonContext: 'Skill assessment test',
      platform,
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);

  // Parse JSON from response -- handle markdown fences
  let raw = data.content.trim();
  const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) raw = fenceMatch[1].trim();
  return JSON.parse(raw);
}

function adjustDifficulty(current, wasCorrect) {
  const levels = ['easy', 'medium', 'hard'];
  const i = levels.indexOf(current);
  if (wasCorrect && i < 2) return levels[i + 1];
  if (!wasCorrect && i > 0) return levels[i - 1];
  return current;
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}

function renderHistoryBars(history, currentScore) {
  const all = [...history, { score: currentScore }];
  const recent = all.slice(-10);
  return recent.map((h, i) => {
    const pct = (h.score / 10) * 100;
    const isCurrent = i === recent.length - 1;
    return `<div class="st-bar${isCurrent ? ' current' : ''}" style="height:${Math.max(pct, 5)}%">
      <span class="st-bar-label">${h.score}</span>
    </div>`;
  }).join('');
}

export function initSkillTest() {
  const path = window.location.pathname;
  if (path !== '/' && path !== '/index.html') return;

  // Inject styles
  const styleEl = document.createElement('style');
  styleEl.textContent = STYLES;
  document.head.appendChild(styleEl);

  // Floating button
  const btn = document.createElement('button');
  btn.id = 'st-btn';
  btn.textContent = 'Test My Skills';
  document.body.appendChild(btn);

  // Overlay
  const overlay = document.createElement('div');
  overlay.id = 'st-overlay';
  document.body.appendChild(overlay);

  const platformInfo = getPlatformInfo();

  // State
  let questionIndex = 0;
  let score = 0;
  let difficulty = 'medium';
  let totalStart = 0;
  let qStart = 0;
  let qTimes = [];
  let timerInterval = null;

  function open() {
    questionIndex = 0;
    score = 0;
    difficulty = 'medium';
    qTimes = [];
    totalStart = Date.now();
    overlay.classList.add('open');
    loadQuestion();
  }

  function close() {
    overlay.classList.remove('open');
    if (timerInterval) clearInterval(timerInterval);
  }

  function startTimer() {
    qStart = Date.now();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      const el = document.getElementById('st-timer');
      if (el) {
        const qSec = Math.floor((Date.now() - qStart) / 1000);
        const tSec = Math.floor((Date.now() - totalStart) / 1000);
        el.textContent = `${formatTime(qSec)} | Total: ${formatTime(tSec)}`;
      }
    }, 500);
  }

  async function loadQuestion() {
    overlay.innerHTML = `<div id="st-card">
      <button class="st-close" id="st-x">&times;</button>
      <div class="st-timer" id="st-timer">--</div>
      <div class="st-progress"><div class="st-progress-fill" style="width:${(questionIndex / 10) * 100}%"></div></div>
      <div class="st-loading">Generating question ${questionIndex + 1} of 10</div>
    </div>`;
    document.getElementById('st-x').onclick = close;
    startTimer();

    try {
      const q = await fetchQuestion(platformInfo, difficulty);
      renderQuestion(q);
    } catch (e) {
      const card = document.getElementById('st-card');
      if (card) {
        const loadEl = card.querySelector('.st-loading');
        if (loadEl) loadEl.innerHTML = `<div class="st-error">Failed to load question. ${e.message}<br><button class="st-next" onclick="this.closest('#st-overlay').querySelector('.st-loading').textContent='Retrying...'">Retry</button></div>`;
        card.querySelector('.st-next')?.addEventListener('click', () => loadQuestion());
      }
    }
  }

  function renderQuestion(q) {
    const card = document.getElementById('st-card');
    card.innerHTML = `
      <button class="st-close" id="st-x">&times;</button>
      <div class="st-timer" id="st-timer">--</div>
      <div class="st-progress"><div class="st-progress-fill" style="width:${(questionIndex / 10) * 100}%"></div></div>
      <div class="st-q-num">Question ${questionIndex + 1} / 10 &middot; ${difficulty}</div>
      <div class="st-question">${escapeHtml(q.question)}</div>
      <div class="st-options" id="st-opts">
        ${['A','B','C','D'].map(k => `<button class="st-opt" data-key="${k}"><span class="st-key">${k}.</span> ${escapeHtml(q.options[k])}</button>`).join('')}
      </div>`;
    document.getElementById('st-x').onclick = close;

    // Attach answer handlers
    card.querySelectorAll('.st-opt').forEach(optBtn => {
      optBtn.addEventListener('click', () => handleAnswer(q, optBtn.dataset.key, card));
    });
  }

  function handleAnswer(q, chosen, card) {
    // Prevent double-click
    const opts = card.querySelectorAll('.st-opt');
    opts.forEach(o => o.classList.add('locked'));

    const elapsed = (Date.now() - qStart) / 1000;
    qTimes.push(elapsed);
    const isCorrect = chosen === q.correct;
    if (isCorrect) score++;

    // Highlight correct / wrong
    opts.forEach(o => {
      if (o.dataset.key === q.correct) o.classList.add('correct');
      if (o.dataset.key === chosen && !isCorrect) o.classList.add('wrong');
    });

    // Show explanation
    const optsDiv = document.getElementById('st-opts');
    optsDiv.insertAdjacentHTML('afterend', `
      <div class="st-explain">${isCorrect ? 'Correct!' : 'Incorrect.'} ${escapeHtml(q.explanation)}</div>
      <button class="st-next" id="st-next-btn">${questionIndex < 9 ? 'Next Question' : 'See Results'}</button>
    `);

    difficulty = adjustDifficulty(difficulty, isCorrect);

    document.getElementById('st-next-btn').addEventListener('click', () => {
      questionIndex++;
      if (questionIndex >= 10) showResults();
      else loadQuestion();
    });
  }

  function showResults() {
    if (timerInterval) clearInterval(timerInterval);
    const totalTime = Math.floor((Date.now() - totalStart) / 1000);
    const avgTime = qTimes.length ? Math.round(qTimes.reduce((a, b) => a + b, 0) / qTimes.length) : 0;
    const tier = getTier(score);

    // Save to history
    const history = loadHistory();
    const entry = {
      date: new Date().toISOString().slice(0, 10),
      score, tier, totalTime, avgTime, difficulty,
    };
    history.push(entry);
    saveHistory(history);

    // Award XP
    if (typeof window.awardXP === 'function') window.awardXP(score * 5, 'Skill test');

    const best = Math.max(...history.map(h => h.score));
    const pastEntries = history.slice(0, -1); // all except current

    const tierColor = score >= 8 ? '#4ade80' : score >= 6 ? '#60a5fa' : score >= 4 ? '#fbbf24' : '#f87171';

    overlay.innerHTML = `<div id="st-card"><button class="st-close" id="st-x">&times;</button>
      <div class="st-results">
        <div class="st-score-big">${score}/10</div>
        <h2 style="margin-top:0">Skill Assessment</h2>
        <div class="st-tier" style="color:${tierColor}">${tier}</div>
        <div class="st-stat-grid">
          <div class="st-stat"><div class="val">${formatTime(totalTime)}</div><div class="lbl">Total Time</div></div>
          <div class="st-stat"><div class="val">${formatTime(avgTime)}</div><div class="lbl">Avg / Question</div></div>
          <div class="st-stat"><div class="val">${score * 5}</div><div class="lbl">XP Earned</div></div>
          <div class="st-stat"><div class="val">${difficulty}</div><div class="lbl">Final Difficulty</div></div>
        </div>
        ${pastEntries.length > 0 ? `
        <div class="st-history">
          <h3>Your Progress</h3>
          <div class="st-bars">${renderHistoryBars(pastEntries, score)}</div>
          <div class="st-best">Best: ${best}/10${score >= best && pastEntries.length > 0 ? ' \u2014 New best!' : score >= best - 1 && pastEntries.length > 0 ? ' \u2014 Beat your best!' : ''}</div>
        </div>` : ''}
        <button class="st-retry" id="st-retry">Try Again</button>
      </div>
    </div>`;
    document.getElementById('st-x').onclick = close;
    document.getElementById('st-retry').addEventListener('click', open);
  }

  btn.addEventListener('click', open);
}

function escapeHtml(s) {
  if (!s) return '';
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
