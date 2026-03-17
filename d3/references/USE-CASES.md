# D3 in Production: Real-World Use Cases

20 real examples of D3 in production, how they were built, and how you'd recreate them.

---

## 1. The New York Times Election Needle
**What:** Live-updating probability gauge showing who's winning on election night.
**D3 concepts:** arc generator, transitions, real-time data updates, scaleLinear for probability→angle.
**How it works:**
```js
const arc = d3.arc()
  .innerRadius(80)
  .outerRadius(100)
  .startAngle(-Math.PI / 2);

// Update needle angle based on probability
needle.transition()
  .duration(1000)
  .attrTween("transform", () => {
    const interp = d3.interpolate(currentAngle, newAngle);
    return t => `rotate(${interp(t)})`;
  });
```
**Your angle:** This is exactly what a broadcast TV election night dashboard would need.

---

## 2. Washington Post COVID Tracker
**What:** Choropleth maps showing case rates by county, with time scrubber.
**D3 concepts:** d3-geo (geoAlbersUsa projection), scaleSequential for color, topojson, time slider controlling data.
**How it works:**
```js
const projection = d3.geoAlbersUsa().fitSize([width, height], counties);
const path = d3.geoPath().projection(projection);
const color = d3.scaleSequential(d3.interpolateReds)
  .domain([0, maxCaseRate]);

// Color each county by its case rate
svg.selectAll("path")
  .data(counties.features)
  .join("path")
  .attr("d", path)
  .attr("fill", d => color(caseData.get(d.id)));
```
**Your angle:** This is the most common D3 pattern in newsrooms. County-level choropleth + data lookup.

---

## 3. FiveThirtyEight Polling Averages
**What:** Line charts with confidence intervals showing polling trends over time.
**D3 concepts:** d3.line(), d3.area() for confidence bands, scaleTime for X axis, scaleLinear for Y.
**How it works:**
```js
const line = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale(d.avg))
  .curve(d3.curveMonotoneX);  // smooth interpolation

const area = d3.area()
  .x(d => xScale(d.date))
  .y0(d => yScale(d.low))
  .y1(d => yScale(d.high));

svg.append("path").datum(data).attr("d", area).attr("fill", "#3b82f622");
svg.append("path").datum(data).attr("d", line).attr("fill", "none").attr("stroke", "#3b82f6");
```
**Your angle:** Polling data viz is bread and butter for news stations.

---

## 4. ProPublica's Congress Financial Disclosures
**What:** Treemaps showing stock trades by members of Congress.
**D3 concepts:** d3.treemap(), d3.hierarchy(), color scales for party, size = trade amount.
**How it works:**
```js
const root = d3.hierarchy(data)
  .sum(d => d.tradeAmount)
  .sort((a, b) => b.value - a.value);

d3.treemap()
  .size([width, height])
  .padding(2)(root);

svg.selectAll("rect")
  .data(root.leaves())
  .join("rect")
  .attr("x", d => d.x0).attr("y", d => d.y0)
  .attr("width", d => d.x1 - d.x0)
  .attr("height", d => d.y1 - d.y0)
  .attr("fill", d => partyColor(d.data.party));
```

---

## 5. Reuters Graphics: Vaccine Rollout
**What:** Animated bubble chart showing vaccination rates by country over time.
**D3 concepts:** d3.forceSimulation() for bubble positioning, scaleRadius for bubble size, transitions for time playback.
**How it works:**
```js
const simulation = d3.forceSimulation(data)
  .force("x", d3.forceX(d => xScale(d.gdp)).strength(0.8))
  .force("y", d3.forceY(d => yScale(d.vaccRate)).strength(0.8))
  .force("collide", d3.forceCollide(d => rScale(d.population)));

simulation.on("tick", () => {
  circles.attr("cx", d => d.x).attr("cy", d => d.y);
});
```

---

## 6. The Pudding's "Film Dialogue" Analysis
**What:** Interactive scrollytelling with animated charts showing who speaks in movies.
**D3 concepts:** Scroll-triggered transitions, stacked bar charts, intersection observer + D3 updates.
**How it works:**
```js
// Scrollytelling pattern
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      updateChart(entry.target.dataset.step);
    }
  });
});

function updateChart(step) {
  bars.transition().duration(600)
    .attr("width", d => xScale(d.values[step]));
}
```
**Your angle:** This scrollytelling technique is huge for digital news stories.

