# D3.js Interview Questions & Answers

## For Trevor - tailored to civic tech / data journalism roles

---

### Conceptual Questions

**Q: What is D3 and how is it different from Chart.js or Highcharts?**
A: D3 is a low-level toolkit for data-driven DOM manipulation, not a charting library.
Chart.js gives you a bar chart with one function call. D3 gives you the building blocks
to create ANY visualization - you control every pixel. The tradeoff is more code for
more flexibility. For newsroom/civic work, this matters because you often need custom
visualizations that don't fit standard chart types.

**Q: Explain the enter/update/exit pattern.**
A: When you bind data to a selection, D3 creates three sub-selections:
- **Enter**: Data points with no corresponding DOM element (need to be created)
- **Update**: Data points with an existing DOM element (may need attribute updates)
- **Exit**: DOM elements with no corresponding data point (should be removed)

In D3 v7, `.join()` handles all three automatically, but understanding the pattern
is essential for complex update logic.

**Q: What's the difference between .attr() and .style()?**
A: `.attr()` sets SVG/HTML attributes (`width`, `height`, `transform`, `fill`).
`.style()` sets CSS properties. For SVG, prefer `.attr()` for presentation attributes
since they can be overridden by CSS. Use `.style()` for CSS-only properties or when
you need inline styles to override a stylesheet.

**Q: How do you make a D3 visualization responsive?**
A: Use the `viewBox` attribute on the SVG element instead of fixed width/height:
```js
svg.attr("viewBox", `0 0 ${width} ${height}`)
   .attr("preserveAspectRatio", "xMidYMid meet");
```
The browser scales it to fit the container. For more control, use ResizeObserver
to detect container size changes and re-render.

---

### Technical Questions

**Q: How would you build a choropleth map of the US?**
A:
1. Load TopoJSON data (smaller than GeoJSON) and convert with `topojson.feature()`
2. Choose a projection (`d3.geoAlbersUsa()` for US - handles Alaska/Hawaii)
3. Create a path generator with `d3.geoPath().projection(projection)`
4. Use a color scale (`d3.scaleSequential(d3.interpolateBlues)`) mapped to data values
5. Bind data to path elements, set `d` attribute with the path generator
6. Match geographic features to data using FIPS codes
7. Add tooltips for interactivity

**Q: How do you handle data loading and error states?**
A: D3's data loading functions (`d3.csv()`, `d3.json()`) return Promises:
```js
try {
  const data = await d3.csv("data.csv", d => ({
    state: d.state,
    population: +d.population  // type coercion
  }));
  render(data);
} catch (error) {
  d3.select("#chart").text("Failed to load data");
}
```
The row accessor function in `d3.csv()` lets you clean/transform data as it loads.

**Q: How do you integrate D3 with React?**
A: Two approaches:
1. **D3 for math, React for DOM** (preferred): Use D3 scales, shapes, and geo
   as calculation libraries. Render with React/JSX.
2. **D3 owns a container**: Use `useRef` to get a DOM node, `useEffect` to run
   D3 code. D3 manages everything inside that container.

Approach 1 is more React-idiomatic. Approach 2 is useful for complex animations.

**Q: What is a projection in D3-geo?**
A: A projection converts geographic coordinates (latitude/longitude on a sphere)
to screen coordinates (x/y pixels on a flat surface). Different projections make
different tradeoffs:
- `geoAlbersUsa()` - standard for US maps (includes Alaska/Hawaii insets)
- `geoMercator()` - familiar, good for city-level, distorts at poles
- `geoEqualEarth()` - equal-area, good for global comparisons

**Q: How would you optimize a D3 visualization with 100k+ data points?**
A:
- Use Canvas instead of SVG (SVG DOM nodes are expensive)
- Aggregate/bin data before rendering (`d3.bin()`)
- Implement semantic zoom (show detail only when zoomed in)
- Use quadtrees (`d3.quadtree()`) for efficient spatial lookups
- Debounce interactions and use `requestAnimationFrame`

---

### Scenario Questions

**Q: A stakeholder wants a map showing campaign contributions by ZIP code.
   How would you approach this?**
A:
1. Get FEC data via their API (I've worked with this - my Trump Finance Tracker uses it)
2. Aggregate contributions by ZIP, join with ZIP code boundaries (ZCTA shapefiles from Census)
3. Choose appropriate scale - likely log scale since donations are highly skewed
4. Build choropleth with proper legend explaining the color encoding
5. Add tooltips showing donor count, total amount, average donation
6. Consider small multiples by candidate or time period for comparison
7. Ensure accessibility - colorblind-safe palette, screen reader support

**Q: How would you visualize election results over time?**
A:
- Small multiples of maps (one per election year) for geographic patterns
- Line charts of vote share trends by demographic/region
- Animated transitions between election years on a single map
- Connected scatterplots comparing two metrics (turnout vs margin)
- I'd pick the approach based on what story the data tells

---

### Your Unique Angle (use these in conversation)
- "My 15 years in journalism taught me that the viz is only as good as the story it tells"
- "I've built production data visualizations for newsrooms - I know what editors need"
- "I think about accessibility first because public interest data should serve everyone"
- "I've worked with FEC data, census data, and election results in production"
- "D3 gives me the control I need when Datawrapper or Flourish can't do what the story requires"
