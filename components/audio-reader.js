/**
 * Audio Reader - Listen to Lesson
 * Uses Web Speech API (SpeechSynthesis) to read lesson content aloud.
 * Floating bottom-center button expands into a playback bar with
 * play/pause, section skip, speed control, and progress tracking.
 */

const READER_STYLES = `
  #audio-reader-btn {
    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
    z-index: 9000; background: #1a1a1a; color: #ccc; border: 1px solid #333;
    padding: 8px 20px; border-radius: 20px; cursor: pointer;
    font-size: 14px; font-family: -apple-system, system-ui, sans-serif;
    display: flex; align-items: center; gap: 6px;
    transition: opacity 0.2s, transform 0.3s;
    box-shadow: 0 4px 16px #0006;
  }
  #audio-reader-btn:hover { background: #222; color: #fff; }

  #audio-reader-bar {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 9000;
    background: #1a1a1a; border-top: 1px solid #333;
    padding: 8px 16px; display: none; align-items: center; gap: 12px;
    font-family: -apple-system, system-ui, sans-serif;
    transform: translateY(100%); transition: transform 0.3s ease;
    box-shadow: 0 -4px 20px #0006;
  }
  #audio-reader-bar.visible { display: flex; transform: translateY(0); }
  #audio-reader-bar button {
    background: none; border: 1px solid #444; color: #ccc; cursor: pointer;
    border-radius: 4px; padding: 4px 10px; font-size: 13px;
    font-family: inherit; transition: background 0.15s;
  }
  #audio-reader-bar button:hover { background: #333; color: #fff; }
  #audio-reader-bar button.play-btn { background: #f97316; color: #000; border-color: #f97316; font-size: 15px; padding: 4px 12px; }
  #audio-reader-bar button.play-btn:hover { background: #fb923c; }
  #audio-reader-bar .section-name {
    flex: 1; color: #aaa; font-size: 13px; overflow: hidden;
    text-overflow: ellipsis; white-space: nowrap; min-width: 0;
  }
  #audio-reader-bar select {
    background: #111; color: #ccc; border: 1px solid #444;
    border-radius: 4px; padding: 3px 6px; font-size: 12px;
    font-family: inherit; cursor: pointer;
  }
  .audio-reading-highlight { border-left: 3px solid #f9731688 !important; transition: border-color 0.3s; }
`;

function extractChunks() {
  const content = document.querySelector('.content');
  if (!content) return [];
  const chunks = [];
  let current = { title: 'Introduction', texts: [], headingEl: null };
  const readable = content.querySelectorAll('h2, h3, p, li, .aha, .callout, .warning, pre, .side-by-side');

  for (const el of readable) {
    if (el.tagName === 'H2') {
      if (current.texts.length) chunks.push(current);
      current = { title: el.textContent.trim(), texts: [], headingEl: el };
      current.texts.push(el.textContent.trim() + '.');
      continue;
    }
    // Skip elements nested inside already-processed parents
    if (el.closest('.aha') && el.tagName !== 'DIV' && !el.classList.contains('aha')) continue;
    if (el.closest('.callout') && el.tagName !== 'DIV' && !el.classList.contains('callout')) continue;
    if (el.closest('.warning') && el.tagName !== 'DIV' && !el.classList.contains('warning')) continue;
    if (el.closest('.side-by-side') && !el.classList.contains('side-by-side')) continue;
    // Skip elements inside quiz or exercise blocks
    if (el.closest('.quiz') || el.closest('.exercise')) continue;

    if (el.classList.contains('side-by-side')) {
      const sides = el.querySelectorAll(':scope > div');
      if (sides.length >= 2) {
        const h5a = sides[0].querySelector('h5');
        const h5b = sides[1].querySelector('h5');
        current.texts.push('Comparison: ' + (h5a ? h5a.textContent.trim() : 'First version') +
          ', versus, ' + (h5b ? h5b.textContent.trim() : 'Second version') + '.');
      }
      continue;
    }
    if (el.tagName === 'PRE') {
      current.texts.push('Code example.');
      continue;
    }
    if (el.classList.contains('aha') || el.classList.contains('callout') || el.classList.contains('warning')) {
      const inner = el.querySelector('p');
      if (inner) current.texts.push(inner.textContent.trim());
      continue;
    }
    if (el.tagName === 'H3') {
      // Clean angle brackets for speech
      current.texts.push(el.textContent.replace(/[<>]/g, '').trim() + '.');
      continue;
    }
    if (el.tagName === 'P' || el.tagName === 'LI') {
      const text = el.textContent.trim();
      if (text.length > 0) current.texts.push(text);
    }
  }
  if (current.texts.length) chunks.push(current);
  return chunks;
}

function pickVoice(voices) {
  const prefs = ['samantha', 'alex', 'enhanced', 'premium', 'natural'];
  for (const pref of prefs) {
    const v = voices.find(v => v.name.toLowerCase().includes(pref) && v.lang.startsWith('en'));
    if (v) return v;
  }
  return voices.find(v => v.lang.startsWith('en') && v.default) ||
    voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
}