---

## 7. Observable Plot / D3 Observable Notebooks
**What:** Mike Bostock's (D3 creator) platform for shareable data viz notebooks.
**Why it matters:** Observable Plot is D3's official high-level layer. Many newsrooms prototype in Observable, then port to D3 for production.
**The pattern:**
```js
// Observable Plot (high-level, quick)
Plot.barY(data, {x: "state", y: "population", fill: "steelblue"}).plot()

// D3 (low-level, full control) - same chart
svg.selectAll("rect").data(data).join("rect")
  .attr("x", d => x(d.state))
  .attr("y", d => y(d.population))
  // ... etc
```

---

## 8. Mapbox + D3 Hybrid Maps
**What:** Interactive zoomable maps with D3 overlays (like Uber's movement data viz).
**D3 concepts:** d3-geo for projection, but Mapbox handles tile rendering. D3 draws the data layer on top.
**How it works:**
```js
// Mapbox handles the base map (streets, terrain)
// D3 draws the data layer on a Canvas overlay
const projection = d3.geoMercator();

map.on("viewreset", render);
map.on("move", render);

function render() {
  // Sync D3 projection with Mapbox camera
  ctx.clearRect(0, 0, width, height);
  data.forEach(d => {
    const [x, y] = projection([d.lng, d.lat]);
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
  });
}
```

---

## 9. NYT's "How the Virus Got Out"
**What:** Animated flow map showing COVID spread via airline routes.
**D3 concepts:** geoPath for country outlines, animated paths for flight routes, d3.transition for timing.
**How it works:**
```js
// Animated line that "draws itself"
svg.selectAll(".route")
  .data(routes)
  .join("path")
  .attr("d", d => arc(d.origin, d.destination))
  .attr("stroke-dasharray", function() {
    return this.getTotalLength();
  })
  .attr("stroke-dashoffset", function() {
    return this.getTotalLength();
  })
  .transition()
  .duration(2000)
  .attr("stroke-dashoffset", 0);
```

---

## 10. US Census Bureau's Data Explorer
**What:** Official census data visualization tool with interactive charts and maps.
**D3 concepts:** Standard bar/line/map charts, Census API integration, dropdown filters that re-render.
**How it works:**
```js
// Fetch from Census API
const response = await fetch(
  `https://api.census.gov/data/2020/acs/acs5?get=NAME,B01003_001E&for=state:*`
);
const censusData = await response.json();

// Transform API response to usable format
const data = censusData.slice(1).map(row => ({
  name: row[0],
  population: +row[1],
  fips: row[2]
}));

// Render choropleth
states.attr("fill", d => colorScale(dataMap.get(d.id)));
```
**Your angle:** This is exactly the kind of tool a Tenga data team might build.

---

## 11. Financial Times: Brexit Polling
**What:** Beeswarm plots showing individual poll results clustered around the average.
**D3 concepts:** d3.forceSimulation with forceX/forceY for clustering, scaleTime for X.
**How it works:**
```js
const simulation = d3.forceSimulation(polls)
  .force("x", d3.forceX(d => timeScale(d.date)).strength(1))
  .force("y", d3.forceY(height / 2).strength(0.05))
  .force("collide", d3.forceCollide(4));
```

---

## 12. The Marshall Project's Sentencing Data
**What:** Small multiples showing sentencing disparities across states.
**D3 concepts:** One chart template, repeated per state. Same scales, different data.
**How it works:**
```js
// Small multiples pattern
const states = d3.select("#grid")
  .selectAll(".state-chart")
  .data(stateData)
  .join("div")
  .attr("class", "state-chart");

