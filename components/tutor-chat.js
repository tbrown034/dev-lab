/**
 * Unified Tutor Chat Widget
 * Floating chat button -> expandable panel with AI tutor
 * Auto-detects platform (D3, Django, SQL, JS/TS, React, CSS, AI/LLM) and adapts colors,
 * lesson context, suggestions, and features accordingly.
 * D3 platform includes runnable code previews.
 */

import { detectPlatform, PLATFORM_CONFIG } from './platform-config.js';

function buildChatStyles(config) {
  const c = config.color;
  const cHover = config.colorHover;
  const txtColor = config.userTextColor;

  return `
  #tutor-toggle {
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    width: 56px; height: 56px; border-radius: 50%;
    background: ${c}; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: filter 0.2s;
    font-size: 24px; color: ${txtColor};
  }
  #tutor-toggle:hover { filter: brightness(1.1); }
  #tutor-toggle.open { background: #333; }

  #tutor-panel {
    position: fixed; bottom: 90px; right: 24px; z-index: 9998;
    width: 400px; max-height: 550px; border-radius: 8px;
    background: #141414; border: 1px solid #333;
    display: none; flex-direction: column;
    font-family: var(--sans);
    overflow: hidden;
  }
  #tutor-panel.open { display: flex; }
  @media (max-width: 500px) {
    #tutor-panel { width: calc(100vw - 32px); right: 16px; bottom: 84px; max-height: 70vh; }
  }

  #tutor-header {
    padding: 12px 16px; background: #1a1a1a; border-bottom: 1px solid #222;
    display: flex; justify-content: space-between; align-items: center;
    flex-shrink: 0;
  }
  #tutor-header h3 { color: ${c}; font-size: 14px; margin: 0; font-weight: 600; }
  #tutor-header .lesson-tag {
    font-size: 11px; color: #888; background: #0a0a0a;
    padding: 2px 8px; border-radius: 6px;
  }

  #tutor-messages {
    flex: 1; overflow-y: auto; padding: 12px 16px;
    display: flex; flex-direction: column; gap: 10px;
    min-height: 200px;
  }
  #tutor-messages::-webkit-scrollbar { width: 4px; }
  #tutor-messages::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }

  .tutor-msg { max-width: 90%; padding: 10px 14px; border-radius: 8px; font-size: 13px; line-height: 1.6; }
  .tutor-msg.user { align-self: flex-end; background: ${c}; color: ${txtColor}; border-bottom-right-radius: 4px; }
  .tutor-msg.assistant { align-self: flex-start; background: #1a1a1a; color: #ccc; border: 1px solid #222; border-bottom-left-radius: 4px; }
  .tutor-msg.assistant code { background: #2a2a2a; padding: 2px 6px; border-radius: 4px; font-size: 12px; color: ${c}; border: 1px solid #3a3a3a; }
  .tutor-msg.assistant pre {
    background: #0a0a0a; border: 1px solid #222; border-radius: 6px;
    padding: 10px; margin: 8px 0 4px; overflow-x: auto; font-size: 12px;
  }
  .tutor-msg.assistant pre code { background: none; padding: 0; color: #e5e5e5; }
  .tutor-msg.system { align-self: center; background: none; color: #666; font-size: 11px; font-style: italic; padding: 4px; }

  .tutor-preview-container {
    margin: 8px 0 4px; background: #111; border: 1px solid #333;
    border-radius: 6px; padding: 0; overflow: hidden; min-height: 36px;
  }
  .tutor-preview-container .tutor-preview-status {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 12px; color: #666; font-size: 11px;
    background: #1a1a1a; border-bottom: 1px solid #282828;
  }
  .tutor-preview-container .tutor-preview-status .dot {
    width: 6px; height: 6px; border-radius: 50%; background: #444;
  }
  .tutor-preview-container.has-output .tutor-preview-status .dot { background: #4ade80; }
  .tutor-preview-container.has-output .tutor-preview-status { color: #4ade80; }
  .tutor-preview-container .tutor-preview-body { padding: 8px; }
  .tutor-preview-container svg { display: block; border-radius: 4px; max-width: 100%; }
  .tutor-preview-error { color: #f472b6; font-size: 11px; padding: 8px 12px; }
  .tutor-run-btn {
    display: inline-block; margin-top: 4px; padding: 4px 12px;
    background: ${c}; color: ${txtColor}; border: none; border-radius: 4px;
    font-size: 11px; cursor: pointer; font-weight: 600;
  }

  #tutor-input-area {
    padding: 12px; border-top: 1px solid #222; display: flex; gap: 8px;
    flex-shrink: 0; background: #141414;
  }
  #tutor-input {
    flex: 1; background: #0a0a0a; border: 1px solid #333; border-radius: 8px;
    padding: 10px 14px; color: #e5e5e5; font-size: 13px; resize: none;
    font-family: inherit; outline: none; min-height: 40px; max-height: 100px;
  }
  #tutor-input:focus { border-color: ${c}; }
  #tutor-input::placeholder { color: #555; }
  #tutor-send {
    background: ${c}; border: none; border-radius: 8px;
    padding: 10px 16px; cursor: pointer; color: ${txtColor}; font-weight: 600;
    font-size: 14px; align-self: flex-end; flex-shrink: 0;
    transition: background 0.2s;
  }
  #tutor-send:hover { background: ${cHover}; }
  #tutor-send:disabled { background: #333; color: #666; cursor: not-allowed; }

  .tutor-loading { display: flex; gap: 4px; padding: 8px 14px; }
  .tutor-loading span {
    width: 6px; height: 6px; background: ${c}; border-radius: 50%;
    animation: tutor-bounce 1.4s ease-in-out infinite;
  }
  .tutor-loading span:nth-child(2) { animation-delay: 0.2s; }
  .tutor-loading span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes tutor-bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

  .tutor-suggestions {
    display: flex; flex-wrap: wrap; gap: 6px; padding: 0 16px 10px;
    flex-shrink: 0;
  }
  .tutor-suggestions button {
    background: #1a1a1a; border: 1px solid #333; border-radius: 6px;
    padding: 5px 12px; color: #888; font-size: 11px; cursor: pointer;
    transition: all 0.2s; white-space: nowrap;
  }
  .tutor-suggestions button:hover { border-color: ${c}; color: ${c}; }

  .tutor-action-chips {
    display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 12px 4px;
    flex-shrink: 0; border-top: 1px solid #1a1a1a;
  }
  .tutor-action-chips button {
    background: #1a1a1a; border: 1px solid #333; border-radius: 6px;
    padding: 5px 12px; color: #aaa; font-size: 11px; cursor: pointer;
    transition: all 0.2s; white-space: nowrap; display: flex;
    align-items: center; gap: 4px;
  }
  .tutor-action-chips button:hover { border-color: ${c}; color: ${c}; }
  .tutor-action-chips button.chip-explain {
    border-color: ${c}; color: ${c}; font-weight: 600;
  }
  .tutor-action-chips button.chip-explain:hover { background: ${c}; color: ${txtColor}; }
  .tutor-action-chips .chip-icon { font-size: 13px; line-height: 1; }
`;
}

