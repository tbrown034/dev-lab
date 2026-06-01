// ─── The Scroll — Personas, Types & Metadata ───
// Posts are loaded from JSON files in /feed/content/

export const PERSONAS = {
  d3: {
    bindData: { handle: 'bindData', name: 'Bindi Datason', avatar: '📊', bio: 'enter/update/exit is a lifestyle. d3.js daily.' },
    scaleLinear: { handle: 'scaleLinear', name: 'Lin S. Cale', avatar: '📐', bio: 'domain → range. everything else is noise.' },
    geoProjection: { handle: 'geoProjection', name: 'Geo P.', avatar: '🌍', bio: 'flattening globes since 2014. mercator truther.' },
    svgArtist: { handle: 'svgArtist', name: 'Essvee Jeeson', avatar: '🎨', bio: 'pure SVG. no canvas. no compromises.' },
    transitionEase: { handle: 'transition_ease', name: 'Tran Sition', avatar: '✨', bio: "if it doesn't animate, did it even render?" },
  },
  django: {
    managePy: { handle: 'manage_py', name: 'Manny Jee', avatar: '🐍', bio: 'python manage.py everything. batteries included.' },
    queryset: { handle: 'queryset', name: 'Q. Setson', avatar: '🔍', bio: 'n+1 queries? not on my watch.' },
    middlewareStack: { handle: 'middleware_stack', name: 'Mida Leware', avatar: '🥞', bio: 'request in, response out. the stack is sacred.' },
    templateTag: { handle: 'template_tag', name: 'Tanya Taggart', avatar: '🏷️', bio: 'server-rendered and proud. no JS required.' },
    migrationRunner: { handle: 'migration_runner', name: 'Miggy Rations', avatar: '📦', bio: 'squashing migrations is self-care.' },
  },
  sql: {
    innerJoin: { handle: 'inner_join', name: 'Joi N. Tables', avatar: '🤝', bio: 'LEFT JOIN enthusiast. NULL aware. index everything.' },
    groupBy: { handle: 'group_by', name: 'Greta Grouper', avatar: '📊', bio: "if you're not aggregating, what are you even doing?" },
    bobbyTables: { handle: 'bobby_tables', name: 'Bobby Tables', avatar: '💀', bio: 'parameterize your queries. i beg you.' },
    windowFn: { handle: 'window_fn', name: 'Winda Function', avatar: '🪟', bio: 'ROW_NUMBER() OVER() is the answer. what was the question?' },
    nullHandler: { handle: 'null_handler', name: 'Nully McNull', avatar: '❓', bio: 'NULL != NULL. yes i will die on this hill.' },
  },
  jsts: {
    closureKing: { handle: 'closure_king', name: 'Claude Zure', avatar: '🎒', bio: 'closures are just functions with backpacks. fight me.' },
    typeNarrow: { handle: 'type_narrow', name: 'Ty Narrow', avatar: '🔬', bio: 'if it compiles, it works. typeof !== "undefined" gang.' },
    eventLooper: { handle: 'event_looper', name: 'Eva Loop', avatar: '🔄', bio: 'microtask queue supremacist. setTimeout(fn, 0) is a lie.' },
    protoChain: { handle: 'proto_chain', name: 'Proto Typal', avatar: '⛓️', bio: '__proto__ walked so class could run.' },
    asyncAwait: { handle: 'async_await', name: 'Promise Allison', avatar: '🤞', bio: 'i Promise i will .catch() all my errors. await me.' },
  },
  react: {
    fiberNode: { handle: 'fiber_node', name: 'Faye Burr', avatar: '🧵', bio: 'reconciliation is just diffing with opinions. react internals daily.' },
    useEffect: { handle: 'use_effect', name: 'Effie Hooks', avatar: '🪝', bio: 'useEffect is for synchronization, not for side effects. yes there is a difference.' },
    serverComp: { handle: 'server_comp', name: 'Serena Component', avatar: '🖥️', bio: 'RSC is not SSR. i will explain this until i die.' },
    stateManager: { handle: 'state_mgr', name: 'Zuzu Standish', avatar: '🏪', bio: 'prop drilling builds character. but zustand builds apps.' },
    suspenseful: { handle: 'suspenseful', name: 'Sus Pence', avatar: '⏳', bio: 'loading states are a UX decision, not an afterthought.' },
  },
  css: {
    cascader: { handle: 'cascader', name: 'Casey Cade', avatar: '🌊', bio: 'specificity is not a score. it is a coordinate. (0,1,0) gang.' },
    gridMaster: { handle: 'grid_master', name: 'Griff Grid', avatar: '📐', bio: 'fr units are the only units. everything else is a suggestion.' },
    tailwinder: { handle: 'tailwinder', name: 'Tay Elwind', avatar: '💨', bio: 'utility-first is not lazy. it is architecture. @apply is cope.' },
    animista: { handle: 'animista', name: 'Annie Mation', avatar: '✨', bio: 'will-change: transform is not a performance hack. it is a promise.' },
    tokenizer: { handle: 'tokenizer', name: 'Toki Dezine', avatar: '🎨', bio: 'if your color is hardcoded, your system is broken.' },
  },
  ai: {
    prompter: { handle: 'prompter', name: 'Priya Promptson', avatar: '💬', bio: 'system prompts are just personality transplants for robots.' },
    ragBuilder: { handle: 'rag_builder', name: 'Rag E. Builder', avatar: '📚', bio: 'retrieval-augmented generation is just open-book exams for AI.' },
    agentSmith: { handle: 'agent_smith', name: 'Agent Aiden', avatar: '🤖', bio: 'autonomous agents are just interns with API keys.' },
    embedder: { handle: 'embedder', name: 'Emma Bedding', avatar: '📍', bio: 'everything is a vector if you squint hard enough.' },
    ethicsBot: { handle: 'ethics_bot', name: 'Ethel Ethics', avatar: '⚖️', bio: 'AI ethics is not a feature. it is a constraint. and constraints are good.' },
  },
  python: {
    pythonic: { handle: 'pythonic', name: 'Pia Thonic', avatar: '🐍', bio: 'readability counts. import this.' },
    listComp: { handle: 'list_comp', name: 'Lister Comp', avatar: '🧮', bio: '[x for x in life if x.worth_it]' },
    duckTyper: { handle: 'duck_typer', name: 'Ducky T.', avatar: '🦆', bio: 'if it quacks, ship it. EAFP over LBYL.' },
  },
  pandas: {
    dataFrame: { handle: 'dataframe', name: 'Daphne Frame', avatar: '🐼', bio: 'everything is a DataFrame if you believe.' },
    groupByPd: { handle: 'groupby_pd', name: 'Greta Bye', avatar: '🧺', bio: 'split-apply-combine is a way of life.' },
    naDropper: { handle: 'na_dropper', name: 'Nan Dropper', avatar: '🕳️', bio: 'NaN is not a number, but it is a problem.' },
  },
  r: {
    tidyverse: { handle: 'tidyverse', name: 'Tidy Verse', avatar: '📊', bio: 'pipe it, mutate it, ggplot it.' },
    vectorize: { handle: 'vectorize', name: 'Vic Torize', avatar: '➗', bio: 'loops are a code smell in R. vectorize everything.' },
    dplyrFan: { handle: 'dplyr_fan', name: 'Dee Plier', avatar: '🔧', bio: 'filter, select, mutate, summarise. the four verbs.' },
  },
};

