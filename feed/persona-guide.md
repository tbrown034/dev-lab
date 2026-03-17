# The Scroll — Persona Guide & Content Bible

> The Scroll is a doomscrolling replacement for people who learn by osmosis.
> It should look like a real dev Twitter feed at first glance — then you notice
> the persona names and smile. Every post teaches something. Every disagreement
> resolves into the right answer. Spark joy. Be clever. Reward repeat readers.

---

## Golden Rules

1. **Passive first.** The user just scrolls and reads. Learning happens through
   exposure, personality, and comment threads — not quizzes or input fields.
2. **Disagreements are pedagogy.** When personas argue, both sides make valid
   points. The thread always converges on the correct answer (or clearly states
   "both approaches work, here's when to use each").
3. **Snarky, never mean.** Personas roast patterns and code, not people. The
   vibe is "senior dev teasing a friend," not "Stack Overflow in 2014."
4. **Real at first glance.** Persona names should pass a quick scan as real
   names. The pun only clicks on second look. "Bindi Datason" reads as a
   normal name until you see the handle @bindData.
5. **Whimsy > formality.** Puns welcome. Weird analogies encouraged. If a
   metaphor makes someone go "wait that actually helps," it's perfect.
6. **Every post teaches.** Even shitposts. A meme about NULL should leave the
   reader understanding something about NULL they didn't before.
7. **ADHD-friendly.** Short paragraphs. Varied post types. Personality hooks
   that keep you reading. No walls of text. Code blocks are short and punchy.

---

## The Personas

### D3 Track — "The Bindery"

#### @bindData — Bindi Datason 📊
**The Evangelist**

- **Voice:** Earnest, warm, slightly preachy. Genuinely believes data binding
  is a philosophy, not a programming pattern. The person who gives TED talks
  about enter/update/exit at dinner parties.
- **Catchphrase:** "data in, meaning out"
- **Quirk:** Always relates D3 to life metaphors that are unexpectedly profound.
  "Enter/update/exit isn't just a pattern — it's how friendships work. New people
  enter your life, existing relationships update, and some gracefully exit."
- **Pet peeve:** People who use D3 just for bar charts. "You brought a
  lightsaber to butter your toast."
- **Running gag:** Has a draft blog post called "Enter/Update/Exit: A
  Meditation" that is 14,000 words and growing. Other personas reference it.
  It never gets published. Every few weeks the word count goes up.
- **Teaches:** Data binding, the join pattern, D3 philosophy, when to use D3 vs
  simpler tools.
- **Example post (Hot Take):** "hot take: .data().join() replaced
  enter/update/exit for 90% of use cases. but if you skip learning the
  old way, you'll never understand WHY join works. learn the hard way first.
  then use the shortcut."

---

#### @scaleLinear — Lin S. Cale 📐
**The Minimalist**

- **Voice:** Terse. Precise. Dry humor. Thinks every problem is a domain-to-range
  mapping. Talks like a math professor who's secretly very funny if you're
  paying attention.
- **Catchphrase:** "domain → range"
- **Quirk:** Never uses more words than necessary. Replies are often one sentence.
  Other personas try to get Lin to write more than three sentences. It has never
  happened.
- **Pet peeve:** Magic numbers. "You hardcoded 500? What is this, a pixel
  guessing game?"
- **Running gag:** Posts are always exactly the minimum length needed. If you
  ask a follow-up, you get exactly one more sentence. Economy of words is
  a lifestyle.
- **Teaches:** Scales (linear, band, time, ordinal, color), domains, ranges,
  d3-array utilities, the concept of mapping data to visual properties.
- **Example post (Tip):** "d3.extent() returns [min, max]. One function call.
  Stop writing two."

---

#### @geoProjection — Geo P. 🌍
**The Map Truther**

- **Voice:** Passionate, slightly unhinged about projections. Everything comes
  back to maps. Will derail any conversation to talk about Mercator's crimes
  against cartography. The conspiracy theorist of the group, except they're
  technically correct about everything.
- **Catchphrase:** "Mercator LIED to you"
- **Quirk:** Brings up map projections in completely unrelated threads. Someone
  posts about Django forms? "you know what else distorts your input? the
  Mercator projection." Absolutely no one asked.
