/**
 * Podcast Player - Supplemental audio companion for lessons.
 * Plays pre-generated MP3 podcast episodes (e.g. from NotebookLM).
 * Files expected at /audio/{track}/{lesson-slug}.mp3
 */

const PODCAST_STYLES = `
  #podcast-btn {
    position: fixed; bottom: 20px; left: 50%; transform: translateX(calc(-50% + 110px));
    z-index: 9001; background: #1a1a1a; color: #ccc; border: 1px solid #333;
    padding: 8px 20px; border-radius: 20px; cursor: pointer;
    font-size: 14px; font-family: -apple-system, system-ui, sans-serif;
    display: none; align-items: center; gap: 6px;
    transition: opacity 0.2s, transform 0.3s;
    box-shadow: 0 4px 16px #0006;
  }
  #podcast-btn:hover { background: #222; color: #fff; }
  #podcast-btn.solo { transform: translateX(-50%); }

  #podcast-bar {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 9002;
    background: #1a1a1a; border-top: 1px solid #333;
    padding: 10px 16px; display: none; flex-direction: column; gap: 8px;
    font-family: -apple-system, system-ui, sans-serif;
    transform: translateY(100%); transition: transform 0.3s ease;
    box-shadow: 0 -4px 20px #0006;
  }
  #podcast-bar.visible { display: flex; transform: translateY(0); }

  #podcast-bar .podcast-top {
    display: flex; align-items: center; gap: 12px;
  }
  #podcast-bar button {
    background: none; border: 1px solid #444; color: #ccc; cursor: pointer;
    border-radius: 4px; padding: 4px 10px; font-size: 13px;
    font-family: inherit; transition: background 0.15s;
    flex-shrink: 0;
  }
  #podcast-bar button:hover { background: #333; color: #fff; }
  #podcast-bar button.play-btn {
    background: #818cf8; color: #000; border-color: #818cf8;
    font-size: 15px; padding: 4px 12px; min-width: 36px;
  }
  #podcast-bar button.play-btn:hover { background: #a5b4fc; }

  #podcast-bar .podcast-title {
    color: #818cf8; font-size: 12px; font-weight: 600;
    letter-spacing: 0.03em; text-transform: uppercase; flex-shrink: 0;
  }
  #podcast-bar .podcast-label {
    flex: 1; color: #aaa; font-size: 13px; overflow: hidden;
    text-overflow: ellipsis; white-space: nowrap; min-width: 0;
  }
  #podcast-bar .podcast-time {
    color: #666; font-size: 12px; font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }
  #podcast-bar select {
    background: #111; color: #ccc; border: 1px solid #444;
    border-radius: 4px; padding: 3px 6px; font-size: 12px;
    font-family: inherit; cursor: pointer; flex-shrink: 0;
  }

  #podcast-bar .podcast-progress {
    display: flex; align-items: center; gap: 10px;
  }
  #podcast-bar input[type="range"] {
    flex: 1; height: 4px; -webkit-appearance: none; appearance: none;
    background: #333; border-radius: 2px; outline: none; cursor: pointer;
  }
  #podcast-bar input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; width: 14px; height: 14px;
    background: #818cf8; border-radius: 50%; cursor: pointer;
    border: none;
  }
  #podcast-bar input[type="range"]::-moz-range-thumb {
    width: 14px; height: 14px; background: #818cf8;
    border-radius: 50%; cursor: pointer; border: none;
  }
`;

function getLessonAudioPath() {
  const path = window.location.pathname;
  const match = path.match(/\/(d3|django|sql)\/lessons\/([^/]+)/);
  if (!match) return null;
  const [, track, slug] = match;
  return `/audio/${track}/${slug}.mp3`;
}