// Flat lookup: handle string → persona object
export const PERSONAS_FLAT = {};
for (const track of Object.values(PERSONAS)) {
  for (const persona of Object.values(track)) {
    PERSONAS_FLAT[persona.handle] = persona;
    // Also index by camelCase key (e.g., "bindData", "managePy")
    const key = Object.keys(track).find(k => track[k] === persona);
    if (key && key !== persona.handle) PERSONAS_FLAT[key] = persona;
  }
}

export const POST_TYPES = {
  interview:   { label: 'INTERVIEW Q',          color: '#eab308' },
  tip:         { label: 'PRO TIP',              color: '#4ade80' },
  hotTake:     { label: 'HOT TAKE',             color: '#f97316' },
  spotBug:     { label: 'SPOT THE BUG',         color: '#ef4444' },
  mentalModel: { label: 'MENTAL MODEL',         color: '#818cf8' },
  poll:        { label: 'POLL',                 color: '#06b6d4' },
  til:         { label: 'TIL',                  color: '#a3e635' },
  thread:      { label: 'THREAD',               color: '#c084fc' },
  ratiod:      { label: "RATIO'D",              color: '#fb7185' },
  eli5:        { label: 'ELI5',                 color: '#fbbf24' },
  commitMsg:   { label: 'COMMIT MSG FROM HELL', color: '#f87171' },
  slackPost:   { label: 'OVERHEARD IN SLACK',   color: '#38bdf8' },
};

export const TRACK_META = {
  all:    { name: 'The Scroll', subtitle: 'your algorithm, but useful' },
  d3:     { name: 'The Bindery', subtitle: 'data in, pixels out' },
  django: { name: 'The Shell', subtitle: 'batteries included, opinions strong' },
  sql:    { name: 'The Table', subtitle: 'SELECT wisdom FROM experience' },
  jsts:   { name: 'The Runtime', subtitle: 'closures, types, and event loops' },
  react:  { name: 'The Fiber', subtitle: 'reconciliation is just diffing with opinions' },
  css:    { name: 'The Cascade', subtitle: 'specificity is a coordinate, not a score' },
  ai:     { name: 'The Prompt', subtitle: 'teaching machines to think clearly' },
  python: { name: 'The Snake Pit', subtitle: 'readability counts, import this' },
  pandas: { name: 'The DataFrame', subtitle: 'split, apply, combine, repeat' },
  r:      { name: 'The Tidyverse', subtitle: 'pipe it, mutate it, plot it' },
};

export const TRACK_COLORS = {
  d3: '#f97316', django: '#22c55e', sql: '#3b82f6',
  jsts: '#eab308', react: '#06b6d4', css: '#a855f7', ai: '#f472b6',
  python: '#4b8bbe', pandas: '#e70488', r: '#276dc3',
};
