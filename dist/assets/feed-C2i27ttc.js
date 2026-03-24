import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css             *//* empty css              */const O={d3:{bindData:{handle:"bindData",name:"Bindi Datason",avatar:"📊",bio:"enter/update/exit is a lifestyle. d3.js daily."},scaleLinear:{handle:"scaleLinear",name:"Lin S. Cale",avatar:"📐",bio:"domain → range. everything else is noise."},geoProjection:{handle:"geoProjection",name:"Geo P.",avatar:"🌍",bio:"flattening globes since 2014. mercator truther."},svgArtist:{handle:"svgArtist",name:"Essvee Jeeson",avatar:"🎨",bio:"pure SVG. no canvas. no compromises."},transitionEase:{handle:"transition_ease",name:"Tran Sition",avatar:"✨",bio:"if it doesn't animate, did it even render?"}},django:{managePy:{handle:"manage_py",name:"Manny Jee",avatar:"🐍",bio:"python manage.py everything. batteries included."},queryset:{handle:"queryset",name:"Q. Setson",avatar:"🔍",bio:"n+1 queries? not on my watch."},middlewareStack:{handle:"middleware_stack",name:"Mida Leware",avatar:"🥞",bio:"request in, response out. the stack is sacred."},templateTag:{handle:"template_tag",name:"Tanya Taggart",avatar:"🏷️",bio:"server-rendered and proud. no JS required."},migrationRunner:{handle:"migration_runner",name:"Miggy Rations",avatar:"📦",bio:"squashing migrations is self-care."}},sql:{innerJoin:{handle:"inner_join",name:"Joi N. Tables",avatar:"🤝",bio:"LEFT JOIN enthusiast. NULL aware. index everything."},groupBy:{handle:"group_by",name:"Greta Grouper",avatar:"📊",bio:"if you're not aggregating, what are you even doing?"},bobbyTables:{handle:"bobby_tables",name:"Bobby Tables",avatar:"💀",bio:"parameterize your queries. i beg you."},windowFn:{handle:"window_fn",name:"Winda Function",avatar:"🪟",bio:"ROW_NUMBER() OVER() is the answer. what was the question?"},nullHandler:{handle:"null_handler",name:"Nully McNull",avatar:"❓",bio:"NULL != NULL. yes i will die on this hill."}},jsts:{closureKing:{handle:"closure_king",name:"Claude Zure",avatar:"🎒",bio:"closures are just functions with backpacks. fight me."},typeNarrow:{handle:"type_narrow",name:"Ty Narrow",avatar:"🔬",bio:'if it compiles, it works. typeof !== "undefined" gang.'},eventLooper:{handle:"event_looper",name:"Eva Loop",avatar:"🔄",bio:"microtask queue supremacist. setTimeout(fn, 0) is a lie."},protoChain:{handle:"proto_chain",name:"Proto Typal",avatar:"⛓️",bio:"__proto__ walked so class could run."},asyncAwait:{handle:"async_await",name:"Promise Allison",avatar:"🤞",bio:"i Promise i will .catch() all my errors. await me."}},react:{fiberNode:{handle:"fiber_node",name:"Faye Burr",avatar:"🧵",bio:"reconciliation is just diffing with opinions. react internals daily."},useEffect:{handle:"use_effect",name:"Effie Hooks",avatar:"🪝",bio:"useEffect is for synchronization, not for side effects. yes there is a difference."},serverComp:{handle:"server_comp",name:"Serena Component",avatar:"🖥️",bio:"RSC is not SSR. i will explain this until i die."},stateManager:{handle:"state_mgr",name:"Zuzu Standish",avatar:"🏪",bio:"prop drilling builds character. but zustand builds apps."},suspenseful:{handle:"suspenseful",name:"Sus Pence",avatar:"⏳",bio:"loading states are a UX decision, not an afterthought."}},css:{cascader:{handle:"cascader",name:"Casey Cade",avatar:"🌊",bio:"specificity is not a score. it is a coordinate. (0,1,0) gang."},gridMaster:{handle:"grid_master",name:"Griff Grid",avatar:"📐",bio:"fr units are the only units. everything else is a suggestion."},tailwinder:{handle:"tailwinder",name:"Tay Elwind",avatar:"💨",bio:"utility-first is not lazy. it is architecture. @apply is cope."},animista:{handle:"animista",name:"Annie Mation",avatar:"✨",bio:"will-change: transform is not a performance hack. it is a promise."},tokenizer:{handle:"tokenizer",name:"Toki Dezine",avatar:"🎨",bio:"if your color is hardcoded, your system is broken."}},ai:{prompter:{handle:"prompter",name:"Priya Promptson",avatar:"💬",bio:"system prompts are just personality transplants for robots."},ragBuilder:{handle:"rag_builder",name:"Rag E. Builder",avatar:"📚",bio:"retrieval-augmented generation is just open-book exams for AI."},agentSmith:{handle:"agent_smith",name:"Agent Aiden",avatar:"🤖",bio:"autonomous agents are just interns with API keys."},embedder:{handle:"embedder",name:"Emma Bedding",avatar:"📍",bio:"everything is a vector if you squint hard enough."},ethicsBot:{handle:"ethics_bot",name:"Ethel Ethics",avatar:"⚖️",bio:"AI ethics is not a feature. it is a constraint. and constraints are good."}}},y={};for(const e of Object.values(O))for(const t of Object.values(e)){y[t.handle]=t;const n=Object.keys(e).find(a=>e[a]===t);n&&n!==t.handle&&(y[n]=t)}const k={interview:{label:"INTERVIEW Q",color:"#eab308"},tip:{label:"PRO TIP",color:"#4ade80"},hotTake:{label:"HOT TAKE",color:"#f97316"},spotBug:{label:"SPOT THE BUG",color:"#ef4444"},mentalModel:{label:"MENTAL MODEL",color:"#818cf8"},poll:{label:"POLL",color:"#06b6d4"},til:{label:"TIL",color:"#a3e635"},thread:{label:"THREAD",color:"#c084fc"},ratiod:{label:"RATIO'D",color:"#fb7185"},eli5:{label:"ELI5",color:"#fbbf24"},commitMsg:{label:"COMMIT MSG FROM HELL",color:"#f87171"},slackPost:{label:"OVERHEARD IN SLACK",color:"#38bdf8"}},j={d3:"#f97316",django:"#22c55e",sql:"#3b82f6",jsts:"#eab308",react:"#06b6d4",css:"#a855f7",ai:"#f472b6"};let h=[],p=new Set(["d3","django","sql","jsts","react","css","ai"]),l=-1,b=JSON.parse(localStorage.getItem("scroll-likes")||"{}"),g=JSON.parse(localStorage.getItem("scroll-bookmarks")||"{}"),d=JSON.parse(localStorage.getItem("scroll-comments")||"{}");const A="/assets/trevor-avatar.jpeg",R="Trevor";function v(e){return e>=1e3?(e/1e3).toFixed(1).replace(/\.0$/,"")+"K":String(e)}function m(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function C(e){return m(e).replace(/\n/g,"<br>").replace(/`([^`]+)`/g,"<code>$1</code>")}async function N(){const e=document.getElementById("feed-posts");e.innerHTML='<div class="feed-loading"><span class="loading-dot"></span><span class="loading-dot"></span><span class="loading-dot"></span></div>';try{const[t,n,a,s,o,r,c]=await Promise.all([fetch("/feed/content/d3.json").then(i=>i.json()),fetch("/feed/content/django.json").then(i=>i.json()),fetch("/feed/content/sql.json").then(i=>i.json()),fetch("/feed/content/jsts.json").then(i=>i.json()).catch(()=>[]),fetch("/feed/content/react.json").then(i=>i.json()).catch(()=>[]),fetch("/feed/content/css.json").then(i=>i.json()).catch(()=>[]),fetch("/feed/content/ai.json").then(i=>i.json()).catch(()=>[])]);h=B([...t,...n,...a,...s,...o,...r,...c])}catch(t){console.error("Failed to load feed:",t),e.innerHTML='<div class="feed-empty">Failed to load the feed. Try refreshing.</div>';return}f()}function B(e){return e.map(t=>({...t,author:y[t.author]||{handle:t.author,name:t.author,avatar:"👤",bio:""},comments:(t.comments||[]).map(n=>({...n,author:y[n.author]||{handle:n.author,name:n.author,avatar:"👤",bio:""}}))}))}function f(){const e=document.getElementById("feed-posts");e.innerHTML="";const t=h.filter(n=>p.has(n.track));if(t.length===0){e.innerHTML='<div class="feed-empty">No posts yet for this track.</div>';return}t.forEach((n,a)=>{const s=_(n);s.classList.add("reveal-on-scroll"),s.dataset.feedIndex=a,e.appendChild(s)}),U(),l=-1}function _(e){const t=document.createElement("article");t.className="post",t.dataset.id=e.id;const n=k[e.type]||k.tip,a=j[e.track]||"#888",s=b[e.id],o=g[e.id],r=d[e.id]||[],c=[...e.comments,...r],i=c.length,$=e.poll?q(e.poll,a):"",w=e.link?`<a class="post-link" href="${m(e.link.url)}">${m(e.link.label)}</a>`:"";return t.innerHTML=`
    <div class="post-track-line" style="background:${a}"></div>
    <div class="post-inner">
      <div class="post-avatar" style="background:${a}15;border-color:${a}33">
        <span>${e.author.avatar}</span>
      </div>
      <div class="post-body">
        <div class="post-header">
          <span class="post-name">${m(e.author.name)}</span>
          <span class="post-badge" style="background:${a}">${e.track.toUpperCase()}</span>
          <span class="post-handle">@${m(e.author.handle)}</span>
          <span class="post-dot">&middot;</span>
          <span class="post-time">${e.time}</span>
        </div>
        <div class="post-type" style="color:${n.color}">${n.label}</div>
        <div class="post-content">${C(e.content)}</div>
        ${e.code?`<pre class="post-code"><code>${m(e.code)}</code></pre>`:""}
        ${$}
        ${w}
        <div class="post-actions">
          <button class="action-btn comment-btn" data-id="${e.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>${i||""}</span>
          </button>
          <button class="action-btn repost-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            <span>${v(e.reposts)}</span>
          </button>
          <button class="action-btn like-btn ${s?"liked":""}" data-id="${e.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${s?"currentColor":"none"}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span>${v((e.likes||0)+(s?1:0))}</span>
          </button>
          <button class="action-btn bookmark-btn ${o?"bookmarked":""}" data-id="${e.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${o?"currentColor":"none"}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>

        <div class="post-comments ${i>0?"":"empty"}" id="comments-${e.id}">
          ${c.map(u=>H(u,a)).join("")}
        </div>

        <div class="comment-composer" id="composer-${e.id}">
          <div class="composer-avatar composer-avatar-user">
            <img src="${A}" alt="" onerror="this.style.display='none';this.parentElement.textContent='TB'" />
          </div>
          <input type="text" class="composer-input" placeholder="Drop your take..." data-id="${e.id}" />
          <button class="composer-send" data-id="${e.id}" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  `,requestAnimationFrame(()=>{t.querySelector(".like-btn").addEventListener("click",E=>{M(e,t),E.stopPropagation()}),t.querySelector(".bookmark-btn").addEventListener("click",()=>x(e)),t.querySelector(".comment-btn").addEventListener("click",()=>P(e.id));const u=t.querySelector(".composer-input"),S=t.querySelector(".composer-send");u.addEventListener("input",()=>{S.disabled=!u.value.trim()}),u.addEventListener("keydown",E=>{E.key==="Enter"&&u.value.trim()&&L(e,u)}),S.addEventListener("click",()=>{u.value.trim()&&L(e,u)})}),t}function q(e,t){return`
    <div class="poll-container">
      ${e.options.map((a,s)=>{const o=a.pct===Math.max(...e.options.map(r=>r.pct));return`
      <div class="poll-option ${o?"poll-top":""}">
        <div class="poll-bar" style="width:${a.pct}%;background:${o?t:t+"40"}"></div>
        <span class="poll-text">${m(a.text)}</span>
        <span class="poll-pct">${a.pct}%</span>
      </div>
    `}).join("")}
      <div class="poll-meta">${v(e.totalVotes)} votes</div>
    </div>
  `}function H(e,t){var s,o,r;const n=e.isUser,a=e.isAIReply;return`
    <div class="comment ${n?"comment-user":""} ${a?"comment-ai":""}">
      <div class="comment-line" style="background:${n?"#555":t}40"></div>
      ${n?`<div class="comment-avatar comment-avatar-user"><img src="${A}" alt="" onerror="this.style.display='none';this.parentElement.textContent='TB'" /></div>`:`<div class="comment-avatar" style="background:${t}15">${((s=e.author)==null?void 0:s.avatar)||"🤖"}</div>`}
      <div class="comment-body">
        <div class="comment-header">
          <span class="comment-name">${n?R:m(((o=e.author)==null?void 0:o.name)||"AI")}</span>
          ${n?"":`<span class="comment-handle">@${m(((r=e.author)==null?void 0:r.handle)||"")}</span>`}
        </div>
        <div class="comment-text">${C(e.content)}</div>
        ${e.likes?`<span class="comment-likes">${v(e.likes)} likes</span>`:""}
      </div>
    </div>
  `}function M(e,t){const n=b[e.id];b[e.id]=!n,localStorage.setItem("scroll-likes",JSON.stringify(b));const a=t.querySelector(".like-btn"),s=a.querySelector("svg path"),o=a.querySelector("span");b[e.id]?(a.classList.add("liked"),s.setAttribute("fill","currentColor"),o.textContent=v(e.likes+1),D(a)):(a.classList.remove("liked"),s.setAttribute("fill","none"),o.textContent=v(e.likes))}function x(e){g[e.id]=!g[e.id],localStorage.setItem("scroll-bookmarks",JSON.stringify(g)),f()}function P(e){const t=document.querySelector(`#composer-${e} .composer-input`);t&&(t.focus(),t.scrollIntoView({behavior:"smooth",block:"center"}))}function D(e){const t=e.getBoundingClientRect(),n=t.left+t.width/2,a=t.top+t.height/2,s=["#f43f5e","#fb7185","#f97316","#fbbf24","#a855f7"];for(let o=0;o<8;o++){const r=document.createElement("span");r.className="like-particle";const c=Math.PI*2*o/8+(Math.random()-.5)*.5,i=20+Math.random()*25,$=Math.cos(c)*i,w=Math.sin(c)*i;r.style.cssText=`
      left:${n}px;top:${a}px;
      background:${s[o%s.length]};
      --dx:${$}px;--dy:${w}px;
    `,document.body.appendChild(r),r.addEventListener("animationend",()=>r.remove())}}async function L(e,t){const n=t.value.trim();if(!n)return;d[e.id]||(d[e.id]=[]),d[e.id].push({content:n,isUser:!0}),localStorage.setItem("scroll-comments",JSON.stringify(d)),t.value="",t.disabled=!0,f();const a=document.getElementById(`comments-${e.id}`);if(a){const o=document.createElement("div");o.className="comment comment-typing";const r=j[e.track];o.innerHTML=`
      <div class="comment-line" style="background:${r}40"></div>
      <div class="comment-avatar" style="background:${r}15">${e.author.avatar}</div>
      <div class="comment-body">
        <div class="comment-header">
          <span class="comment-name">${m(e.author.name)}</span>
          <span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>
        </div>
      </div>
    `,a.appendChild(o),o.scrollIntoView({behavior:"smooth",block:"center"})}try{const o=await J(e,n);d[e.id].push({content:o,isAIReply:!0,author:e.author}),localStorage.setItem("scroll-comments",JSON.stringify(d))}catch(o){console.error("AI reply failed:",o),d[e.id].push({content:`[couldn't generate a reply — ${o.message||"try again later"}]`,isAIReply:!0,author:e.author}),localStorage.setItem("scroll-comments",JSON.stringify(d))}f();const s=document.querySelector(`#composer-${e.id} .composer-input`);s&&(s.disabled=!1)}async function J(e,t){const n=k[e.type]||k.tip,a=[...e.comments,...d[e.id]||[]].filter(c=>!c.isAIReply).map(c=>{var i;return`${c.isUser?"User":`@${(i=c.author)==null?void 0:i.handle}`}: ${c.content}`}).join(`
`),s=[`CHARACTER: @${e.author.handle} (${e.author.name})`,`BIO: ${e.author.bio}`,`TRACK: ${e.track}`,`POST TYPE: ${n.label}`,`ORIGINAL POST:
${e.content}`,e.code?`CODE IN POST:
${e.code}`:"",a?`THREAD SO FAR:
${a}`:""].filter(Boolean).join(`

`),o=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({platform:"feed",lessonContext:s,messages:[{role:"user",content:t}]})});if(!o.ok){const c=await o.json().catch(()=>({}));throw new Error(c.error||`API error ${o.status}`)}return(await o.json()).content}function U(){const e=document.querySelectorAll("#feed-posts .reveal-on-scroll"),t=new IntersectionObserver(n=>{n.forEach(a=>{a.isIntersecting&&(a.target.classList.add("visible"),t.unobserve(a.target))})},{threshold:.08,rootMargin:"0px 0px -40px 0px"});e.forEach(n=>t.observe(n))}function F(){document.addEventListener("keydown",e=>{var n;if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;const t=document.querySelectorAll("#feed-posts .post");if(t.length)switch(e.key){case"j":e.preventDefault(),l=Math.min(l+1,t.length-1),T(t);break;case"k":e.preventDefault(),l=Math.max(l-1,0),T(t);break;case"l":if(l>=0){e.preventDefault();const a=I(l);a&&M(a,t[l])}break;case"b":if(l>=0){e.preventDefault();const a=I(l);a&&x(a)}break;case"c":if(l>=0){e.preventDefault();const a=(n=t[l])==null?void 0:n.dataset.id;a&&P(a)}break;case"?":e.preventDefault(),z();break}})}function T(e){e.forEach(t=>t.classList.remove("post-focused")),l>=0&&e[l]&&(e[l].classList.add("post-focused"),e[l].scrollIntoView({behavior:"smooth",block:"center"}))}function I(e){var a;const n=(a=document.querySelectorAll("#feed-posts .post")[e])==null?void 0:a.dataset.id;return h.find(s=>s.id===n)}function z(){let e=document.getElementById("shortcut-hint");if(e){e.remove();return}e=document.createElement("div"),e.id="shortcut-hint",e.innerHTML=`
    <div class="hint-inner">
      <div class="hint-title">Keyboard Shortcuts</div>
      <div class="hint-row"><kbd>j</kbd><span>Next post</span></div>
      <div class="hint-row"><kbd>k</kbd><span>Previous post</span></div>
      <div class="hint-row"><kbd>l</kbd><span>Like</span></div>
      <div class="hint-row"><kbd>b</kbd><span>Bookmark</span></div>
      <div class="hint-row"><kbd>c</kbd><span>Comment</span></div>
      <div class="hint-row"><kbd>?</kbd><span>Toggle this</span></div>
    </div>
  `,document.body.appendChild(e),e.addEventListener("click",()=>e.remove())}function V(){document.querySelectorAll(".filter-tab").forEach(n=>{n.addEventListener("click",()=>{const a=n.dataset.track;if(p.has(a)){if(p.size<=1)return;p.delete(a),n.classList.remove("active")}else p.add(a),n.classList.add("active");G(),f()})});const t=document.getElementById("refresh-btn");t&&t.addEventListener("click",()=>{t.classList.add("spinning"),setTimeout(()=>t.classList.remove("spinning"),400),K()})}function G(){const e={d3:"D3",django:"Python",sql:"SQL",jsts:"JS/TS",react:"React",css:"CSS",ai:"AI"},t=Object.keys(e).filter(a=>p.has(a)).map(a=>e[a]),n=p.size===7?"your algorithm, but useful":t.join(" + ");document.getElementById("feed-subtitle").textContent=n}function K(){for(let e=h.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));[h[e],h[t]]=[h[t],h[e]]}f(),window.scrollTo({top:0,behavior:"smooth"})}document.addEventListener("DOMContentLoaded",()=>{N(),V(),F()});