- **Pet peeve:** Default projections. "You just used whatever projection D3
  loaded first? That's like going to a restaurant and eating whatever the
  last customer left on the table."
- **Running gag:** Is writing a manifesto about the "Mercator-Industrial
  Complex." It grows every time it's mentioned. Other personas are concerned.
  Chapter titles leak occasionally: "Chapter 7: How Mercator Enables Colonial
  Cartographic Hegemony and What d3.geoEqualEarth() Can Do About It."
- **Teaches:** Map projections, GeoJSON, TopoJSON, d3-geo, choropleth maps,
  coordinate systems, why projection choice matters.
- **Example post (Mental Model):** "Every map projection is a lie. Every single
  one. You cannot flatten a sphere without distortion. The question isn't 'which
  map is accurate' — it's 'which distortion do I accept?' Mercator preserves
  angles (good for navigation). Equal-area preserves size (good for data).
  Pick your lie wisely."

---

#### @svgArtist — Essvee Jeeson 🎨
**The Purist**

- **Voice:** Gatekeepy but self-aware about it. Loves SVG the way vinyl
  collectors love analog. Would use `<path>` to draw their morning coffee
  if they could. Secretly thinks Canvas is fine but will never say so publicly.
- **Catchphrase:** "if you can't inspect it, I don't trust it"
- **Quirk:** Refers to SVG elements like old friends. "My dear `<path>`, my
  trusted `<g>`, my reliable `<circle>`." Anthropomorphizes shapes.
- **Pet peeve:** Canvas. WebGL. Anything rasterized. "Pixels are a prison.
  SVG is freedom." Also: inline styles on SVG elements when you could use CSS.
- **Running gag:** Gets into fights with an imaginary Canvas developer who
  keeps appearing in the mentions. This person may or may not be real. Nobody
  knows. Essvee won't say.
- **Teaches:** SVG fundamentals, path syntax, viewBox, coordinate systems,
  CSS + SVG integration, accessibility of vector graphics.
- **Example post (Hot Take):** "hot take: SVG is the most underrated web
  technology. it's in every browser. it's accessible. it's CSS-styleable.
  it scales to any resolution. and most developers treat it like a scary
  black box because the path syntax looks weird. the `d` attribute is just
  a tiny drawing language. learn 5 commands and you're dangerous."

---

#### @transition_ease — Tran Sition ✨
**The Vibes Engineer**

- **Voice:** Obsessed with how things FEEL, not just how they work. Talks about
  easing curves the way a sommelier talks about wine. Peak "design engineer"
  energy. Every animation is a vibe.
- **Catchphrase:** "but how does it *feel* though?"
- **Quirk:** Describes easing functions with sensory language. "easeCubicOut is
  the sigh of relief when your code finally compiles. easeElasticOut is the
  chaotic energy of a Slack notification at 5pm on Friday."
- **Pet peeve:** Linear easing. "Linear easing is the Nickelback of animation.
  It technically works and I'm still judging you."
- **Running gag:** Has a tier list of every D3 easing function that gets updated
  monthly. Nobody asked for it. Everyone has opinions about it. easeBounceOut
  is permanently in F tier. "It's whimsical and I hate whimsy in data
  visualization. Whimsy is for loading spinners."
- **Teaches:** D3 transitions, easing functions, animation timing, interpolation,
  the difference between CSS transitions and D3 transitions, making data
  visualization feel polished.
- **Example post (Tip):** "Pro tip: set your transition duration to LESS than
  your data update interval. If data updates every 1000ms, animate over 750ms.
  This guarantees transitions finish before new data arrives. Overlapping
  transitions is how you get that 'the chart is drunk' effect."

---

### Django Track — "The Shell"

#### @manage_py — Manny Jee 🐍
**The Veteran**

- **Voice:** Seen it all. Tired but wise. The grizzled Django developer who
  remembers when it was just a CMS for the Lawrence Journal-World newspaper.
  Gives advice like a war veteran telling stories by a campfire.
- **Catchphrase:** "there's a battery for that"
- **Quirk:** References the Django docs like scripture. "And on the third day,
  Adrian Holovaty said 'Let there be an admin panel,' and it was good." Treats
  `python manage.py` as a spiritual practice.
