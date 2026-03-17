# D3.js Curriculum - Expert Fundamentals in 2 Weeks

## Philosophy
Mental models first. Each lesson covers ONE concept deeply.
By the end, you read D3 code like English and build charts from memory.

---

## Week 1: The Foundation

### Day 1-2
**Lesson 01: Pure SVG**
No JavaScript. Just HTML tags that draw shapes.
- What SVG is and why D3 uses it
- The coordinate system (0,0 = top-left, Y goes down)
- Every shape: rect, circle, ellipse, line, polyline, polygon, text, path
- Groups (<g>) and transforms
- Hand-code a complete bar chart in pure HTML
- Hand-code a complete scatter plot in pure HTML
- Quiz: "draw this shape" challenges

**Lesson 02: Manipulating SVG with JavaScript**
Before D3, understand what's happening in vanilla JS.
- document.createElementNS and the SVG namespace
- setAttribute, appendChild, querySelector
- Looping through data to create elements
- Why this is tedious → motivation for D3
- Build the same chart with a forEach loop
- Side-by-side: HTML vs JS vs (preview of) D3

### Day 3-4
**Lesson 03: D3 Selections**
D3's replacement for querySelector/querySelectorAll.
- d3.select() and d3.selectAll()
- .attr(), .style(), .text(), .html()
- .append(), .remove()
- Method chaining (every method returns the selection)
- .each() for side effects
- .classed() for toggling CSS classes
- Selections ARE arrays - you can iterate them

**Lesson 04: Data Binding**
The ONE concept that makes D3 different from everything else.
- What .data() actually does (attaches data to DOM nodes)
- The __data__ property (inspect in dev tools!)
- .join() as the simple version
- Accessor functions: (d, i) => ...
- "d" is the datum, "i" is the index
- Build a chart using selectAll().data().join()
- WHY does empty selectAll work? (the intent declaration)

### Day 5
**Lesson 05: Scales**
The translator between data-world and pixel-world.
- A scale is just a function
- domain = input range, range = output range
- scaleLinear: continuous → continuous
- scaleBand: categories → pixel bands
- scaleTime: dates → pixels
- scaleSequential: numbers → colors
- Why Y range is flipped: [height, 0]
- .nice(), .clamp(), .invert()
- Interactive: play with scales, see the output

**Lesson 06: Axes & The Margins Convention**
Labels for your scales + the boilerplate every chart uses.
- Axes are generated FROM scales
- axisBottom, axisLeft, axisTop, axisRight
- .call() - passing a selection to a function
- .ticks(), .tickFormat(), .tickValues()
- The margins convention (memorize this pattern)
- Styling axes (removing domain line, custom colors)
- Grid lines

---

## Week 2: Building Real Things

### Day 6-7
**Lesson 07: Enter/Update/Exit (Deep Dive)**
What happens when data changes. The wedding seating chart.
- Three groups: enter (new guests), update (seated), exit (leaving)
- .join() with three callbacks
- Key functions: d => d.id (name tags for data)
- Why keys matter for animations
- General update pattern (function that re-renders)
- Build: filterable, sortable, animated bar chart

**Lesson 08: Lines, Areas & Time Series**
Path generators = cookie cutters for complex shapes.
- d3.line() - connect the dots
- d3.area() - filled region
- .datum() vs .data() (one path vs many elements)
- Curve types (linear, monotoneX, step, cardinal)
- d3.stack() for stacked areas
- Build: polling trend line with confidence band

### Day 8-9
**Lesson 09: Arcs, Pies & Radial**
Round things.
- d3.arc() - the arc path generator
- d3.pie() - computes angles from data
- innerRadius > 0 = donut, = 0 = pie
- Centroid for label positioning
- Build: campaign finance donut chart

**Lesson 10: Maps & Geography**
Flattening a globe onto a screen.
- GeoJSON format (features with geometry)
- TopoJSON (compressed, needs conversion)
- Projections: lat/lng → x/y (another scale!)
- d3.geoPath() - the geographic path generator
- geoAlbersUsa (US with Alaska/Hawaii insets)
- .fitSize() for automatic scaling
- Choropleth: color regions by data
- Build: US state map colored by census data

### Day 10-11
**Lesson 11: Interactivity & Polish**
Making charts respond to humans.
- Mouse events: mouseover, mouseout, click
- D3 v7 event pattern: (event, d) =>
- Tooltips (HTML div, not SVG)
- Transitions: .transition().duration().delay()
- Easing functions
- Responsive: viewBox + preserveAspectRatio
- Accessibility: ARIA labels, keyboard nav, color contrast
- Build: interactive map with tooltips + animated bar chart

**Lesson 12: D3 in React**
Using D3 in your actual production stack.
- Two approaches: D3 for math vs D3 for DOM
- useRef + useEffect pattern
- D3 as a utility library (scales, shapes, geo only)
- React renders SVG, D3 calculates values
- When to let D3 own the DOM (complex animations)
- Build: React component wrapping a D3 chart

### Day 12-14
**Capstone: Broadcast Data Dashboard**
Combine everything into an interview-ready demo.
- Multi-view: map + bar chart + donut + filters
- Real API data (Census or FEC)
- Live updates with transitions
- Responsive, accessible, polished
- Something you can present and explain every line of

---

## Daily Practice
- Morning: Read the lesson, study the mental model
- Code-along: Build the demos yourself (don't just read)
- Exercise: Complete the exercise without looking at the solution
- Review: Can you explain the concept to someone else?
- Quiz: Answer without peeking

## Expert Test (end of week 2)
You're an expert when you can:
- [ ] Explain enter/update/exit to a non-programmer
- [ ] Build a bar chart from memory (no docs)
- [ ] Build a line chart from memory
- [ ] Build a US choropleth from memory
- [ ] Read any D3 code on Observable and understand every line
- [ ] Explain why D3 does things differently from React
- [ ] Know when to use D3 vs a higher-level library