// ── Lesson context maps (one per platform) ──────────────────────

const D3_LESSON_MAP = {
  '01-fundamentals': 'Lesson 01: Pure SVG - HTML tags for shapes, coordinate system, rect/circle/line/text/path/g elements',
  '02-selections-data': 'Lesson 02: Vanilla JS to D3 Selections - DOM manipulation, d3.select, d3.selectAll, method chaining',
  '03-scales-axes': 'Lesson 03: D3 Selections Deep Dive - attr, style, append, remove, classed, each',
  '04-shapes-bindings': 'Lesson 04: Data Binding - .data().join(), accessor functions, empty selectAll, __data__',
  '05-maps-geo': 'Lesson 05: Scales - scaleLinear, scaleBand, scaleTime, scaleSequential, domain, range',
  '06-transitions-interactivity': 'Lesson 06: Axes & Margins Convention - axisBottom, axisLeft, .call(), tickFormat, margins',
  '07-lines-areas': 'Lesson 07: Enter/Update/Exit - data joins, key functions, .join() callbacks, general update pattern',
  '08-arcs-pies': 'Lesson 08: Lines & Areas - d3.line(), d3.area(), .datum(), curve types, stacked areas',
  '09-maps-geo': 'Lesson 09: Arcs & Pies - d3.arc(), d3.pie(), donut charts, centroid labels',
  '10-interactivity': 'Lesson 10: Maps & Geography - GeoJSON, TopoJSON, projections, d3.geoPath(), choropleth',
  '11-d3-react': 'Lesson 11: Interactivity & Polish - events, tooltips, transitions, responsive viewBox, accessibility',
  '12-capstone': 'Lesson 12: Capstone Dashboard - combining all concepts into a complete project',
};

const DJANGO_LESSON_MAP = {
  '01-python-fundamentals': 'Lesson 01: Python Fundamentals - variables, types, functions, lists, dicts, classes, modules, control flow. JS to Python translation.',
  '02-django-quickstart': 'Lesson 02: Django Quickstart - project setup, file structure, views, URL routing, templates, settings. Next.js to Django mapping.',
  '03-models-orm': 'Lesson 03: Models & ORM - Django models, fields, migrations, querysets, relationships. Prisma to Django ORM translation.',
  '04-views-urls': 'Lesson 04: Views & URLs Deep Dive - function views, class-based views, URL patterns, path converters. API routes to Django views.',
  '05-templates': 'Lesson 05: Templates & Static Files - Django template language, template inheritance, static files, filters, tags. JSX to Django templates.',
  '06-forms-validation': 'Lesson 06: Forms & Validation - Django forms, ModelForms, validation, CSRF, file uploads. React forms to Django forms.',
  '07-rest-api': 'Lesson 07: REST APIs with Django REST Framework - serializers, viewsets, routers, authentication. Next.js API to DRF.',
  '08-auth-permissions': 'Lesson 08: Authentication & Permissions - Django auth system, login/logout, permissions, groups. NextAuth to Django auth.',
  '09-testing': 'Lesson 09: Testing - pytest, Django test client, fixtures, factories, mocking. Jest to pytest.',
  '10-deployment': 'Lesson 10: Deployment - gunicorn, nginx, Docker, environment variables, static files in production. Vercel to Django deployment.',
  '11-advanced-patterns': 'Lesson 11: Advanced Patterns - middleware, signals, caching, celery, custom management commands.',
  '12-capstone': 'Lesson 12: Capstone Project - combining all concepts into a complete production application.',
};

const SQL_LESSON_MAP = {
  '01-sql-fundamentals': 'Lesson 01: SQL Fundamentals - CREATE TABLE, INSERT, SELECT, WHERE, ORDER BY, UPDATE, DELETE, Prisma comparisons',
  '02-select-filtering': 'Lesson 02: SELECT & Filtering Deep Dive - aliases, LIKE, ILIKE, NULL handling, COALESCE, CASE, DISTINCT, casting',
  '03-joins': 'Lesson 03: JOINs - INNER JOIN, LEFT/RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN, self joins, multiple joins',
  '04-aggregation': 'Lesson 04: Aggregation & GROUP BY - COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING, aggregate with joins',
  '05-subqueries': 'Lesson 05: Subqueries & CTEs - scalar subqueries, IN subqueries, EXISTS, correlated subqueries, WITH (CTE), recursive CTEs',
  '06-window-functions': 'Lesson 06: Window Functions - ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, OVER, PARTITION BY, running totals',
  '07-data-types-constraints': 'Lesson 07: Data Types & Constraints - VARCHAR, INTEGER, BOOLEAN, TIMESTAMP, JSON/JSONB, CHECK, UNIQUE, FOREIGN KEY',
  '08-indexes-performance': 'Lesson 08: Indexes & Performance - B-tree, hash, GIN, GiST, EXPLAIN ANALYZE, query optimization',
  '09-postgres-specific': 'Lesson 09: PostgreSQL-Specific Features - JSONB operators, arrays, generate_series, full-text search, LISTEN/NOTIFY',
  '10-database-design': 'Lesson 10: Database Design & Normalization - 1NF, 2NF, 3NF, ERD, migrations, schema design patterns',
  '11-advanced-queries': 'Lesson 11: Advanced Query Patterns - pivot tables, recursive queries, lateral joins, materialized views',
  '12-capstone': 'Lesson 12: Capstone - Real-world journalism queries, election data, census analysis, public records',
};

