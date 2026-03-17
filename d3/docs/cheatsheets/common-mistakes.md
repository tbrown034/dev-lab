# Common D3.js Mistakes & How to Fix Them

A troubleshooting guide for the exact errors D3 beginners hit. Bookmark this page.

---

## 1. "My chart is completely blank"

**Symptom:** You see nothing at all. No SVG, no shapes, no errors in the console.

**Common causes:**

### A. You forgot to set width/height on the SVG

```js
// WRONG - SVG has 0x0 dimensions
const svg = d3.select("#chart").append("svg");

// FIX - Set explicit dimensions
const svg = d3.select("#chart").append("svg")
  .attr("width", 600)
  .attr("height", 400);

// OR use viewBox for responsive:
const svg = d3.select("#chart").append("svg")
  .attr("viewBox", "0 0 600 400");
```

### B. Your selector doesn't match anything

```js
// WRONG - no element with id="chart" in the HTML
d3.select("#chart").append("svg"); // silently does nothing

// FIX - make sure the element exists
// <div id="chart"></div>
```

### C. Your script runs before the DOM is ready

```js
// WRONG - script in <head> runs before <body> is parsed
<head><script src="chart.js"></script></head>

// FIX - put script at end of body, or use type="module"
<body>
  <div id="chart"></div>
  <script type="module" src="chart.js"></script>
</body>
```

### D. Data loading failed silently

```js
// WRONG - no error handling
d3.csv("data.csv").then(data => render(data));

// FIX - add .catch() or check the data
d3.csv("data.csv").then(data => {
  console.log("Loaded:", data.length, "rows");
  console.log("First row:", data[0]);
  render(data);
}).catch(err => console.error("Load failed:", err));
```

---

## 2. "My bars are upside down"

**Symptom:** Bars grow downward from the top instead of upward from the bottom.

**Cause:** SVG y=0 is at the **top**. If you set `y` to the data value directly, larger values push bars further down.

```js
// WRONG - bars grow down
.attr("y", d => d.value)       // y increases downward!
.attr("height", d => d.value)

// FIX - invert with the scale
const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([height, 0]);   // INVERTED: height at bottom, 0 at top

.attr("y", d => y(d.value))              // top edge of bar
.attr("height", d => height - y(d.value)) // bar grows up to baseline
```

The key insight: `y(value)` gives the TOP edge of the bar. The height is `height - y(value)`, which is the distance from that top edge down to the baseline.

---

## 3. "My text/labels are invisible"

**Symptom:** Text elements exist in the DOM (you can see them in DevTools) but nothing appears on screen.

**Cause:** SVG `<text>` defaults to `fill: black`. On a dark background, black text is invisible.

```js
// WRONG - text is black on dark background
svg.append("text").text("Hello");

// FIX - set fill color
svg.append("text")
  .attr("fill", "#e5e5e5")  // light color on dark bg
  .text("Hello");
```

Other reasons text might be invisible:
- Text is positioned outside the SVG viewBox
- Text is behind other elements (SVG renders in document order -- later elements are on top)
- Font size is 0 or extremely small

---

## 4. "My circles are in the wrong position"

**Symptom:** Scatter plot dots are clustered in one corner or outside the chart area.

**Common causes:**

### A. You forgot to apply scales

```js
// WRONG - using raw data values as pixel positions
.attr("cx", d => d.x)   // d.x might be 0.5 (half a pixel!)
.attr("cy", d => d.y)

// FIX - use scales to map data to pixels
.attr("cx", d => xScale(d.x))
.attr("cy", d => yScale(d.y))
```

### B. Your data values are strings

```js
// d3.csv returns EVERYTHING as strings
// "42" + "8" = "428", not 50

// FIX - convert to numbers in your row accessor
const data = await d3.csv("data.csv", d => ({
  x: +d.x,        // the + operator converts string to number
  y: +d.y,
  label: d.label,  // keep strings as strings
}));
```

### C. Domain and range are wrong