function formatTime(sec) {
  if (!sec || !isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function initPodcastPlayer() {
  if (!window.location.pathname.includes('/lessons/')) return;

  const audioSrc = getLessonAudioPath();
  if (!audioSrc) return;

  // Probe whether the MP3 exists
  const audio = new Audio();
  audio.preload = 'metadata';

  const style = document.createElement('style');
  style.textContent = PODCAST_STYLES;
  document.head.appendChild(style);

  // Floating button
  const btn = document.createElement('button');
  btn.id = 'podcast-btn';
  btn.innerHTML = '\uD83C\uDFA7 Podcast';
  document.body.appendChild(btn);

  // Player bar
  const bar = document.createElement('div');
  bar.id = 'podcast-bar';
  bar.innerHTML = `
    <div class="podcast-top">
      <button class="play-btn" data-action="play">\u25B6</button>
      <span class="podcast-title">Podcast</span>
      <span class="podcast-label">Loading...</span>
      <select data-action="speed">
        <option value="0.75">0.75x</option>
        <option value="1" selected>1x</option>
        <option value="1.25">1.25x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select>
      <button data-action="back30">\u23EA 30s</button>
      <button data-action="fwd30">30s \u23E9</button>
      <button data-action="close">\u2715</button>
    </div>
    <div class="podcast-progress">
      <span class="podcast-time" data-role="current">0:00</span>
      <input type="range" min="0" max="100" value="0" step="0.1" data-role="scrubber">
      <span class="podcast-time" data-role="duration">0:00</span>
    </div>
  `;
  document.body.appendChild(bar);

  const playBtn = bar.querySelector('[data-action="play"]');
  const label = bar.querySelector('.podcast-label');
  const speedSelect = bar.querySelector('[data-action="speed"]');
  const scrubber = bar.querySelector('[data-role="scrubber"]');
  const currentTime = bar.querySelector('[data-role="current"]');
  const durationEl = bar.querySelector('[data-role="duration"]');

  let xpAwarded = false;

  // Try loading the audio - only show button if file exists
  audio.src = audioSrc;
  audio.addEventListener('loadedmetadata', () => {
    btn.style.display = 'flex';
    durationEl.textContent = formatTime(audio.duration);

    // Extract lesson name from page title or heading
    const h1 = document.querySelector('.header h1');
    const title = h1 ? h1.textContent.trim() : document.title;
    label.textContent = title;

    // If audio-reader button exists, reposition both
    const readerBtn = document.getElementById('audio-reader-btn');
    if (readerBtn) {
      readerBtn.style.transform = 'translateX(calc(-50% - 70px))';
      btn.classList.remove('solo');
    } else {
      btn.classList.add('solo');
    }
  });

  audio.addEventListener('error', () => {
    // MP3 doesn't exist for this lesson — hide everything
    btn.style.display = 'none';
  });

  // Playback state
  function showBar() {
    btn.style.display = 'none';
    const readerBtn = document.getElementById('audio-reader-btn');
    if (readerBtn) readerBtn.style.display = 'none';
    bar.style.display = 'flex';
    requestAnimationFrame(() => bar.classList.add('visible'));
  }

  function hideBar() {
    bar.classList.remove('visible');
    setTimeout(() => {
      bar.style.display = 'none';
      btn.style.display = 'flex';
      const readerBtn = document.getElementById('audio-reader-btn');
      if (readerBtn) readerBtn.style.display = 'flex';
    }, 300);
  }

  function updatePlayButton() {
    playBtn.textContent = audio.paused ? '\u25B6' : '\u23F8';
  }

  // XP tracking
  function checkXP() {
    if (xpAwarded) return;
    if (audio.currentTime >= 120 && typeof window.awardXP === 'function') {
      window.awardXP(10, 'Podcast listened');
      xpAwarded = true;
    }
  }

  // Button click - start
  btn.addEventListener('click', () => {
    showBar();
    audio.play();
    updatePlayButton();
  });

  // Bar controls
  bar.addEventListener('click', (e) => {
    const action = e.target.dataset?.action;
    if (!action) return;

    if (action === 'play') {
      if (audio.paused) { audio.play(); } else { audio.pause(); }
      updatePlayButton();
    }
    if (action === 'back30') { audio.currentTime = Math.max(0, audio.currentTime - 30); }
    if (action === 'fwd30') { audio.currentTime = Math.min(audio.duration, audio.currentTime + 30); }
    if (action === 'close') {
      audio.pause();
      updatePlayButton();
      hideBar();
    }
  });

  speedSelect.addEventListener('change', () => {
    audio.playbackRate = parseFloat(speedSelect.value);
  });

  // Progress tracking
  audio.addEventListener('timeupdate', () => {
    if (!scrubber.__dragging) {
      scrubber.value = (audio.currentTime / audio.duration) * 100 || 0;
      currentTime.textContent = formatTime(audio.currentTime);
    }
    checkXP();
  });

  audio.addEventListener('ended', () => {
    updatePlayButton();
    checkXP();
  });

  // Scrubber
  scrubber.addEventListener('mousedown', () => { scrubber.__dragging = true; });
  scrubber.addEventListener('touchstart', () => { scrubber.__dragging = true; }, { passive: true });
  scrubber.addEventListener('input', () => {
    currentTime.textContent = formatTime((scrubber.value / 100) * audio.duration);
  });
  const endDrag = () => {
    if (scrubber.__dragging) {
      scrubber.__dragging = false;
      audio.currentTime = (scrubber.value / 100) * audio.duration;
    }
  };
  scrubber.addEventListener('mouseup', endDrag);
  scrubber.addEventListener('touchend', endDrag);
  scrubber.addEventListener('change', endDrag);

  // Save/restore position in localStorage
  const storageKey = `podcast-pos:${audioSrc}`;
  audio.addEventListener('timeupdate', () => {
    if (audio.currentTime > 5) {
      localStorage.setItem(storageKey, audio.currentTime.toString());
    }
  });
  audio.addEventListener('loadedmetadata', () => {
    const saved = parseFloat(localStorage.getItem(storageKey));
    if (saved && saved < audio.duration - 10) {
      audio.currentTime = saved;
    }
  });

  // Pause on tab switch
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !audio.paused) {
      audio.pause();
      updatePlayButton();
    }
  });
}