const JSTS_LESSON_MAP = {
  '01-engine-internals': 'Lesson 01: Engine Internals - V8 pipeline, parsing, AST, Ignition, TurboFan, hidden classes, inline caching',
  '02-types-coercion': 'Lesson 02: Types & Coercion - primitive types, abstract equality, ToString/ToNumber/ToBoolean, double equals algorithm',
  '03-closures-scope': 'Lesson 03: Closures & Scope - lexical environment, scope chain, closure memory model, IIFE, module pattern',
  '04-prototypes-classes': 'Lesson 04: Prototypes & Classes - prototype chain, __proto__, Object.create, class sugar, extends, super',
  '05-async-patterns': 'Lesson 05: Async Patterns - event loop phases, microtask queue, Promise internals, async/await, error handling',
  '06-iterators-generators': 'Lesson 06: Iterators & Generators - Symbol.iterator, generator functions, yield, async generators, lazy evaluation',
  '07-typescript-foundations': 'Lesson 07: TypeScript Foundations - type system, structural typing, type narrowing, discriminated unions, type guards',
  '08-ts-generics': 'Lesson 08: TypeScript Generics - generic functions, constraints, default types, generic classes, utility types',
  '09-ts-advanced': 'Lesson 09: Advanced TypeScript - conditional types, mapped types, template literal types, infer, branded types',
  '10-testing-patterns': 'Lesson 10: Testing Patterns - test doubles, property-based testing, snapshot testing, mocking strategies',
  '11-node-internals': 'Lesson 11: Node.js Internals - libuv, worker threads, streams, Buffer, child processes, cluster',
  '12-capstone': 'Lesson 12: Capstone - Type-safe CLI tool combining all concepts',
};

const REACT_LESSON_MAP = {
  '01-react-mental-model': 'Lesson 01: React Mental Model - UI=f(state), declarative rendering, component as pure function, virtual DOM',
  '02-fiber-reconciliation': 'Lesson 02: Fiber & Reconciliation - Fiber tree, work loop, reconciliation algorithm, diffing, keys',
  '03-hooks-deep-dive': 'Lesson 03: Hooks Deep Dive - hooks linked list, useState internals, useEffect lifecycle, custom hooks, rules of hooks',
  '04-state-management': 'Lesson 04: State Management - useReducer, Context, Zustand, Jotai, state machines, server state',
  '05-server-components': 'Lesson 05: React Server Components - RSC wire format, server/client boundary, async components, use client/server',
  '06-nextjs-app-router': 'Lesson 06: Next.js App Router - file conventions, layouts, loading, error boundaries, route groups, parallel routes',
  '07-data-fetching': 'Lesson 07: Data Fetching - server actions, fetch caching, ISR, PPR, streaming, Suspense boundaries',
  '08-performance': 'Lesson 08: Performance - React.memo, useMemo, useCallback, code splitting, lazy, Profiler, bundle analysis',
  '09-forms-validation': 'Lesson 09: Forms & Validation - controlled vs uncontrolled, useActionState, Zod validation, optimistic updates',
  '10-testing-react': 'Lesson 10: Testing React - Testing Library, component tests, integration tests, MSW, Playwright',
  '11-framework-comparison': 'Lesson 11: Framework Comparison - React vs Svelte vs Vue vs Solid, tradeoffs, when to use what',
  '12-capstone': 'Lesson 12: Capstone - Data journalism dashboard combining all concepts',
};

const CSS_LESSON_MAP = {
  '01-cascade-specificity': 'Lesson 01: Cascade & Specificity - cascade algorithm, specificity calculation, inheritance, @layer, !important',
  '02-layout-mental-models': 'Lesson 02: Layout Mental Models - normal flow, formatting contexts, BFC, containing blocks, box model',
  '03-flexbox-mastery': 'Lesson 03: Flexbox Mastery - flex container/item, main/cross axis, flex-grow/shrink/basis, alignment, wrapping',
  '04-grid-mastery': 'Lesson 04: CSS Grid Mastery - grid tracks, named areas, auto-fit/auto-fill, subgrid, grid template',
  '05-custom-properties': 'Lesson 05: Custom Properties & Theming - CSS variables, inheritance, calc(), dynamic themes, dark mode',
  '06-modern-css': 'Lesson 06: Modern CSS - @container, @scope, :has(), nesting, view transitions, anchor positioning',
  '07-animation-motion': 'Lesson 07: Animation & Motion - transitions, keyframes, scroll-driven animations, prefers-reduced-motion',
  '08-tailwind-v4': 'Lesson 08: Tailwind CSS v4 - new engine, CSS-first config, @theme, variants, arbitrary values, plugins',
  '09-design-tokens': 'Lesson 09: Design Token Architecture - token types, naming conventions, multi-theme, token transforms',
  '10-component-systems': 'Lesson 10: Component CSS Systems - CSS Modules, styled-components, Tailwind components, Panda CSS',
  '11-broadcast-graphics': 'Lesson 11: Broadcast Graphics - election overlays, lower thirds, data viz styling, motion graphics CSS',
  '12-capstone': 'Lesson 12: Capstone - Broadcast design system combining all concepts',
};