- **Pet peeve:** People rewriting Django functionality from scratch. "You built
  your own auth system? In this economy? The framework has auth. It has users.
  It has permissions. It has password hashing. You reinvented a wheel that was
  already round."
- **Running gag:** Starts every war story with "back in Django 1.4..." The
  version is never relevant. Sometimes the story has nothing to do with Django.
- **Teaches:** Django project structure, manage.py commands, the admin, auth,
  Django's philosophy of "batteries included," when to use Django vs lighter
  frameworks.
- **Example post (Interview Q):** "INTERVIEW Q: Your Django app gets 10k
  requests/sec. Response times spike. Walk me through debugging without
  throwing hardware at it. Wrong answers: 'rewrite in Go.' Right first step:
  django-debug-toolbar. Find the query count. I promise you it's queries."

---

#### @queryset — Q. Setson 🔍
**The Query Detective**

- **Voice:** Obsessive. Speaks in query counts. Sees N+1 problems the way the
  kid in The Sixth Sense sees dead people — everywhere, all the time, and
  nobody else notices until it's too late.
- **Catchphrase:** "how many queries though?"
- **Quirk:** Evaluates everything by database round trips. Signs off posts with
  the exact query count. "This view went from 847 queries to 3. You're welcome."
- **Pet peeve:** `.all()` in a for loop. Physically recoils at lazy evaluation
  becoming accidentally eager.
- **Running gag:** Tracking a "lifetime N+1 count" — the total N+1 queries
  they've fixed in their career. Currently at 2,847. Updates periodically
  with a new incident.
- **Teaches:** Django ORM optimization, select_related, prefetch_related, N+1
  problems, query debugging, django-debug-toolbar, database indexing from
  the Django side.
- **Example post (Spot the Bug):** "This API endpoint takes 11 seconds to
  load a list of 50 articles. The code looks fine. Find the problem." [code
  that does `article.author.name` in a loop without select_related]

---

#### @middleware_stack — Mida Leware 🥞
**The Philosopher**

- **Voice:** Sees the middleware pattern in everything. Oddly profound. The
  philosopher-poet of Django who thinks about request/response cycles the way
  existentialists think about consciousness.
- **Catchphrase:** "request in, response out, nothing else matters"
- **Quirk:** Applies middleware thinking to everyday life. "Breakfast is just
  middleware between waking up and being productive. It processes the request
  (hunger) and returns a response (energy)."
- **Pet peeve:** People modifying request objects in views instead of middleware.
  "You're performing surgery in the waiting room."
- **Running gag:** Writes haikus about middleware. They're actually beautiful.
  Readers who find all of them across the feed discover they form a larger poem.
  Examples: "request flows downward / through layers of silent care / response
  rises up"
- **Teaches:** Django middleware, request/response cycle, WSGI, how Django
  processes a request from start to finish, custom middleware patterns.
- **Example post (Mental Model):** "Middleware is an onion. The request peels
  through layers going IN. The response builds layers going OUT. Each layer
  can inspect, modify, or reject. SecurityMiddleware is the bouncer. SessionMiddleware
  is the coat check. Your view is the party. On the way out, everything reverses."

---

#### @template_tag — Tanya Taggart 🏷️
**The Server-Side Loyalist**

- **Voice:** Aggressively server-rendered. Anti-SPA. Will bring up HTMX in any
  conversation. The Django equivalent of a vinyl purist, but for HTML.
  Celebrates every JavaScript framework breaking change like a personal holiday.
- **Catchphrase:** "no build step, no problems"
- **Quirk:** Keeps a running tally of "days since JavaScript broke something."
  It has never exceeded 3. Screenshots framework changelogs like trophies.
- **Pet peeve:** SPAs. Client-side rendering. The entire concept of hydration.
  "Hydration is when the server does the work and then the client does it AGAIN.
  You're paying for the same meal twice."
- **Running gag:** The "days since JS broke" counter. Gets reset constantly.
  Other personas try to defend JavaScript. Tanya has receipts.
- **Teaches:** Django templates, template tags and filters, template inheritance,
  server-side rendering benefits, when SSR beats CSR, HTMX patterns.
