export function detectPlatform() {
  const path = window.location.pathname;
  if (path.startsWith('/d3/') || path === '/d3') return 'd3';
  if (path.startsWith('/django/') || path === '/django') return 'django';
  if (path.startsWith('/sql/') || path === '/sql') return 'sql';
  if (path.startsWith('/feed/') || path === '/feed') return 'feed';
  return 'hub';
}

export const PLATFORM_CONFIG = {
  d3: { name: 'D3', fullName: 'D3 Tutor', color: '#f97316', colorHover: '#fb923c', userTextColor: '#000', placeholder: 'Ask about D3...', hasRunnableCode: true },
  django: { name: 'Django', fullName: 'Django Tutor', color: '#22c55e', colorHover: '#4ade80', userTextColor: '#000', placeholder: 'Ask about Python or Django...', hasRunnableCode: false },
  sql: { name: 'SQL', fullName: 'SQL Tutor', color: '#3b82f6', colorHover: '#60a5fa', userTextColor: '#fff', placeholder: 'Ask about SQL...', hasRunnableCode: false },
};
