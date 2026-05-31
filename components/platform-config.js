export function detectPlatform() {
  const path = window.location.pathname;
  if (path.startsWith('/d3/') || path === '/d3') return 'd3';
  if (path.startsWith('/python/') || path === '/python') return 'python';
  if (path.startsWith('/pandas/') || path === '/pandas') return 'pandas';
  if (path.startsWith('/r/') || path === '/r') return 'r';
  if (path.startsWith('/django/') || path === '/django') return 'django';
  if (path.startsWith('/sql/') || path === '/sql') return 'sql';
  if (path.startsWith('/feed/') || path === '/feed') return 'feed';
  if (path.startsWith('/jsts/') || path === '/jsts') return 'jsts';
  if (path.startsWith('/react/') || path === '/react') return 'react';
  if (path.startsWith('/css-design/') || path === '/css-design') return 'css-design';
  if (path.startsWith('/ai-llm/') || path === '/ai-llm') return 'ai-llm';
  if (path.startsWith('/courses/') || path === '/courses') return 'courses';
  if (path.startsWith('/pod/') || path === '/pod') return 'pod';
  return 'hub';
}

export const PLATFORM_CONFIG = {
  d3: { name: 'D3', fullName: 'D3 Tutor', color: '#f97316', colorHover: '#fb923c', userTextColor: '#000', placeholder: 'Ask about D3...', hasRunnableCode: true },
  python: { name: 'Python', fullName: 'Python Tutor', color: '#4b8bbe', colorHover: '#6ba3d0', userTextColor: '#fff', placeholder: 'Ask about Python...', hasRunnableCode: false },
  pandas: { name: 'Pandas', fullName: 'Pandas Tutor', color: '#e70488', colorHover: '#f23ba6', userTextColor: '#fff', placeholder: 'Ask about Pandas or data analysis...', hasRunnableCode: false },
  r: { name: 'R', fullName: 'R Tutor', color: '#276dc3', colorHover: '#4a8ad4', userTextColor: '#fff', placeholder: 'Ask about R or statistics...', hasRunnableCode: false },
  django: { name: 'Django', fullName: 'Django Tutor', color: '#22c55e', colorHover: '#4ade80', userTextColor: '#000', placeholder: 'Ask about Django...', hasRunnableCode: false },
  sql: { name: 'SQL', fullName: 'SQL Tutor', color: '#3b82f6', colorHover: '#60a5fa', userTextColor: '#fff', placeholder: 'Ask about SQL...', hasRunnableCode: false },
  jsts: { name: 'JS/TS', fullName: 'JS/TS Tutor', color: '#eab308', colorHover: '#facc15', userTextColor: '#000', placeholder: 'Ask about JavaScript or TypeScript...', hasRunnableCode: false },
  react: { name: 'React', fullName: 'React Tutor', color: '#06b6d4', colorHover: '#22d3ee', userTextColor: '#000', placeholder: 'Ask about React or Next.js...', hasRunnableCode: false },
  'css-design': { name: 'CSS', fullName: 'CSS & Design Tutor', color: '#a855f7', colorHover: '#c084fc', userTextColor: '#000', placeholder: 'Ask about CSS or design...', hasRunnableCode: false },
  'ai-llm': { name: 'AI/LLM', fullName: 'AI & LLM Tutor', color: '#f472b6', colorHover: '#f9a8d4', userTextColor: '#000', placeholder: 'Ask about AI, LLMs, or the Claude API...', hasRunnableCode: false },
  courses: { name: 'Courses', fullName: 'Course Guide', color: '#8b5cf6', colorHover: '#a78bfa', userTextColor: '#fff', placeholder: 'Ask about courses...', hasRunnableCode: false },
  pod: { name: 'Podcast', fullName: 'Podcast Guide', color: '#ec4899', colorHover: '#f472b6', userTextColor: '#000', placeholder: 'Ask about the podcast...', hasRunnableCode: false },
};