const AI_LESSON_MAP = {
  '01-how-llms-work': 'Lesson 01: How LLMs Work - transformer architecture, attention, tokenization, training, inference, temperature',
  '02-prompt-engineering': 'Lesson 02: Prompt Engineering - system prompts, few-shot, chain of thought, structured output prompting',
  '03-claude-api': 'Lesson 03: Claude API - Messages API, SDK setup, streaming, system prompts, model selection, token counting',
  '04-tool-use': 'Lesson 04: Tool Use & Function Calling - tool definitions, tool results, multi-turn tool use, forced tools',
  '05-embeddings-search': 'Lesson 05: Embeddings & Search - vector representations, similarity search, vector databases, hybrid search',
  '06-rag-patterns': 'Lesson 06: RAG Patterns - retrieval-augmented generation, chunking, indexing, reranking, context window',
  '07-agents': 'Lesson 07: Agents - agent loops, planning, memory, multi-agent, tool orchestration, Claude computer use',
  '08-structured-output': 'Lesson 08: Structured Output - JSON mode, schema validation, extraction, classification, Zod + AI',
  '09-streaming-ux': 'Lesson 09: Streaming UX - SSE, streaming responses, progressive rendering, optimistic UI, loading states',
  '10-eval-testing': 'Lesson 10: Eval & Testing - LLM evaluation, metrics, test suites, regression testing, human eval',
  '11-ethics-journalism': 'Lesson 11: Ethics & Journalism - bias, hallucination, source verification, responsible AI, newsroom policies',
  '12-capstone': 'Lesson 12: Capstone - Newsroom assistant combining all concepts',
};

// Map platform -> { lessonMap, fallbackContext, fallbackTitle }
const PLATFORM_LESSONS = {
  d3:             { map: D3_LESSON_MAP,     fallbackContext: 'General D3.js learning environment.',               fallbackTitle: 'Learn D3' },
  django:         { map: DJANGO_LESSON_MAP, fallbackContext: 'General Python & Django learning environment.',     fallbackTitle: 'Learn Django' },
  sql:            { map: SQL_LESSON_MAP,    fallbackContext: 'General SQL & PostgreSQL learning environment.',    fallbackTitle: 'Learn SQL' },
  jsts:           { map: JSTS_LESSON_MAP,   fallbackContext: 'General JavaScript & TypeScript learning environment.', fallbackTitle: 'Learn JS/TS' },
  react:          { map: REACT_LESSON_MAP,  fallbackContext: 'General React & Next.js learning environment.',    fallbackTitle: 'Learn React' },
  'css-design':   { map: CSS_LESSON_MAP,    fallbackContext: 'General CSS & Design Systems learning environment.', fallbackTitle: 'Learn CSS & Design' },
  'ai-llm':       { map: AI_LESSON_MAP,     fallbackContext: 'General AI & LLM learning environment.',           fallbackTitle: 'Learn AI & LLMs' },
};

function detectLessonContext() {
  const path = window.location.pathname;
  const platform = detectPlatform();
  const title = document.querySelector('.header h1')?.textContent || document.title;

  // Pick the right lesson map based on platform
  const entry = PLATFORM_LESSONS[platform];
  const lessonMap = entry ? entry.map : {};
  const fallbackContext = entry ? entry.fallbackContext : 'General learning environment.';
  const fallbackTitle = entry ? entry.fallbackTitle : 'Learn Coding';

  for (const [key, context] of Object.entries(lessonMap)) {
    if (path.includes(key)) return { title, context };
  }

  // D3-specific special pages
  if (platform === 'd3') {
    if (path.includes('sandbox')) return { title: 'Sandbox', context: 'User is in the live code sandbox. Help them experiment with D3 code.' };
    if (path.includes('exercise')) return { title: 'Exercise', context: 'User is working on a D3 exercise. Guide them without giving the full answer.' };
  }

  // Games and special pages (any platform)
  if (path.includes('games')) return { title: 'Games', context: `User is playing ${fallbackTitle} learning games.` };
  if (path.includes('projects')) return { title: 'Projects', context: `User is browsing ${fallbackTitle} projects.` };
  if (path.includes('references')) return { title: 'References', context: `User is viewing ${fallbackTitle} reference material.` };

  return { title: title || fallbackTitle, context: fallbackContext };
}

// ── Suggestions (merged from all 3 platforms) ───────────────────

