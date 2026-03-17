# D3.js vs What You Already Know

Side-by-side comparisons between D3 and the tools you might be coming from. This helps you understand **when D3 is the right choice** and when another tool will get the job done faster.

---

## D3 vs Datawrapper

| Aspect | Datawrapper | D3.js |
|--------|------------|-------|
| **Setup time** | 2 minutes (paste data, pick chart) | 30-60 min (code from scratch) |
| **Bar chart** | Click "Bar chart", paste CSV | 30+ lines of code (scales, axes, rects) |
| **Line chart** | Click "Line chart" | 25+ lines (scaleTime, d3.line, path) |
| **Scatter plot** | Built-in | 20+ lines |
| **Choropleth map** | Built-in with world/US templates | 50+ lines (projection, TopoJSON, color scale) |
| **Pie/donut** | Built-in | 20+ lines (d3.pie, d3.arc) |
| **Custom annotations** | Limited built-in options | Complete freedom (SVG text, lines, anything) |
| **Custom interactions** | Tooltip only | Anything: zoom, brush, drag, linked views |
| **Embed** | iframe/script embed | Part of your app, full control |
| **Styling** | Themes, limited CSS | Complete CSS/SVG control |
| **Responsive** | Automatic | You handle it (viewBox or resize logic) |
| **Cost** | Free tier, paid for teams | Free (open source) |

**When to use Datawrapper:** You need a standard chart published quickly (editorial, blog posts, reports). The chart types they offer cover your needs.

**When to use D3:** You need custom interactions, non-standard chart types, charts embedded in a web app, or full design control.

---

## D3 vs Flourish

| Aspect | Flourish | D3.js |
|--------|---------|-------|
| **Animations** | Built-in "story" mode, animated transitions | You code every animation |
| **Scrollytelling** | Built-in | You build with Scrollama/GSAP + D3 |
| **Race bar charts** | One-click template | 100+ lines of code |
| **3D globe** | Built-in template | You'd need Three.js + D3 |
| **Custom templates** | Can build with their SDK | Build anything |
| **Data size** | Limited by browser + their processing | Limited by browser only |
| **Brand control** | Template-based, some customization | Pixel-perfect control |
| **Team workflow** | Collaborative editing | Git-based collaboration |
| **Offline** | No (cloud-based) | Yes (runs anywhere) |
| **Cost** | Free tier, paid for custom branding | Free |

**When to use Flourish:** You want animated storytelling, race charts, or interactive stories without coding. Great for presentations and social media.

**When to use D3:** You need to integrate visualization into a product, need custom layouts, or need offline/self-hosted solutions.

---

## D3 vs Chart.js

| Aspect | Chart.js | D3.js |
|--------|---------|-------|
| **Rendering** | Canvas (raster) | SVG (vector) |
| **Bundle size** | ~60KB (tree-shakeable) | ~25KB for commonly used modules |
| **Learning curve** | Low (config object) | High (imperative code) |
| **Bar chart** | `{ type: 'bar', data: {...} }` | 30+ lines of code |
| **Chart types** | 8 built-in types | Unlimited (you build anything) |
| **Customization** | Plugin system, good but bounded | Unlimited |
| **Large datasets** | Better (Canvas = fast pixel pushing) | Slower with 10k+ SVG elements |
| **Accessibility** | Limited (Canvas is opaque) | Good (SVG elements are in DOM) |
| **Server-side** | Needs canvas polyfill | Works with jsdom |
| **Animations** | Built-in, config-based | You code transitions |
| **Tooltip** | Built-in | You build it |
| **React/Vue** | react-chartjs-2, vue-chartjs | Manual integration or visx/nivo |

**When to use Chart.js:** You need standard chart types in a dashboard with minimal code. Performance matters (large datasets). You want built-in tooltips and legends.

**When to use D3:** You need non-standard visualizations, SVG export, fine-grained control over every element, or charts that don't fit standard templates.

### Code comparison

**Chart.js - Bar chart:**
```js
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['A', 'B', 'C'],
    datasets: [{ data: [30, 80, 45], backgroundColor: '#f97316' }]
  }
});
```

**D3 - Bar chart (just the bars, no setup/scales):**
```js
svg.selectAll("rect")
  .data(data)
  .join("rect")
  .attr("x", d => x(d.label))
  .attr("y", d => y(d.value))
  .attr("width", x.bandwidth())
  .attr("height", d => height - y(d.value))
  .attr("fill", "#f97316");
```

---

## D3 vs Tableau

