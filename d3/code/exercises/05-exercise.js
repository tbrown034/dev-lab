import * as d3 from "d3";
import * as topojson from "topojson-client";

// ============================================================
// EXERCISE 05: Interactive US State Map
// ============================================================
// Build a choropleth map with hover effects, tooltips, and
// a click-to-select interaction.
//
// TASKS:
// 1. Load US states TopoJSON from CDN and render a map
// 2. Color states by population using a sequential color scale
// 3. Add hover effects (highlight border, show tooltip)
// 4. Add click behavior: clicking a state shows info in #detail-panel
// 5. Add a color legend below the map
// 6. BONUS: Add state borders using topojson.mesh()
// ============================================================

const statePopulations = new Map([
  ["01", { name: "Alabama", pop: 5024279 }],
  ["02", { name: "Alaska", pop: 733391 }],
  ["04", { name: "Arizona", pop: 7151502 }],
  ["05", { name: "Arkansas", pop: 3011524 }],
  ["06", { name: "California", pop: 39538223 }],
  ["08", { name: "Colorado", pop: 5773714 }],
  ["09", { name: "Connecticut", pop: 3605944 }],
  ["10", { name: "Delaware", pop: 989948 }],
  ["12", { name: "Florida", pop: 21538187 }],
  ["13", { name: "Georgia", pop: 10711908 }],
  ["15", { name: "Hawaii", pop: 1455271 }],
  ["16", { name: "Idaho", pop: 1839106 }],
  ["17", { name: "Illinois", pop: 12812508 }],
  ["18", { name: "Indiana", pop: 6785528 }],
  ["19", { name: "Iowa", pop: 3190369 }],
  ["20", { name: "Kansas", pop: 2937880 }],
  ["21", { name: "Kentucky", pop: 4505836 }],
  ["22", { name: "Louisiana", pop: 4657757 }],
  ["23", { name: "Maine", pop: 1362359 }],
  ["24", { name: "Maryland", pop: 6177224 }],
  ["25", { name: "Massachusetts", pop: 7029917 }],
  ["26", { name: "Michigan", pop: 10077331 }],
  ["27", { name: "Minnesota", pop: 5706494 }],
  ["28", { name: "Mississippi", pop: 2961279 }],
  ["29", { name: "Missouri", pop: 6154913 }],
  ["30", { name: "Montana", pop: 1084225 }],
  ["31", { name: "Nebraska", pop: 1961504 }],
  ["32", { name: "Nevada", pop: 3104614 }],
  ["33", { name: "New Hampshire", pop: 1377529 }],
  ["34", { name: "New Jersey", pop: 9288994 }],
  ["35", { name: "New Mexico", pop: 2117522 }],
  ["36", { name: "New York", pop: 20201249 }],
  ["37", { name: "North Carolina", pop: 10439388 }],
  ["38", { name: "North Dakota", pop: 779094 }],
  ["39", { name: "Ohio", pop: 11799448 }],
  ["40", { name: "Oklahoma", pop: 3959353 }],
  ["41", { name: "Oregon", pop: 4237256 }],
  ["42", { name: "Pennsylvania", pop: 13002700 }],
  ["44", { name: "Rhode Island", pop: 1097379 }],
  ["45", { name: "South Carolina", pop: 5118425 }],
  ["46", { name: "South Dakota", pop: 886667 }],
  ["47", { name: "Tennessee", pop: 6910840 }],
  ["48", { name: "Texas", pop: 29145505 }],
  ["49", { name: "Utah", pop: 3271616 }],
  ["50", { name: "Vermont", pop: 643077 }],
  ["51", { name: "Virginia", pop: 8631393 }],
  ["53", { name: "Washington", pop: 7614893 }],
  ["54", { name: "West Virginia", pop: 1793716 }],
  ["55", { name: "Wisconsin", pop: 5893718 }],
  ["56", { name: "Wyoming", pop: 576851 }],
]);

const width = 800;
const height = 500;

// TODO: Load TopoJSON
// const us = await d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json");
// const states = topojson.feature(us, us.objects.states);

// TODO: Create projection and path generator
// const projection = d3.geoAlbersUsa().fitSize([width, height], states);
// const path = d3.geoPath(projection);

// TODO: Create color scale
// const pops = [...statePopulations.values()].map(d => d.pop);
// const colorScale = d3.scaleSequential(d3.interpolateBlues)
//   .domain([d3.min(pops), d3.max(pops)]);

// TODO: Create SVG
// const svg = d3.select("#chart").append("svg")
//   .attr("viewBox", `0 0 ${width} ${height}`);

// TODO: Draw state paths with fill from colorScale
// svg.selectAll("path")
//   .data(states.features)
//   .join("path")
//   .attr("d", path)
//   .attr("fill", d => { ... })
//   .attr("stroke", "#333")

// TODO: Add hover effects
//   .on("mouseenter", function(event, d) { ... })
//   .on("mousemove", function(event) { ... })
//   .on("mouseleave", function() { ... })

// TODO: Add click handler to show data in #detail-panel
//   .on("click", function(event, d) { ... })

// TODO: Add state borders with topojson.mesh()
// svg.append("path")
//   .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
//   .attr("d", path)
//   .attr("fill", "none")
//   .attr("stroke", "#333");

// TODO: Add color legend (gradient bar with min/max labels)

// ============================================================
// HINTS:
// ============================================================
// - FIPS lookup: statePopulations.get(String(d.id).padStart(2, "0"))
// - d.id in TopoJSON is the numeric FIPS code (e.g., 6 for CA)
// - Tooltip: use a fixed-position div, show on mouseenter, move on mousemove
// - For .raise(): brings the hovered path to front (no overlap issues)
// - topojson.mesh() with filter (a, b) => a !== b draws only internal borders
// - Use await at top level (Vite supports top-level await in modules)
// ============================================================