export function initAudioReader() {
  if (!window.location.pathname.includes('/lessons/')) return;
  if (!('speechSynthesis' in window)) return;

  const synth = window.speechSynthesis;
  let chunks = [];
  let currentIdx = 0;
  let isPlaying = false;
  let selectedVoice = null;
  let rate = 1;
  let listenStart = 0;
  let xpAwarded = false;
  let prevHighlight = null;
  let barRevealed = false;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = READER_STYLES;
  document.head.appendChild(style);

  // Floating button
  const btn = document.createElement('button');
  btn.id = 'audio-reader-btn';
  btn.innerHTML = '\u25B6 Listen to Lesson';
  document.body.appendChild(btn);

  // Playback bar
  const bar = document.createElement('div');
  bar.id = 'audio-reader-bar';
  bar.innerHTML = `
    <button class="play-btn" data-action="play">\u25B6</button>
    <button data-action="prev">\u23EE</button>
    <button data-action="next">\u23ED</button>
    <span class="section-name">Loading...</span>
    <select data-action="speed">
      <option value="0.75">0.75x</option>
      <option value="1" selected>1x</option>
      <option value="1.25">1.25x</option>
      <option value="1.5">1.5x</option>
    </select>
    <button data-action="close">\u2715</button>
  `;
  document.body.appendChild(bar);

  const playBtn = bar.querySelector('[data-action="play"]');
  const sectionLabel = bar.querySelector('.section-name');
  const speedSelect = bar.querySelector('[data-action="speed"]');

  // Voice setup (async on some browsers)
  function loadVoice() {
    const voices = synth.getVoices();
    if (voices.length) selectedVoice = pickVoice(voices);
  }
  loadVoice();
  synth.addEventListener('voiceschanged', loadVoice);

  function showBar() {
    btn.style.display = 'none';
    bar.style.display = 'flex';
    // Force reflow, then animate
    requestAnimationFrame(() => { bar.classList.add('visible'); });
    barRevealed = true;
  }

  function hideBar() {
    bar.classList.remove('visible');
    setTimeout(() => { bar.style.display = 'none'; btn.style.display = 'flex'; }, 300);
    barRevealed = false;
  }

  function highlightSection(idx) {
    if (prevHighlight) prevHighlight.classList.remove('audio-reading-highlight');
    const el = chunks[idx]?.headingEl;
    if (el) { el.classList.add('audio-reading-highlight'); prevHighlight = el; }
  }

  function updateUI() {
    playBtn.textContent = isPlaying ? '\u23F8' : '\u25B6';
    const title = chunks[currentIdx]?.title || '';
    sectionLabel.textContent = `${currentIdx + 1}/${chunks.length}: ${title}`;
  }

  function checkXP() {
    if (xpAwarded || !listenStart) return;
    if (Date.now() - listenStart >= 120000 && typeof window.awardXP === 'function') {
      window.awardXP(10, 'Audio lesson');
      xpAwarded = true;
    }
  }

  function speakChunk(idx) {
    synth.cancel();
    if (idx < 0 || idx >= chunks.length) { stop(); return; }
    currentIdx = idx;
    isPlaying = true;
    highlightSection(idx);
    updateUI();

    const text = chunks[idx].texts.join(' ');
    // SpeechSynthesis can choke on very long utterances, split at ~200 chars on sentence boundaries
    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    let queue = [];
    let buf = '';
    for (const s of sentences) {
      if ((buf + s).length > 200 && buf) { queue.push(buf.trim()); buf = ''; }
      buf += s + ' ';
    }
    if (buf.trim()) queue.push(buf.trim());

    let i = 0;
    function speakNext() {
      if (!isPlaying) return;
      if (i >= queue.length) {
        // Section done, advance
        checkXP();
        if (currentIdx + 1 < chunks.length) { speakChunk(currentIdx + 1); }
        else { stop(); }
        return;
      }
      const utt = new SpeechSynthesisUtterance(queue[i]);
      if (selectedVoice) utt.voice = selectedVoice;
      utt.rate = rate;
      utt.onend = () => { i++; speakNext(); };
      utt.onerror = () => { i++; speakNext(); };
      synth.speak(utt);
    }
    speakNext();
  }

  function pause() {
    isPlaying = false;
    synth.pause();
    updateUI();
  }

  function resume() {
    isPlaying = true;
    synth.resume();
    if (!listenStart) listenStart = Date.now();
    updateUI();
  }

  function stop() {
    isPlaying = false;
    synth.cancel();
    if (prevHighlight) prevHighlight.classList.remove('audio-reading-highlight');
    prevHighlight = null;
    updateUI();
    hideBar();
    checkXP();
  }

  // Button: start reading
  btn.addEventListener('click', () => {
    chunks = extractChunks();
    if (!chunks.length) return;
    currentIdx = 0;
    listenStart = Date.now();
    showBar();
    speakChunk(0);
  });

  // Bar controls
  bar.addEventListener('click', (e) => {
    const action = e.target.dataset?.action;
    if (!action) return;
    if (action === 'play') {
      if (isPlaying) { pause(); } else {
        if (synth.paused) { resume(); }
        else { speakChunk(currentIdx); if (!listenStart) listenStart = Date.now(); }
      }
    }
    if (action === 'prev') { speakChunk(Math.max(0, currentIdx - 1)); }
    if (action === 'next') { speakChunk(Math.min(chunks.length - 1, currentIdx + 1)); }
    if (action === 'close') { stop(); }
  });

  speedSelect.addEventListener('change', () => {
    rate = parseFloat(speedSelect.value);
    if (isPlaying) { speakChunk(currentIdx); }
  });

  // Pause on tab switch
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) pause();
  });

  // Stop on page unload
  window.addEventListener('beforeunload', () => { synth.cancel(); });
}