| Aspect | Tableau | D3.js |
|--------|--------|-------|
| **User** | Analysts, business users | Developers, designers |
| **Interface** | Drag-and-drop GUI | Code (JavaScript) |
| **Data connection** | Direct DB connections, live queries | You fetch/load data in JS |
| **Dashboards** | Drag components, built-in filters | Code every panel and interaction |
| **Exploration** | Click to filter, drill down, sort | You build every interaction |
| **Maps** | Built-in geocoding, layers | Manual with projections + TopoJSON |
| **Performance** | Handles millions of rows (server-side) | Browser-limited (~100K elements) |
| **Sharing** | Tableau Server/Public | Deploy as a web page |
| **Collaboration** | Built-in workbooks | Git |
| **Custom visuals** | Extensions API (limited) | Unlimited |
| **Cost** | $70+/user/month (Creator) | Free |
| **Embed in app** | Tableau Embed API | Native web, part of your app |
| **Version control** | Limited | Full Git history |

**When to use Tableau:** You're doing data exploration (not building a product). You have large datasets with complex joins. Your team is analysts, not developers.

**When to use D3:** You're building a web product. You need custom visualizations that Tableau can't produce. You need version control, CI/CD, and code review.

---

## When to Use Which -- Decision Framework

### Use **Datawrapper / Flourish** when:
- You need a chart in < 30 minutes
- Standard chart types cover your needs
- Publishing to a blog/article/social media
- Non-technical team members need to update charts
- You don't need to embed in a custom web app

### Use **Chart.js** when:
- You need standard charts in a web app
- You want minimal code (config over code)
- Performance with large datasets matters
- You're building a dashboard with common chart types
- You want built-in tooltips, legends, animations

### Use **Tableau** when:
- You're exploring data (not building a product)
- You need live database connections
- Your team is analysts, not engineers
- You need enterprise collaboration features
- Datasets are massive (millions of rows)

### Use **D3.js** when:
- You need **custom** visualizations (not standard charts)
- The visualization is part of a **web product**
- You need **full control** over design, animation, interaction
- You're building **scrollytelling** or narrative visualizations
- You need **SVG output** (for print, PDF, high-res)
- You're building reusable, **parameterized** chart components
- You need visualizations to be **accessible** (screen readers)
- You want to understand **how** data visualization works

---

## What D3 Gives You That Others Don't

1. **Total creative freedom.** No templates, no constraints. If you can imagine it, D3 can render it. Beeswarm plots, chord diagrams, force-directed graphs, custom map projections, Voronoi tessellations -- none of these exist in Chart.js or Datawrapper.

2. **SVG output.** Every element is a DOM node. You can inspect it, style it with CSS, animate it with CSS transitions, export it as a vector graphic for print.

3. **Data-driven DOM.** The enter/update/exit pattern lets you declaratively bind data to visual elements. When data changes, D3 knows what to create, update, and remove.

4. **Composable primitives.** Scales, axes, shapes, layouts, projections -- these are independent modules. You combine them however you want. This is why D3 can produce any visualization.

5. **Web-native.** D3 produces standard HTML/SVG/CSS. No plugins, no runtime, no special viewers. It works everywhere the web works.

6. **Ecosystem.** Observable notebooks, thousands of examples, a massive community. Most advanced visualization on the web is built with D3.

---

## What Others Give You That D3 Doesn't

1. **Speed of development.** A Datawrapper bar chart takes 2 minutes. A D3 bar chart takes 30-60 minutes the first time.

2. **Built-in interactivity.** Tooltips, legends, zoom, pan -- all config options in Chart.js or Tableau. In D3, you build each from scratch.

3. **Data infrastructure.** Tableau connects directly to databases, handles joins, aggregations, and caching. D3 expects you to bring clean data.

4. **No-code access.** Non-technical team members can use Datawrapper, Flourish, and Tableau. D3 requires JavaScript proficiency.

5. **Maintenance.** Config-based tools handle browser updates, responsiveness, and edge cases. D3 code needs manual maintenance.

6. **Out-of-the-box polish.** Commercial tools have professional designers creating default themes. D3 charts look however you make them look -- which means "ugly" until you invest in design.

---

## The Pragmatic Take

**Learn D3 to understand data visualization fundamentals.** Even if you end up using Chart.js or Flourish day-to-day, understanding scales, data binding, projections, and the grammar of graphics makes you better at every tool.

**Use D3 when the job demands it.** Custom visualizations in a web product, newsroom graphics, data art, interactive stories.

**Use simpler tools when they suffice.** There's no prize for writing 50 lines of D3 when `new Chart(ctx, config)` does the same thing. Pick the right tool for the job.