```js
// WRONG - domain doesn't match data
const x = d3.scaleLinear().domain([0, 100]).range([0, width]);
// but your data goes from 0 to 50000...

// FIX - use d3.extent or d3.max
const x = d3.scaleLinear()
  .domain(d3.extent(data, d => d.x))  // auto min/max
  .range([0, width]);
```

---

## 5. "My line chart shows nothing"

**Symptom:** No line appears, or you see a filled black shape instead of a line.

**Cause 1:** You used `.data()` instead of `.datum()`

```js
// WRONG - .data() tries to create one path per data point
svg.selectAll("path").data(data).join("path")
  .attr("d", line);  // each path gets ONE data point

// FIX - use .datum() for a single path from all points
svg.append("path")
  .datum(data)          // ONE path, ALL data
  .attr("fill", "none")
  .attr("stroke", "#818cf8")
  .attr("stroke-width", 2)
  .attr("d", line);
```

**Cause 2:** You forgot `fill: none`

```js
// WRONG - path fills with black by default
svg.append("path").datum(data).attr("d", line);

// FIX
.attr("fill", "none")     // no fill!
.attr("stroke", "#818cf8") // visible stroke
.attr("stroke-width", 2)
```

**Cause 3:** Data isn't sorted by x-axis

```js
// WRONG - line zigzags because dates are out of order
// FIX - sort before creating the line
data.sort((a, b) => a.date - b.date);
```

---

## 6. "selectAll returns empty and nothing renders"

**Symptom:** You call `selectAll("rect").data(data).join("rect")` but no rects appear.

**Common causes:**

### A. You're selecting from the wrong parent

```js
// WRONG - selecting from d3 (document level) instead of your SVG
d3.selectAll("rect").data(data).join("rect");

// FIX - select from your SVG group
svg.selectAll("rect").data(data).join("rect");
```

### B. Your data array is empty

```js
console.log("Data length:", data.length);  // Check this!
// If it's 0 or undefined, the join creates nothing

// Common cause: async data not loaded yet
// FIX - make sure data is loaded before rendering
const data = await d3.csv("data.csv");
// NOW render
```

### C. Conflicting selectors

```js
// WRONG - you already have other rects in this SVG
// selectAll("rect") grabs ALL of them
svg.selectAll("rect").data(barData).join("rect");  // also grabs legend rects!

// FIX - use a class
svg.selectAll("rect.bar").data(barData).join("rect").attr("class", "bar");
svg.selectAll("rect.legend").data(legendData).join("rect").attr("class", "legend");
```

---

## 7. "My transitions don't work"

**Symptom:** Elements jump to their final state instead of animating.

**Cause 1:** You're setting attributes AFTER the transition

```js
// WRONG - .attr after .transition applies instantly
svg.selectAll("rect")
  .transition().duration(800)
  .attr("fill", "#f97316")   // this animates
  .attr("y", d => y(d.value));  // this animates too

// But then:
  .attr("x", d => x(d.label));  // WRONG - still part of transition chain

// If you want some attrs to NOT animate, set them BEFORE .transition():
svg.selectAll("rect")
  .attr("x", d => x(d.label))     // set immediately (no animation)
  .attr("width", x.bandwidth())    // set immediately
  .transition().duration(800)
  .attr("y", d => y(d.value))      // animate this
  .attr("height", d => height - y(d.value));  // animate this
```

**Cause 2:** You have no starting state to transition FROM

```js
// WRONG - new elements have no y/height, so nothing to interpolate
svg.selectAll("rect").data(data).join("rect")
  .transition().duration(800)
  .attr("y", d => y(d.value))
  .attr("height", d => height - y(d.value));

// FIX - set initial state, then transition
svg.selectAll("rect").data(data).join("rect")
  .attr("y", height)          // start at bottom
  .attr("height", 0)          // start with no height
  .transition().duration(800)
  .attr("y", d => y(d.value))
  .attr("height", d => height - y(d.value));
```

**Cause 3:** You called `.join()` which replaces the selection

```js
// .join("rect") returns the MERGED selection, not a transition
// You need to chain .transition() after .join()
svg.selectAll("rect")
  .data(data)
  .join("rect")
  .transition()  // <-- chain here
  .duration(800)
  .attr("y", d => y(d.value));
```

