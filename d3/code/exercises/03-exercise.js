import * as d3 from "d3";

// ============================================================
// EXERCISE 03: Scatter Plot with Multiple Scale Types
// ============================================================
// Build a scatter plot showing poverty rate vs. median income
// for 10 US states. Use multiple D3 scale types.
//
// TASKS:
// 1. Use scaleLinear for x-axis (income) and y-axis (poverty rate)
// 2. Use scaleSqrt for circle radius (population)
// 3. Use scaleOrdinal for circle color (region)
// 4. Add x-axis (formatted as $), y-axis (formatted as %)
// 5. Follow the margins convention
// 6. BONUS: Add state labels next to each dot
// ============================================================

const data = [
  { state: "CA", income: 84097, poverty: 11.0, pop: 39538223, region: "West" },
  { state: "TX", income: 67321, poverty: 13.4, pop: 29145505, region: "South" },
  { state: "NY", income: 75157, poverty: 12.7, pop: 20201249, region: "Northeast" },
  { state: "FL", income: 63062, poverty: 11.7, pop: 21538187, region: "South" },
  { state: "IL", income: 72205, poverty: 10.7, pop: 12812508, region: "Midwest" },
  { state: "OH", income: 61938, poverty: 13.0, pop: 11799448, region: "Midwest" },
  { state: "MS", income: 46511, poverty: 18.7, pop: 2961279, region: "South" },
  { state: "MD", income: 90203, poverty: 9.0, pop: 6177224, region: "South" },
  { state: "NH", income: 83449, poverty: 7.3, pop: 1377529, region: "Northeast" },
  { state: "CO", income: 80184, poverty: 9.1, pop: 5773714, region: "West" },
];

const regionColors = {
  "West": "#f472b6",
  "South": "#f97316",
  "Northeast": "#818cf8",
  "Midwest": "#4ade80",
};

const width = 700;
const height = 500;
const margin = { top: 20, right: 30, bottom: 50, left: 60 };
const chartW = width - margin.left - margin.right;
const chartH = height - margin.top - margin.bottom;

// TODO: Create SVG with viewBox and margins group

// TODO: Create scales
// const xScale = d3.scaleLinear()
//   .domain([...]).nice()   // income range
//   .range([0, chartW]);
//
// const yScale = d3.scaleLinear()
//   .domain([...]).nice()   // poverty rate range
//   .range([chartH, 0]);   // inverted for SVG
//
// const rScale = d3.scaleSqrt()
//   .domain([...])          // population range
//   .range([5, 30]);        // min/max radius
//
// const colorScale = d3.scaleOrdinal()
//   .domain(["West", "South", "Northeast", "Midwest"])
//   .range(Object.values(regionColors));

// TODO: Add x-axis with $ formatting
// svg.append("g")
//   .attr("transform", `translate(0,${chartH})`)
//   .call(d3.axisBottom(xScale).tickFormat(d3.format("$,.0f")));

// TODO: Add y-axis with % formatting
// svg.append("g")
//   .call(d3.axisLeft(yScale).tickFormat(d => d + "%"));

// TODO: Draw circles
// svg.selectAll("circle")
//   .data(data)
//   .join("circle")
//   .attr("cx", d => xScale(d.income))
//   .attr("cy", d => yScale(d.poverty))
//   .attr("r", d => rScale(d.pop))
//   .attr("fill", d => colorScale(d.region))
//   .attr("opacity", 0.7)
//   .attr("stroke", "#fff")
//   .attr("stroke-width", 1);

// TODO: Add state labels
// TODO: Add axis labels ("Median Household Income" and "Poverty Rate %")
// TODO: Add legend for regions

// ============================================================
// HINTS:
// ============================================================
// - Use d3.extent(data, d => d.income) to get [min, max] for domains
// - scaleSqrt ensures circle AREA is proportional to data (not radius)
// - Add .nice() to both linear scales for cleaner axis ticks
// - For the legend, create colored circles/rects + text for each region
// - Style axes: .selectAll("text").attr("fill", "#888")
// ============================================================
