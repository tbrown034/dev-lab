import * as d3 from "d3";

// ============================================================
// EXERCISE 02: Filterable Bar Chart with Data Binding
// ============================================================
// Build a bar chart of congressional district voting data.
// Add filter buttons that use D3's data join to add/remove bars.
//
// TASKS:
// 1. Render all 8 districts as bars, colored by winning party
// 2. Add three buttons: "All", "Democrat", "Republican"
// 3. Clicking a button filters the data and re-renders bars
// 4. Use a key function (d => d.district) so bars animate correctly
// 5. BONUS: Add enter/exit transitions (fade in new bars, fade out removed)
// ============================================================

const data = [
  { district: "CA-12", winner: "D", margin: 72.4, votes: 315200 },
  { district: "TX-22", winner: "R", margin: 56.1, votes: 285400 },
  { district: "NY-14", winner: "D", margin: 71.6, votes: 224700 },
  { district: "FL-27", winner: "R", margin: 51.3, votes: 198600 },
  { district: "IL-03", winner: "D", margin: 63.8, votes: 201500 },
  { district: "OH-01", winner: "R", margin: 53.7, votes: 276300 },
  { district: "WA-07", winner: "D", margin: 80.2, votes: 345100 },
  { district: "GA-06", winner: "R", margin: 50.8, votes: 312800 },
];

const partyColor = { D: "#3b82f6", R: "#ef4444" };

const width = 700;
const height = 400;
const margin = { top: 20, right: 30, bottom: 40, left: 60 };
const chartW = width - margin.left - margin.right;
const chartH = height - margin.top - margin.bottom;

// TODO: Create SVG with viewBox
// const svg = d3.select("#chart").append("svg")
//   .attr("viewBox", `0 0 ${width} ${height}`)
//   .append("g")
//   .attr("transform", `translate(${margin.left},${margin.top})`);

// TODO: Create scales
// const x = d3.scaleBand().range([0, chartW]).padding(0.2);
// const y = d3.scaleLinear().range([chartH, 0]);

// TODO: Create axis groups
// const xAxisG = svg.append("g").attr("transform", `translate(0,${chartH})`);
// const yAxisG = svg.append("g");

// TODO: Create update function that takes filtered data
// function updateChart(filteredData) {
//   x.domain(filteredData.map(d => d.district));
//   y.domain([0, 100]).nice();
//
//   // Update axes
//   xAxisG.transition().duration(500).call(d3.axisBottom(x));
//   yAxisG.transition().duration(500).call(d3.axisLeft(y).ticks(5).tickFormat(d => d + "%"));
//
//   // Update bars with key function and enter/update/exit
//   svg.selectAll(".bar")
//     .data(filteredData, d => d.district)  // KEY FUNCTION!
//     .join(
//       enter => enter.append("rect")
//         .attr("class", "bar")
//         .attr("fill", d => partyColor[d.winner])
//         ... // set initial position, animate in
//       update => update
//         ... // animate to new position
//       exit => exit
//         ... // animate out and remove
//     );
// }

// TODO: Wire up filter buttons
// d3.select("#btn-all").on("click", () => updateChart(data));
// d3.select("#btn-dem").on("click", () => updateChart(data.filter(d => d.winner === "D")));
// d3.select("#btn-rep").on("click", () => updateChart(data.filter(d => d.winner === "R")));

// TODO: Initial render
// updateChart(data);

// ============================================================
// HINTS:
// ============================================================
// - Key function is critical: .data(filteredData, d => d.district)
// - Without it, bars will jump around when you filter
// - For enter transition: start with height=0, y=chartH, then animate
// - For exit transition: animate to height=0, y=chartH, then .remove()
// - Style axis text: .selectAll("text").attr("fill", "#888")
// ============================================================
