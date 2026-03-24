/**
 * "Explain this" buttons for code blocks
 * Adds a small button to each <pre><code> block in lesson content
 * that sends the code to the tutor chat for a line-by-line explanation.
 * Uses platform-config for accent color.
 */

import { detectPlatform, PLATFORM_CONFIG } from './platform-config.js';

function buildExplainStyles(accentColor) {
  return `
  .content pre {
    position: relative;
  }

  .explain-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    background: #222;
    border: 1px solid #333;
    color: #888;
    font-size: 10px;
    padding: 3px 8px;
    border-radius: 4px;
    cursor: pointer;
    z-index: 1;
    transition: border-color 0.2s, color 0.2s;
    font-family: var(--sans);
    line-height: 1.4;
  }

  .explain-btn:hover {
    border-color: ${accentColor};
    color: ${accentColor};
  }
`;
}

function isInsideExcludedSection(el) {
  return el.closest('.quiz') !== null || el.closest('.exercise') !== null;
}

export function initExplainButtons() {
  const platform = detectPlatform();
  const config = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.d3;

  const style = document.createElement('style');
  style.textContent = buildExplainStyles(config.color);
  document.head.appendChild(style);

  const codeBlocks = document.querySelectorAll('.content pre code');

  codeBlocks.forEach((codeEl) => {
    const preEl = codeEl.parentElement;

    // Skip code blocks inside .quiz or .exercise sections
    if (isInsideExcludedSection(preEl)) return;

    const btn = document.createElement('button');
    btn.className = 'explain-btn';
    btn.textContent = 'Explain this ?';
    btn.type = 'button';

    btn.addEventListener('click', () => {
      const code = codeEl.textContent;

      // Open the tutor panel if it isn't already open
      const toggle = document.getElementById('tutor-toggle');
      const panel = document.getElementById('tutor-panel');
      if (toggle && panel && !panel.classList.contains('open')) {
        toggle.click();
      }

      // Send the explanation request through the tutor
      const message =
        'Explain this code to me line by line in plain English:\n\n```\n' +
        code +
        '\n```';

      if (typeof window.__tutorAsk === 'function') {
        window.__tutorAsk(message);
      }
    });

    preEl.appendChild(btn);
  });
}