---

## 8. "My axes have weird numbers"

**Symptom:** Axis shows values like 0.30000000000000004, or ticks are at ugly intervals.

**Fix 1:** Use `.nice()` on your scale

```js
const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .nice()        // rounds to clean numbers like 0, 20, 40, 60, 80, 100
  .range([height, 0]);
```

**Fix 2:** Use `.tickFormat()` on the axis

```js
d3.axisLeft(y)
  .ticks(5)
  .tickFormat(d3.format(".0f"))   // no decimal places
```

**Fix 3:** Your data values are strings

```js
// d3.csv returns strings: "42.5" is not the number 42.5
// scaleLinear with string data produces weird results

// FIX - convert in row accessor
const data = await d3.csv("data.csv", d => ({
  value: +d.value,  // + converts to number
}));
```

---

## 9. "My chart isn't responsive / overflows"

**Symptom:** Chart has a fixed size, overflows its container, or doesn't resize with the window.

**Fix: Use viewBox instead of fixed width/height**

```js
// WRONG - fixed pixel dimensions
const svg = d3.select("#chart").append("svg")
  .attr("width", 800)
  .attr("height", 400);

// FIX - use viewBox + CSS
const svg = d3.select("#chart").append("svg")
  .attr("viewBox", "0 0 800 400")
  .style("width", "100%")
  .style("height", "auto")
  .style("max-width", "800px");

// Your internal coordinates stay 0-800 x 0-400
// The SVG scales to fit its container
```

For dynamic resizing:

```js
function resize() {
  const { width } = container.getBoundingClientRect();
  // Recalculate scales with new width, redraw
}
window.addEventListener("resize", resize);
```

---

## 10. "My tooltip appears in the wrong position"

**Symptom:** Tooltip shows up far from the mouse, or in a completely wrong spot.

**Cause 1:** Using `event.clientX/Y` instead of `event.pageX/Y`

```js
// WRONG - clientX doesn't account for scrolling
.style("left", event.clientX + "px")

// FIX - use pageX/pageY
.style("left", (event.pageX + 10) + "px")
.style("top", (event.pageY - 28) + "px")
```

**Cause 2:** Tooltip parent isn't `position: relative` or `absolute`

```js
// FIX - append tooltip to body with position: absolute
const tooltip = d3.select("body").append("div")
  .style("position", "absolute")
  .style("pointer-events", "none");
```

**Cause 3:** SVG transforms shift coordinates

```js
// If your SVG has transforms (viewBox, translate), mouse coordinates
// may not match SVG coordinates.

// For SVG-internal tooltips, use:
const [x, y] = d3.pointer(event);
// d3.pointer accounts for all SVG transforms
```

---

## 11. "My map is blank / tiny / in the wrong position"

**Symptom:** US map shows nothing, or appears as a tiny dot, or is in the ocean.

**Cause 1:** Wrong projection

```js
// WRONG for US maps:
d3.geoMercator()    // world projection, US will be tiny

// FIX - use geoAlbersUsa for US maps (includes Alaska & Hawaii)
const projection = d3.geoAlbersUsa()
  .scale(1200)
  .translate([width / 2, height / 2]);
```

**Cause 2:** Didn't convert TopoJSON to GeoJSON

```js
// WRONG - passing TopoJSON directly to geoPath
svg.selectAll("path").data(us.objects.states.geometries)
  .join("path").attr("d", path);  // won't work!

// FIX - convert with topojson.feature()
import * as topojson from "topojson-client";
const states = topojson.feature(us, us.objects.states);
svg.selectAll("path").data(states.features)
  .join("path").attr("d", path);
```

**Cause 3:** Scale is wrong

```js
// FIX - use fitSize to auto-scale to your SVG dimensions
projection.fitSize([width, height], geojsonFeatureCollection);
```

---

## 12. "My colors are all the same"

**Symptom:** You expected different colors per bar/slice but everything is the same color.

**Cause 1:** You're passing a fixed value instead of a function

