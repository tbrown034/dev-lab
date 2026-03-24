const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CxHFZkRU.js","assets/transform-DGvXF_4U.js","assets/defaultLocale-_QQJJ3OD.js","assets/select-PKtlUnGw.js","assets/exp-CWrupD81.js","assets/index-pyzYwo2_.js","assets/linear-Bvwc2yJx.js","assets/extent-Ccx1MofX.js","assets/group-pOMCS64w.js","assets/band-HgbXjY_x.js","assets/rainbow-C43O6meo.js","assets/albersUsa-fMGaySAz.js","assets/defaultLocale-B7YgYLP2.js","assets/max-DBeXZoyG.js","assets/RdYlGn-BG0x2Zbt.js","assets/ramp-CK088EDZ.js","assets/min-D1slsF82.js","assets/quantize-Rbblvf1C.js","assets/sequential-Bke8uvtG.js","assets/nice-CjghwxBw.js","assets/time-CvmHSMq6.js","assets/sum-CB6J5KXz.js","assets/array-C1TrskLm.js","assets/pie-CGED7U8v.js","assets/monotone-CrhWzKu2.js","assets/line-Ds-cSQ6A.js","assets/axis-rlX7cRMw.js","assets/basis-UEinyaHF.js","assets/step-Uci-j-lr.js","assets/Blues-jorKyqBF.js","assets/YlOrRd-6YagA92R.js","assets/selectAll-DmLYiGMk.js","assets/stack-CyL8Kq-q.js"])))=>i.map(i=>d[i]);
const O="modulepreload",_=function(e){return"/"+e},q={},H=function(t,s,n){let o=Promise.resolve();if(s&&s.length>0){let i=function(l){return Promise.all(l.map(x=>Promise.resolve(x).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),u=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));o=i(s.map(l=>{if(l=_(l),l in q)return;q[l]=!0;const x=l.endsWith(".css"),c=x?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${c}`))return;const h=document.createElement("link");if(h.rel=x?"stylesheet":O,x||(h.as="script"),h.crossOrigin="",h.href=l,u&&h.setAttribute("nonce",u),document.head.appendChild(h),x)return new Promise((f,d)=>{h.addEventListener("load",f),h.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(i){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=i,window.dispatchEvent(r),!r.defaultPrevented)throw i}return o.then(i=>{for(const r of i||[])r.status==="rejected"&&a(r.reason);return t().catch(a)})};function T(){const e=window.location.pathname;return e.startsWith("/d3/")||e==="/d3"?"d3":e.startsWith("/django/")||e==="/django"?"django":e.startsWith("/sql/")||e==="/sql"?"sql":e.startsWith("/feed/")||e==="/feed"?"feed":e.startsWith("/jsts/")||e==="/jsts"?"jsts":e.startsWith("/react/")||e==="/react"?"react":e.startsWith("/css-design/")||e==="/css-design"?"css-design":e.startsWith("/ai-llm/")||e==="/ai-llm"?"ai-llm":e.startsWith("/courses/")||e==="/courses"?"courses":e.startsWith("/pod/")||e==="/pod"?"pod":"hub"}const R={d3:{name:"D3",fullName:"D3 Tutor",color:"#f97316",colorHover:"#fb923c",userTextColor:"#000",placeholder:"Ask about D3...",hasRunnableCode:!0},django:{name:"Django",fullName:"Django Tutor",color:"#22c55e",colorHover:"#4ade80",userTextColor:"#000",placeholder:"Ask about Python or Django...",hasRunnableCode:!1},sql:{name:"SQL",fullName:"SQL Tutor",color:"#3b82f6",colorHover:"#60a5fa",userTextColor:"#fff",placeholder:"Ask about SQL...",hasRunnableCode:!1},jsts:{name:"JS/TS",fullName:"JS/TS Tutor",color:"#eab308",colorHover:"#facc15",userTextColor:"#000",placeholder:"Ask about JavaScript or TypeScript...",hasRunnableCode:!1},react:{name:"React",fullName:"React Tutor",color:"#06b6d4",colorHover:"#22d3ee",userTextColor:"#000",placeholder:"Ask about React or Next.js...",hasRunnableCode:!1},"css-design":{name:"CSS",fullName:"CSS & Design Tutor",color:"#a855f7",colorHover:"#c084fc",userTextColor:"#000",placeholder:"Ask about CSS or design...",hasRunnableCode:!1},"ai-llm":{name:"AI/LLM",fullName:"AI & LLM Tutor",color:"#f472b6",colorHover:"#f9a8d4",userTextColor:"#000",placeholder:"Ask about AI, LLMs, or the Claude API...",hasRunnableCode:!1},courses:{name:"Courses",fullName:"Course Guide",color:"#8b5cf6",colorHover:"#a78bfa",userTextColor:"#fff",placeholder:"Ask about courses...",hasRunnableCode:!1},pod:{name:"Podcast",fullName:"Podcast Guide",color:"#ec4899",colorHover:"#f472b6",userTextColor:"#000",placeholder:"Ask about the podcast...",hasRunnableCode:!1}};function F(e){const t=e.color,s=e.colorHover,n=e.userTextColor;return`
  #tutor-toggle {
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    width: 56px; height: 56px; border-radius: 50%;
    background: ${t}; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: filter 0.2s;
    font-size: 24px; color: ${n};
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
  #tutor-header h3 { color: ${t}; font-size: 14px; margin: 0; font-weight: 600; }
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
  .tutor-msg.user { align-self: flex-end; background: ${t}; color: ${n}; border-bottom-right-radius: 4px; }
  .tutor-msg.assistant { align-self: flex-start; background: #1a1a1a; color: #ccc; border: 1px solid #222; border-bottom-left-radius: 4px; }
  .tutor-msg.assistant code { background: #2a2a2a; padding: 2px 6px; border-radius: 4px; font-size: 12px; color: ${t}; border: 1px solid #3a3a3a; }
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
    background: ${t}; color: ${n}; border: none; border-radius: 4px;
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
  #tutor-input:focus { border-color: ${t}; }
  #tutor-input::placeholder { color: #555; }
  #tutor-send {
    background: ${t}; border: none; border-radius: 8px;
    padding: 10px 16px; cursor: pointer; color: ${n}; font-weight: 600;
    font-size: 14px; align-self: flex-end; flex-shrink: 0;
    transition: background 0.2s;
  }
  #tutor-send:hover { background: ${s}; }
  #tutor-send:disabled { background: #333; color: #666; cursor: not-allowed; }

  .tutor-loading { display: flex; gap: 4px; padding: 8px 14px; }
  .tutor-loading span {
    width: 6px; height: 6px; background: ${t}; border-radius: 50%;
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
  .tutor-suggestions button:hover { border-color: ${t}; color: ${t}; }

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
  .tutor-action-chips button:hover { border-color: ${t}; color: ${t}; }
  .tutor-action-chips button.chip-explain {
    border-color: ${t}; color: ${t}; font-weight: 600;
  }
  .tutor-action-chips button.chip-explain:hover { background: ${t}; color: ${n}; }
  .tutor-action-chips .chip-icon { font-size: 13px; line-height: 1; }
`}const G={"01-fundamentals":"Lesson 01: Pure SVG - HTML tags for shapes, coordinate system, rect/circle/line/text/path/g elements","02-selections-data":"Lesson 02: Vanilla JS to D3 Selections - DOM manipulation, d3.select, d3.selectAll, method chaining","03-scales-axes":"Lesson 03: D3 Selections Deep Dive - attr, style, append, remove, classed, each","04-shapes-bindings":"Lesson 04: Data Binding - .data().join(), accessor functions, empty selectAll, __data__","05-maps-geo":"Lesson 05: Scales - scaleLinear, scaleBand, scaleTime, scaleSequential, domain, range","06-transitions-interactivity":"Lesson 06: Axes & Margins Convention - axisBottom, axisLeft, .call(), tickFormat, margins","07-lines-areas":"Lesson 07: Enter/Update/Exit - data joins, key functions, .join() callbacks, general update pattern","08-arcs-pies":"Lesson 08: Lines & Areas - d3.line(), d3.area(), .datum(), curve types, stacked areas","09-maps-geo":"Lesson 09: Arcs & Pies - d3.arc(), d3.pie(), donut charts, centroid labels","10-interactivity":"Lesson 10: Maps & Geography - GeoJSON, TopoJSON, projections, d3.geoPath(), choropleth","11-d3-react":"Lesson 11: Interactivity & Polish - events, tooltips, transitions, responsive viewBox, accessibility","12-capstone":"Lesson 12: Capstone Dashboard - combining all concepts into a complete project"},J={"01-python-fundamentals":"Lesson 01: Python Fundamentals - variables, types, functions, lists, dicts, classes, modules, control flow. JS to Python translation.","02-django-quickstart":"Lesson 02: Django Quickstart - project setup, file structure, views, URL routing, templates, settings. Next.js to Django mapping.","03-models-orm":"Lesson 03: Models & ORM - Django models, fields, migrations, querysets, relationships. Prisma to Django ORM translation.","04-views-urls":"Lesson 04: Views & URLs Deep Dive - function views, class-based views, URL patterns, path converters. API routes to Django views.","05-templates":"Lesson 05: Templates & Static Files - Django template language, template inheritance, static files, filters, tags. JSX to Django templates.","06-forms-validation":"Lesson 06: Forms & Validation - Django forms, ModelForms, validation, CSRF, file uploads. React forms to Django forms.","07-rest-api":"Lesson 07: REST APIs with Django REST Framework - serializers, viewsets, routers, authentication. Next.js API to DRF.","08-auth-permissions":"Lesson 08: Authentication & Permissions - Django auth system, login/logout, permissions, groups. NextAuth to Django auth.","09-testing":"Lesson 09: Testing - pytest, Django test client, fixtures, factories, mocking. Jest to pytest.","10-deployment":"Lesson 10: Deployment - gunicorn, nginx, Docker, environment variables, static files in production. Vercel to Django deployment.","11-advanced-patterns":"Lesson 11: Advanced Patterns - middleware, signals, caching, celery, custom management commands.","12-capstone":"Lesson 12: Capstone Project - combining all concepts into a complete production application."},U={"01-sql-fundamentals":"Lesson 01: SQL Fundamentals - CREATE TABLE, INSERT, SELECT, WHERE, ORDER BY, UPDATE, DELETE, Prisma comparisons","02-select-filtering":"Lesson 02: SELECT & Filtering Deep Dive - aliases, LIKE, ILIKE, NULL handling, COALESCE, CASE, DISTINCT, casting","03-joins":"Lesson 03: JOINs - INNER JOIN, LEFT/RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN, self joins, multiple joins","04-aggregation":"Lesson 04: Aggregation & GROUP BY - COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING, aggregate with joins","05-subqueries":"Lesson 05: Subqueries & CTEs - scalar subqueries, IN subqueries, EXISTS, correlated subqueries, WITH (CTE), recursive CTEs","06-window-functions":"Lesson 06: Window Functions - ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, OVER, PARTITION BY, running totals","07-data-types-constraints":"Lesson 07: Data Types & Constraints - VARCHAR, INTEGER, BOOLEAN, TIMESTAMP, JSON/JSONB, CHECK, UNIQUE, FOREIGN KEY","08-indexes-performance":"Lesson 08: Indexes & Performance - B-tree, hash, GIN, GiST, EXPLAIN ANALYZE, query optimization","09-postgres-specific":"Lesson 09: PostgreSQL-Specific Features - JSONB operators, arrays, generate_series, full-text search, LISTEN/NOTIFY","10-database-design":"Lesson 10: Database Design & Normalization - 1NF, 2NF, 3NF, ERD, migrations, schema design patterns","11-advanced-queries":"Lesson 11: Advanced Query Patterns - pivot tables, recursive queries, lateral joins, materialized views","12-capstone":"Lesson 12: Capstone - Real-world journalism queries, election data, census analysis, public records"},Q={"01-engine-internals":"Lesson 01: Engine Internals - V8 pipeline, parsing, AST, Ignition, TurboFan, hidden classes, inline caching","02-types-coercion":"Lesson 02: Types & Coercion - primitive types, abstract equality, ToString/ToNumber/ToBoolean, double equals algorithm","03-closures-scope":"Lesson 03: Closures & Scope - lexical environment, scope chain, closure memory model, IIFE, module pattern","04-prototypes-classes":"Lesson 04: Prototypes & Classes - prototype chain, __proto__, Object.create, class sugar, extends, super","05-async-patterns":"Lesson 05: Async Patterns - event loop phases, microtask queue, Promise internals, async/await, error handling","06-iterators-generators":"Lesson 06: Iterators & Generators - Symbol.iterator, generator functions, yield, async generators, lazy evaluation","07-typescript-foundations":"Lesson 07: TypeScript Foundations - type system, structural typing, type narrowing, discriminated unions, type guards","08-ts-generics":"Lesson 08: TypeScript Generics - generic functions, constraints, default types, generic classes, utility types","09-ts-advanced":"Lesson 09: Advanced TypeScript - conditional types, mapped types, template literal types, infer, branded types","10-testing-patterns":"Lesson 10: Testing Patterns - test doubles, property-based testing, snapshot testing, mocking strategies","11-node-internals":"Lesson 11: Node.js Internals - libuv, worker threads, streams, Buffer, child processes, cluster","12-capstone":"Lesson 12: Capstone - Type-safe CLI tool combining all concepts"},V={"01-react-mental-model":"Lesson 01: React Mental Model - UI=f(state), declarative rendering, component as pure function, virtual DOM","02-fiber-reconciliation":"Lesson 02: Fiber & Reconciliation - Fiber tree, work loop, reconciliation algorithm, diffing, keys","03-hooks-deep-dive":"Lesson 03: Hooks Deep Dive - hooks linked list, useState internals, useEffect lifecycle, custom hooks, rules of hooks","04-state-management":"Lesson 04: State Management - useReducer, Context, Zustand, Jotai, state machines, server state","05-server-components":"Lesson 05: React Server Components - RSC wire format, server/client boundary, async components, use client/server","06-nextjs-app-router":"Lesson 06: Next.js App Router - file conventions, layouts, loading, error boundaries, route groups, parallel routes","07-data-fetching":"Lesson 07: Data Fetching - server actions, fetch caching, ISR, PPR, streaming, Suspense boundaries","08-performance":"Lesson 08: Performance - React.memo, useMemo, useCallback, code splitting, lazy, Profiler, bundle analysis","09-forms-validation":"Lesson 09: Forms & Validation - controlled vs uncontrolled, useActionState, Zod validation, optimistic updates","10-testing-react":"Lesson 10: Testing React - Testing Library, component tests, integration tests, MSW, Playwright","11-framework-comparison":"Lesson 11: Framework Comparison - React vs Svelte vs Vue vs Solid, tradeoffs, when to use what","12-capstone":"Lesson 12: Capstone - Data journalism dashboard combining all concepts"},K={"01-cascade-specificity":"Lesson 01: Cascade & Specificity - cascade algorithm, specificity calculation, inheritance, @layer, !important","02-layout-mental-models":"Lesson 02: Layout Mental Models - normal flow, formatting contexts, BFC, containing blocks, box model","03-flexbox-mastery":"Lesson 03: Flexbox Mastery - flex container/item, main/cross axis, flex-grow/shrink/basis, alignment, wrapping","04-grid-mastery":"Lesson 04: CSS Grid Mastery - grid tracks, named areas, auto-fit/auto-fill, subgrid, grid template","05-custom-properties":"Lesson 05: Custom Properties & Theming - CSS variables, inheritance, calc(), dynamic themes, dark mode","06-modern-css":"Lesson 06: Modern CSS - @container, @scope, :has(), nesting, view transitions, anchor positioning","07-animation-motion":"Lesson 07: Animation & Motion - transitions, keyframes, scroll-driven animations, prefers-reduced-motion","08-tailwind-v4":"Lesson 08: Tailwind CSS v4 - new engine, CSS-first config, @theme, variants, arbitrary values, plugins","09-design-tokens":"Lesson 09: Design Token Architecture - token types, naming conventions, multi-theme, token transforms","10-component-systems":"Lesson 10: Component CSS Systems - CSS Modules, styled-components, Tailwind components, Panda CSS","11-broadcast-graphics":"Lesson 11: Broadcast Graphics - election overlays, lower thirds, data viz styling, motion graphics CSS","12-capstone":"Lesson 12: Capstone - Broadcast design system combining all concepts"},Y={"01-how-llms-work":"Lesson 01: How LLMs Work - transformer architecture, attention, tokenization, training, inference, temperature","02-prompt-engineering":"Lesson 02: Prompt Engineering - system prompts, few-shot, chain of thought, structured output prompting","03-claude-api":"Lesson 03: Claude API - Messages API, SDK setup, streaming, system prompts, model selection, token counting","04-tool-use":"Lesson 04: Tool Use & Function Calling - tool definitions, tool results, multi-turn tool use, forced tools","05-embeddings-search":"Lesson 05: Embeddings & Search - vector representations, similarity search, vector databases, hybrid search","06-rag-patterns":"Lesson 06: RAG Patterns - retrieval-augmented generation, chunking, indexing, reranking, context window","07-agents":"Lesson 07: Agents - agent loops, planning, memory, multi-agent, tool orchestration, Claude computer use","08-structured-output":"Lesson 08: Structured Output - JSON mode, schema validation, extraction, classification, Zod + AI","09-streaming-ux":"Lesson 09: Streaming UX - SSE, streaming responses, progressive rendering, optimistic UI, loading states","10-eval-testing":"Lesson 10: Eval & Testing - LLM evaluation, metrics, test suites, regression testing, human eval","11-ethics-journalism":"Lesson 11: Ethics & Journalism - bias, hallucination, source verification, responsible AI, newsroom policies","12-capstone":"Lesson 12: Capstone - Newsroom assistant combining all concepts"},X={d3:{map:G,fallbackContext:"General D3.js learning environment.",fallbackTitle:"Learn D3"},django:{map:J,fallbackContext:"General Python & Django learning environment.",fallbackTitle:"Learn Django"},sql:{map:U,fallbackContext:"General SQL & PostgreSQL learning environment.",fallbackTitle:"Learn SQL"},jsts:{map:Q,fallbackContext:"General JavaScript & TypeScript learning environment.",fallbackTitle:"Learn JS/TS"},react:{map:V,fallbackContext:"General React & Next.js learning environment.",fallbackTitle:"Learn React"},"css-design":{map:K,fallbackContext:"General CSS & Design Systems learning environment.",fallbackTitle:"Learn CSS & Design"},"ai-llm":{map:Y,fallbackContext:"General AI & LLM learning environment.",fallbackTitle:"Learn AI & LLMs"}};function W(){var r;const e=window.location.pathname,t=T(),s=((r=document.querySelector(".header h1"))==null?void 0:r.textContent)||document.title,n=X[t],o=n?n.map:{},a=n?n.fallbackContext:"General learning environment.",i=n?n.fallbackTitle:"Learn Coding";for(const[u,l]of Object.entries(o))if(e.includes(u))return{title:s,context:l};if(t==="d3"){if(e.includes("sandbox"))return{title:"Sandbox",context:"User is in the live code sandbox. Help them experiment with D3 code."};if(e.includes("exercise"))return{title:"Exercise",context:"User is working on a D3 exercise. Guide them without giving the full answer."}}return e.includes("games")?{title:"Games",context:`User is playing ${i} learning games.`}:e.includes("projects")?{title:"Projects",context:`User is browsing ${i} projects.`}:e.includes("references")?{title:"References",context:`User is viewing ${i} reference material.`}:{title:s||i,context:a}}function Z(){const e=window.location.pathname,t=T();return t==="d3"?e.includes("01-fundamentals")?["What SVG shapes exist?","Why is Y upside down?","Show me a circle example"]:e.includes("02-selections")?["What is d3.select?","Show me method chaining","D3 vs querySelector?"]:e.includes("03-scales")||e.includes("04-shapes")?["What is .data()?","Why empty selectAll?","Show me .join()"]:e.includes("05-maps")?["What is a scale?","domain vs range?","Show me scaleBand"]:e.includes("06-transitions")?["What is .call()?","Margins convention","Format axis labels"]:e.includes("07-lines")?["Enter vs exit?","What are key functions?","Show enter/exit demo"]:e.includes("08-arcs")?[".datum() vs .data()?","Show a line chart","Curve types?"]:e.includes("09-maps")?["pie vs arc?","Donut chart code","What is centroid?"]:e.includes("10-interactivity")?["What is a projection?","Show a US map","GeoJSON vs TopoJSON?"]:e.includes("11-d3-react")?["Tooltip pattern?","Transition syntax?","Make it responsive"]:e.includes("12-capstone")?["Dashboard layout tips?","How to link charts?","Responsive dashboard?"]:["What is D3?","Show me a bar chart","How do scales work?","D3 vs Chart.js?"]:t==="django"?e.includes("01-python")?["Python vs JS differences?","What are list comprehensions?","How do classes work?"]:e.includes("02-django")?["What is manage.py?","Django vs Next.js?","How do URLs work?"]:e.includes("03-models")?["What is a migration?","Django ORM vs Prisma?","Show me a ForeignKey"]:e.includes("04-views")?["Function vs class views?","What is a generic view?","URL parameters?"]:e.includes("05-templates")?["Template inheritance?","What are template tags?","Static files how?"]:e.includes("06-forms")?["What is CSRF?","ModelForm vs Form?","Custom validation?"]:e.includes("07-rest")?["What is a serializer?","ViewSet vs APIView?","DRF vs tRPC?"]:e.includes("08-auth")?["Login flow?","Custom user model?","Permissions how?"]:e.includes("09-testing")?["pytest vs Jest?","Test a view?","What are fixtures?"]:e.includes("10-deployment")?["Docker setup?","Static files in prod?","gunicorn what?"]:e.includes("11-advanced")?["What are signals?","Django middleware?","Caching strategies?"]:e.includes("12-capstone")?["Project structure tips?","Best practices?","Production checklist?"]:["What is Django?","Python vs JavaScript?","How does Django compare to Next.js?","Where do I start?"]:t==="sql"?e.includes("01-sql-fundamentals")?["How is SQL different from Prisma?","Show me CREATE TABLE","What does SELECT * mean?"]:e.includes("02-select-filtering")?["LIKE vs ILIKE?","What is COALESCE?","Show me CASE WHEN"]:e.includes("03-joins")?["INNER vs LEFT JOIN?","When to use JOIN?","Show a multi-table join"]:e.includes("04-aggregation")?["GROUP BY explained","HAVING vs WHERE?","Count with conditions"]:e.includes("05-subqueries")?["What is a CTE?","Subquery vs JOIN?","Show me EXISTS"]:e.includes("06-window-functions")?["What is OVER()?","ROW_NUMBER vs RANK?","Running total example"]:e.includes("07-data-types")?["VARCHAR vs TEXT?","When to use JSONB?","Explain CHECK constraints"]:e.includes("08-indexes")?["What is an index?","When to add indexes?","Read EXPLAIN output"]:e.includes("09-postgres")?["JSONB operators?","Array columns?","Full-text search basics"]:e.includes("10-database")?["What is normalization?","1NF vs 3NF?","Design a blog schema"]:e.includes("11-advanced")?["What is a lateral join?","Pivot table in SQL?","Materialized views?"]:e.includes("12-capstone")?["Election data queries?","Census analysis tips?","Optimize this query"]:["What is SQL?","SQL vs Prisma?","Show me a basic query","Why learn raw SQL?"]:t==="jsts"?e.includes("01-engine-internals")?["How does V8 parse JS?","What are hidden classes?","Ignition vs TurboFan?"]:e.includes("02-types-coercion")?["Why does [] == false?","How does == work?","ToNumber algorithm?"]:e.includes("03-closures-scope")?["What is a LexicalEnvironment?","Closure memory cost?","Show me the scope chain"]:e.includes("04-prototypes-classes")?["__proto__ vs prototype?","How does new work?","Class vs prototype?"]:e.includes("05-async-patterns")?["Event loop phases?","Microtask vs macrotask?","Promise internals?"]:e.includes("06-iterators-generators")?["What is Symbol.iterator?","Generator use cases?","Async generators?"]:e.includes("07-typescript-foundations")?["Structural typing?","Narrowing patterns?","Discriminated unions?"]:e.includes("08-ts-generics")?["Generic constraints?","When to use generics?","Utility types explained"]:e.includes("09-ts-advanced")?["Conditional types?","Template literal types?","What is infer?"]:e.includes("10-testing-patterns")?["Property-based testing?","Mock strategies?","Test doubles explained"]:e.includes("11-node-internals")?["What is libuv?","Worker threads?","Streams explained"]:e.includes("12-capstone")?["CLI architecture?","Type-safe patterns?","Project structure?"]:["Why learn JS internals?","TS vs JS tradeoffs?","Event loop basics","Where to start?"]:t==="react"?e.includes("01-react-mental-model")?["What does UI=f(state) mean?","Virtual DOM explained?","Why declarative?"]:e.includes("02-fiber-reconciliation")?["What is a Fiber node?","How does diffing work?","Why keys matter?"]:e.includes("03-hooks-deep-dive")?["Hooks linked list?","Rules of hooks why?","Custom hook patterns?"]:e.includes("04-state-management")?["When Context vs Zustand?","State machines?","Server state patterns?"]:e.includes("05-server-components")?["RSC wire format?","Server vs client?",'When to use "use client"?']:e.includes("06-nextjs-app-router")?["Layout vs template?","Parallel routes?","Route groups why?"]:e.includes("07-data-fetching")?["Server actions?","Cache invalidation?","ISR vs PPR?"]:e.includes("08-performance")?["When to memo?","Bundle analysis?","Code splitting?"]:e.includes("09-forms-validation")?["Controlled vs uncontrolled?","Zod + server actions?","Optimistic updates?"]:e.includes("10-testing-react")?["Testing Library patterns?","MSW for mocking?","What to test?"]:e.includes("11-framework-comparison")?["React vs Svelte?","When not React?","Signals vs VDOM?"]:e.includes("12-capstone")?["Dashboard architecture?","Data viz in React?","Production checklist?"]:["React internals?","Next.js patterns?","Performance tips?","Where to start?"]:t==="css-design"?e.includes("01-cascade-specificity")?["How specificity works?","@layer explained?","When to use !important?"]:e.includes("02-layout-mental-models")?["What is a BFC?","Containing blocks?","Normal flow?"]:e.includes("03-flexbox-mastery")?["flex-grow vs flex-basis?","Alignment tricks?","Flex wrapping?"]:e.includes("04-grid-mastery")?["auto-fit vs auto-fill?","Named areas?","Subgrid?"]:e.includes("05-custom-properties")?["CSS vars vs Sass?","Dynamic themes?","calc() patterns?"]:e.includes("06-modern-css")?["What is :has()?","@container queries?","CSS nesting?"]:e.includes("07-animation-motion")?["Scroll-driven animations?","Transition performance?","Reduced motion?"]:e.includes("08-tailwind-v4")?["v4 vs v3 changes?","@theme directive?","CSS-first config?"]:e.includes("09-design-tokens")?["Token naming?","Multi-theme tokens?","Token transforms?"]:e.includes("10-component-systems")?["CSS Modules vs Tailwind?","Panda CSS?","Component patterns?"]:e.includes("11-broadcast-graphics")?["Election overlay CSS?","Lower third styling?","Motion graphics?"]:e.includes("12-capstone")?["Design system structure?","Token architecture?","Component library?"]:["CSS vs Tailwind?","Modern CSS features?","Design systems?","Where to start?"]:t==="ai-llm"?e.includes("01-how-llms-work")?["What is attention?","Tokenization?","Temperature explained?"]:e.includes("02-prompt-engineering")?["Chain of thought?","Few-shot prompting?","System prompts?"]:e.includes("03-claude-api")?["Messages API basics?","Streaming setup?","Token counting?"]:e.includes("04-tool-use")?["How tool use works?","Multi-turn tools?","Forced tool use?"]:e.includes("05-embeddings-search")?["What are embeddings?","Vector databases?","Similarity search?"]:e.includes("06-rag-patterns")?["RAG architecture?","Chunking strategies?","Reranking?"]:e.includes("07-agents")?["Agent loop pattern?","Planning strategies?","Multi-agent?"]:e.includes("08-structured-output")?["JSON mode?","Zod + AI?","Extraction patterns?"]:e.includes("09-streaming-ux")?["SSE patterns?","Progressive rendering?","Loading states?"]:e.includes("10-eval-testing")?["How to eval LLMs?","Test suites?","Regression testing?"]:e.includes("11-ethics-journalism")?["AI bias?","Hallucination detection?","Newsroom policies?"]:e.includes("12-capstone")?["Assistant architecture?","Source verification?","Production deploy?"]:["What are LLMs?","Claude API basics?","RAG explained?","Where to start?"]:["What should I learn first?","Compare the courses","Where do I start?"]}function ee(){return window.location.pathname.includes("/lessons/")}function P(){const e=T(),{context:t}=W(),s=`I just finished reading this lesson (${t}). I want to practice the Feynman technique. Ask me to explain the key concepts from this lesson in my own words. Start with one concept at a time. Be conversational and encouraging. If I get something wrong or incomplete, gently correct me and ask follow-up questions. Don't just say "great job" — push me to go deeper. Keep it casual, like we're talking at a whiteboard.`;let n,o;return e==="d3"?(n=`Quiz me on the key concepts from this lesson (${t}). Give me one question at a time. Mix up the format — some conceptual, some "what would this code do?" questions. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`,o=`Give me a real-world example of how the concepts from this lesson (${t}) are used in production. Think broadcast TV dashboards, election maps, news graphics, data journalism — the kind of stuff a newsroom developer would build. Show me a concrete, practical use case with code snippets.`):e==="django"?(n=`Quiz me on the key concepts from this lesson (${t}). Give me one question at a time. Mix up the format — some conceptual, some "what would this code do?" questions with Python/Django code. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`,o=`Give me a real-world example of how the concepts from this lesson (${t}) are used in production. Think content management systems, newsroom publishing tools, REST APIs, data-driven web apps — the kind of stuff a web developer would build with Django. Show me a concrete, practical use case with code snippets.`):e==="sql"?(n=`Quiz me on the key concepts from this lesson (${t}). Give me one question at a time. Mix up the format — some conceptual, some "what would this query return?" questions with sample tables. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`,o=`Give me a real-world example of how the concepts from this lesson (${t}) are used in production. Think newsroom databases, election results, census data, public records requests — the kind of queries a data journalist would write. Show me a concrete, practical use case with SQL snippets.`):e==="jsts"?(n=`Quiz me on the key concepts from this lesson (${t}). Give me one question at a time. Mix up the format — some conceptual, some "what does this code output?" questions with tricky JS/TS examples. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`,o=`Give me a real-world example of how the concepts from this lesson (${t}) are used in production. Think V8 optimizations, library internals, TypeScript utility types in big codebases, Node.js performance patterns — the kind of stuff a senior engineer would encounter. Show me a concrete, practical use case with code snippets.`):e==="react"?(n=`Quiz me on the key concepts from this lesson (${t}). Give me one question at a time. Mix up the format — some conceptual, some "what would this component render?" questions with React/Next.js code. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`,o=`Give me a real-world example of how the concepts from this lesson (${t}) are used in production. Think large-scale Next.js apps, data journalism dashboards, real-time newsroom tools — the kind of architecture decisions a lead frontend engineer would make. Show me a concrete, practical use case with code snippets.`):e==="css-design"?(n=`Quiz me on the key concepts from this lesson (${t}). Give me one question at a time. Mix up the format — some conceptual, some "what would this CSS render?" questions. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`,o=`Give me a real-world example of how the concepts from this lesson (${t}) are used in production. Think broadcast graphics, election night overlays, responsive dashboards, design systems at scale — the kind of CSS architecture a design engineer would build. Show me a concrete, practical use case with code snippets.`):e==="ai-llm"?(n=`Quiz me on the key concepts from this lesson (${t}). Give me one question at a time. Mix up the format — some conceptual, some "what would this API call return?" questions. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`,o=`Give me a real-world example of how the concepts from this lesson (${t}) are used in production. Think newsroom AI assistants, automated fact-checking, source document analysis, investigative reporting tools — the kind of AI features a journalism-focused engineer would build. Show me a concrete, practical use case with code snippets.`):(n=`Quiz me on the key concepts from this lesson (${t}). Give me one question at a time. After I answer, tell me if I'm right and explain why. Keep it challenging but fair.`,o=`Give me a real-world example of how the concepts from this lesson (${t}) are used in production. Show me a concrete, practical use case with code snippets.`),{explain:s,quiz:n,realWorld:o}}function te(e,t){return t&&(e=e.replace(/```d3\n([\s\S]*?)```/g,(s,n)=>{const o="preview-"+Math.random().toString(36).slice(2,8);return`<pre><code>${M(n.trim())}</code></pre>
        <div class="tutor-preview-container" id="${o}">
          <div class="tutor-preview-status"><span class="dot"></span> Ready to run</div>
          <div class="tutor-preview-body"></div>
        </div>
        <button class="tutor-run-btn" onclick="window.__tutorRunCode('${o}', this)" data-code="${encodeURIComponent(n.trim())}">Run this code</button>`})),e=e.replace(/```(\w*)\n([\s\S]*?)```/g,(s,n,o)=>`<pre><code>${M(o.trim())}</code></pre>`),e=e.replace(/`([^`]+)`/g,"<code>$1</code>"),e=e.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),e=e.replace(/\n/g,"<br>"),e}function M(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ne(){const e=T(),t=R[e]||R.d3,s=document.createElement("style");s.textContent=F(t),document.head.appendChild(s);const n=document.createElement("button");n.id="tutor-toggle",n.innerHTML="?",n.title=t.fullName,document.body.appendChild(n);const{title:o,context:a}=W(),i=Z(),u={d3:"Ask me anything about D3. I know which lesson you're on.",django:"Ask me anything about Python or Django. I know which lesson you're on.",sql:"Ask me anything about SQL. I know which lesson you're on.",jsts:"Ask me anything about JavaScript or TypeScript internals. I know which lesson you're on.",react:"Ask me anything about React or Next.js. I know which lesson you're on.","css-design":"Ask me anything about CSS or design systems. I know which lesson you're on.","ai-llm":"Ask me anything about AI, LLMs, or the Claude API. I know which lesson you're on."}[e]||"Ask me anything. I know which lesson you're on.",l=document.createElement("div");l.id="tutor-panel",l.innerHTML=`
    <div id="tutor-header">
      <h3>${t.fullName}</h3>
      <span class="lesson-tag">${o}</span>
    </div>
    <div id="tutor-messages">
      <div class="tutor-msg system">${u}</div>
    </div>
    <div class="tutor-suggestions" id="tutor-suggestions">
      ${i.map(d=>`<button onclick="window.__tutorAsk('${d}')">${d}</button>`).join("")}
    </div>
    ${ee()?`
    <div class="tutor-action-chips" id="tutor-action-chips">
      <button class="chip-explain" onclick="window.__tutorExplainBack()"><span class="chip-icon">&#x1f4a1;</span> Explain It Back</button>
      <button onclick="window.__tutorQuizMe()"><span class="chip-icon">&#x2753;</span> Quiz Me</button>
      <button onclick="window.__tutorRealWorld()"><span class="chip-icon">&#x1f30d;</span> Real World Example</button>
    </div>
    `:""}
    <div id="tutor-input-area">
      <textarea id="tutor-input" placeholder="${t.placeholder}" rows="1"></textarea>
      <button id="tutor-send">Send</button>
    </div>
  `,document.body.appendChild(l);let x=[],c=!1,h=!1;n.addEventListener("click",()=>{c=!c,l.classList.toggle("open",c),n.classList.toggle("open",c),n.innerHTML=c?"&times;":"?",c&&document.getElementById("tutor-input").focus()});async function f(d){var k,b;if(!d.trim()||h)return;const v=document.getElementById("tutor-messages"),y=document.getElementById("tutor-suggestions"),S=document.getElementById("tutor-send");y.style.display="none",x.push({role:"user",content:d}),v.innerHTML+=`<div class="tutor-msg user">${M(d)}</div>`,h=!0,S.disabled=!0,v.innerHTML+='<div class="tutor-loading" id="tutor-loading"><span></span><span></span><span></span></div>',v.scrollTop=v.scrollHeight;try{const g=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:x,lessonContext:a,platform:e})});let p;try{p=await g.json()}catch{throw new Error("Server returned an invalid response. Try again.")}if(p.error)throw new Error(p.error);x.push({role:"assistant",content:p.content}),(k=document.getElementById("tutor-loading"))==null||k.remove();const m=document.createElement("div");m.className="tutor-msg assistant",m.innerHTML=te(p.content,t.hasRunnableCode),v.appendChild(m)}catch(g){(b=document.getElementById("tutor-loading"))==null||b.remove(),x.pop();let p;g.message.includes("ANTHROPIC_API_KEY")||g.message.includes("Invalid API key")?p="API key issue. Make sure ANTHROPIC_API_KEY is set in your .env file and restart the dev server.":g.message.includes("Rate limited")?p="Rate limited — wait a few seconds and try again.":g.message.includes("Failed to fetch")||g.message.includes("NetworkError")?p="Network error. Is the dev server running? (npm run dev)":p=`Error: ${g.message}`,v.innerHTML+=`<div class="tutor-msg system" style="color: #f472b6;">${M(p)}</div>`}h=!1,S.disabled=!1,v.scrollTop=v.scrollHeight,document.getElementById("tutor-input").value=""}if(t.hasRunnableCode){let d=null;window.__tutorRunCode=async(v,y)=>{const S=document.getElementById(v),k=S.querySelector(".tutor-preview-status"),b=S.querySelector(".tutor-preview-body");let g=decodeURIComponent(y.dataset.code);k.innerHTML=`<span class="dot" style="background:${t.color}"></span> Running...`;const p="svg-"+v;b.innerHTML=`<svg id="${p}" width="100%" viewBox="0 0 350 180" style="background:#141414;border-radius:4px;"></svg>`;try{d||(d=await H(()=>import("./index-CxHFZkRU.js").then(L=>L.d),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])));const m=d;g=g.replace(/(?:const|let|var)\s+svg\s*=\s*d3\.(select|create)\([^)]*\)[\s\S]*?;/g,"// (using provided svg)").replace(/d3\.select\(["']body["']\)\.append\(["']svg["']\)[\s\S]*?;/g,"// (using provided svg)").replace(/import\s+.*from\s+['"]d3['"];?\s*/g,"");const w=m.select(`#${p}`);new Function("d3","svg",g)(m,w);const C=w.selectAll("*").size()>0;S.classList.add("has-output"),k.innerHTML=C?'<span class="dot"></span> Output':`<span class="dot" style="background:${t.color}"></span> Ran (no visible output)`,y.textContent="Re-run"}catch(m){k.innerHTML='<span class="dot" style="background:#f472b6"></span> Error',b.innerHTML+=`<div class="tutor-preview-error">${M(m.message)}</div>`}}}window.__tutorAsk=d=>{document.getElementById("tutor-input").value=d,f(d)},window.__tutorExplainBack=()=>{c||n.click();const d=P();f(d.explain)},window.__tutorQuizMe=()=>{c||n.click();const d=P();f(d.quiz)},window.__tutorRealWorld=()=>{c||n.click();const d=P();f(d.realWorld)},document.getElementById("tutor-send").addEventListener("click",()=>{f(document.getElementById("tutor-input").value)}),document.getElementById("tutor-input").addEventListener("keydown",d=>{d.key==="Enter"&&!d.shiftKey&&(d.preventDefault(),f(d.target.value))}),document.getElementById("tutor-input").addEventListener("input",function(){this.style.height="auto",this.style.height=Math.min(this.scrollHeight,100)+"px"})}function oe(e){return`
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
    border-color: ${e};
    color: ${e};
  }
`}function se(e){return e.closest(".quiz")!==null||e.closest(".exercise")!==null}function ie(){const e=T(),t=R[e]||R.d3,s=document.createElement("style");s.textContent=oe(t.color),document.head.appendChild(s),document.querySelectorAll(".content pre code").forEach(o=>{const a=o.parentElement;if(se(a))return;const i=document.createElement("button");i.className="explain-btn",i.textContent="Explain this ?",i.type="button",i.addEventListener("click",()=>{const r=o.textContent,u=document.getElementById("tutor-toggle"),l=document.getElementById("tutor-panel");u&&l&&!l.classList.contains("open")&&u.click();const x="Explain this code to me line by line in plain English:\n\n```\n"+r+"\n```";typeof window.__tutorAsk=="function"&&window.__tutorAsk(x)}),a.appendChild(i)})}function ae(e){return`
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
    background: ${e};
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
    font-family: var(--sans);
  }

  #section-nav .section-nav-dot-wrapper:hover .section-nav-tooltip {
    opacity: 1;
  }

  @media (max-width: 900px) {
    #section-nav {
      display: none;
    }
  }
`}function re(){const e=document.querySelector(".content");if(!e)return;const t=Array.from(e.querySelectorAll("h2"));if(t.length===0)return;t.forEach((c,h)=>{c.id||(c.id="section-"+h)});const s=T(),n=R[s]||R.d3,o=document.createElement("style");o.textContent=ae(n.color),document.head.appendChild(o);const a=document.createElement("nav");a.id="section-nav",a.setAttribute("aria-label","Section navigation");const i=document.createElement("div");i.className="section-nav-track";const r=document.createElement("div");r.className="section-nav-line",i.appendChild(r);const u=[];t.forEach((c,h)=>{const f=document.createElement("div");f.className="section-nav-dot-wrapper";const d=document.createElement("button");d.className="section-nav-dot",d.setAttribute("aria-label",c.textContent.trim()),d.addEventListener("click",()=>{c.scrollIntoView({behavior:"smooth"})});const v=document.createElement("span");v.className="section-nav-tooltip",v.textContent=c.textContent.trim(),f.appendChild(d),f.appendChild(v),i.appendChild(f),u.push(d)}),a.appendChild(i),document.body.appendChild(a);const l=new IntersectionObserver(c=>{c.forEach(h=>{if(h.isIntersecting){const f=t.indexOf(h.target);f!==-1&&x(f)}})},{rootMargin:"0px 0px -70% 0px",threshold:0});t.forEach(c=>l.observe(c));function x(c){u.forEach((h,f)=>{h.classList.toggle("active",f===c)})}x(0)}const le=`
  #audio-reader-btn {
    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
    z-index: 9000; background: #1a1a1a; color: #ccc; border: 1px solid #333;
    padding: 8px 20px; border-radius: 6px; cursor: pointer;
    font-size: 14px; font-family: var(--sans);
    display: flex; align-items: center; gap: 6px;
    transition: opacity 0.2s, transform 0.3s;
  }
  #audio-reader-btn:hover { background: #222; color: #fff; }

  #audio-reader-bar {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 9000;
    background: #1a1a1a; border-top: 1px solid #333;
    padding: 8px 16px; display: none; align-items: center; gap: 12px;
    font-family: var(--sans);
    transform: translateY(100%); transition: transform 0.3s ease;
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
`;function ce(){const e=document.querySelector(".content");if(!e)return[];const t=[];let s={title:"Introduction",texts:[],headingEl:null};const n=e.querySelectorAll("h2, h3, p, li, .aha, .callout, .warning, pre, .side-by-side");for(const o of n){if(o.tagName==="H2"){s.texts.length&&t.push(s),s={title:o.textContent.trim(),texts:[],headingEl:o},s.texts.push(o.textContent.trim()+".");continue}if(!(o.closest(".aha")&&o.tagName!=="DIV"&&!o.classList.contains("aha"))&&!(o.closest(".callout")&&o.tagName!=="DIV"&&!o.classList.contains("callout"))&&!(o.closest(".warning")&&o.tagName!=="DIV"&&!o.classList.contains("warning"))&&!(o.closest(".side-by-side")&&!o.classList.contains("side-by-side"))&&!(o.closest(".quiz")||o.closest(".exercise"))){if(o.classList.contains("side-by-side")){const a=o.querySelectorAll(":scope > div");if(a.length>=2){const i=a[0].querySelector("h5"),r=a[1].querySelector("h5");s.texts.push("Comparison: "+(i?i.textContent.trim():"First version")+", versus, "+(r?r.textContent.trim():"Second version")+".")}continue}if(o.tagName==="PRE"){s.texts.push("Code example.");continue}if(o.classList.contains("aha")||o.classList.contains("callout")||o.classList.contains("warning")){const a=o.querySelector("p");a&&s.texts.push(a.textContent.trim());continue}if(o.tagName==="H3"){s.texts.push(o.textContent.replace(/[<>]/g,"").trim()+".");continue}if(o.tagName==="P"||o.tagName==="LI"){const a=o.textContent.trim();a.length>0&&s.texts.push(a)}}}return s.texts.length&&t.push(s),t}function de(e){const t=["samantha","alex","enhanced","premium","natural"];for(const s of t){const n=e.find(o=>o.name.toLowerCase().includes(s)&&o.lang.startsWith("en"));if(n)return n}return e.find(s=>s.lang.startsWith("en")&&s.default)||e.find(s=>s.lang.startsWith("en"))||e[0]||null}function ue(){if(!window.location.pathname.includes("/lessons/")||!("speechSynthesis"in window))return;const e=window.speechSynthesis;let t=[],s=0,n=!1,o=null,a=1,i=null;const r=document.createElement("style");r.textContent=le,document.head.appendChild(r);const u=document.createElement("button");u.id="audio-reader-btn",u.innerHTML="▶ Listen to Lesson",document.body.appendChild(u);const l=document.createElement("div");l.id="audio-reader-bar",l.innerHTML=`
    <button class="play-btn" data-action="play">▶</button>
    <button data-action="prev">⏮</button>
    <button data-action="next">⏭</button>
    <span class="section-name">Loading...</span>
    <select data-action="speed">
      <option value="0.75">0.75x</option>
      <option value="1" selected>1x</option>
      <option value="1.25">1.25x</option>
      <option value="1.5">1.5x</option>
    </select>
    <button data-action="close">✕</button>
  `,document.body.appendChild(l);const x=l.querySelector('[data-action="play"]'),c=l.querySelector(".section-name"),h=l.querySelector('[data-action="speed"]');function f(){const m=e.getVoices();m.length&&(o=de(m))}f(),e.addEventListener("voiceschanged",f);function d(){u.style.display="none",l.style.display="flex",requestAnimationFrame(()=>{l.classList.add("visible")})}function v(){l.classList.remove("visible"),setTimeout(()=>{l.style.display="none",u.style.display="flex"},300)}function y(m){var E;i&&i.classList.remove("audio-reading-highlight");const w=(E=t[m])==null?void 0:E.headingEl;w&&(w.classList.add("audio-reading-highlight"),i=w)}function S(){var w;x.textContent=n?"⏸":"▶";const m=((w=t[s])==null?void 0:w.title)||"";c.textContent=`${s+1}/${t.length}: ${m}`}function k(m){if(e.cancel(),m<0||m>=t.length){p();return}s=m,n=!0,y(m),S();const w=t[m].texts.join(" "),E=w.match(/[^.!?]+[.!?]+|[^.!?]+$/g)||[w];let C=[],L="";for(const A of E)(L+A).length>200&&L&&(C.push(L.trim()),L=""),L+=A+" ";L.trim()&&C.push(L.trim());let I=0;function N(){if(!n)return;if(I>=C.length){s+1<t.length?k(s+1):p();return}const A=new SpeechSynthesisUtterance(C[I]);o&&(A.voice=o),A.rate=a,A.onend=()=>{I++,N()},A.onerror=()=>{I++,N()},e.speak(A)}N()}function b(){n=!1,e.pause(),S()}function g(){n=!0,e.resume(),S()}function p(){n=!1,e.cancel(),i&&i.classList.remove("audio-reading-highlight"),i=null,S(),v(),checkXP()}u.addEventListener("click",()=>{t=ce(),t.length&&(s=0,d(),k(0))}),l.addEventListener("click",m=>{var E;const w=(E=m.target.dataset)==null?void 0:E.action;w&&(w==="play"&&(n?b():e.paused?g():k(s)),w==="prev"&&k(Math.max(0,s-1)),w==="next"&&k(Math.min(t.length-1,s+1)),w==="close"&&p())}),h.addEventListener("change",()=>{a=parseFloat(h.value),n&&k(s)}),document.addEventListener("visibilitychange",()=>{document.hidden&&n&&b()}),window.addEventListener("beforeunload",()=>{e.cancel()})}const pe=`
  #podcast-btn {
    position: fixed; bottom: 20px; left: 50%; transform: translateX(calc(-50% + 110px));
    z-index: 9001; background: #1a1a1a; color: #ccc; border: 1px solid #333;
    padding: 8px 20px; border-radius: 6px; cursor: pointer;
    font-size: 14px; font-family: var(--sans);
    display: none; align-items: center; gap: 6px;
    transition: opacity 0.2s, transform 0.3s;
  }
  #podcast-btn:hover { background: #222; color: #fff; }
  #podcast-btn.solo { transform: translateX(-50%); }

  #podcast-bar {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 9002;
    background: #1a1a1a; border-top: 1px solid #333;
    padding: 10px 16px; display: none; flex-direction: column; gap: 8px;
    font-family: var(--sans);
    transform: translateY(100%); transition: transform 0.3s ease;
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
`;function me(){const t=window.location.pathname.match(/\/(d3|django|sql)\/lessons\/([^/]+)/);if(!t)return null;const[,s,n]=t;return`/audio/${s}/${n}.mp3`}function D(e){if(!e||!isFinite(e))return"0:00";const t=Math.floor(e/60),s=Math.floor(e%60);return`${t}:${s.toString().padStart(2,"0")}`}function fe(){if(!window.location.pathname.includes("/lessons/"))return;const e=me();if(!e)return;const t=new Audio;t.preload="metadata";const s=document.createElement("style");s.textContent=pe,document.head.appendChild(s);const n=document.createElement("button");n.id="podcast-btn",n.innerHTML="🎧 Podcast",document.body.appendChild(n);const o=document.createElement("div");o.id="podcast-bar",o.innerHTML=`
    <div class="podcast-top">
      <button class="play-btn" data-action="play">▶</button>
      <span class="podcast-title">Podcast</span>
      <span class="podcast-label">Loading...</span>
      <select data-action="speed">
        <option value="0.75">0.75x</option>
        <option value="1" selected>1x</option>
        <option value="1.25">1.25x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select>
      <button data-action="back30">⏪ 30s</button>
      <button data-action="fwd30">30s ⏩</button>
      <button data-action="close">✕</button>
    </div>
    <div class="podcast-progress">
      <span class="podcast-time" data-role="current">0:00</span>
      <input type="range" min="0" max="100" value="0" step="0.1" data-role="scrubber">
      <span class="podcast-time" data-role="duration">0:00</span>
    </div>
  `,document.body.appendChild(o);const a=o.querySelector('[data-action="play"]'),i=o.querySelector(".podcast-label"),r=o.querySelector('[data-action="speed"]'),u=o.querySelector('[data-role="scrubber"]'),l=o.querySelector('[data-role="current"]'),x=o.querySelector('[data-role="duration"]');t.src=e,t.addEventListener("loadedmetadata",()=>{n.style.display="flex",x.textContent=D(t.duration);const y=document.querySelector(".header h1"),S=y?y.textContent.trim():document.title;i.textContent=S;const k=document.getElementById("audio-reader-btn");k?(k.style.transform="translateX(calc(-50% - 70px))",n.classList.remove("solo")):n.classList.add("solo")}),t.addEventListener("error",()=>{n.style.display="none"});function c(){n.style.display="none";const y=document.getElementById("audio-reader-btn");y&&(y.style.display="none"),o.style.display="flex",requestAnimationFrame(()=>o.classList.add("visible"))}function h(){o.classList.remove("visible"),setTimeout(()=>{o.style.display="none",n.style.display="flex";const y=document.getElementById("audio-reader-btn");y&&(y.style.display="flex")},300)}function f(){a.textContent=t.paused?"▶":"⏸"}n.addEventListener("click",()=>{c(),t.play(),f()}),o.addEventListener("click",y=>{var k;const S=(k=y.target.dataset)==null?void 0:k.action;S&&(S==="play"&&(t.paused?t.play():t.pause(),f()),S==="back30"&&(t.currentTime=Math.max(0,t.currentTime-30)),S==="fwd30"&&(t.currentTime=Math.min(t.duration,t.currentTime+30)),S==="close"&&(t.pause(),f(),h()))}),r.addEventListener("change",()=>{t.playbackRate=parseFloat(r.value)}),t.addEventListener("timeupdate",()=>{u.__dragging||(u.value=t.currentTime/t.duration*100||0,l.textContent=D(t.currentTime))}),t.addEventListener("ended",()=>{f()}),u.addEventListener("mousedown",()=>{u.__dragging=!0}),u.addEventListener("touchstart",()=>{u.__dragging=!0},{passive:!0}),u.addEventListener("input",()=>{l.textContent=D(u.value/100*t.duration)});const d=()=>{u.__dragging&&(u.__dragging=!1,t.currentTime=u.value/100*t.duration)};u.addEventListener("mouseup",d),u.addEventListener("touchend",d),u.addEventListener("change",d);const v=`podcast-pos:${e}`;t.addEventListener("timeupdate",()=>{t.currentTime>5&&localStorage.setItem(v,t.currentTime.toString())}),t.addEventListener("loadedmetadata",()=>{const y=parseFloat(localStorage.getItem(v));y&&y<t.duration-10&&(t.currentTime=y)}),document.addEventListener("visibilitychange",()=>{document.hidden&&!t.paused&&(t.pause(),f())})}const z=[[0,"Novice"],[4,"Familiar"],[6,"Competent"],[8,"Proficient"],[10,"Expert"]];function ge(e){let t=z[0][1];for(const[s,n]of z)e>=s&&(t=n);return t}function he(){const e=T();return e==="django"?{name:"Django",topics:"Python syntax, Django ORM, views, templates, REST framework, URL routing, middleware"}:e==="sql"?{name:"SQL",topics:"SELECT, JOINs, aggregation, window functions, indexes, subqueries, CTEs"}:{name:"D3.js",topics:"SVG elements, d3.select/selectAll, scales (linear/band/time), data binding (.data/.join), axes, maps/projections, transitions, path generators"}}function B(){const e=T();return e==="hub"?"skill-tests":`skill-tests-${e}`}function xe(){try{return JSON.parse(localStorage.getItem(B()))||[]}catch{return[]}}function be(e){localStorage.setItem(B(),JSON.stringify(e.slice(-20)))}const ve=`
#st-btn{position:fixed;bottom:24px;right:96px;z-index:9997;background:#1a1a1a;border:1px solid #444;border-radius:6px;padding:8px 16px;color:#ccc;font-size:13px;font-family:var(--sans);cursor:pointer;transition:all .2s;white-space:nowrap}
#st-btn:hover{border-color:#fff;color:#fff}
#st-overlay{position:fixed;inset:0;z-index:10000;background:#0a0a0aee;display:none;align-items:center;justify-content:center;font-family:var(--sans);overflow-y:auto}
#st-overlay.open{display:flex}
#st-card{background:#141414;border:1px solid #333;border-radius:8px;width:100%;max-width:600px;margin:24px;padding:32px;position:relative;animation:st-in .3s ease}
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
.st-results .st-score-big{font-size:48px;font-weight:600;color:#fff;margin-bottom:4px}
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
`;async function ye(e,t){const s=T(),n=`You are generating a skill assessment question for ${e.name}.
Difficulty level: ${t}
Topics to cover: ${e.topics}
Generate a multiple choice question with exactly 4 options labeled A, B, C, D.
Respond in this exact JSON format:
{"question": "...", "options": {"A": "...", "B": "...", "C": "...", "D": "..."}, "correct": "A", "explanation": "..."}
Only respond with the JSON, nothing else.`,a=await(await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[{role:"user",content:n}],lessonContext:"Skill assessment test",platform:s})})).json();if(a.error)throw new Error(a.error);let i=a.content.trim();const r=i.match(/```(?:json)?\s*([\s\S]*?)```/);return r&&(i=r[1].trim()),JSON.parse(i)}function we(e,t){const s=["easy","medium","hard"],n=s.indexOf(e);return t&&n<2?s[n+1]:!t&&n>0?s[n-1]:e}function j(e){const t=Math.floor(e/60),s=Math.floor(e%60);return t>0?`${t}m ${s}s`:`${s}s`}function Se(e,t){const n=[...e,{score:t}].slice(-10);return n.map((o,a)=>{const i=o.score/10*100;return`<div class="st-bar${a===n.length-1?" current":""}" style="height:${Math.max(i,5)}%">
      <span class="st-bar-label">${o.score}</span>
    </div>`}).join("")}function ke(){const e=window.location.pathname;if(e!=="/"&&e!=="/index.html")return;const t=document.createElement("style");t.textContent=ve,document.head.appendChild(t);const s=document.createElement("button");s.id="st-btn",s.textContent="Test My Skills",document.body.appendChild(s);const n=document.createElement("div");n.id="st-overlay",document.body.appendChild(n);const o=he();let a=0,i=0,r="medium",u=0,l=0,x=[],c=null;function h(){a=0,i=0,r="medium",x=[],u=Date.now(),n.classList.add("open"),v()}function f(){n.classList.remove("open"),c&&clearInterval(c)}function d(){l=Date.now(),c&&clearInterval(c),c=setInterval(()=>{const b=document.getElementById("st-timer");if(b){const g=Math.floor((Date.now()-l)/1e3),p=Math.floor((Date.now()-u)/1e3);b.textContent=`${j(g)} | Total: ${j(p)}`}},500)}async function v(){var b;n.innerHTML=`<div id="st-card">
      <button class="st-close" id="st-x">&times;</button>
      <div class="st-timer" id="st-timer">--</div>
      <div class="st-progress"><div class="st-progress-fill" style="width:${a/10*100}%"></div></div>
      <div class="st-loading">Generating question ${a+1} of 10</div>
    </div>`,document.getElementById("st-x").onclick=f,d();try{const g=await ye(o,r);y(g)}catch(g){const p=document.getElementById("st-card");if(p){const m=p.querySelector(".st-loading");m&&(m.innerHTML=`<div class="st-error">Failed to load question. ${g.message}<br><button class="st-next" onclick="this.closest('#st-overlay').querySelector('.st-loading').textContent='Retrying...'">Retry</button></div>`),(b=p.querySelector(".st-next"))==null||b.addEventListener("click",()=>v())}}}function y(b){const g=document.getElementById("st-card");g.innerHTML=`
      <button class="st-close" id="st-x">&times;</button>
      <div class="st-timer" id="st-timer">--</div>
      <div class="st-progress"><div class="st-progress-fill" style="width:${a/10*100}%"></div></div>
      <div class="st-q-num">Question ${a+1} / 10 &middot; ${r}</div>
      <div class="st-question">${$(b.question)}</div>
      <div class="st-options" id="st-opts">
        ${["A","B","C","D"].map(p=>`<button class="st-opt" data-key="${p}"><span class="st-key">${p}.</span> ${$(b.options[p])}</button>`).join("")}
      </div>`,document.getElementById("st-x").onclick=f,g.querySelectorAll(".st-opt").forEach(p=>{p.addEventListener("click",()=>S(b,p.dataset.key,g))})}function S(b,g,p){const m=p.querySelectorAll(".st-opt");m.forEach(L=>L.classList.add("locked"));const w=(Date.now()-l)/1e3;x.push(w);const E=g===b.correct;E&&i++,m.forEach(L=>{L.dataset.key===b.correct&&L.classList.add("correct"),L.dataset.key===g&&!E&&L.classList.add("wrong")}),document.getElementById("st-opts").insertAdjacentHTML("afterend",`
      <div class="st-explain">${E?"Correct!":"Incorrect."} ${$(b.explanation)}</div>
      <button class="st-next" id="st-next-btn">${a<9?"Next Question":"See Results"}</button>
    `),r=we(r,E),document.getElementById("st-next-btn").addEventListener("click",()=>{a++,a>=10?k():v()})}function k(){c&&clearInterval(c);const b=Math.floor((Date.now()-u)/1e3),g=x.length?Math.round(x.reduce((I,N)=>I+N,0)/x.length):0,p=ge(i),m=xe(),w={date:new Date().toISOString().slice(0,10),score:i,tier:p,totalTime:b,avgTime:g,difficulty:r};m.push(w),be(m);const E=Math.max(...m.map(I=>I.score)),C=m.slice(0,-1),L=i>=8?"#4ade80":i>=6?"#60a5fa":i>=4?"#fbbf24":"#f87171";n.innerHTML=`<div id="st-card"><button class="st-close" id="st-x">&times;</button>
      <div class="st-results">
        <div class="st-score-big">${i}/10</div>
        <h2 style="margin-top:0">Skill Assessment</h2>
        <div class="st-tier" style="color:${L}">${p}</div>
        <div class="st-stat-grid">
          <div class="st-stat"><div class="val">${j(b)}</div><div class="lbl">Total Time</div></div>
          <div class="st-stat"><div class="val">${j(g)}</div><div class="lbl">Avg / Question</div></div>
          <div class="st-stat"><div class="val">${r}</div><div class="lbl">Final Difficulty</div></div>
        </div>
        ${C.length>0?`
        <div class="st-history">
          <h3>Your Progress</h3>
          <div class="st-bars">${Se(C,i)}</div>
          <div class="st-best">Best: ${E}/10${i>=E&&C.length>0?" — New best!":i>=E-1&&C.length>0?" — Beat your best!":""}</div>
        </div>`:""}
        <button class="st-retry" id="st-retry">Try Again</button>
      </div>
    </div>`,document.getElementById("st-x").onclick=f,document.getElementById("st-retry").addEventListener("click",h)}s.addEventListener("click",h)}function $(e){return e?e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}ne();ie();re();ue();fe();ke();export{R as P,T as d};
