/**
 * Section Navigator
 * Floating left-side progress indicator for lesson pages.
 * Shows dots for each <h2> section, highlights the current one,
 * and lets you click to jump between sections.
 * Uses platform-config for accent color.
 */

import { detectPlatform, PLATFORM_CONFIG } from './platform-config.js';

function buildNavStyles(accentColor) {
  return `
  #section-nav {
    position: fixed;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    pointer-events: auto;
  }

  #section-nav .section-nav-track {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  #section-nav .section-nav-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background: #222;
    z-index: 0;
  }

  #section-nav .section-nav-dot {
    position: relative;
    z-index: 1;
    width: 8px;
    height: 8px;
    background: #333;
    border-radius: 50%;
    border: none;
    padding: 0;
    margin: 8px 0;
    cursor: pointer;
    transition: background 0.25s ease, width 0.25s ease, height 0.25s ease;
    display: block;
  }

  #section-nav .section-nav-dot:hover {
    background: #555;
  }

  #section-nav .section-nav-dot.active {
    width: 10px;
    height: 10px;
    background: ${accentColor};
  }

  #section-nav .section-nav-dot-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #section-nav .section-nav-tooltip {
    position: absolute;
    left: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%);
    background: #1a1a1a;
    border: 1px solid #333;
    padding: 4px 10px;
    font-size: 11px;
    color: #ccc;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s ease;
    font-family: -apple-system, system-ui, sans-serif;
  }

  #section-nav .section-nav-dot-wrapper:hover .section-nav-tooltip {
    opacity: 1;
  }

  @media (max-width: 900px) {
    #section-nav {
      display: none;
    }
  }
`;
}

/**
 * Initialize the section navigator.
 * Finds all <h2> elements inside .content, builds a floating dot nav,
 * and uses IntersectionObserver to highlight the active section.
 */
export function initSectionNav() {
  const contentEl = document.querySelector('.content');
  if (!contentEl) return;

  const headings = Array.from(contentEl.querySelectorAll('h2'));
  if (headings.length === 0) return;

  // Ensure each heading has an id for scroll targeting
  headings.forEach((h, i) => {
    if (!h.id) {
      h.id = 'section-' + i;
    }
  });

  // Get accent color from platform config
  const platform = detectPlatform();
  const config = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.d3;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = buildNavStyles(config.color);
  document.head.appendChild(style);

  // Build nav DOM
  const nav = document.createElement('nav');
  nav.id = 'section-nav';
  nav.setAttribute('aria-label', 'Section navigation');

  const track = document.createElement('div');
  track.className = 'section-nav-track';

  const line = document.createElement('div');
  line.className = 'section-nav-line';
  track.appendChild(line);

  const dots = [];

  headings.forEach((heading, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'section-nav-dot-wrapper';

    const dot = document.createElement('button');
    dot.className = 'section-nav-dot';
    dot.setAttribute('aria-label', heading.textContent.trim());
    dot.addEventListener('click', () => {
      heading.scrollIntoView({ behavior: 'smooth' });
    });

    const tooltip = document.createElement('span');
    tooltip.className = 'section-nav-tooltip';
    tooltip.textContent = heading.textContent.trim();

    wrapper.appendChild(dot);
    wrapper.appendChild(tooltip);
    track.appendChild(wrapper);
    dots.push(dot);
  });

  nav.appendChild(track);
  document.body.appendChild(nav);

  // Track active section with IntersectionObserver
  let activeIndex = 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = headings.indexOf(entry.target);
          if (index !== -1) {
            activeIndex = index;
            updateActiveDot(index);
          }
        }
      });
    },
    {
      // Trigger when a heading crosses into the top 30% of the viewport
      rootMargin: '0px 0px -70% 0px',
      threshold: 0,
    }
  );

  headings.forEach((heading) => observer.observe(heading));

  function updateActiveDot(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Set initial active dot
  updateActiveDot(0);
}
