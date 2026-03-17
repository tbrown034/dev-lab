import * as d3 from "d3";

// ============================================================
// EXERCISE 04: Multi-Line Chart with Area Fill
// ============================================================
// Build a multi-line chart showing monthly average temperature
// for 3 cities. Practice d3.line(), d3.area(), and color scales.
//
// TASKS:
// 1. Create a line for each city using d3.line() + curveMonotoneX
// 2. Use scaleTime for x-axis, scaleLinear for y-axis
// 3. Use scaleOrdinal to assign a color to each city
// 4. Add a legend showing city names and their colors
// 5. BONUS: Add dots at each data point
// 6. BONUS: Add a semi-transparent area fill under each line
// ============================================================

const months = [
  "2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06",
  "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12"
];

const parseMonth = d3.timeParse("%Y-%m");

// Average monthly high temps (°F)
const cities = [
  {
    name: "Phoenix, AZ",
    temps: [67, 71, 78, 87, 97, 107, 106, 104, 99, 88, 75, 66],
  },
  {
    name: "New York, NY",
    temps: [39, 42, 50, 62, 72, 81, 85, 84, 76, 64, 54, 43],
  },
  {
    name: "Minneapolis, MN",
    temps: [24, 30, 42, 57, 69, 79, 83, 81, 72, 57, 40, 27],
  },
];

// Transform data: add parsed date objects
const cityData = cities.map(city => ({
  name: city.name,
  values: city.temps.map((temp, i) => ({
    date: parseMonth(months[i]),
    temp: temp,
  })),
}));

const cityColors = ["#f97316", "#818cf8", "#4ade80"];

const width = 700;
const height = 400;
const margin = { top: 20, right: 120, bottom: 40, left: 50 };
const chartW = width - margin.left - margin.right;
const chartH = height - margin.top - margin.bottom;

// TODO: Create SVG with viewBox and margins group

// TODO: Create scales
// const xScale = d3.scaleTime()
//   .domain(d3.extent(months, m => parseMonth(m)))
//   .range([0, chartW]);
//
// const yScale = d3.scaleLinear()
//   .domain([d3.min(cityData, c => d3.min(c.values, v => v.temp)) - 5,
//            d3.max(cityData, c => d3.max(c.values, v => v.temp)) + 5])
//   .range([chartH, 0]);
//
// const colorScale = d3.scaleOrdinal()
//   .domain(cityData.map(c => c.name))
//   .range(cityColors);

// TODO: Create line generator
// const line = d3.line()
//   .x(d => xScale(d.date))
//   .y(d => yScale(d.temp))
//   .curve(d3.curveMonotoneX);

// TODO: (BONUS) Create area generator
// const area = d3.area()
//   .x(d => xScale(d.date))
//   .y0(chartH)
//   .y1(d => yScale(d.temp))
//   .curve(d3.curveMonotoneX);

// TODO: Add axes
// TODO: Draw area fills (one per city, semi-transparent)
// TODO: Draw lines (one per city)
// TODO: (BONUS) Draw dots at each data point
// TODO: Add legend (city name + colored line/swatch)

// ============================================================
// HINTS:
// ============================================================
// - Each city = one path element. Use .datum(city.values) not .data()
// - Loop through cityData or use .data(cityData) on a group per city
// - For area fill: .attr("fill", color).attr("opacity", 0.1)
// - For line: .attr("fill", "none").attr("stroke", color).attr("stroke-width", 2)
// - Legend at right: position text at x=chartW+10, y per city
// - d3.timeFormat("%b") for "Jan", "Feb" etc on x-axis
// ============================================================
