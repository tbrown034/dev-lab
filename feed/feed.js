// ─── The Scroll — Feed Logic ───
import { PERSONAS_FLAT, POST_TYPES, TRACK_META, TRACK_COLORS } from './feed-data.js';

// ─── State ───
let allPosts = [];
let currentFilter = 'all';
let focusedIndex = -1;
let likedPosts = JSON.parse(localStorage.getItem('scroll-likes') || '{}');
let bookmarkedPosts = JSON.parse(localStorage.getItem('scroll-bookmarks') || '{}');
let userComments = JSON.parse(localStorage.getItem('scroll-comments') || '{}');

// User profile (for comments)
const USER_AVATAR = '/assets/trevor-avatar.jpeg'; // fallback to initials if missing
const USER_NAME = 'Trevor';

// ─── Helpers ───
function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function fmtContent(text) {
  return esc(text).replace(/\n/g, '<br>').replace(/`([^`]+)`/g, '<code>$1</code>');
}

// ─── Load Posts from JSON ───
async function loadPosts() {
  const container = document.getElementById('feed-posts');
  container.innerHTML = '<div class="feed-loading"><span class="loading-dot"></span><span class="loading-dot"></span><span class="loading-dot"></span></div>';

  try {
    const [d3, django, sql] = await Promise.all([
      fetch('/feed/content/d3.json').then(r => r.json()),
      fetch('/feed/content/django.json').then(r => r.json()),
      fetch('/feed/content/sql.json').then(r => r.json()),
    ]);
    allPosts = resolvePosts([...d3, ...django, ...sql]);
  } catch (err) {
    console.error('Failed to load feed:', err);
    container.innerHTML = '<div class="feed-empty">Failed to load the feed. Try refreshing.</div>';
    return;
  }

  renderFeed();
}

function resolvePosts(posts) {
  return posts.map(post => ({
    ...post,
    author: PERSONAS_FLAT[post.author] || { handle: post.author, name: post.author, avatar: '👤', bio: '' },
    comments: (post.comments || []).map(c => ({
      ...c,
      author: PERSONAS_FLAT[c.author] || { handle: c.author, name: c.author, avatar: '👤', bio: '' },
    })),
  }));
}

// ─── Render Feed ───
function renderFeed() {
  const container = document.getElementById('feed-posts');
  container.innerHTML = '';

  const filtered = currentFilter === 'all'
    ? allPosts
    : allPosts.filter(p => p.track === currentFilter);

  if (filtered.length === 0) {
    container.innerHTML = '<div class="feed-empty">No posts yet for this track.</div>';
    return;
  }

  filtered.forEach((post, i) => {
    const el = createPostEl(post);
    el.classList.add('reveal-on-scroll');
    el.dataset.feedIndex = i;
    container.appendChild(el);
  });

  // Entrance animations
  setupRevealObserver();
  focusedIndex = -1;
}

// ─── Create Post Element ───
function createPostEl(post) {
  const el = document.createElement('article');
  el.className = 'post';
  el.dataset.id = post.id;

  const typeInfo = POST_TYPES[post.type] || POST_TYPES.tip;
  const trackColor = TRACK_COLORS[post.track] || '#888';
  const isLiked = likedPosts[post.id];
  const isBookmarked = bookmarkedPosts[post.id];
  const savedComments = userComments[post.id] || [];
  const allComments = [...post.comments, ...savedComments];
  const totalComments = allComments.length;

  const pollHtml = post.poll ? renderPoll(post.poll, trackColor) : '';
  const linkHtml = post.link ? `<a class="post-link" href="${esc(post.link.url)}">${esc(post.link.label)}</a>` : '';

  el.innerHTML = `
    <div class="post-track-line" style="background:${trackColor}"></div>
    <div class="post-inner">
      <div class="post-avatar" style="background:${trackColor}15;border-color:${trackColor}33">
        <span>${post.author.avatar}</span>
      </div>
      <div class="post-body">
        <div class="post-header">
          <span class="post-name">${esc(post.author.name)}</span>
          <span class="post-badge" style="background:${trackColor}">${post.track.toUpperCase()}</span>
          <span class="post-handle">@${esc(post.author.handle)}</span>
          <span class="post-dot">&middot;</span>
          <span class="post-time">${post.time}</span>
        </div>
        <div class="post-type" style="color:${typeInfo.color}">${typeInfo.label}</div>
        <div class="post-content">${fmtContent(post.content)}</div>
        ${post.code ? `<pre class="post-code"><code>${esc(post.code)}</code></pre>` : ''}
        ${pollHtml}
        ${linkHtml}
        <div class="post-actions">
          <button class="action-btn comment-btn" data-id="${post.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>${totalComments || ''}</span>
          </button>
          <button class="action-btn repost-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            <span>${fmt(post.reposts)}</span>
          </button>
          <button class="action-btn like-btn ${isLiked ? 'liked' : ''}" data-id="${post.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span>${fmt((post.likes || 0) + (isLiked ? 1 : 0))}</span>
          </button>
          <button class="action-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-id="${post.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>

        <div class="post-comments ${totalComments > 0 ? '' : 'empty'}" id="comments-${post.id}">
          ${allComments.map(c => commentHtml(c, trackColor)).join('')}
        </div>

        <div class="comment-composer" id="composer-${post.id}">
          <div class="composer-avatar composer-avatar-user">
            <img src="${USER_AVATAR}" alt="" onerror="this.style.display='none';this.parentElement.textContent='TB'" />
          </div>
          <input type="text" class="composer-input" placeholder="Drop your take..." data-id="${post.id}" />
          <button class="composer-send" data-id="${post.id}" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Wire up interactions
  requestAnimationFrame(() => {
    el.querySelector('.like-btn').addEventListener('click', (e) => {
      toggleLike(post, el);
      e.stopPropagation();
    });
    el.querySelector('.bookmark-btn').addEventListener('click', () => toggleBookmark(post));
    el.querySelector('.comment-btn').addEventListener('click', () => focusComposer(post.id));

    const input = el.querySelector('.composer-input');
    const sendBtn = el.querySelector('.composer-send');
    input.addEventListener('input', () => { sendBtn.disabled = !input.value.trim(); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) submitComment(post, input);
    });
    sendBtn.addEventListener('click', () => {
      if (input.value.trim()) submitComment(post, input);
    });
  });

  return el;
}

