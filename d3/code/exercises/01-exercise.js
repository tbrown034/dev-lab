import * as d3 from "d3";

// ============================================================
// EXERCISE 01: Build a Horizontal Bar Chart
// ============================================================
// You're visualizing campaign donation sources for a candidate.
// Build a HORIZONTAL bar chart (bars go left → right).
//
// TASKS:
// 1. Create an SVG element inside #chart
// 2. Bind the data array to rect elements
// 3. Position bars vertically (each on its own row)
// 4. Set bar width proportional to the amount
// 5. Add text labels showing the source name and dollar amount
// 6. BONUS: Use a different color for each bar
// ============================================================

const data = [
  { source: "Individual", amount: 4_250_000 },
  { source: "PAC", amount: 1_800_000 },
  { source: "Party", amount: 950_000 },
  { source: "Self-funded", amount: 2_100_000 },
  { source: "Small Dollar (<$200)", amount: 3_400_000 },
];

const colors = ["#f97316", "#818cf8", "#4ade80", "#f472b6", "#fbbf24"];

const width = 700;
const height = 300;
const barHeight = 40;
const gap = 12;
const labelWidth = 160; // space for labels on the left

// TODO: Create your SVG
// const svg = d3.select("#chart").append("svg") ...

// TODO: Find the max amount for scaling
// const maxAmount = ...

// TODO: Create bars (rects)
// svg.selectAll("rect").data(data).join("rect") ...

// TODO: Add source name labels on the left
// svg.selectAll(".source-label").data(data).join("text") ...

// TODO: Add amount labels at the end of each bar
// svg.selectAll(".amount-label").data(data).join("text") ...

// ============================================================
// HINTS (uncomment to peek):
// ============================================================
// For horizontal bars:
//   x = labelWidth (fixed left edge)
//   y = i * (barHeight + gap)
//   width = (d.amount / maxAmount) * (width - labelWidth - 80)
//   height = barHeight
//
// For labels:
//   Source label: x=0, y = i * (barHeight + gap) + barHeight/2
//   Amount label: x = labelWidth + barWidth + 8, same y
//   Use .attr("dominant-baseline", "middle") to vertically center text
//
// For formatting money: d3.format("$,.0f")(amount)
// ============================================================

// ============================================================
// SOLUTION (uncomment when ready to check your work):
// ============================================================
/*
const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("width", "100%");

const maxAmount = d3.max(data, d => d.amount);
const barMaxWidth = width - labelWidth - 100;

// Bars
svg.selectAll("rect")
  .data(data)
  .join("rect")
  .attr("x", labelWidth)
  .attr("y", (d, i) => i * (barHeight + gap) + 10)
  .attr("width", d => (d.amount / maxAmount) * barMaxWidth)
  .attr("height", barHeight)
  .attr("fill", (d, i) => colors[i])
  .attr("rx", 4);

// Source labels
svg.selectAll(".source-label")
  .data(data)
  .join("text")
  .attr("class", "source-label")
  .attr("x", labelWidth - 10)
  .attr("y", (d, i) => i * (barHeight + gap) + 10 + barHeight / 2)
  .attr("text-anchor", "end")
  .attr("dominant-baseline", "middle")
  .attr("fill", "#ccc")
  .attr("font-size", "13px")
  .text(d => d.source);

// Amount labels
svg.selectAll(".amount-label")
  .data(data)
  .join("text")
  .attr("class", "amount-label")
  .attr("x", d => labelWidth + (d.amount / maxAmount) * barMaxWidth + 8)
  .attr("y", (d, i) => i * (barHeight + gap) + 10 + barHeight / 2)
  .attr("dominant-baseline", "middle")
  .attr("fill", "#888")
  .attr("font-size", "12px")
  .text(d => d3.format("$,.0f")(d.amount));
*/