- **Example post (Hot Take):** "hot take: Django templates are 'boring' and
  that's the point. no build step. no hydration. no client/server mismatch
  bugs. just HTML with variables. sometimes boring IS the innovation.
  [days since JS broke something: 1]"

---

#### @migration_runner — Miggy Rations 📦
**The Cautious One**

- **Voice:** Lives in constant, justified fear of migration conflicts. Meticulous.
  Cautious. The person who triple-checks everything before deploying. Everyone
  makes fun of Miggy until a migration goes wrong — then Miggy is the hero.
- **Catchphrase:** "did you run makemigrations?"
- **Quirk:** Backs up everything. Has nightmares about `--fake`. Every Friday
  deployment is a mini existential crisis. Keeps a "migration horror stories"
  series that reads like true crime.
- **Pet peeve:** People who hand-edit migration files. "You're performing heart
  surgery with kitchen scissors." Also: deploying on Fridays.
- **Running gag:** Migration Horror Stories — a serialized thread series where
  Miggy recounts real-world migration disasters with the tension of a thriller.
  "The Great Migration Conflict of '24," "The Friday Deployment Incident,"
  "When --fake Met --fake-initial."
- **Teaches:** Django migrations, migration dependencies, squashing, data
  migrations, RunPython, reverse migrations, deployment strategies, database
  schema changes in production.
- **Example post (Thread):** "THREAD: The Great Migration Conflict of 2024.
  Two developers. Same model. Both added a field. Both ran makemigrations
  on their branches. Both got migration 0014. And then they merged. 🧵 (1/5)"

---

### SQL Track — "The Table"

#### @inner_join — Joi N. Tables 🤝
**The Diplomat**

- **Voice:** Calm, measured, sees both sides. The mediator of SQL arguments.
  Believes every problem has an elegant join solution. Resolves conflict by
  framing it as a query.
- **Catchphrase:** "there's a join for that"
- **Quirk:** Resolves persona arguments by framing them as join types. "You
  two are having a CROSS JOIN of opinions — let's add a WHERE clause."
  Sees human relationships as join operations.
- **Pet peeve:** Cartesian products in production. Also: people using CROSS
  JOIN when they meant INNER JOIN. "You just combined every row with every
  other row. You didn't want 4 billion results."
- **Running gag:** Tries to introduce personas to each other as if they've
  never met. "Oh you two should talk, you have so much in common" — they've
  been arguing for three years.
- **Teaches:** All join types (INNER, LEFT, RIGHT, FULL OUTER, CROSS), join
  strategy, when to use which join, performance implications, common join
  mistakes.
- **Example post (ELI5):** "ELI5: SQL Joins. You have a box of kids' names
  and a box of kids' favorite colors. INNER JOIN: only keep kids in BOTH
  boxes. LEFT JOIN: keep ALL name kids, even if we don't know their color.
  CROSS JOIN: every kid matched with every color. There are 10,000 rows now.
  The teacher is crying."

---

#### @group_by — Greta Grouper 📊
**The Analyst**

- **Voice:** Thinks in aggregates. Can't look at raw data without wanting to
  GROUP BY something. Peak data analyst energy. Everything is a report.
- **Catchphrase:** "but what does it look like in aggregate?"
- **Quirk:** Applies GROUP BY logic to life. "I don't want to know what you
  had for lunch. I want it GROUP BY weekday ORDER BY frequency DESC." Tracks
  everything. Has a spreadsheet for the personas' engagement metrics.
- **Pet peeve:** SELECTing columns not in the GROUP BY without aggregating.
  "That query doesn't even make sense. Which department's name do you want?
  You have 50 rows collapsing into 5. PICK ONE."
- **Running gag:** Publishes "Quarterly Feed Analytics" — a meta-report on
  which personas get the most likes, which post types perform best, and who
  got ratio'd the most. Presented with complete seriousness. The data is
  fictional but internally consistent.
- **Teaches:** GROUP BY, aggregate functions (COUNT, SUM, AVG, MIN, MAX),
  HAVING, the conceptual model of aggregation, common mistakes with grouping.
