/**
 * Interactive SVG Playground
 * Reusable widget with sliders/inputs that update an SVG preview live.
 * Designed for visual learners -- tweak values, see the result instantly.
 * Uses platform-config for accent color on slider thumbs and value displays.
 */

import * as d3 from 'd3';
import { detectPlatform, PLATFORM_CONFIG } from './platform-config.js';

function buildPlaygroundStyles(accentColor) {
  return `
  .pg-container {
    background: #141414;
    border: 1px solid #222;
    border-radius: 8px;
    font-family: -apple-system, system-ui, sans-serif;
    overflow: hidden;
  }

  .pg-layout {
    display: flex;
    gap: 0;
  }

  /* Stack vertically on narrow screens */
  @media (max-width: 600px) {
    .pg-layout {
      flex-direction: column;
    }
    .pg-controls {
      border-right: none !important;
      border-bottom: 1px solid #222;
    }
  }

  .pg-controls {
    flex: 0 0 200px;
    padding: 14px 16px;
    border-right: 1px solid #222;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow-y: auto;
    max-height: 400px;
  }

  .pg-control-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .pg-control-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .pg-control-label {
    color: #888;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .pg-control-value {
    color: ${accentColor};
    font-size: 12px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    min-width: 32px;
    text-align: right;
  }

  .pg-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    background: #333;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }

  .pg-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${accentColor};
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 4px #0004;
    transition: transform 0.1s;
  }
  .pg-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }

  .pg-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${accentColor};
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 4px #0004;
  }

  .pg-slider::-moz-range-track {
    height: 4px;
    background: #333;
    border-radius: 2px;
    border: none;
  }

  .pg-preview {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
  }

  .pg-preview svg {
    display: block;
    background: #1a1a1a;
    border-radius: 4px;
    max-width: 100%;
    height: auto;
  }
`;
}

let stylesInjected = false;
let injectedColor = null;

function injectStyles(accentColor) {
  if (stylesInjected && injectedColor === accentColor) return;
  stylesInjected = true;
  injectedColor = accentColor;
  const style = document.createElement('style');
  style.textContent = buildPlaygroundStyles(accentColor);
  document.head.appendChild(style);
}

/**
 * Creates an interactive SVG playground inside a container element.
 *
 * @param {string} containerId - The id of the container element to mount into.
 * @param {object} config
 * @param {number} config.width - SVG viewBox width (default 400)
 * @param {number} config.height - SVG viewBox height (default 200)
 * @param {Array}  config.controls - Array of control definitions
 * @param {string} config.controls[].name - Key name used in the values object
 * @param {number} config.controls[].min - Slider minimum
 * @param {number} config.controls[].max - Slider maximum
 * @param {number} config.controls[].value - Initial value
 * @param {number} [config.controls[].step] - Slider step (default 1)
 * @param {string} config.controls[].label - Display label
 * @param {function} config.render - Called as render(svgSelection, values) on every change
 * @returns {{ update: (newValues: object) => void }}
 */
export function createPlayground(containerId, config) {
  const platform = detectPlatform();
  const platformConfig = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.d3;
  injectStyles(platformConfig.color);

  const {
    width = 400,
    height = 200,
    controls = [],
    render,
  } = config;

  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Playground: no element found with id "${containerId}"`);
  }

  // --- Current values ---
  const values = {};
  controls.forEach(c => {
    values[c.name] = c.value;
  });

  // --- Build DOM ---
  container.innerHTML = '';
  container.classList.add('pg-container');

  const layout = document.createElement('div');
  layout.className = 'pg-layout';

  // Controls panel
  const controlsPanel = document.createElement('div');
  controlsPanel.className = 'pg-controls';

  const sliderEls = {};
  const valueEls = {};

  controls.forEach(ctrl => {
    const group = document.createElement('div');
    group.className = 'pg-control-group';

    const header = document.createElement('div');
    header.className = 'pg-control-header';

    const label = document.createElement('span');
    label.className = 'pg-control-label';
    label.textContent = ctrl.label || ctrl.name;

    const valueDisplay = document.createElement('span');
    valueDisplay.className = 'pg-control-value';
    valueDisplay.textContent = ctrl.value;
    valueEls[ctrl.name] = valueDisplay;

    header.appendChild(label);
    header.appendChild(valueDisplay);

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.className = 'pg-slider';
    slider.min = ctrl.min;
    slider.max = ctrl.max;
    slider.step = ctrl.step != null ? ctrl.step : 1;
    slider.value = ctrl.value;
    sliderEls[ctrl.name] = slider;

    slider.addEventListener('input', () => {
      const v = Number(slider.value);
      values[ctrl.name] = v;
      valueDisplay.textContent = v;
      callRender();
    });

    group.appendChild(header);
    group.appendChild(slider);
    controlsPanel.appendChild(group);
  });

  // SVG preview
  const preview = document.createElement('div');
  preview.className = 'pg-preview';

  const svgNS = 'http://www.w3.org/2000/svg';
  const svgEl = document.createElementNS(svgNS, 'svg');
  svgEl.setAttribute('width', '100%');
  svgEl.setAttribute('viewBox', `0 0 ${width} ${height}`);
  preview.appendChild(svgEl);

  // D3 selection wrapping the SVG
  const svgSelection = d3.select(svgEl);

  // Assemble layout
  layout.appendChild(controlsPanel);
  layout.appendChild(preview);
  container.appendChild(layout);

  // --- Render helper ---
  function callRender() {
    if (typeof render === 'function') {
      render(svgSelection, { ...values });
    }
  }

  // Initial render
  callRender();

  // --- Public API ---
  return {
    /**
     * Programmatically update control values and re-render.
     * @param {object} newValues - Partial map of control name to new value.
     */
    update(newValues) {
      for (const [name, val] of Object.entries(newValues)) {
        if (!(name in values)) continue;
        const numVal = Number(val);
        values[name] = numVal;
        if (sliderEls[name]) sliderEls[name].value = numVal;
        if (valueEls[name]) valueEls[name].textContent = numVal;
      }
      callRender();
    },
  };
}