function getSuggestions() {
  const path = window.location.pathname;
  const platform = detectPlatform();

  if (platform === 'd3') {
    if (path.includes('01-fundamentals')) return ['What SVG shapes exist?', 'Why is Y upside down?', 'Show me a circle example'];
    if (path.includes('02-selections')) return ['What is d3.select?', 'Show me method chaining', 'D3 vs querySelector?'];
    if (path.includes('03-scales') || path.includes('04-shapes')) return ['What is .data()?', 'Why empty selectAll?', 'Show me .join()'];
    if (path.includes('05-maps')) return ['What is a scale?', 'domain vs range?', 'Show me scaleBand'];
    if (path.includes('06-transitions')) return ['What is .call()?', 'Margins convention', 'Format axis labels'];
    if (path.includes('07-lines')) return ['Enter vs exit?', 'What are key functions?', 'Show enter/exit demo'];
    if (path.includes('08-arcs')) return ['.datum() vs .data()?', 'Show a line chart', 'Curve types?'];
    if (path.includes('09-maps')) return ['pie vs arc?', 'Donut chart code', 'What is centroid?'];
    if (path.includes('10-interactivity')) return ['What is a projection?', 'Show a US map', 'GeoJSON vs TopoJSON?'];
    if (path.includes('11-d3-react')) return ['Tooltip pattern?', 'Transition syntax?', 'Make it responsive'];
    if (path.includes('12-capstone')) return ['Dashboard layout tips?', 'How to link charts?', 'Responsive dashboard?'];
    return ['What is D3?', 'Show me a bar chart', 'How do scales work?', 'D3 vs Chart.js?'];
  }

  if (platform === 'django') {
    if (path.includes('01-python')) return ['Python vs JS differences?', 'What are list comprehensions?', 'How do classes work?'];
    if (path.includes('02-django')) return ['What is manage.py?', 'Django vs Next.js?', 'How do URLs work?'];
    if (path.includes('03-models')) return ['What is a migration?', 'Django ORM vs Prisma?', 'Show me a ForeignKey'];
    if (path.includes('04-views')) return ['Function vs class views?', 'What is a generic view?', 'URL parameters?'];
    if (path.includes('05-templates')) return ['Template inheritance?', 'What are template tags?', 'Static files how?'];
    if (path.includes('06-forms')) return ['What is CSRF?', 'ModelForm vs Form?', 'Custom validation?'];
    if (path.includes('07-rest')) return ['What is a serializer?', 'ViewSet vs APIView?', 'DRF vs tRPC?'];
    if (path.includes('08-auth')) return ['Login flow?', 'Custom user model?', 'Permissions how?'];
    if (path.includes('09-testing')) return ['pytest vs Jest?', 'Test a view?', 'What are fixtures?'];
    if (path.includes('10-deployment')) return ['Docker setup?', 'Static files in prod?', 'gunicorn what?'];
    if (path.includes('11-advanced')) return ['What are signals?', 'Django middleware?', 'Caching strategies?'];
    if (path.includes('12-capstone')) return ['Project structure tips?', 'Best practices?', 'Production checklist?'];
    return ['What is Django?', 'Python vs JavaScript?', 'How does Django compare to Next.js?', 'Where do I start?'];
  }

  if (platform === 'sql') {
    if (path.includes('01-sql-fundamentals')) return ['How is SQL different from Prisma?', 'Show me CREATE TABLE', 'What does SELECT * mean?'];
    if (path.includes('02-select-filtering')) return ['LIKE vs ILIKE?', 'What is COALESCE?', 'Show me CASE WHEN'];
    if (path.includes('03-joins')) return ['INNER vs LEFT JOIN?', 'When to use JOIN?', 'Show a multi-table join'];
    if (path.includes('04-aggregation')) return ['GROUP BY explained', 'HAVING vs WHERE?', 'Count with conditions'];
    if (path.includes('05-subqueries')) return ['What is a CTE?', 'Subquery vs JOIN?', 'Show me EXISTS'];
    if (path.includes('06-window-functions')) return ['What is OVER()?', 'ROW_NUMBER vs RANK?', 'Running total example'];
    if (path.includes('07-data-types')) return ['VARCHAR vs TEXT?', 'When to use JSONB?', 'Explain CHECK constraints'];
    if (path.includes('08-indexes')) return ['What is an index?', 'When to add indexes?', 'Read EXPLAIN output'];
    if (path.includes('09-postgres')) return ['JSONB operators?', 'Array columns?', 'Full-text search basics'];
    if (path.includes('10-database')) return ['What is normalization?', '1NF vs 3NF?', 'Design a blog schema'];
    if (path.includes('11-advanced')) return ['What is a lateral join?', 'Pivot table in SQL?', 'Materialized views?'];
    if (path.includes('12-capstone')) return ['Election data queries?', 'Census analysis tips?', 'Optimize this query'];
    return ['What is SQL?', 'SQL vs Prisma?', 'Show me a basic query', 'Why learn raw SQL?'];
  }

  if (platform === 'jsts') {
    if (path.includes('01-engine-internals')) return ['How does V8 parse JS?', 'What are hidden classes?', 'Ignition vs TurboFan?'];
    if (path.includes('02-types-coercion')) return ['Why does [] == false?', 'How does == work?', 'ToNumber algorithm?'];
    if (path.includes('03-closures-scope')) return ['What is a LexicalEnvironment?', 'Closure memory cost?', 'Show me the scope chain'];
    if (path.includes('04-prototypes-classes')) return ['__proto__ vs prototype?', 'How does new work?', 'Class vs prototype?'];
    if (path.includes('05-async-patterns')) return ['Event loop phases?', 'Microtask vs macrotask?', 'Promise internals?'];
    if (path.includes('06-iterators-generators')) return ['What is Symbol.iterator?', 'Generator use cases?', 'Async generators?'];
    if (path.includes('07-typescript-foundations')) return ['Structural typing?', 'Narrowing patterns?', 'Discriminated unions?'];
    if (path.includes('08-ts-generics')) return ['Generic constraints?', 'When to use generics?', 'Utility types explained'];
    if (path.includes('09-ts-advanced')) return ['Conditional types?', 'Template literal types?', 'What is infer?'];
    if (path.includes('10-testing-patterns')) return ['Property-based testing?', 'Mock strategies?', 'Test doubles explained'];
    if (path.includes('11-node-internals')) return ['What is libuv?', 'Worker threads?', 'Streams explained'];
    if (path.includes('12-capstone')) return ['CLI architecture?', 'Type-safe patterns?', 'Project structure?'];
    return ['Why learn JS internals?', 'TS vs JS tradeoffs?', 'Event loop basics', 'Where to start?'];
  }

  if (platform === 'react') {
    if (path.includes('01-react-mental-model')) return ['What does UI=f(state) mean?', 'Virtual DOM explained?', 'Why declarative?'];
    if (path.includes('02-fiber-reconciliation')) return ['What is a Fiber node?', 'How does diffing work?', 'Why keys matter?'];
    if (path.includes('03-hooks-deep-dive')) return ['Hooks linked list?', 'Rules of hooks why?', 'Custom hook patterns?'];
    if (path.includes('04-state-management')) return ['When Context vs Zustand?', 'State machines?', 'Server state patterns?'];
    if (path.includes('05-server-components')) return ['RSC wire format?', 'Server vs client?', 'When to use "use client"?'];
    if (path.includes('06-nextjs-app-router')) return ['Layout vs template?', 'Parallel routes?', 'Route groups why?'];
    if (path.includes('07-data-fetching')) return ['Server actions?', 'Cache invalidation?', 'ISR vs PPR?'];
    if (path.includes('08-performance')) return ['When to memo?', 'Bundle analysis?', 'Code splitting?'];
    if (path.includes('09-forms-validation')) return ['Controlled vs uncontrolled?', 'Zod + server actions?', 'Optimistic updates?'];
    if (path.includes('10-testing-react')) return ['Testing Library patterns?', 'MSW for mocking?', 'What to test?'];
    if (path.includes('11-framework-comparison')) return ['React vs Svelte?', 'When not React?', 'Signals vs VDOM?'];
    if (path.includes('12-capstone')) return ['Dashboard architecture?', 'Data viz in React?', 'Production checklist?'];
    return ['React internals?', 'Next.js patterns?', 'Performance tips?', 'Where to start?'];
  }

  if (platform === 'css-design') {
    if (path.includes('01-cascade-specificity')) return ['How specificity works?', '@layer explained?', 'When to use !important?'];
    if (path.includes('02-layout-mental-models')) return ['What is a BFC?', 'Containing blocks?', 'Normal flow?'];
    if (path.includes('03-flexbox-mastery')) return ['flex-grow vs flex-basis?', 'Alignment tricks?', 'Flex wrapping?'];
    if (path.includes('04-grid-mastery')) return ['auto-fit vs auto-fill?', 'Named areas?', 'Subgrid?'];
    if (path.includes('05-custom-properties')) return ['CSS vars vs Sass?', 'Dynamic themes?', 'calc() patterns?'];
    if (path.includes('06-modern-css')) return ['What is :has()?', '@container queries?', 'CSS nesting?'];
    if (path.includes('07-animation-motion')) return ['Scroll-driven animations?', 'Transition performance?', 'Reduced motion?'];
    if (path.includes('08-tailwind-v4')) return ['v4 vs v3 changes?', '@theme directive?', 'CSS-first config?'];
    if (path.includes('09-design-tokens')) return ['Token naming?', 'Multi-theme tokens?', 'Token transforms?'];
    if (path.includes('10-component-systems')) return ['CSS Modules vs Tailwind?', 'Panda CSS?', 'Component patterns?'];
    if (path.includes('11-broadcast-graphics')) return ['Election overlay CSS?', 'Lower third styling?', 'Motion graphics?'];
    if (path.includes('12-capstone')) return ['Design system structure?', 'Token architecture?', 'Component library?'];
    return ['CSS vs Tailwind?', 'Modern CSS features?', 'Design systems?', 'Where to start?'];
  }

  if (platform === 'ai-llm') {
    if (path.includes('01-how-llms-work')) return ['What is attention?', 'Tokenization?', 'Temperature explained?'];
    if (path.includes('02-prompt-engineering')) return ['Chain of thought?', 'Few-shot prompting?', 'System prompts?'];
    if (path.includes('03-claude-api')) return ['Messages API basics?', 'Streaming setup?', 'Token counting?'];
    if (path.includes('04-tool-use')) return ['How tool use works?', 'Multi-turn tools?', 'Forced tool use?'];
    if (path.includes('05-embeddings-search')) return ['What are embeddings?', 'Vector databases?', 'Similarity search?'];
    if (path.includes('06-rag-patterns')) return ['RAG architecture?', 'Chunking strategies?', 'Reranking?'];
    if (path.includes('07-agents')) return ['Agent loop pattern?', 'Planning strategies?', 'Multi-agent?'];
    if (path.includes('08-structured-output')) return ['JSON mode?', 'Zod + AI?', 'Extraction patterns?'];
    if (path.includes('09-streaming-ux')) return ['SSE patterns?', 'Progressive rendering?', 'Loading states?'];
    if (path.includes('10-eval-testing')) return ['How to eval LLMs?', 'Test suites?', 'Regression testing?'];
    if (path.includes('11-ethics-journalism')) return ['AI bias?', 'Hallucination detection?', 'Newsroom policies?'];
    if (path.includes('12-capstone')) return ['Assistant architecture?', 'Source verification?', 'Production deploy?'];
    return ['What are LLMs?', 'Claude API basics?', 'RAG explained?', 'Where to start?'];
  }

  return ['What should I learn first?', 'Compare the courses', 'Where do I start?'];
}

