/**
 * player.js — Podcast player with Apple Music-style transcript follow-along.
 * Expects:
 *   - A global TRANSCRIPT array of { time, text } objects on the page
 *   - The episode page HTML structure with ids: episode-audio, play-pause,
 *     skip-back, skip-forward, current-time, duration, progress-fill,
 *     scrubber, speed-btn, transcript, auto-scroll-toggle
 */

(function () {
  'use strict';

  // ─── Elements ───
  const audio       = document.getElementById('episode-audio');
  const playPause   = document.getElementById('play-pause');
  const skipBack    = document.getElementById('skip-back');
  const skipForward = document.getElementById('skip-forward');
  const currentTime = document.getElementById('current-time');
  const durationEl  = document.getElementById('duration');
  const progressFill = document.getElementById('progress-fill');
  const scrubber    = document.getElementById('scrubber');
  const speedBtn    = document.getElementById('speed-btn');
  const transcriptEl = document.getElementById('transcript');
  const autoScrollBtn = document.getElementById('auto-scroll-toggle');
  const playerContainer = document.querySelector('.player-container');

  if (!audio || typeof TRANSCRIPT === 'undefined') return;

  // ─── State ───
  const SPEEDS = [0.75, 1, 1.25, 1.5, 2];
  let speedIndex = 1;
  let autoScroll = true;
  let isDragging = false;
  let activeLineIndex = -1;

  // ─── Helpers ───
  function formatTime(sec) {
    if (!sec || !isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + s.toString().padStart(2, '0');
  }

  // ─── Build Transcript DOM ───
  function buildTranscript() {
    transcriptEl.innerHTML = '';
    TRANSCRIPT.forEach(function (seg, i) {
      const line = document.createElement('div');
      line.className = 'transcript-line';
      line.dataset.index = i;
      line.innerHTML =
        '<span class="timestamp">' + formatTime(seg.time) + '</span>' +
        '<span class="text">' + seg.text + '</span>';
      line.addEventListener('click', function () {
        audio.currentTime = seg.time;
        if (audio.paused) {
          audio.play();
          updatePlayIcon(false);
        }
      });
      transcriptEl.appendChild(line);
    });
  }

  // ─── Play/Pause Icon ───
  function updatePlayIcon(paused) {
    var iconPlay  = playPause.querySelector('.icon-play');
    var iconPause = playPause.querySelector('.icon-pause');
    if (paused) {
      iconPlay.style.display = '';
      iconPause.style.display = 'none';
      playPause.setAttribute('aria-label', 'Play');
    } else {
      iconPlay.style.display = 'none';
      iconPause.style.display = '';
      playPause.setAttribute('aria-label', 'Pause');
    }
  }

  // ─── Transcript Sync ───
  function syncTranscript(time) {
    var newIndex = -1;
    for (var i = TRANSCRIPT.length - 1; i >= 0; i--) {
      if (time >= TRANSCRIPT[i].time) {
        newIndex = i;
        break;
      }
    }

    if (newIndex === activeLineIndex) return;

    var lines = transcriptEl.querySelectorAll('.transcript-line');

    // Remove previous active
    if (activeLineIndex >= 0 && activeLineIndex < lines.length) {
      lines[activeLineIndex].classList.remove('active');
    }

    activeLineIndex = newIndex;

    if (activeLineIndex >= 0 && activeLineIndex < lines.length) {
      var activeLine = lines[activeLineIndex];
      activeLine.classList.remove('active');
      // Force reflow for transition
      void activeLine.offsetWidth;
      activeLine.classList.add('active');

      // Auto-scroll: center the active line in the transcript container
      if (autoScroll) {
        var containerRect = transcriptEl.getBoundingClientRect();
        var lineRect = activeLine.getBoundingClientRect();
        var offset = lineRect.top - containerRect.top - (containerRect.height / 2) + (lineRect.height / 2);
        transcriptEl.scrollTo({
          top: transcriptEl.scrollTop + offset,
          behavior: 'smooth'
        });
      }
    }
  }

  // ─── Audio Event: loadedmetadata ───
  audio.addEventListener('loadedmetadata', function () {
    durationEl.textContent = formatTime(audio.duration);

    // Restore saved position
    var storageKey = 'pod-pos:' + window.location.pathname;
    var saved = parseFloat(localStorage.getItem(storageKey));
    if (saved && saved < audio.duration - 10) {
      audio.currentTime = saved;
    }
  });

  // ─── Audio Event: error (no audio file) ───
  audio.addEventListener('error', function () {
    playerContainer.classList.add('no-audio');
    var msg = document.createElement('p');
    msg.className = 'no-audio-msg';
    msg.textContent = 'Audio file not available yet. Follow along with the transcript below.';
    playerContainer.appendChild(msg);
  });

  // ─── Audio Event: timeupdate ───
  audio.addEventListener('timeupdate', function () {
    if (!isDragging) {
      var pct = (audio.currentTime / audio.duration) * 100 || 0;
      progressFill.style.width = pct + '%';
      scrubber.value = Math.round((audio.currentTime / audio.duration) * 1000) || 0;
      currentTime.textContent = formatTime(audio.currentTime);
    }
    syncTranscript(audio.currentTime);

    // Save position
    if (audio.currentTime > 5) {
      var storageKey = 'pod-pos:' + window.location.pathname;
      localStorage.setItem(storageKey, audio.currentTime.toString());
    }
  });

  audio.addEventListener('ended', function () {
    updatePlayIcon(true);
    transcriptEl.classList.remove('playing');
  });

  audio.addEventListener('play', function () {
    transcriptEl.classList.add('playing');
  });

  audio.addEventListener('pause', function () {
    transcriptEl.classList.remove('playing');
  });

  // ─── Play / Pause ───
  playPause.addEventListener('click', function () {
    if (audio.paused) {
      audio.play();
      updatePlayIcon(false);
    } else {
      audio.pause();
      updatePlayIcon(true);
    }
  });

  // ─── Skip ───
  skipBack.addEventListener('click', function () {
    audio.currentTime = Math.max(0, audio.currentTime - 15);
  });
  skipForward.addEventListener('click', function () {
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 15);
  });

  // ─── Speed ───
  speedBtn.addEventListener('click', function () {
    speedIndex = (speedIndex + 1) % SPEEDS.length;
    audio.playbackRate = SPEEDS[speedIndex];
    speedBtn.textContent = SPEEDS[speedIndex] + 'x';
  });

  // ─── Scrubber ───
  scrubber.addEventListener('mousedown', function () { isDragging = true; });
  scrubber.addEventListener('touchstart', function () { isDragging = true; }, { passive: true });

  scrubber.addEventListener('input', function () {
    var pct = scrubber.value / 1000;
    progressFill.style.width = (pct * 100) + '%';
    currentTime.textContent = formatTime(pct * (audio.duration || 0));
  });

  function endDrag() {
    if (isDragging) {
      isDragging = false;
      audio.currentTime = (scrubber.value / 1000) * (audio.duration || 0);
    }
  }
  scrubber.addEventListener('mouseup', endDrag);
  scrubber.addEventListener('touchend', endDrag);
  scrubber.addEventListener('change', endDrag);

  // ─── Auto-scroll Toggle ───
  autoScrollBtn.addEventListener('click', function () {
    autoScroll = !autoScroll;
    autoScrollBtn.classList.toggle('active', autoScroll);
  });

  // Detect manual scrolling to disable auto-scroll temporarily
  var scrollTimeout;
  transcriptEl.addEventListener('scroll', function () {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    // If user scrolls manually while auto-scroll is on, we keep it on
    // but let the user scroll freely for a moment
  }, { passive: true });

  // ─── Keyboard Shortcuts ───
  document.addEventListener('keydown', function (e) {
    // Don't capture when user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        playPause.click();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        audio.currentTime = Math.max(0, audio.currentTime - 15);
        break;
      case 'ArrowRight':
        e.preventDefault();
        audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 15);
        break;
      case 'KeyS':
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          speedBtn.click();
        }
        break;
    }
  });

  // ─── Init ───
  buildTranscript();
})();