- **Example post (Mental Model):** "GROUP BY is Array.reduce() for databases.
  Many rows in, fewer rows out, grouped by a key. The aggregate function
  decides what to DO with each group. Once you see it as reduce(), it never
  confuses you again."

---

#### @bobby_tables — Bobby Tables 💀
**The Security Guardian**

- **Voice:** Paranoid and rightfully so. Named after the XKCD comic and FULLY
  owns it. Every conversation eventually bends toward SQL injection. The
  Cassandra of the group — always warning, rarely heeded, always vindicated.
- **Catchphrase:** "parameterize or perish"
- **Quirk:** Reviews other personas' code snippets in the comments and finds
  injection vectors. It's a compulsion. Can't help it. Also: Bobby's parents
  actually read the xkcd comic and named them accordingly. This is canon.
  Bobby shares new details about growing up with that name occasionally.
- **Pet peeve:** String concatenation in SQL. f-strings with user input.
  The phrase "it's just an internal tool." "Today's internal tool is
  tomorrow's public API when the PM says 'can we just expose this?'"
- **Running gag:** Origin story details trickle out over time. "My first SQL
  class in college, the professor saw my name on the roster and asked me to
  leave." Other personas dare each other to post un-parameterized queries
  to see how fast Bobby shows up.
- **Teaches:** SQL injection, parameterized queries, input validation, security
  mindset, prepared statements, the OWASP Top 10 from a SQL perspective.
- **Example post (Hot Take):** "hot take: every SQL tutorial should start with
  injection attacks, not SELECT statements. you learn to lock the door before
  you learn to decorate the house."

---

#### @window_fn — Winda Function 🪟
**The Showoff**

- **Voice:** Believes window functions are the answer to every SQL question.
  Slightly smug, definitely correct, and annoying about it. Will rewrite any
  query using OVER(PARTITION BY...) whether you asked or not.
- **Catchphrase:** "OVER(PARTITION BY..." (drops it like a mic)
- **Quirk:** Answers questions nobody asked with increasingly complex window
  function solutions. Treats PARTITION BY the way @geoProjection treats
  map projections — it's always relevant, always.
- **Pet peeve:** Correlated subqueries. "You wrote a correlated subquery? In
  2026? Sir/ma'am, this is a modern database and we have window functions."
- **Running gag:** Writing a book called "The Window to the Soul: Advanced
  Analytics in SQL." Other personas are skeptical anyone will read it. Winda
  doesn't care. Chapter count keeps growing.
- **Teaches:** Window functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG,
  LEAD, SUM OVER, etc.), PARTITION BY, framing clauses, when windows beat
  subqueries, performance characteristics.
- **Example post (Tip):** "ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY
  created_at DESC) = 'get the latest thing per group.' Memorize this pattern.
  It answers 40% of analytics interview questions. I counted. (in aggregate,
  obviously. @group_by would be proud.)"

---

#### @null_handler — Nully McNull ❓
**The Existentialist**

- **Voice:** Deeply philosophical about the nature of nothing. NULL isn't a
  SQL concept to Nully — it's an existential condition. Darkly funny,
  unexpectedly deep. May or may not have a philosophy degree.
- **Catchphrase:** "NULL is not nothing. NULL is the *unknown*."
- **Quirk:** Drops philosophical bombs in technical threads. "IS NULL vs =
  NULL is really a question about whether absence can be compared to itself.
  Anyway, use COALESCE." Background in existentialism leaks through gradually.
- **Pet peeve:** Treating NULL as zero or empty string. "NULL is not empty. An
  empty glass is empty. NULL is not knowing whether the glass exists."
- **Running gag:** "The Paranoia Pact" with @bobby_tables. Bobby worries about
  malicious users. Nully worries about data that doesn't exist. They argue
  about who has more reason to be paranoid. Both are correct.
- **Teaches:** NULL handling, three-valued logic, COALESCE, NULLIF, IS NULL vs
  = NULL, NULL in aggregations, NULL in NOT IN subqueries, defensive SQL.
- **Example post (Spot the Bug):** "This query returns 0 rows. The table has
  10,000 records. You KNOW some have no department. Why?" [query with
  `department != NULL` instead of `IS NULL`]

---

## Persona Relationships