// ─── Poll Rendering ───
function renderPoll(poll, trackColor) {
  const optionsHtml = poll.options.map((opt, i) => {
    const isTop = opt.pct === Math.max(...poll.options.map(o => o.pct));
    return `
      <div class="poll-option ${isTop ? 'poll-top' : ''}">
        <div class="poll-bar" style="width:${opt.pct}%;background:${isTop ? trackColor : trackColor + '40'}"></div>
        <span class="poll-text">${esc(opt.text)}</span>
        <span class="poll-pct">${opt.pct}%</span>
      </div>
    `;
  }).join('');

  return `
    <div class="poll-container">
      ${optionsHtml}
      <div class="poll-meta">${fmt(poll.totalVotes)} votes</div>
    </div>
  `;
}

// ─── Comment HTML ───
function commentHtml(comment, trackColor) {
  const isUser = comment.isUser;
  const isAI = comment.isAIReply;
  return `
    <div class="comment ${isUser ? 'comment-user' : ''} ${isAI ? 'comment-ai' : ''}">
      <div class="comment-line" style="background:${isUser ? '#555' : trackColor}40"></div>
      ${isUser
        ? `<div class="comment-avatar comment-avatar-user"><img src="${USER_AVATAR}" alt="" onerror="this.style.display='none';this.parentElement.textContent='TB'" /></div>`
        : `<div class="comment-avatar" style="background:${trackColor}15">${comment.author?.avatar || '🤖'}</div>`
      }
      <div class="comment-body">
        <div class="comment-header">
          <span class="comment-name">${isUser ? USER_NAME : esc(comment.author?.name || 'AI')}</span>
          ${!isUser ? `<span class="comment-handle">@${esc(comment.author?.handle || '')}</span>` : ''}
        </div>
        <div class="comment-text">${fmtContent(comment.content)}</div>
        ${comment.likes ? `<span class="comment-likes">${fmt(comment.likes)} likes</span>` : ''}
      </div>
    </div>
  `;
}

