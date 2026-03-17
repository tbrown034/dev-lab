import * as d3 from "d3";

// ============================================================
// EXERCISE 06: Interactive Dashboard Element
// ============================================================
// Build a bar chart with transitions, tooltips, click-to-highlight,
// sorting, and responsive design.
//
// TASKS:
// 1. Create a bar chart that loads with a staggered entrance animation
// 2. Add hover tooltips showing detailed data
// 3. Add click-to-highlight: clicking a bar makes it glow, shows detail
// 4. Add a "Sort" button that re-sorts bars with animated transitions
// 5. Make the chart responsive using viewBox
// 6. BONUS: Add a "Randomize" button that generates new data with transitions
// ============================================================

const initialData = [
  { dept: "Public Safety", budget: 45200000, employees: 1240, change: 5.2 },
  { dept: "Education", budget: 38500000, employees: 3100, change: 8.1 },
  { dept: "Infrastructure", budget: 22100000, employees: 890, change: -2.3 },
  { dept: "Healthcare", budget: 18700000, employees: 720, change: 12.5 },
  { dept: "Parks & Rec", budget: 12300000, employees: 340, change: -1.8 },
  { dept: "Housing", budget: 15800000, employees: 480, change: 18.3 },
  { dept: "Transit", budget: 20400000, employees: 960, change: 6.7 },
  { dept: "IT Services", budget: 8900000, employees: 210, change: 22.1 },
];

let currentData = [...initialData];
let sortAscending = false;
let selectedDept = null;

const width = 700;
const height = 400;
const margin = { top: 20, right: 30, bottom: 70, left: 70 };
const chartW = width - margin.left - margin.right;
const chartH = height - margin.top - margin.bottom;

// TODO: Create SVG with viewBox (responsive!)
// const svg = d3.select("#chart").append("svg")
//   .attr("viewBox", `0 0 ${width} ${height}`)
//   .append("g")
//   .attr("transform", `translate(${margin.left},${margin.top})`);

// TODO: Create scales
// const x = d3.scaleBand().range([0, chartW]).padding(0.2);
// const y = d3.scaleLinear().range([chartH, 0]);

// TODO: Create axes groups

// TODO: Create tooltip div
// const tooltip = d3.select("body").append("div")
//   .style("position", "fixed")
//   .style("display", "none")
//   .style("background", "#1a1a1a")
//   .style("border", "1px solid #f97316")
//   .style("padding", "0.5rem 0.75rem")
//   .style("border-radius", "4px")
//   .style("font-size", "0.8rem")
//   .style("color", "#e5e5e5")
//   .style("pointer-events", "none");

// TODO: Create update function
// function updateChart(data) {
//   x.domain(data.map(d => d.dept));
//   y.domain([0, d3.max(data, d => d.budget)]).nice();
//
//   // Update axes with transitions
//
//   // Update bars with enter/update/exit
//   // - Enter: stagger animation (.delay((d,i) => i * 60))
//   // - Update: smooth transition to new positions
//   // - Exit: fade out and remove
//
//   // Add hover events for tooltip
//   // .on("mouseenter", function(event, d) { ... })
//   // .on("mousemove", ...)
//   // .on("mouseleave", ...)
//
//   // Add click to highlight
//   // .on("click", function(event, d) {
//   //   selectedDept = selectedDept === d.dept ? null : d.dept;
//   //   // Highlight selected bar, dim others
//   //   // Update detail panel
//   // })
// }

// TODO: Wire up sort button
// d3.select("#btn-sort").on("click", () => {
//   sortAscending = !sortAscending;
//   currentData = [...currentData].sort((a, b) =>
//     sortAscending ? a.budget - b.budget : b.budget - a.budget
//   );
//   updateChart(currentData);
// });

// TODO: Wire up randomize button (BONUS)
// d3.select("#btn-random").on("click", () => {
//   currentData = initialData.map(d => ({
//     ...d,
//     budget: d.budget * (0.5 + Math.random()),
//   }));
//   updateChart(currentData);
// });

// TODO: Initial render with staggered entrance
// updateChart(currentData);

// ============================================================
// HINTS:
// ============================================================
// - Entrance animation: start bars at y=chartH, height=0, then transition
// - .delay((d, i) => i * 60) for stagger effect
// - .ease(d3.easeCubicOut) looks natural for bar growth
// - For tooltip: use event.clientX/Y with position:fixed
// - For highlight: reduce opacity of non-selected bars to 0.4
// - For sort: re-sort data array, re-set x.domain, transition bars
// - viewBox handles responsiveness - no need for ResizeObserver here
// - Format budget: d3.format("$,.0f")(d.budget)
// ============================================================