### The Rivalries (Good-Natured)

| Pair | Dynamic | Teaching Opportunity |
|------|---------|---------------------|
| @window_fn vs @group_by | "Aggregation Wars" — Greta thinks windows are showing off, Winda thinks GROUP BY is for beginners | When to use each approach; performance tradeoffs |
| @bobby_tables vs @null_handler | "The Paranoia Pact" — who has more reason to be paranoid? | Security vs data integrity; both matter |
| @template_tag vs any JS framework | Tanya celebrates every JS breaking change | SSR vs CSR tradeoffs; when each approach wins |
| @svgArtist vs Canvas (imaginary) | Essvee fights an unseen enemy | SVG vs Canvas: accessibility, performance, use cases |
| @queryset vs @manage_py | Q. optimizes everything, Manny says "ship it" | Premature optimization vs pragmatism |
| @scaleLinear vs @transition_ease | Precision vs feeling | Data accuracy vs user experience in visualization |

### The Alliances

| Pair | Dynamic | Teaching Opportunity |
|------|---------|---------------------|
| @bindData + @middleware_stack | Parallel philosophies: enter/update/exit mirrors request/response | Design patterns that transcend frameworks |
| @bobby_tables + @null_handler | Best friends who won't admit it; "The Anxious Crew" | Defensive programming from both angles |
| @template_tag + @svgArtist | "The Anti-JavaScript Alliance" — different tracks, same enemy | Simplicity, inspectability, standards-based web |
| @geoProjection + @migration_runner | Geo thinks Miggy works too hard; posts calming maps | Taking breaks, the human side of development |
| @inner_join + @manage_py + @bindData | "The Old Guard" — senior personas who've seen everything | Experience, mentorship, software history |

### Cross-Track Appearances

Personas should show up in each other's tracks when relevant:
- @bobby_tables appears in Django threads when someone shows raw SQL in views
- @queryset appears in SQL threads to compare ORM vs raw approaches
- @svgArtist appears in Django threads when someone mentions frontend
- @null_handler appears in ANY thread that mentions NULL, across all tracks
- @transition_ease appears in Django threads about HTMX animations

---

## Post Types

| Type | Label | Tone | Length | Purpose |
|------|-------|------|--------|---------|
| interview | INTERVIEW Q | Thoughtful, scenario-driven | Medium-long | Real-world problem solving |
| hotTake | HOT TAKE | Spicy, confident, provocative | Short-medium | Opinionated stances that teach through debate |
| tip | PRO TIP | Generous, "wish someone told me" | Short + code | Quick actionable knowledge |
| spotBug | SPOT THE BUG | Detective mode, playful | Short + code | Pattern recognition, common mistakes |
| mentalModel | MENTAL MODEL | Philosophical, analogy-heavy | Medium | Conceptual frameworks |
| poll | POLL | Playful, "test yourself" | Short | Passive self-assessment (results shown) |
| til | TIL | Quick, surprised energy | Very short | One-insight knowledge nuggets |
| thread | THREAD | Storytelling, narrative tension | Long (multi-part) | Complex topics through narrative |
| ratiod | RATIO'D | Confident → corrected | Medium | Learning through correction |
| eli5 | ELI5 | Playful, committed to the analogy | Medium | Complex concepts made simple |
| commitMsg | COMMIT MSG FROM HELL | Deadpan humor | Short | Version control best practices |
| slackPost | OVERHEARD IN SLACK | Workplace scenario format | Medium | Workplace coding situations |

### Content Distribution per Track (target ~100 posts)

- 20 Interview Qs
- 15 Hot Takes
- 15 Pro Tips
- 12 Spot the Bug
- 10 Mental Models
- 8 TIL
- 5 Polls
- 5 Threads (multi-post, so ~15 individual entries)
- 4 Ratio'd
- 3 ELI5
- 3 Commit Messages from Hell
- 3 Overheard in Slack

---

## Comment Guidelines

Every post should have 1-3 comments. Comments are where the cross-talk,
rivalries, and deeper teaching happen.

### Comment Patterns

1. **Agreement + Extension:** "This. And also..." — adds a related insight
2. **Friendly Disagreement:** "Counterpoint: ..." — offers alternative approach,
   both are valid, the thread makes it clear when to use each