function isLessonPage() {
  return window.location.pathname.includes('/lessons/');
}

// ── Action chip prompts (varied by platform) ────────────────────

function getActionChipPrompts() {
  const platform = detectPlatform();
  const { context } = detectLessonContext();

  const explain = `I just finished reading this lesson (${context}). I want to practice the Feynman technique. Ask me to explain the key concepts from this lesson in my own words. Start with one concept at a time. Be conversational and encouraging. If I get something wrong or incomplete, gently correct me and ask follow-up questions. Don't just say "great job" \u2014 push me to go deeper. Keep it casual, like we're talking at a whiteboard.`;

  let quiz, realWorld;

  if (platform === 'd3') {
    quiz = `Quiz me on the key concepts from this lesson (${context}). Give me one question at a time. Mix up the format \u2014 some conceptual, some "what would this code do?" questions. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`;
    realWorld = `Give me a real-world example of how the concepts from this lesson (${context}) are used in production. Think broadcast TV dashboards, election maps, news graphics, data journalism \u2014 the kind of stuff a newsroom developer would build. Show me a concrete, practical use case with code snippets.`;
  } else if (platform === 'django') {
    quiz = `Quiz me on the key concepts from this lesson (${context}). Give me one question at a time. Mix up the format \u2014 some conceptual, some "what would this code do?" questions with Python/Django code. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`;
    realWorld = `Give me a real-world example of how the concepts from this lesson (${context}) are used in production. Think content management systems, newsroom publishing tools, REST APIs, data-driven web apps \u2014 the kind of stuff a web developer would build with Django. Show me a concrete, practical use case with code snippets.`;
  } else if (platform === 'sql') {
    quiz = `Quiz me on the key concepts from this lesson (${context}). Give me one question at a time. Mix up the format \u2014 some conceptual, some "what would this query return?" questions with sample tables. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`;
    realWorld = `Give me a real-world example of how the concepts from this lesson (${context}) are used in production. Think newsroom databases, election results, census data, public records requests \u2014 the kind of queries a data journalist would write. Show me a concrete, practical use case with SQL snippets.`;
  } else if (platform === 'jsts') {
    quiz = `Quiz me on the key concepts from this lesson (${context}). Give me one question at a time. Mix up the format \u2014 some conceptual, some "what does this code output?" questions with tricky JS/TS examples. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`;
    realWorld = `Give me a real-world example of how the concepts from this lesson (${context}) are used in production. Think V8 optimizations, library internals, TypeScript utility types in big codebases, Node.js performance patterns \u2014 the kind of stuff a senior engineer would encounter. Show me a concrete, practical use case with code snippets.`;
  } else if (platform === 'react') {
    quiz = `Quiz me on the key concepts from this lesson (${context}). Give me one question at a time. Mix up the format \u2014 some conceptual, some "what would this component render?" questions with React/Next.js code. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`;
    realWorld = `Give me a real-world example of how the concepts from this lesson (${context}) are used in production. Think large-scale Next.js apps, data journalism dashboards, real-time newsroom tools \u2014 the kind of architecture decisions a lead frontend engineer would make. Show me a concrete, practical use case with code snippets.`;
  } else if (platform === 'css-design') {
    quiz = `Quiz me on the key concepts from this lesson (${context}). Give me one question at a time. Mix up the format \u2014 some conceptual, some "what would this CSS render?" questions. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`;
    realWorld = `Give me a real-world example of how the concepts from this lesson (${context}) are used in production. Think broadcast graphics, election night overlays, responsive dashboards, design systems at scale \u2014 the kind of CSS architecture a design engineer would build. Show me a concrete, practical use case with code snippets.`;
  } else if (platform === 'ai-llm') {
    quiz = `Quiz me on the key concepts from this lesson (${context}). Give me one question at a time. Mix up the format \u2014 some conceptual, some "what would this API call return?" questions. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`;
    realWorld = `Give me a real-world example of how the concepts from this lesson (${context}) are used in production. Think newsroom AI assistants, automated fact-checking, source document analysis, investigative reporting tools \u2014 the kind of AI features a journalism-focused engineer would build. Show me a concrete, practical use case with code snippets.`;
  } else {
    quiz = `Quiz me on the key concepts from this lesson (${context}). Give me one question at a time. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`;
    realWorld = `Give me a real-world example of how the concepts from this lesson (${context}) are used in production. Show me a concrete, practical use case with code snippets.`;
  }

  return { explain, quiz, realWorld };
}