// ─── Interactions ───
function toggleLike(post, el) {
  const wasLiked = likedPosts[post.id];
  likedPosts[post.id] = !wasLiked;
  localStorage.setItem('scroll-likes', JSON.stringify(likedPosts));

  // Targeted update (no full re-render)
  const btn = el.querySelector('.like-btn');
  const svg = btn.querySelector('svg path');
  const span = btn.querySelector('span');

  if (likedPosts[post.id]) {
    btn.classList.add('liked');
    svg.setAttribute('fill', 'currentColor');
    span.textContent = fmt(post.likes + 1);
    spawnParticles(btn);
  } else {
    btn.classList.remove('liked');
    svg.setAttribute('fill', 'none');
    span.textContent = fmt(post.likes);
  }
}

function toggleBookmark(post) {
  bookmarkedPosts[post.id] = !bookmarkedPosts[post.id];
  localStorage.setItem('scroll-bookmarks', JSON.stringify(bookmarkedPosts));
  renderFeed();
}

function focusComposer(postId) {
  const input = document.querySelector(`#composer-${postId} .composer-input`);
  if (input) {
    input.focus();
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ─── Like Particle Burst ───
function spawnParticles(btn) {
  const rect = btn.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = ['#f43f5e', '#fb7185', '#f97316', '#fbbf24', '#a855f7'];

  for (let i = 0; i < 8; i++) {
    const p = document.createElement('span');
    p.className = 'like-particle';
    const angle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.5;
    const dist = 20 + Math.random() * 25;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    p.style.cssText = `
      left:${cx}px;top:${cy}px;
      background:${colors[i % colors.length]};
      --dx:${dx}px;--dy:${dy}px;
    `;
    document.body.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }
}

// ─── Comment Submission + AI Reply ───
async function submitComment(post, input) {
  const text = input.value.trim();
  if (!text) return;

  if (!userComments[post.id]) userComments[post.id] = [];
  userComments[post.id].push({ content: text, isUser: true });
  localStorage.setItem('scroll-comments', JSON.stringify(userComments));
  input.value = '';
  input.disabled = true;
  renderFeed();

  // Show typing indicator
  const commentsEl = document.getElementById(`comments-${post.id}`);
  if (commentsEl) {
    const typingEl = document.createElement('div');
    typingEl.className = 'comment comment-typing';
    const tc = TRACK_COLORS[post.track];
    typingEl.innerHTML = `
      <div class="comment-line" style="background:${tc}40"></div>
      <div class="comment-avatar" style="background:${tc}15">${post.author.avatar}</div>
      <div class="comment-body">
        <div class="comment-header">
          <span class="comment-name">${esc(post.author.name)}</span>
          <span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>
        </div>
      </div>
    `;
    commentsEl.appendChild(typingEl);
    typingEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  try {
    const aiReply = await getAIReply(post, text);
    userComments[post.id].push({ content: aiReply, isAIReply: true, author: post.author });
    localStorage.setItem('scroll-comments', JSON.stringify(userComments));
  } catch (err) {
    console.error('AI reply failed:', err);
    userComments[post.id].push({
      content: `[couldn't generate a reply — ${err.message || 'try again later'}]`,
      isAIReply: true, author: post.author,
    });
    localStorage.setItem('scroll-comments', JSON.stringify(userComments));
  }

  renderFeed();
  const newInput = document.querySelector(`#composer-${post.id} .composer-input`);
  if (newInput) newInput.disabled = false;
}

async function getAIReply(post, userComment) {
  const typeInfo = POST_TYPES[post.type] || POST_TYPES.tip;
  const threadContext = [...post.comments, ...(userComments[post.id] || [])]
    .filter(c => !c.isAIReply)
    .map(c => `${c.isUser ? 'User' : `@${c.author?.handle}`}: ${c.content}`)
    .join('\n');

  const lessonContext = [
    `CHARACTER: @${post.author.handle} (${post.author.name})`,
    `BIO: ${post.author.bio}`,
    `TRACK: ${post.track}`,
    `POST TYPE: ${typeInfo.label}`,
    `ORIGINAL POST:\n${post.content}`,
    post.code ? `CODE IN POST:\n${post.code}` : '',
    threadContext ? `THREAD SO FAR:\n${threadContext}` : '',
  ].filter(Boolean).join('\n\n');

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      platform: 'feed',
      lessonContext,
      messages: [{ role: 'user', content: userComment }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `API error ${res.status}`);
  }
  const data = await res.json();
  return data.content;
}

// ─── Scroll Reveal Observer ───
function setupRevealObserver() {
  const posts = document.querySelectorAll('#feed-posts .reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  posts.forEach(el => observer.observe(el));
}

// ─── Keyboard Navigation ───
function setupKeyboard() {
  document.addEventListener('keydown', (e) => {
    // Don't capture when typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const posts = document.querySelectorAll('#feed-posts .post');
    if (!posts.length) return;

    switch (e.key) {
      case 'j': // Next post
        e.preventDefault();
        focusedIndex = Math.min(focusedIndex + 1, posts.length - 1);
        focusPost(posts);
        break;
      case 'k': // Previous post
        e.preventDefault();
        focusedIndex = Math.max(focusedIndex - 1, 0);
        focusPost(posts);
        break;
      case 'l': // Like
        if (focusedIndex >= 0) {
          e.preventDefault();
          const post = getPostByIndex(focusedIndex);
          if (post) toggleLike(post, posts[focusedIndex]);
        }
        break;
      case 'b': // Bookmark
        if (focusedIndex >= 0) {
          e.preventDefault();
          const post = getPostByIndex(focusedIndex);
          if (post) toggleBookmark(post);
        }
        break;
      case 'c': // Comment
        if (focusedIndex >= 0) {
          e.preventDefault();
          const id = posts[focusedIndex]?.dataset.id;
          if (id) focusComposer(id);
        }
        break;
      case '?': // Show shortcuts
        e.preventDefault();
        toggleShortcutHint();
        break;
    }
  });
}

function focusPost(posts) {
  posts.forEach(p => p.classList.remove('post-focused'));
  if (focusedIndex >= 0 && posts[focusedIndex]) {
    posts[focusedIndex].classList.add('post-focused');
    posts[focusedIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function getPostByIndex(idx) {
  const posts = document.querySelectorAll('#feed-posts .post');
  const id = posts[idx]?.dataset.id;
  return allPosts.find(p => p.id === id);
}

function toggleShortcutHint() {
  let hint = document.getElementById('shortcut-hint');
  if (hint) { hint.remove(); return; }
  hint = document.createElement('div');
  hint.id = 'shortcut-hint';
  hint.innerHTML = `
    <div class="hint-inner">
      <div class="hint-title">Keyboard Shortcuts</div>
      <div class="hint-row"><kbd>j</kbd><span>Next post</span></div>
      <div class="hint-row"><kbd>k</kbd><span>Previous post</span></div>
      <div class="hint-row"><kbd>l</kbd><span>Like</span></div>
      <div class="hint-row"><kbd>b</kbd><span>Bookmark</span></div>
      <div class="hint-row"><kbd>c</kbd><span>Comment</span></div>
      <div class="hint-row"><kbd>?</kbd><span>Toggle this</span></div>
    </div>
  `;
  document.body.appendChild(hint);
  hint.addEventListener('click', () => hint.remove());
}

// ─── Filter Tabs ───
function setupFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.track;
      const meta = TRACK_META[currentFilter];
      document.getElementById('feed-subtitle').textContent = meta.subtitle;
      document.getElementById('feed-title').textContent = meta.name;
      renderFeed();
    });
  });
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  loadPosts();
  setupFilterTabs();
  setupKeyboard();
});
