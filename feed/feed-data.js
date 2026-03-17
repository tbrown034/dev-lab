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
};

export const TRACK_COLORS = { d3: '#f97316', django: '#22c55e', sql: '#3b82f6' };
