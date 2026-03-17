# D3.js Core Concepts Cheatsheet

## What is D3?
D3 = **D**ata-**D**riven **D**ocuments. It binds data to DOM elements and applies
data-driven transformations. It is NOT a charting library - it's a low-level toolkit
for building custom visualizations.

**Created by:** Mike Bostock (also created Observable)
**Current version:** D3 v7 (modular, ESM-first)
**Key difference from Chart.js/Highcharts:** You build everything from primitives.
More work, but unlimited flexibility.

---

## 1. Selections

```js
// Select one element
d3.select("svg")

// Select all matching elements
d3.selectAll("circle")

// Chain operations
d3.select("svg")
  .attr("width", 800)
  .attr("height", 600)
  .style("background", "#f0f0f0")

// Append new elements
d3.select("svg")
  .append("rect")
  .attr("x", 10)
  .attr("y", 10)
  .attr("width", 100)
  .attr("height", 50)
```

## 2. Data Binding (THE core concept)

```js
const data = [10, 20, 30, 40, 50];

// Modern pattern (D3 v7) - use .join()
d3.select("svg")
  .selectAll("rect")
  .data(data)
  .join("rect")
    .attr("x", (d, i) => i * 60)
    .attr("y", d => 200 - d * 3)
    .attr("width", 50)
    .attr("height", d => d * 3)
    .attr("fill", "steelblue");
```

### The Classic Pattern (know this for interviews)
```js
const selection = svg.selectAll("rect").data(data);

// ENTER - new data points that need new DOM elements
selection.enter()
  .append("rect")
  .attr("fill", "steelblue");

// UPDATE - existing elements that need new values
selection
  .attr("width", d => xScale(d));

// EXIT - DOM elements with no corresponding data
selection.exit().remove();
```

**Mental model:** Think of it as a SQL JOIN between your data array and DOM elements.
- ENTER = data with no matching element (LEFT ONLY)
- UPDATE = data with a matching element (INNER JOIN)
- EXIT = elements with no matching data (RIGHT ONLY)

## 3. Scales

```js
// Linear scale (continuous → continuous)
const xScale = d3.scaleLinear()
  .domain([0, d3.max(data)])  // data space
  .range([0, width]);          // pixel space

// Band scale (categorical → continuous) - for bar charts
const xScale = d3.scaleBand()
  .domain(data.map(d => d.name))
  .range([0, width])
  .padding(0.1);

// Color scale
const colorScale = d3.scaleSequential()
  .domain([0, 100])
  .interpolator(d3.interpolateBlues);

// Time scale
const timeScale = d3.scaleTime()
  .domain([new Date("2020-01-01"), new Date("2026-01-01")])
  .range([0, width]);
```

## 4. Axes

```js
// Create axis generators
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

// Render axes (append to a <g> element)
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

svg.append("g")
  .call(yAxis);
```

## 5. Margins Convention

```js
const margin = { top: 20, right: 30, bottom: 40, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
```

## 6. Shapes & Generators

```js
// Line generator
const line = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale(d.value));

svg.append("path")
  .datum(data)
  .attr("d", line)
  .attr("fill", "none")
  .attr("stroke", "steelblue");

// Arc generator (for pie/donut charts)
const arc = d3.arc()
  .innerRadius(50)   // 0 for pie, >0 for donut
  .outerRadius(100);

const pie = d3.pie()
  .value(d => d.amount);

svg.selectAll("path")
  .data(pie(data))
  .join("path")
  .attr("d", arc)
  .attr("fill", (d, i) => colorScale(i));
```

## 7. Geo / Maps

```js
// Projection (converts lat/lng → x/y pixels)
const projection = d3.geoAlbersUsa()
  .fitSize([width, height], geoData);

// Path generator (converts GeoJSON → SVG path strings)
const path = d3.geoPath().projection(projection);

// Draw the map
svg.selectAll("path")
  .data(geoData.features)
  .join("path")
  .attr("d", path)
  .attr("fill", d => colorScale(dataMap.get(d.id)));
```

## 8. Transitions

```js
// Basic transition
d3.selectAll("rect")
  .transition()
  .duration(750)
  .attr("height", d => yScale(d));

// Staggered transition
d3.selectAll("rect")
  .transition()
  .duration(750)
  .delay((d, i) => i * 50)
  .attr("fill", "orange");
```

## 9. Events & Tooltips

```js
svg.selectAll("rect")
  .on("mouseover", function(event, d) {
    d3.select(this).attr("fill", "orange");
    tooltip
      .style("opacity", 1)
      .html(`Value: ${d.value}`)
      .style("left", event.pageX + "px")
      .style("top", event.pageY + "px");
  })
  .on("mouseout", function() {
    d3.select(this).attr("fill", "steelblue");
    tooltip.style("opacity", 0);
  });
```

## 10. Loading Data

```js
// CSV
const data = await d3.csv("data.csv", d => ({
  name: d.name,
  value: +d.value  // + converts string to number
}));

// JSON
const data = await d3.json("data.json");

// TopoJSON (for maps)
const us = await d3.json("us-counties.json");
const states = topojson.feature(us, us.objects.states);
```

---

## D3 v7 Key Changes (vs older tutorials)
- ESM modules: `import * as d3 from "d3"`
- `.join()` replaces manual enter/update/exit for most cases
- Event handlers get `(event, d)` instead of `(d, i, nodes)`
- `d3.csv()` / `d3.json()` return Promises (use async/await)
- Selections are iterable (can use `for...of`)

## Common Interview Questions
1. **What is the enter/update/exit pattern?** (See #2 above)
2. **How do scales work?** Domain = data space, Range = pixel space
3. **How would you make a D3 viz responsive?** viewBox + preserveAspectRatio
4. **D3 vs React?** D3 for calculations, React for DOM, or useRef+useEffect
5. **What's the difference between .datum() and .data()?**
   - `.data()` joins an array (one element per item)
   - `.datum()` binds a single value to one element