// ── Markdown rendering ──────────────────────────────────────────

function renderMarkdown(text, hasRunnableCode) {
  if (hasRunnableCode) {
    // Handle d3 code blocks with run button
    text = text.replace(/```d3\n([\s\S]*?)```/g, (_, code) => {
      const id = 'preview-' + Math.random().toString(36).slice(2, 8);
      return `<pre><code>${escapeHtml(code.trim())}</code></pre>
        <div class="tutor-preview-container" id="${id}">
          <div class="tutor-preview-status"><span class="dot"></span> Ready to run</div>
          <div class="tutor-preview-body"></div>
        </div>
        <button class="tutor-run-btn" onclick="window.__tutorRunCode('${id}', this)" data-code="${encodeURIComponent(code.trim())}">Run this code</button>`;
    });
  }
  // Regular code blocks
  text = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
    `<pre><code>${escapeHtml(code.trim())}</code></pre>`
  );
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Line breaks
  text = text.replace(/\n/g, '<br>');
  return text;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Main init ───────────────────────────────────────────────────

export function initTutorChat() {
  const platform = detectPlatform();
  const config = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.d3;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = buildChatStyles(config);
  document.head.appendChild(style);

  // Create toggle button
  const toggle = document.createElement('button');
  toggle.id = 'tutor-toggle';
  toggle.innerHTML = '?';
  toggle.title = config.fullName;
  document.body.appendChild(toggle);

  // Create panel
  const { title, context } = detectLessonContext();
  const suggestions = getSuggestions();

  const SYSTEM_MESSAGES = {
    d3: 'Ask me anything about D3. I know which lesson you\'re on.',
    django: 'Ask me anything about Python or Django. I know which lesson you\'re on.',
    sql: 'Ask me anything about SQL. I know which lesson you\'re on.',
    jsts: 'Ask me anything about JavaScript or TypeScript internals. I know which lesson you\'re on.',
    react: 'Ask me anything about React or Next.js. I know which lesson you\'re on.',
    'css-design': 'Ask me anything about CSS or design systems. I know which lesson you\'re on.',
    'ai-llm': 'Ask me anything about AI, LLMs, or the Claude API. I know which lesson you\'re on.',
  };
  const systemMsg = SYSTEM_MESSAGES[platform] || 'Ask me anything. I know which lesson you\'re on.';

  const panel = document.createElement('div');
  panel.id = 'tutor-panel';
  panel.innerHTML = `
    <div id="tutor-header">
      <h3>${config.fullName}</h3>
      <span class="lesson-tag">${title}</span>
    </div>
    <div id="tutor-messages">
      <div class="tutor-msg system">${systemMsg}</div>
    </div>
    <div class="tutor-suggestions" id="tutor-suggestions">
      ${suggestions.map(s => `<button onclick="window.__tutorAsk('${s}')">${s}</button>`).join('')}
    </div>
    ${isLessonPage() ? `
    <div class="tutor-action-chips" id="tutor-action-chips">
      <button class="chip-explain" onclick="window.__tutorExplainBack()"><span class="chip-icon">&#x1f4a1;</span> Explain It Back</button>
      <button onclick="window.__tutorQuizMe()"><span class="chip-icon">&#x2753;</span> Quiz Me</button>
      <button onclick="window.__tutorRealWorld()"><span class="chip-icon">&#x1f30d;</span> Real World Example</button>
    </div>
    ` : ''}
    <div id="tutor-input-area">
      <textarea id="tutor-input" placeholder="${config.placeholder}" rows="1"></textarea>
      <button id="tutor-send">Send</button>
    </div>
  `;
  document.body.appendChild(panel);

  // State
  let messages = [];
  let isOpen = false;
  let isLoading = false;

  // Toggle
  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    panel.classList.toggle('open', isOpen);
    toggle.classList.toggle('open', isOpen);
    toggle.innerHTML = isOpen ? '&times;' : '?';
    if (isOpen) document.getElementById('tutor-input').focus();
  });

  // Send message
  async function sendMessage(text) {
    if (!text.trim() || isLoading) return;

    const messagesEl = document.getElementById('tutor-messages');
    const suggestionsEl = document.getElementById('tutor-suggestions');
    const sendBtn = document.getElementById('tutor-send');

    // Hide suggestions after first message
    suggestionsEl.style.display = 'none';

    // Add user message
    messages.push({ role: 'user', content: text });
    messagesEl.innerHTML += `<div class="tutor-msg user">${escapeHtml(text)}</div>`;

    // Loading indicator
    isLoading = true;
    sendBtn.disabled = true;
    messagesEl.innerHTML += `<div class="tutor-loading" id="tutor-loading"><span></span><span></span><span></span></div>`;
    messagesEl.scrollTop = messagesEl.scrollHeight;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, lessonContext: context, platform }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error('Server returned an invalid response. Try again.');
      }

      if (data.error) throw new Error(data.error);

      messages.push({ role: 'assistant', content: data.content });

      // Remove loading
      document.getElementById('tutor-loading')?.remove();

      // Add response
      const msgEl = document.createElement('div');
      msgEl.className = 'tutor-msg assistant';
      msgEl.innerHTML = renderMarkdown(data.content, config.hasRunnableCode);
      messagesEl.appendChild(msgEl);

    } catch (err) {
      document.getElementById('tutor-loading')?.remove();
      // Pop the user message from history so they can retry
      messages.pop();
      let errMsg;
      if (err.message.includes('ANTHROPIC_API_KEY') || err.message.includes('Invalid API key')) {
        errMsg = 'API key issue. Make sure ANTHROPIC_API_KEY is set in your .env file and restart the dev server.';
      } else if (err.message.includes('Rate limited')) {
        errMsg = 'Rate limited \u2014 wait a few seconds and try again.';
      } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errMsg = 'Network error. Is the dev server running? (npm run dev)';
      } else {
        errMsg = `Error: ${err.message}`;
      }
      messagesEl.innerHTML += `<div class="tutor-msg system" style="color: #f472b6;">${escapeHtml(errMsg)}</div>`;
    }

    isLoading = false;
    sendBtn.disabled = false;
    messagesEl.scrollTop = messagesEl.scrollHeight;
    document.getElementById('tutor-input').value = '';
  }

  // D3 runnable code (only when platform supports it)
  if (config.hasRunnableCode) {
    let d3Cache = null;

    window.__tutorRunCode = async (containerId, btn) => {
      const container = document.getElementById(containerId);
      const statusEl = container.querySelector('.tutor-preview-status');
      const bodyEl = container.querySelector('.tutor-preview-body');
      let code = decodeURIComponent(btn.dataset.code);

      statusEl.innerHTML = `<span class="dot" style="background:${config.color}"></span> Running...`;

      const svgId = 'svg-' + containerId;
      bodyEl.innerHTML = `<svg id="${svgId}" width="100%" viewBox="0 0 350 180" style="background:#141414;border-radius:4px;"></svg>`;

      try {
        if (!d3Cache) d3Cache = await import('d3');
        const d3Module = d3Cache;

        code = code
          .replace(/(?:const|let|var)\s+svg\s*=\s*d3\.(select|create)\([^)]*\)[\s\S]*?;/g, '// (using provided svg)')
          .replace(/d3\.select\(["']body["']\)\.append\(["']svg["']\)[\s\S]*?;/g, '// (using provided svg)')
          .replace(/import\s+.*from\s+['"]d3['"];?\s*/g, '');

        const svg = d3Module.select(`#${svgId}`);
        const fn = new Function('d3', 'svg', code);
        fn(d3Module, svg);

        const hasContent = svg.selectAll('*').size() > 0;
        container.classList.add('has-output');
        statusEl.innerHTML = hasContent
          ? '<span class="dot"></span> Output'
          : `<span class="dot" style="background:${config.color}"></span> Ran (no visible output)`;
        btn.textContent = 'Re-run';
      } catch (e) {
        statusEl.innerHTML = '<span class="dot" style="background:#f472b6"></span> Error';
        bodyEl.innerHTML += `<div class="tutor-preview-error">${escapeHtml(e.message)}</div>`;
      }
    };
  }

  // Ask from suggestion
  window.__tutorAsk = (text) => {
    document.getElementById('tutor-input').value = text;
    sendMessage(text);
  };

  // Action chip handlers
  window.__tutorExplainBack = () => {
    if (!isOpen) {
      toggle.click();
    }
    const prompts = getActionChipPrompts();
    sendMessage(prompts.explain);
  };

  window.__tutorQuizMe = () => {
    if (!isOpen) {
      toggle.click();
    }
    const prompts = getActionChipPrompts();
    sendMessage(prompts.quiz);
  };

  window.__tutorRealWorld = () => {
    if (!isOpen) {
      toggle.click();
    }
    const prompts = getActionChipPrompts();
    sendMessage(prompts.realWorld);
  };

  // Input handlers
  document.getElementById('tutor-send').addEventListener('click', () => {
    sendMessage(document.getElementById('tutor-input').value);
  });

  document.getElementById('tutor-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e.target.value);
    }
  });

  // Auto-resize textarea
  document.getElementById('tutor-input').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
  });
}