3. **The Correction:** For ratio'd posts, the correction IS the lesson. Be firm
   but kind. "Love you but this is wrong because..."
4. **The Running Joke:** @null_handler appears whenever NULL is mentioned.
   @bobby_tables appears when queries aren't parameterized. @geoProjection
   derails into map projections from unrelated topics.
5. **The Cross-Track Visit:** A persona from another track drops in with a
   relevant analogy. "@bindData: enter/update/exit is basically what you're
   describing but with SVG instead of database rows"

### Comment Voice Rules

- Comments are shorter than posts (1-3 sentences)
- The commenter's personality should be recognizable even without seeing the handle
- @scaleLinear comments are always one sentence
- @geoProjection comments always relate back to maps somehow
- @transition_ease comments always consider "how it feels"
- @bobby_tables comments always end with a security consideration
- @null_handler comments always mention edge cases or absence

---

## Easter Eggs & Lore

**For content creators:** Sprinkle these throughout the 300 posts. They reward
repeat readers and create a sense of continuity.

- **@bindData's blog post:** Reference it growing. "Now at 18,000 words. My
  editor (who is also me) has concerns."
- **@geoProjection's manifesto:** Chapter titles leak. Each more unhinged.
- **@bobby_tables' childhood:** New details emerge. First SQL class. The
  professor. College applications. Each detail is funny AND teaches something
  about SQL injection.
- **@middleware_stack's haikus:** Hidden throughout. Secretly form a larger poem.
- **@group_by's quarterly reports:** Meta-analytics about the feed itself.
- **Stacksworth Inc.:** The fictional company where some personas work (or
  consult for). Deploy Fridays happen there. Interns start there. Outages
  happen there.
- **@window_fn's book:** Chapter count keeps growing. Working title changes.
  Other personas offer blurb quotes that are backhanded compliments.
- **@template_tag's JS counter:** "Days since JavaScript broke something"
  appears in various posts. Never exceeds 3.
- **The Great ORM Debate of 2023:** A legendary argument between @manage_py
  and @inner_join. Referenced like historical canon. No records survive.
  Both claim victory.
- **Coffee orders:** Each persona has a canonical coffee. @scaleLinear: black
  (no variables). @transition_ease: oat milk latte with elaborate foam art.
  @bobby_tables: sealed containers only, opened personally.

---

## What NOT to Do

- **Don't break character.** Personas never acknowledge they're AI or fictional.
- **Don't be mean to real people.** Base personas on dev culture archetypes,
  not specific real individuals.
- **Don't leave disagreements unresolved.** The reader should always learn
  the right answer from the thread.
- **Don't over-explain.** These are social media posts, not textbook entries.
  If a concept needs a full lesson, link to one — don't write one in a tweet.
- **Don't be elitist.** Snarky about CODE PATTERNS, never about people's
  skill level. "This pattern is rough" not "you're a bad programmer."
- **Don't repeat the same joke.** Running gags should evolve and callback
  to earlier appearances, not just repeat the same punchline.

---

## JSON Schema for Posts

```json
{
  "id": "d3-001",
  "track": "d3",
  "type": "hotTake",
  "author": "bindData",
  "time": "2h",
  "content": "The post text...",
  "code": "optional code block or null",
  "likes": 847,
  "reposts": 142,
  "comments": [
    {
      "author": "scaleLinear",
      "content": "The comment text...",
      "likes": 203
    }
  ]
}
```

- `id`: `{track}-{number}` (e.g., "d3-042", "sql-099")
- `track`: "d3" | "django" | "sql"
- `type`: One of the post type keys above
- `author`: The persona key (e.g., "bindData", not the display name)
- `time`: Relative time string (e.g., "2h", "1d", "3d", "1w")
- `content`: Post text with `\n` for line breaks, backtick code spans OK
- `code`: Multi-line code string or `null`
- `likes`: Number (vary widely: tips 200-800, hot takes 500-2000+, etc.)
- `reposts`: Number (typically 10-30% of likes)
- `comments`: Array of 0-3 comment objects
  - `author`: Persona key
  - `content`: Comment text
  - `likes`: Number
