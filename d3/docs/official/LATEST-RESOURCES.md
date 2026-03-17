# D3.js Comprehensive Learning Resources (2025-2026)

> Last updated: March 2026
> Current D3 version: **7.9.0** | License: ISC | GitHub Stars: 111.9k+

---

## Table of Contents

1. [Official Documentation & Links](#1-official-documentation--links)
2. [Getting Started Guide](#2-getting-started-guide)
3. [D3 Modules & API Reference](#3-d3-modules--api-reference)
4. [Free Tutorials](#4-free-tutorials)
5. [YouTube Channels & Video Courses](#5-youtube-channels--video-courses)
6. [Paid Courses & Books](#6-paid-courses--books)
7. [D3 Graph Gallery - Example Catalog](#7-d3-graph-gallery---example-catalog)
8. [Observable Plot vs D3 - When to Use Which](#8-observable-plot-vs-d3---when-to-use-which)
9. [React + D3 Integration](#9-react--d3-integration)
10. [D3 v7 Changes & Migration Notes](#10-d3-v7-changes--migration-notes)
11. [2025-2026 Updates & Future Directions](#11-2025-2026-updates--future-directions)
12. [Interview Preparation](#12-interview-preparation)
13. [Community Resources](#13-community-resources)
14. [Key Blog Posts & Articles](#14-key-blog-posts--articles)

---

## 1. Official Documentation & Links

| Resource | URL | Description |
|----------|-----|-------------|
| Official Docs | https://d3js.org | Main documentation site by Observable |
| Getting Started | https://d3js.org/getting-started | Installation, setup, and first steps |
| API Reference | https://d3js.org/d3-selection | Full API docs organized by module |
| GitHub Repo | https://github.com/d3/d3 | Source code, issues, discussions |
| Release Notes | https://github.com/d3/d3/releases | All version releases and changelogs |
| Change Log | https://github.com/d3/d3/blob/main/CHANGES.md | Detailed changes across versions |
| Examples Gallery | https://observablehq.com/@d3/gallery | 100+ official examples on Observable |
| npm Package | https://www.npmjs.com/package/d3 | npm package with version history |
| DevDocs Reference | https://devdocs.io/d3/ | D3.js 7 searchable documentation |

### What is D3?

D3 (Data-Driven Documents) is a JavaScript library for data visualization. It employs a low-level approach built on web standards (HTML, SVG, CSS) that enables developers to craft dynamic, data-driven graphics with fine-grained control. The project has maintained prominence for over ten years, influencing visualization practices and supporting a global community.

---

## 2. Getting Started Guide

### Installation Methods

#### Option A: Observable (Recommended for Quick Start)
- D3 is available by default in Observable notebooks
- Free for public use; Pro accounts for private notebooks
- Includes D3 snippets and sample datasets
- Fork any of the hundreds of published notebooks for a head start

#### Option B: ESM via CDN (Recommended for Vanilla HTML)
```html
<!DOCTYPE html>
<div id="container"></div>
<script type="module">
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const svg = d3.create("svg")
    .attr("width", 640)
    .attr("height", 400);

container.append(svg.node());
</script>
```

#### Option C: UMD via CDN
```html
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
```

#### Option D: Package Managers
```bash
npm install d3       # npm
yarn add d3          # yarn
pnpm add d3          # pnpm
```

```javascript
import * as d3 from "d3";
import { select, selectAll } from "d3";
import { mean, median } from "d3-array";  // Individual modules for smaller bundles
```

#### Option E: Local Download
- `d3.v7.js` - non-minified for debugging
- `d3.v7.min.js` - minified for production

### TypeScript Support
Type declarations are available via DefinitelyTyped.

### Basic Example - Line Chart Setup
```javascript
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Scales
const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

// SVG
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// Axes
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));
```

### Starter Templates
The official gallery includes templates for: Area chart, Bar chart, Donut chart, Histogram, Line chart, and 100+ more.

---

## 3. D3 Modules & API Reference

D3 is modular. You can import just the pieces you need:

### Core Modules

| Module | Purpose |
|--------|---------|
| **d3-selection** | DOM element selection and manipulation |
| **d3-scale** | Mapping data domains to visual ranges |
| **d3-axis** | Visual reference marks for scales |
| **d3-shape** | Generators for lines, areas, arcs, pies, etc. |
| **d3-array** | Array manipulation, statistics, histograms |
| **d3-transition** | Animated transitions on selections |
| **d3-interpolate** | Interpolation between values |
| **d3-format** | Number formatting |
| **d3-time** | Time calculations |
| **d3-time-format** | Time parsing and formatting |
| **d3-color** | Color spaces and manipulation |
| **d3-path** | SVG path serialization |
| **d3-hierarchy** | Tree, treemap, pack, partition layouts |
| **d3-geo** | Geographic projections and paths |
| **d3-force** | Force-directed graph layouts |
| **d3-zoom** | Pan and zoom interactions |
| **d3-brush** | Region selection |
| **d3-drag** | Drag interactions |
| **d3-fetch** | Data loading (CSV, JSON, TSV, etc.) |
| **d3-dsv** | Delimiter-separated value parsing |
| **d3-dispatch** | Event dispatching |
| **d3-chord** | Chord diagram layouts |
| **d3-contour** | Contour plot generation |
| **d3-delaunay** | Voronoi and Delaunay triangulation |
| **d3-quadtree** | Spatial indexing |
| **d3-random** | Random number generators |
| **d3-timer** | Efficient animation scheduling |

### d3-selection API Overview

The selection module is organized into 7 key areas:

1. **Selecting Elements** - `d3.select()`, `d3.selectAll()`
2. **Modifying Elements** - `.attr()`, `.style()`, `.property()`, `.html()`, `.text()`, `.append()`, `.remove()`
3. **Joining Data** - `.data()`, `.enter()`, `.exit()`, `.join()`
4. **Handling Events** - Event listeners for user interaction
5. **Control Flow** - Iterating over selections
6. **Local Variables** - Attaching state to elements
7. **Namespaces** - XML namespace handling

#### Key Pattern: Data Join
```javascript
d3.select("svg")
  .selectAll("circle")
  .data(dataset)
  .join("circle")           // Handles enter + update + exit
    .attr("cx", d => x(d.x))
    .attr("cy", d => y(d.y))
    .attr("r", 5);
```

---

## 4. Free Tutorials

### Beginner-Friendly

| Tutorial | URL | Description |
|----------|-----|-------------|
| **FreeCodeCamp D3 Tutorial** | https://www.freecodecamp.org/news/d3js-tutorial-data-visualization-for-beginners/ | Comprehensive article for beginners with basic HTML/CSS/JS knowledge |
| **Tutorials Teacher** | https://www.tutorialsteacher.com/d3js | Step-by-step D3.js tutorials from basics |
| **Scrimba Free Course** | https://scrimba.com/learn-d3-c02a | 10 interactive screencasts, under 1 hour total |
| **D3 in Depth** | https://www.d3indepth.com/ | In-depth explanations of D3 concepts with examples |
| **W3Schools D3** | https://www.w3schools.com/js/js_graphics_d3js.asp | Quick introduction to D3 graphics |
| **Intro to D3.js** | https://yangdanny97.github.io/intro-to-d3/ | Updated introductory tutorial for D3.js v5-v7 (based on Square's tutorial) |

### Intermediate / Advanced

| Tutorial | URL | Description |
|----------|-----|-------------|
| **Observable Collection** | https://observablehq.com/collection/@d3/d3-selection | Interactive notebooks for learning selections |
| **D3 Graph Gallery** | https://d3-graph-gallery.com/ | Hundreds of reproducible chart examples with editable source code |
| **Mode Analytics D3** | https://mode.com/blog/learn-d3/ | 25+ curated resources to learn D3 from scratch |
| **Hackr.io D3** | https://hackr.io/tutorials/learn-d3-js | Community-voted D3.js tutorials |
| **egghead.io D3** | https://egghead.io/q/d3 | Screencast tutorials by working professionals |

### University Courses (Free)

| Course | URL | Description |
|--------|-----|-------------|
| **NYU - Info Visualization with D3** | Coursera | Programming with D3.js from NYU Tandon School of Engineering |
| **Udacity - Data Visualization and D3** | https://www.udacity.com/course/data-visualization-and-d3js--ud507 | Free course on fundamentals of data visualization with D3 |
| **Codecademy - Learn D3** | https://www.codecademy.com/learn/learn-d3 | Interactive D3 course |

---

## 5. YouTube Channels & Video Courses

### Top Free YouTube Courses

#### Curran Kelleher (FreeCodeCamp)
Curran Kelleher (Ph.D. in Computer Science, taught at MIT) is one of the top D3 instructors in the world.

| Course | Duration | URL |
|--------|----------|-----|
| **Data Visualization with D3 - Full Course for Beginners (2022)** | 19.5 hours | FreeCodeCamp YouTube channel |
| **Data Visualization with D3.js - Full Tutorial (2019)** | 13 hours | FreeCodeCamp YouTube channel |
| **Learn Data Visualization - Free 17-Hour Course** | 17 hours | https://www.freecodecamp.org/news/learn-data-visualization-in-this-free-17-hour-course/ |

Students are encouraged to code along on the **VizHub** platform (https://vizhub.com/).

#### Shirley Wu (Coding Train)
| Course | Duration | Description |
|--------|----------|-------------|
| **Introduction to D3.js with Shirley Wu** | ~2 hours | Award-winning data visualization artist guides through interactive web-based projects |

URL: https://www.classcentral.com/course/youtube-introduction-to-d3-js-with-shirley-wu-108926

#### Other Channels
- **The Coding Train** - Daniel Shiffman covers D3 topics in creative coding context
- **Traversy Media** - Occasional D3 tutorials
- **FreeCodeCamp** - Multiple D3 courses on their channel

### Course Aggregators
| Platform | URL | Description |
|----------|-----|-------------|
| **Class Central** | https://www.classcentral.com/subject/d3 | 60+ D3.js online courses cataloged |
| **Coursesity** | https://coursesity.com/blog/best-d3-js-tutorials/ | 9 best D3.js courses curated |
| **Udemy D3 Topic** | https://www.udemy.com/topic/d3js/ | All D3.js courses on Udemy |

---

## 6. Paid Courses & Books

### Books

| Book | Author | Notes |
|------|--------|-------|
| **Fullstack D3 and Data Visualization** | Amelia Wattenberger | The complete guide to D3 with dozens of code examples. Covers making charts from scratch, D3 + React (Ch. 13), D3 + Angular (Ch. 14). Includes 5+ hours of video training. Available PDF/EPub/Mobi. |
| **D3.js in Action, Third Edition** | Elijah Meeks | Extensively revised for D3 v7. New chapters on interactive visualizations, responsiveness, and accessibility. |
| **D3 Tips and Tricks v7.x** | Malcolm Maclean | https://leanpub.com/d3-t-and-t-v7 - Focused guide for D3 v7 |
| **Interactive Data Visualization for the Web** | Scott Murray | Classic introductory text, great for fundamentals |
| **Integrating D3.js with React** | Elad Elrom | Springer publication on React + D3 integration patterns |

**Author Spotlight: Amelia Wattenberger**
- Website: https://wattenberger.com/
- Frontend developer and designer focused on data visualization
- Book available at: https://www.newline.co/fullstack-d3

### Best Udemy Courses
| Course | Description |
|--------|-------------|
| **Data Visualization with D3** by Adam Jones | 7 hours covering D3 fundamentals through advanced dashboards |
| **Learn and Understand D3.js** | https://www.udemy.com/course/learn-d3js-for-data-visualization/ |
| **Mastering Data Visualization in D3.js** | Available on Coursera - comprehensive web visualization |

---

## 7. D3 Graph Gallery - Example Catalog

**URL:** https://d3-graph-gallery.com/

A collection of hundreds of simple charts made with D3.js, all with reproducible and editable source code.

### Distribution Charts
- Violin plot
- Density plot
- Histogram
- Boxplot
- Ridgeline plot

### Correlation Charts
- Scatter plot
- Heatmap
- Correlogram
- Bubble chart
- Connected scatter plot
- 2D Density plot

### Ranking Charts
- Bar plot
- Spider / Radar chart
- Word cloud
- Parallel coordinates
- Lollipop chart
- Circular bar plot

### Part of a Whole
- Treemap
- Doughnut chart
- Pie chart
- Dendrogram
- Circular packing

### Evolution Charts
- Line plot
- Area chart
- Stacked area chart
- Streamchart

### Map Visualizations
- Basic map
- Choropleth map
- Hexbin map
- Cartogram
- Connection map
- Bubble map

### Flow Charts
- Chord diagram
- Network graph
- Sankey diagram
- Arc diagram
- Edge bundling

### General Knowledge Sections
- D3 Basics
- Custom Styling
- Interactivity
- Shape Helpers
- Caveats & Gotchas

---

## 8. Observable Plot vs D3 - When to Use Which

### Overview
Observable Plot is a high-level charting library built on top of D3, created by the same team. It offers a concise API for common chart types.

### Comparison

| Aspect | D3.js | Observable Plot |
|--------|-------|-----------------|
| **Code volume** | 50+ lines for a histogram | 1 line for a histogram |
| **Flexibility** | Total control over every pixel | Constrained to supported chart types |
| **Data formats** | Tidy tables, aggregated summaries, nested structures | Primarily tidy format |
| **Learning curve** | Steep | Gentle |
| **Customization** | Unlimited | Limited to Plot's API |
| **Interactivity** | Full support | Basic support |

### When to Use D3
- You need **maximum expressiveness** for bespoke visualizations
- You are building for **large audiences** (e.g., media organizations like NYT, The Pudding)
- You need **complex interactivity** (zooming, brushing, dragging, animations)
- You are creating **non-standard visualization types**
- You want to learn the fundamentals of web-based data visualization

### When to Use Observable Plot
- **Rapid prototyping** and exploratory analysis
- **Quick dashboards** or one-off analyses
- Standard chart types where speed matters more than customization
- You want to avoid hundreds of lines of setup code for axes and grids

### Key Resources
- [Plot for D3 Users](https://observablehq.com/@observablehq/plot-for-d3-users) - Official transition guide
- [Reshaping Data for D3 and Plot](https://observablehq.com/blog/reshaping-data-plot-d3) - Data preparation guide
- [Observable Plot Review](https://www.vis4.net/blog/2023/09/observable-plot-review/) - Independent review
- [Observable Plot as Stepping Stone to D3](https://medium.com/@Naraina_Damle/observable-plot-a-stepping-stone-to-d3-35cad5f64e51)

### Recommendation
Start with Observable Plot to learn visualization concepts quickly, then graduate to D3 when you need more control. Plot knowledge transfers well to D3 since they share the same conceptual foundation.

---

## 9. React + D3 Integration

### The Core Challenge
Both React and D3 want control of the DOM. React uses a virtual DOM for efficient reconciliation; D3 directly manipulates the JavaScript DOM. The key is drawing a **clear line of responsibility** between them.

### Three Integration Approaches

#### Approach 1: React Owns the DOM (Recommended)
Use D3 for **data transformations only** (scales, layouts, calculations) and let React handle all DOM rendering via JSX.

```jsx
import { scaleLinear } from "d3-scale";
import { line } from "d3-shape";

function LineChart({ data, width, height }) {
  const xScale = scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([0, d3.max(data)])
    .range([height, 0]);

  const pathGenerator = line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d));

  return (
    <svg width={width} height={height}>
      <path d={pathGenerator(data)} fill="none" stroke="steelblue" />
    </svg>
  );
}
```

**Pros:** Best React integration, no DOM conflicts, server-side rendering, React DevTools work.

#### Approach 2: D3 Owns a Ref (useRef + useEffect)
Give D3 a container ref and let it manage everything inside.

```jsx
import { useRef, useEffect } from "react";
import * as d3 from "d3";

function BarChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("rect")
      .data(data)
      .join("rect")
        .attr("x", (d, i) => i * 25)
        .attr("y", d => 150 - d)
        .attr("width", 20)
        .attr("height", d => d)
        .attr("fill", "steelblue");
  }, [data]);

  return <svg ref={svgRef} width={400} height={150} />;
}
```

**Pros:** Full access to D3 features (transitions, axes, brushing). **Cons:** Bypasses React's rendering.

#### Approach 3: Hybrid (Recommended for Complex Cases)
Use React for structure and static elements; use D3 refs for parts that need transitions or complex interactions (axes, brushes).

### Which D3 Modules Are Safe in React?

| Safe to Use in JSX (no DOM manipulation) | Use with useRef + useEffect |
|------------------------------------------|-----------------------------|
| d3-scale | d3-selection |
| d3-array | d3-transition |
| d3-interpolate | d3-axis |
| d3-format | d3-brush |
| d3-shape (generators) | d3-zoom |
| d3-time | d3-drag |
| d3-hierarchy (layouts) | |
| d3-geo (projections) | |
| d3-color | |
| d3-force (simulation) | |

### Key Resources for React + D3
- [Official D3 Getting Started - React Section](https://d3js.org/getting-started) - Official guidance
- [How to Integrate D3.js with React](https://medium.com/@aleksej.gudkov/how-to-integrate-d3-js-with-react-a-step-by-step-guide-c5e41f6208f8) - Step-by-step guide
- [React + D3.js: Balancing Performance & Developer Experience](https://medium.com/@tibotiber/react-d3-js-balancing-performance-developer-experience-4da35f912484)
- [Using D3.js Inside a React App](https://www.pluralsight.com/resources/blog/guides/using-d3js-inside-a-react-app) - Pluralsight guide
- [Comprehensive Guide to D3.js in React](https://www.influxdata.com/blog/guide-d3js-react/) - InfluxData
- [React + D3: A Starter's Guide](https://megagon.ai/react-d3-a-starters-guide/) - Megagon AI
- [Working with React and D3 Together](https://gist.github.com/alexcjohnson/a4b714eee8afd2123ee00cb5b3278a5f) - GitHub gist with patterns
- **Book:** *Integrating D3.js with React* by Elad Elrom (Springer) - https://link.springer.com/book/10.1007/978-1-4842-7052-3
- **Book:** *Fullstack D3* Chapter 13 covers D3 + React in depth

---

## 10. D3 v7 Changes & Migration Notes

### D3 v7 Overview
Released June 2021. The migration from v6 to v7 is **relatively straightforward** compared to previous major version jumps.

### Breaking Changes in v7

#### ES Modules Only
- D3 now ships as **pure ES modules**
- Requires **Node.js 12 or higher**
- Uses the `type: "module"` standard

#### Scale Changes
- Ordinal scale domains now use **InternMap**
- This enables non-primitive domain values (e.g., Date objects work correctly as map keys)

#### Null Handling
- `d3.ascending` and `d3.descending` **no longer consider null comparable**
- `d3.bin` now **ignores nulls**

#### Selection Changes
- Array-likes (e.g., live NodeList) are **converted to arrays** in `d3.selectAll()` and `selection.selectAll()`

### Migration from Earlier Versions

#### v4/v5 to v6 (Major Changes)
- Event handling changed: `function(d, i, nodes)` -> event passed as first argument `function(event, d)`
- `d3.event` was removed
- See: [D3 v6 Migration Guide](https://observablehq.com/@d3/d3v6-migration-guide)

#### v6 to v7
- Mostly about ES module compatibility
- Few API-level breaking changes
- Focus was on modern JavaScript standards compliance

### References
- [Official CHANGES.md](https://github.com/d3/d3/blob/main/CHANGES.md)
- [D3 7.0 Goes All-in on ECMAScript Modules](https://devclass.com/2021/06/15/d3-7-0-goes-all-in-on-ecmascript-modules/)

---

## 11. 2025-2026 Updates & Future Directions

### Current State (as of early 2026)
- **Latest stable version:** 7.9.0
- D3 continues to be actively maintained
- Focus on stability and ecosystem compatibility

### Trends and Directions

#### TypeScript Integration
- Growing emphasis on type-safe data binding
- TypeScript provides autocompletion and inline documentation
- DefinitelyTyped declarations available for all D3 modules

#### Modularity
- Continued emphasis on importing only needed modules for smaller bundles
- Individual packages installable separately (e.g., `npm install d3-scale`)

#### Observable Ecosystem
- Observable Plot as the recommended high-level alternative for quick charts
- Observable notebooks as the primary environment for D3 exploration
- Observable Framework for building data apps

#### Community Focus Areas
- Accessibility in data visualization
- Responsive/mobile-friendly visualizations
- Performance optimization for large datasets
- Better integration patterns with modern frameworks (React, Svelte, Vue)

### Staying Updated
- **GitHub Releases:** https://github.com/d3/d3/releases
- **npm versions:** https://www.npmjs.com/package/d3?activeTab=versions
- **Observable Blog:** https://observablehq.com/blog
- **D3 Community:** https://d3js.org/community

---

## 12. Interview Preparation

### Interview Question Resources

| Resource | URL | Coverage |
|----------|-----|----------|
| **Guru99 - Top 23 D3.js Questions** | https://career.guru99.com/top-23-d3-js-interview-questions/ | Foundational to intermediate |
| **Adaface - 104 D3.js Questions** | https://www.adaface.com/blog/d3-js-interview-questions/ | Comprehensive question bank |
| **Online Interview Questions** | https://www.onlineinterviewquestions.com/d3-js-interview-questions/ | 25+ questions with answers |
| **JoinGenius - 99+ Questions** | https://joingenius.com/interview-questions/d3.js-developer/ | Extensive developer questions |
| **GitHub - D3 Chart Basics** | https://github.com/learning-zone/d3js-interview-questions | D3.js v7.6.x focused |
| **Curran Kelleher's D3 Interview Questions** | https://currankelleher.medium.com/d3-interview-questions-4a097191b8a7 | From a leading D3 educator |

### Key Topics to Study

#### Foundational Concepts
- What is D3.js and what problem does it solve?
- How does D3 differ from chart libraries like Chart.js or Highcharts?
- Explain the D3 data join pattern (enter, update, exit)
- What are selections and how do they work?

#### Scales and Axes
- Explain the difference between domain and range
- Types of scales: linear, ordinal, time, logarithmic, band, point
- How to create and customize axes

#### Data Binding
- How `.data()` works with key functions
- The enter/update/exit pattern vs. `.join()`
- Handling dynamic data updates

#### Transitions and Animations
- How transitions interpolate between states
- Duration, delay, and easing functions
- Chaining transitions

#### Advanced Topics
- Zooming and panning with d3-zoom
- Brushing and linking views
- Force-directed layouts
- Geographic projections and maps
- Creating reusable chart components
- Performance optimization with large datasets
- SVG vs Canvas rendering tradeoffs

#### Practical Skills
- Sketch a scatter plot implementation
- Implement interactive tooltips
- Build a responsive bar chart
- Handle real-time data updates

---

## 13. Community Resources

### Official Community Channels
| Channel | URL | Description |
|---------|-----|-------------|
| **Observable Forum** | https://talk.observablehq.com | Primary discussion forum |
| **D3 Slack** | https://observablehq.com/slack/join | Free Slack with channels for help, learning, events |
| **GitHub Discussions** | https://github.com/d3/d3/discussions | Technical discussions and Q&A |
| **Stack Overflow** | https://stackoverflow.com/questions/tagged/d3.js | 30,000+ tagged questions |

### Learning Platforms
| Platform | URL | Description |
|----------|-----|-------------|
| **Observable** | https://observablehq.com | Interactive notebook environment with built-in D3 |
| **VizHub** | https://vizhub.com | Platform by Curran Kelleher for coding along with tutorials |
| **D3 Graph Gallery** | https://d3-graph-gallery.com | Reproducible examples for every chart type |
| **bl.ocks.org** | https://bl.ocks.org | Classic D3 example viewer (legacy, being replaced by Observable) |

### People to Follow
| Person | Known For |
|--------|-----------|
| **Mike Bostock** | D3 creator, Observable co-founder |
| **Amelia Wattenberger** | Fullstack D3 author, exceptional tutorials |
| **Curran Kelleher** | Free YouTube courses, VizHub |
| **Shirley Wu** | Data-driven art, D3 educator |
| **Nadieh Bremer** | Data visualization artist |
| **Elijah Meeks** | D3.js in Action author |

### Prerequisites to Brush Up On
Before diving deep into D3, ensure comfort with:
- **JavaScript** (ES6+): arrow functions, promises, modules, array methods
- **HTML & CSS**: DOM structure, selectors
- **SVG**: Basic shapes (rect, circle, path, g, text), coordinate system, transforms
- **Data formats**: JSON, CSV, TSV

---

## 14. Key Blog Posts & Articles

### Must-Read Articles
- [What is D3?](https://d3js.org/what-is-d3) - Official explanation of D3's philosophy
- [Observable and D3 Visualizations](https://observablehq.com/blog/observable-and-d3-visualizations) - Everything you need to know
- [25+ Resources to Learn D3.js from Scratch](https://mode.com/blog/learn-d3/) - Comprehensive curated list by Mode Analytics
- [D3.js Future Insights](https://moldstud.com/articles/p-d3js-future-insights-upcoming-changes-and-how-to-prepare-for-them) - Upcoming changes and preparation

### React + D3 Articles
- [How to Integrate D3.js with React: Step-by-Step](https://medium.com/@aleksej.gudkov/how-to-integrate-d3-js-with-react-a-step-by-step-guide-c5e41f6208f8)
- [React + D3.js: Balancing Performance & Developer Experience](https://medium.com/@tibotiber/react-d3-js-balancing-performance-developer-experience-4da35f912484)
- [Comprehensive Guide to D3.js in React](https://www.influxdata.com/blog/guide-d3js-react/)
- [How to Build D3 with React](https://josepham.me/how-to-build-d3-with-react/)

### Comparison & Decision Articles
- [Observable Plot for D3 Users](https://observablehq.com/@observablehq/plot-for-d3-users)
- [Observable Plot Review](https://www.vis4.net/blog/2023/09/observable-plot-review/)
- [The Same Chart in Vega-lite, D3, and Plot](https://observablehq.com/@cobus/the-same-chart-in-vega-lite-and-d3)

### Podcasts
- [Fullstack D3 with Amelia Wattenberger - JS Party #113](https://changelog.com/jsparty/113)
- [Data Visualization with Dr. Curran Kelleher - FreeCodeCamp Podcast #104](https://freecodecamp.libsyn.com/104-data-visualization-with-dr-curran-kelleher)

---

## Quick Start Learning Path

### Week 1-2: Foundations
1. Read [What is D3?](https://d3js.org/what-is-d3) and [Getting Started](https://d3js.org/getting-started)
2. Complete the [Scrimba free course](https://scrimba.com/learn-d3-c02a) (~1 hour)
3. Work through [D3 Graph Gallery basics](https://d3-graph-gallery.com/)
4. Brush up on SVG fundamentals

### Week 3-4: Core Concepts
1. Study selections, scales, and axes at [D3 in Depth](https://www.d3indepth.com/)
2. Follow [FreeCodeCamp D3 tutorial](https://www.freecodecamp.org/news/d3js-tutorial-data-visualization-for-beginners/)
3. Fork and modify examples on [Observable](https://observablehq.com/@d3/gallery)

### Week 5-8: Deep Dive
1. Watch Curran Kelleher's full course on YouTube
2. Build 5-10 different chart types from D3 Graph Gallery
3. Study a chapter per day from *Fullstack D3* or *D3.js in Action*

### Week 9-12: Advanced & Integration
1. Learn React + D3 integration patterns
2. Build an interactive dashboard project
3. Study force layouts, geo projections, and transitions
4. Review interview questions from resources above

---

*This document was compiled from official D3 documentation, web searches, and community resources as of March 2026. Links and version numbers may change -- check the official sources for the latest information.*