```js
// WRONG - same color for everything
.attr("fill", "#f97316")

// FIX - pass a function that returns different colors
const color = d3.scaleOrdinal(d3.schemeTableau10);
.attr("fill", d => color(d.category))
```

**Cause 2:** Your color scale domain doesn't match your data

```js
// WRONG - domain has different keys than data
const color = d3.scaleOrdinal()
  .domain(["A", "B", "C"])
  .range(["red", "green", "blue"]);
// but data has categories "cat1", "cat2", "cat3"

// FIX - use actual data values for domain
const color = d3.scaleOrdinal()
  .domain(data.map(d => d.category))
  .range(["#f97316", "#818cf8", "#4ade80"]);
```

**Cause 3:** Sequential scale domain is [0, 0]

```js
// WRONG - all values map to the same color
const color = d3.scaleSequential(d3.interpolateBlues)
  .domain([0, 0]);  // min === max, everything maps to same spot

// FIX - make sure domain has different min and max
.domain([0, d3.max(data, d => d.value)])
// and make sure d.value isn't always the same number!
```

---

## 13. "Old tutorials don't work with D3 v7"

**Symptom:** Copy-pasting from a tutorial (written for D3 v3-v5) produces errors.

### Key breaking changes:

**Event handlers (v6+):** `(event, d)` instead of `(d, i, nodes)`

```js
// OLD (v3-v5)
.on("click", function(d) {
  console.log(d);
  console.log(d3.event.pageX);  // d3.event is gone!
})

// NEW (v6+)
.on("click", function(event, d) {
  console.log(d);
  console.log(event.pageX);  // event is the first argument
})
```

**`d3.event` is removed.** The event is now the first argument to handlers.

**`.enter().append()` vs `.join()`:**

```js
// OLD pattern
svg.selectAll("rect")
  .data(data)
  .enter()        // only new elements
  .append("rect")
  .attr("x", ...);

// NEW pattern (preferred)
svg.selectAll("rect")
  .data(data)
  .join("rect")   // handles enter + update + exit
  .attr("x", ...);
```

**`d3.json` / `d3.csv` return Promises (v5+):**

```js
// OLD (v3-v4)
d3.json("data.json", function(error, data) { ... });

// NEW (v5+)
const data = await d3.json("data.json");
// or
d3.json("data.json").then(data => { ... });
```

**Modules:** D3 v7 is fully ESM. Use `import * as d3 from "d3"` or import specific modules.

---

## 14. "D3 in React renders twice / is buggy"

**Symptom:** Chart renders, then immediately re-renders (or duplicates elements). Or elements accumulate on each state change.

**Cause 1:** React StrictMode calls useEffect twice in development

```js
// FIX - clear previous render at the start of useEffect
useEffect(() => {
  const svg = d3.select(svgRef.current);
  svg.selectAll("*").remove();  // CLEAR before drawing

  // ... your D3 code
}, [data]);
```

**Cause 2:** Not cleaning up on unmount

```js
useEffect(() => {
  const svg = d3.select(svgRef.current);
  // ... D3 code

  return () => {
    svg.selectAll("*").remove();  // cleanup on unmount
  };
}, [data]);
```

**Cause 3:** D3 and React both trying to manage the DOM

```js
// WRONG - D3 appends a new SVG on every render
function Chart() {
  useEffect(() => {
    d3.select("#chart").append("svg"); // new SVG each render!
  });
}

// FIX - React owns the SVG, D3 draws inside it
function Chart() {
  const ref = useRef();
  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    // draw inside the existing SVG
  }, [data]);
  return <svg ref={ref} width={500} height={300} />;
}
```

**Best practice:** Use D3 only for math (scales, generators, layouts) and let React handle the DOM:

```jsx
function Chart({ data }) {
  const x = d3.scaleBand().domain(data.map(d => d.label)).range([0, 500]).padding(0.2);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([300, 0]);

  return (
    <svg width={500} height={300}>
      {data.map(d => (
        <rect key={d.label} x={x(d.label)} y={y(d.value)}
          width={x.bandwidth()} height={300 - y(d.value)} fill="#f97316" />
      ))}
    </svg>
  );
}
```