states.each(function(stateData) {
  const svg = d3.select(this).append("svg")
    .attr("viewBox", `0 0 ${w} ${h}`);
  // Draw bars/lines using same scale template
  drawChart(svg, stateData);
});
```
**Your angle:** Small multiples are a journalist's best friend for comparison stories.

---

## 13. Spotify Wrapped (Year in Review)
**What:** Animated data stories about your listening habits.
**D3 concepts:** Arc/pie for genre breakdown, transitions for reveal animations, canvas for performance.

---

## 14. GitHub's Contribution Graph
**What:** The green calendar heatmap on your profile.
**D3 concepts:** scaleSequential for color intensity, grid layout by day/week.
**How it works:**
```js
const colorScale = d3.scaleSequential(d3.interpolateGreens)
  .domain([0, maxCommits]);

svg.selectAll("rect")
  .data(days)
  .join("rect")
  .attr("x", d => weekScale(d.week))
  .attr("y", d => dayScale(d.dayOfWeek))
  .attr("width", cellSize).attr("height", cellSize)
  .attr("fill", d => d.count === 0 ? "#161b22" : colorScale(d.count));
```

---

## 15. AP Election Results Dashboard
**What:** The live results page every news network embeds on election night.
**D3 concepts:** US map with state/county fills, live data polling, transition on update.
**Your angle:** AP's election data feed is what most TV stations display. Building a custom D3 frontend for this data is extremely relevant to Tenga.

---

## 16. Bloomberg's Billionaires Index
**What:** Animated bar chart race showing wealth changes over time.
**D3 concepts:** scaleBand (re-sorted each frame), key functions for stable transitions.
**How it works:**
```js
function update(data) {
  data.sort((a, b) => b.wealth - a.wealth);
  y.domain(data.map(d => d.name));

  bars.data(data, d => d.name)  // key function!
    .join("rect")
    .transition().duration(500)
    .attr("y", d => y(d.name))
    .attr("width", d => x(d.wealth));
}
// Run on interval for animation
d3.interval(() => update(getNextFrame()), 500);
```

---

## 17. Axios/Stamen's Political Cartogram
**What:** US map where state size = electoral votes instead of land area.
**D3 concepts:** Custom projection, d3-hexbin or grid-based cartogram layout.

---

## 18. NYT's "Rent is Too Damn High"
**What:** Interactive scatter plot where you can draw your own trend line and compare to reality.
**D3 concepts:** d3.drag() for user drawing, d3.line() for the real trend, voronoi for hover detection.
**How it works:**
```js
const drag = d3.drag()
  .on("start", dragstarted)
  .on("drag", dragged);

function dragged(event) {
  userPoints.push([event.x, event.y]);
  userPath.attr("d", d3.line()(userPoints));
}

svg.call(drag);  // attach drag behavior to SVG
```
**Your angle:** Interactive "you draw it" charts are incredibly engaging for news audiences.

---

## 19. Datawrapper (Under the Hood)
**What:** The tool you already use! Datawrapper renders charts using D3 internally.
**Why this matters:** When you use Datawrapper, you're using D3 without knowing it. The difference is Datawrapper gives you a config UI; raw D3 gives you full control over every pixel.

---

## 20. Weather Channel Radar Maps
**What:** Animated weather maps with color-coded precipitation.
**D3 concepts:** d3-geo projections, canvas rendering (for performance with dense data), scaleSequential for precipitation→color.
**Your angle:** Weather maps are core content for broadcast TV. A custom D3 weather overlay could be very relevant to Tenga stations.

---

## Patterns That Repeat Across All These

1. **Scales everywhere** - Every single example uses scales to map data→visuals
2. **GeoJSON/TopoJSON for maps** - Any geographic viz uses the d3-geo pipeline
3. **Transitions for engagement** - Animations make data stories feel alive
4. **Data join for updates** - Live data (elections, weather) needs enter/update/exit
5. **Canvas for performance** - When you have thousands of data points, switch from SVG to Canvas
6. **Responsive with viewBox** - All production D3 uses viewBox for scaling

## Most Relevant for Tenga (Broadcast TV)
1. Election night dashboards (#1, #15)
2. Weather/radar overlays (#20)
3. Census/demographic maps (#2, #10)
4. Polling visualizations (#3, #11)
5. Interactive storytelling (#6, #18)
6. Small multiples for market comparisons (#12)
