import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css             */import"./init-tutor-Cq4VzOVI.js";import{w as M,i as L}from"./transform-DGvXF_4U.js";import{f as T}from"./feature-DXDMwmIR.js";import{m as V}from"./mesh-CkkaPKVR.js";import{r as D,b as A}from"./band-HgbXjY_x.js";import{l as v}from"./linear-Bvwc2yJx.js";import{m as N}from"./max-DBeXZoyG.js";import{s as h}from"./select-PKtlUnGw.js";import{f as m}from"./defaultLocale-_QQJJ3OD.js";import{j as E,a as P,i as W}from"./albersUsa-fMGaySAz.js";import{a as $}from"./axis-rlX7cRMw.js";(async()=>{const w=h("#tooltip");function j(p,o){w.html(o).classed("visible",!0).style("left",p.clientX+14+"px").style("top",p.clientY-14+"px")}function I(p){w.style("left",p.clientX+14+"px").style("top",p.clientY-14+"px")}function H(){w.classed("visible",!1)}document.querySelectorAll(".toggle-btn").forEach(p=>{p.addEventListener("click",()=>{const o=p.dataset.target,r=document.getElementById(o);r&&(r.classList.contains("open"),r.classList.toggle("open"),p.classList.toggle("active"))})});const S=new Set,B=new IntersectionObserver(p=>{p.forEach(o=>{if(o.isIntersecting&&!S.has(o.target.id)){S.add(o.target.id);const r=C[o.target.id];r&&r()}})},{threshold:.3}),C={};function k(p,o,r=""){const s=document.querySelector(p),a=m(",.1f"),e=m(",");h(s).transition().duration(2e3).ease(M).tween("text",function(){const i=L(0,o);return function(l){const t=i(l);o>=1e6?s.textContent=a(t/1e6)+"M"+r:s.textContent=e(Math.round(t))+r}})}(function(){const o=h("#viz1-waffle");o.append("p").style("color","#888").style("font-size","0.8rem").style("margin-bottom","0.75rem").style("text-transform","uppercase").style("letter-spacing","0.08em").style("font-weight","600").text("9 out of every 100 voting-age citizens lack ready access to documents");const r=36,s=4,a=10,e=10,i=a*(r+s)-s,l=e*(r+s)-s,t=o.append("svg").attr("viewBox",`0 0 ${i} ${l}`).attr("preserveAspectRatio","xMidYMid meet").style("max-width","420px").style("display","block").style("margin","0 auto"),n=D(100);t.selectAll("rect").data(n).join("rect").attr("x",(f,d)=>d%a*(r+s)).attr("y",(f,d)=>Math.floor(d/a)*(r+s)).attr("width",r).attr("height",r).attr("rx",4).attr("fill","#1a1a1a").attr("stroke","#333").attr("stroke-width",.5),window._waffleRects=t.selectAll("rect")})(),(function(){const o=[{label:"Women w/ name mismatch on birth cert.",value:69e6,color:"#f472b6"},{label:"No valid passport",value:146e6,color:"#818cf8"},{label:"Lack documents entirely",value:38e5,color:"#dc2626"}],r=h("#viz1-bars");r.append("p").style("color","#888").style("font-size","0.8rem").style("margin-bottom","0.75rem").style("text-transform","uppercase").style("letter-spacing","0.08em").style("font-weight","600").text("Breakdown of Documentation Barriers");const s={top:10,right:80,bottom:20,left:260},a=860-s.left-s.right,e=o.length*50,i=r.append("svg").attr("viewBox",`0 0 860 ${e+s.top+s.bottom}`).append("g").attr("transform",`translate(${s.left},${s.top})`),l=v().domain([0,N(o,n=>n.value)]).range([0,a]),t=A().domain(o.map(n=>n.label)).range([0,e]).padding(.35);i.selectAll(".bar-label").data(o).join("text").attr("class","bar-label").attr("x",-10).attr("y",n=>t(n.label)+t.bandwidth()/2).attr("dy","0.35em").attr("text-anchor","end").attr("fill","#aaa").attr("font-size","13px").text(n=>n.label),i.selectAll(".bar").data(o).join("rect").attr("class","bar viz1-bar").attr("x",0).attr("y",n=>t(n.label)).attr("width",0).attr("height",t.bandwidth()).attr("rx",4).attr("fill",n=>n.color),i.selectAll(".val-label").data(o).join("text").attr("class","val-label viz1-val").attr("x",0).attr("y",n=>t(n.label)+t.bandwidth()/2).attr("dy","0.35em").attr("fill","#ccc").attr("font-size","13px").attr("font-weight","600").attr("opacity",0).text(n=>n.value>=1e6?m(".0f")(n.value/1e6)+"M":m(",")(n.value)),window._viz1Bars={svg:i,x:l,y:t,data:o}})(),C["viz1-section"]=()=>{k("#counter-total",213e5),k("#counter-none",38e5),k("#counter-passport",146e6),window._waffleRects.transition().duration(600).delay((a,e)=>e*15).attr("fill",(a,e)=>e<9?"#f97316":"#1a1a1a").attr("stroke",(a,e)=>e<9?"#f97316":"#333");const{svg:p,x:o,y:r,data:s}=window._viz1Bars;p.selectAll(".viz1-bar").transition().duration(1e3).delay((a,e)=>e*200).ease(M).attr("width",a=>o(a.value)),p.selectAll(".viz1-val").transition().duration(1e3).delay((a,e)=>e*200+500).attr("x",a=>o(a.value)+8).attr("opacity",1)},B.observe(document.getElementById("viz1-section")),(async function(){const o={Arkansas:"strict-photo",Georgia:"strict-photo",Indiana:"strict-photo",Kansas:"strict-photo",Mississippi:"strict-photo","North Carolina":"strict-photo",Ohio:"strict-photo",Tennessee:"strict-photo",Wisconsin:"strict-photo",Alabama:"non-strict-photo",Florida:"non-strict-photo",Idaho:"non-strict-photo",Louisiana:"non-strict-photo",Michigan:"non-strict-photo",Missouri:"non-strict-photo",Montana:"non-strict-photo",Nebraska:"non-strict-photo","Rhode Island":"non-strict-photo","South Carolina":"non-strict-photo","South Dakota":"non-strict-photo",Texas:"non-strict-photo",Arizona:"strict-non-photo","North Dakota":"strict-non-photo",Wyoming:"strict-non-photo",Alaska:"non-strict-non-photo",Colorado:"non-strict-non-photo",Connecticut:"non-strict-non-photo",Delaware:"non-strict-non-photo",Iowa:"non-strict-non-photo",Kentucky:"non-strict-non-photo","New Hampshire":"non-strict-non-photo",Oklahoma:"non-strict-non-photo",Utah:"non-strict-non-photo",Virginia:"non-strict-non-photo",Washington:"non-strict-non-photo","West Virginia":"non-strict-non-photo",California:"no-id",Hawaii:"no-id",Illinois:"no-id",Maine:"no-id",Maryland:"no-id",Massachusetts:"no-id",Minnesota:"no-id",Nevada:"no-id","New Jersey":"no-id","New Mexico":"no-id","New York":"no-id",Oregon:"no-id",Pennsylvania:"no-id",Vermont:"no-id","District of Columbia":"no-id"},r={"strict-photo":"#dc2626","non-strict-photo":"#f97316","strict-non-photo":"#eab308","non-strict-non-photo":"#818cf8","no-id":"#4ade80"},s={"strict-photo":"Strict Photo ID","non-strict-photo":"Non-strict Photo ID","strict-non-photo":"Strict Non-photo ID","non-strict-non-photo":"Non-strict Non-photo ID","no-id":"No ID Required"};try{const a=await E("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"),e=T(a,a.objects.states),i=960,l=600,t=P().fitSize([i,l],e),n=W().projection(t),f=h("#viz2-map").append("svg").attr("viewBox",`0 0 ${i} ${l}`).attr("preserveAspectRatio","xMidYMid meet");f.selectAll("path").data(e.features).join("path").attr("d",n).attr("fill",d=>{const g=o[d.properties.name];return g?r[g]:"#333"}).attr("stroke","#0a0a0a").attr("stroke-width",1).style("cursor","pointer").on("mouseenter",function(d,g){h(this).attr("stroke","#fff").attr("stroke-width",2).raise();const y=o[g.properties.name],u=y?s[y]:"Unknown";j(d,`<div class="tip-label">${g.properties.name}</div><div class="tip-value">${u}</div>`)}).on("mousemove",I).on("mouseleave",function(){h(this).attr("stroke","#0a0a0a").attr("stroke-width",1),H()}),f.append("path").datum(V(a,a.objects.states,(d,g)=>d!==g)).attr("fill","none").attr("stroke","#0a0a0a").attr("stroke-width",1).attr("d",n).style("pointer-events","none")}catch(a){h("#viz2-map").append("p").style("color","#dc2626").style("padding","2rem").text("Error loading map data. Please check your connection. "+a.message)}})(),(function(){const d=h("#viz3-scale").append("svg").attr("viewBox","0 0 400 330").attr("preserveAspectRatio","xMidYMid meet");d.append("text").attr("x",400/2).attr("y",18).attr("text-anchor","middle").attr("fill","#888").attr("font-size","12px").attr("font-weight","600").attr("letter-spacing","0.08em").text("153 MILLION VOTES CAST IN 2024"),d.append("text").attr("x",400/2).attr("y",34).attr("text-anchor","middle").attr("fill","#666").attr("font-size","10px").text("Each dot = 153,000 votes");const g=48,y=D(1e3);d.selectAll(".vote-dot").data(y).join("rect").attr("class","vote-dot").attr("x",(b,z)=>z%40*10).attr("y",(b,z)=>Math.floor(z/40)*10+g).attr("width",7).attr("height",7).attr("rx",1.5).attr("fill","#1e3a2a").attr("stroke","#2a5a3a").attr("stroke-width",.3);const u=9824/153e3;d.append("text").attr("x",400/2).attr("y",310).attr("text-anchor","middle").attr("fill","#f97316").attr("font-size","12px").attr("font-weight","600").text(`Total noncitizen findings across all states: ${m(",")(9824)}`),d.append("text").attr("x",400/2).attr("y",326).attr("text-anchor","middle").attr("fill","#888").attr("font-size","11px").text(`That's ${m(".1%")(9824/153e6)} of all votes — less than ${m(".1f")(u*100)}% of a single dot above.`);const c=0,x=g;d.append("rect").attr("x",c).attr("y",x).attr("width",7*u).attr("height",7).attr("rx",1).attr("fill","#f97316").attr("opacity",.9),d.append("line").attr("x1",7*u+2).attr("y1",x+7/2).attr("x2",50).attr("y2",x+7/2-10).attr("stroke","#f97316").attr("stroke-width",1).attr("stroke-dasharray","3,2"),d.append("text").attr("x",53).attr("y",x+7/2-13).attr("fill","#f97316").attr("font-size","9px").text("All noncitizen findings (barely visible)")})(),(function(){const o=[{state:"Virginia",found:6303},{state:"Texas",found:2724},{state:"Ohio",found:499},{state:"Iowa",found:277},{state:"Michigan",found:16},{state:"N. Carolina",found:5}],r={top:10,right:90,bottom:30,left:100},s=860-r.left-r.right,a=o.length*44,e=h("#viz3-inset-chart").append("svg").attr("viewBox",`0 0 860 ${a+r.top+r.bottom}`).append("g").attr("transform",`translate(${r.left},${r.top})`),i=v().domain([0,N(o,t=>t.found)]).nice().range([0,s]),l=A().domain(o.map(t=>t.state)).range([0,a]).padding(.3);e.selectAll(".grid-line").data(i.ticks(5)).join("line").attr("class","grid-line").attr("x1",t=>i(t)).attr("x2",t=>i(t)).attr("y1",0).attr("y2",a).attr("stroke","#222").attr("stroke-dasharray","2,3"),e.append("g").attr("transform",`translate(0,${a})`).call($(i).ticks(5).tickFormat(m(","))).selectAll("text").attr("fill","#888").attr("font-size","11px"),e.selectAll(".domain").attr("stroke","#333"),e.selectAll(".tick line").attr("stroke","#333"),e.selectAll(".state-label").data(o).join("text").attr("x",-10).attr("y",t=>l(t.state)+l.bandwidth()/2).attr("dy","0.35em").attr("text-anchor","end").attr("fill","#aaa").attr("font-size","12px").text(t=>t.state),e.selectAll(".inset-bar").data(o).join("rect").attr("x",0).attr("y",t=>l(t.state)).attr("width",t=>i(t.found)).attr("height",l.bandwidth()).attr("rx",3).attr("fill","#f97316"),e.selectAll(".inset-val").data(o).join("text").attr("x",t=>i(t.found)+6).attr("y",t=>l(t.state)+l.bandwidth()/2).attr("dy","0.35em").attr("fill","#ccc").attr("font-size","11px").attr("font-weight","600").text(t=>m(",")(t.found)),e.append("text").attr("x",s/2).attr("y",a+28).attr("text-anchor","middle").attr("fill","#666").attr("font-size","10px").text("Noncitizen registrations found")})(),(function(){const o=[{group:"Race / Ethnicity",items:[{label:"People of color",access:11,entirely:3},{label:"White non-Hispanic",access:8,entirely:1}]},{group:"Household Income",items:[{label:"Under $25k",access:12,entirely:null},{label:"$25k - $50k",access:10,entirely:null},{label:"Over $50k",access:7,entirely:null}]},{group:"Age Group",items:[{label:"18 - 29",access:15,entirely:null},{label:"30 - 49",access:9,entirely:null},{label:"50 - 64",access:7,entirely:null},{label:"65+",access:8,entirely:null}]}],r=[];o.forEach(c=>{r.push({label:c.group,isHeader:!0}),c.items.forEach(x=>{r.push({...x,isHeader:!1})})}),r.filter(c=>!c.isHeader),r.map(c=>c.label);const s={top:10,right:60,bottom:30,left:180},a=38,e=32,i=r.reduce((c,x)=>c+(x.isHeader?e:a),0),l=860-s.left-s.right,t=h("#viz4-bars").append("svg").attr("viewBox",`0 0 860 ${i+s.top+s.bottom}`).append("g").attr("transform",`translate(${s.left},${s.top})`),n=v().domain([0,18]).range([0,l]);t.selectAll(".grid").data(n.ticks(6)).join("line").attr("x1",c=>n(c)).attr("x2",c=>n(c)).attr("y1",0).attr("y2",i).attr("stroke","#1a1a1a").attr("stroke-dasharray","2,3"),t.append("g").attr("transform",`translate(0,${i})`).call($(n).ticks(6).tickFormat(c=>c+"%")).selectAll("text").attr("fill","#888").attr("font-size","11px"),t.selectAll(".domain").attr("stroke","#333"),t.selectAll(".tick line").attr("stroke","#333");let f=0;const d=14;r.forEach(c=>{c.isHeader?(t.append("text").attr("x",-170).attr("y",f+e/2+4).attr("fill","#666").attr("font-size","10px").attr("font-weight","700").attr("text-transform","uppercase").attr("letter-spacing","0.08em").text(c.label.toUpperCase()),f+=e):(t.append("text").attr("x",-10).attr("y",f+a/2).attr("dy","0.35em").attr("text-anchor","end").attr("fill","#bbb").attr("font-size","12px").text(c.label),t.append("rect").attr("x",0).attr("y",f+a/2-d-1).attr("width",n(c.access)).attr("height",d).attr("rx",3).attr("fill","#f97316"),t.append("text").attr("x",n(c.access)+6).attr("y",f+a/2-d/2-1).attr("dy","0.35em").attr("fill","#f97316").attr("font-size","11px").attr("font-weight","600").text(c.access+"%"),c.entirely!==null&&(t.append("rect").attr("x",0).attr("y",f+a/2+1).attr("width",n(c.entirely)).attr("height",d).attr("rx",3).attr("fill","#dc2626"),t.append("text").attr("x",n(c.entirely)+6).attr("y",f+a/2+d/2+1).attr("dy","0.35em").attr("fill","#dc2626").attr("font-size","11px").attr("font-weight","600").text(c.entirely+"%")),f+=a)});const g=-2,y=[{label:"Lack ready access",color:"#f97316"},{label:"Lack entirely",color:"#dc2626"}],u=t.append("g").attr("transform",`translate(${l-200}, ${g})`);y.forEach((c,x)=>{const b=u.append("g").attr("transform",`translate(${x*130}, 0)`);b.append("rect").attr("width",12).attr("height",12).attr("rx",2).attr("fill",c.color),b.append("text").attr("x",16).attr("y",10).attr("fill","#aaa").attr("font-size","10px").text(c.label)})})(),(function(){const o=[{state:"Virginia",found:6303,registered:61e5},{state:"Texas",found:2724,registered:18e6},{state:"Iowa",found:277,registered:22e5},{state:"Ohio",found:499,registered:8e6},{state:"Michigan",found:16,registered:84e5},{state:"N. Carolina",found:5,registered:74e5}].map(t=>({...t,pct:t.found/t.registered*100})).sort((t,n)=>n.pct-t.pct),r={top:30,right:120,bottom:40,left:110},s=860-r.left-r.right,a=o.length*52,e=h("#viz5-lollipop").append("svg").attr("viewBox",`0 0 860 ${a+r.top+r.bottom}`).append("g").attr("transform",`translate(${r.left},${r.top})`),i=v().domain([0,1]).range([0,s]),l=A().domain(o.map(t=>t.state)).range([0,a]).padding(.4);e.selectAll(".grid").data([.1,.2,.5,1]).join("line").attr("x1",t=>i(t)).attr("x2",t=>i(t)).attr("y1",-10).attr("y2",a+10).attr("stroke","#1a1a1a").attr("stroke-dasharray","2,3"),e.append("line").attr("x1",i(1)).attr("x2",i(1)).attr("y1",-10).attr("y2",a+10).attr("stroke","#dc2626").attr("stroke-width",2).attr("stroke-dasharray","6,4").attr("opacity",.6),e.append("text").attr("x",i(1)+6).attr("y",-2).attr("fill","#dc2626").attr("font-size","11px").attr("font-weight","600").text("1% reference line"),e.append("g").attr("transform",`translate(0,${a+5})`).call($(i).tickValues([0,.1,.2,.5,1]).tickFormat(t=>t+"%")).selectAll("text").attr("fill","#888").attr("font-size","11px"),e.selectAll(".domain").attr("stroke","#333"),e.selectAll(".tick line").attr("stroke","#333"),e.append("text").attr("x",s/2).attr("y",a+36).attr("text-anchor","middle").attr("fill","#666").attr("font-size","10px").text("Noncitizen registrations as % of total registered voters"),e.selectAll(".stick").data(o).join("line").attr("class","stick").attr("x1",0).attr("x2",t=>i(t.pct)).attr("y1",t=>l(t.state)+l.bandwidth()/2).attr("y2",t=>l(t.state)+l.bandwidth()/2).attr("stroke","#f97316").attr("stroke-width",2).attr("opacity",.6),e.selectAll(".dot").data(o).join("circle").attr("class","dot").attr("cx",t=>i(t.pct)).attr("cy",t=>l(t.state)+l.bandwidth()/2).attr("r",6).attr("fill","#f97316").attr("stroke","#0a0a0a").attr("stroke-width",2).on("mouseenter",function(t,n){h(this).attr("r",9).attr("fill","#fb923c"),j(t,`<div class="tip-label">${n.state}</div><div class="tip-value">${m(",")(n.found)} found out of ${m(",")(n.registered)} registered</div>`)}).on("mousemove",I).on("mouseleave",function(){h(this).attr("r",6).attr("fill","#f97316"),H()}),e.selectAll(".state-label").data(o).join("text").attr("x",-10).attr("y",t=>l(t.state)+l.bandwidth()/2).attr("dy","0.35em").attr("text-anchor","end").attr("fill","#bbb").attr("font-size","12px").text(t=>t.state),e.selectAll(".pct-label").data(o).join("text").attr("x",t=>i(t.pct)+14).attr("y",t=>l(t.state)+l.bandwidth()/2).attr("dy","0.35em").attr("fill","#aaa").attr("font-size","11px").attr("font-weight","600").text(t=>t.pct<.001?t.pct.toFixed(5)+"%":t.pct<.01?t.pct.toFixed(4)+"%":t.pct.toFixed(3)+"%"),e.append("text").attr("x",s).attr("y",a+36).attr("text-anchor","end").attr("fill","#666").attr("font-size","10px").attr("font-style","italic").text("All states are at least 10x below the 1% line")})(),document.getElementById("code1-content").textContent=`// VIZ 1: The Documentation Gap — Animated Counter + Waffle Chart

// Animated counter using d3.interpolateNumber
function animateCounter(selector, targetValue, suffix = "") {
  const el = document.querySelector(selector);
  const fmt = d3.format(",.1f");
  d3.select(el)
    .transition()
    .duration(2000)
    .ease(d3.easeCubicOut)
    .tween("text", function() {
      const interp = d3.interpolateNumber(0, targetValue);
      return function(t) {
        const val = interp(t);
        el.textContent = fmt(val / 1000000) + "M" + suffix;
      };
    });
}

// Waffle chart: 10x10 grid, 9 squares highlighted
const cols = 10, size = 36, gap = 4;
const svg = container.append("svg")
  .attr("viewBox", \`0 0 \${cols * (size + gap)} \${10 * (size + gap)}\`);

svg.selectAll("rect")
  .data(d3.range(100))
  .join("rect")
  .attr("x", (d, i) => (i % cols) * (size + gap))
  .attr("y", (d, i) => Math.floor(i / cols) * (size + gap))
  .attr("width", size)
  .attr("height", size)
  .attr("rx", 4)
  .attr("fill", "#1a1a1a");

// Animate: highlight first 9 squares
rects.transition()
  .duration(600)
  .delay((d, i) => i * 15)
  .attr("fill", (d, i) => i < 9 ? "#f97316" : "#1a1a1a");

// Horizontal bar chart for sub-breakdowns
const data = [
  { label: "Women w/ name mismatch", value: 69000000 },
  { label: "No valid passport", value: 146000000 },
  { label: "Lack documents entirely", value: 3800000 },
];

const x = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([0, width]);

const y = d3.scaleBand()
  .domain(data.map(d => d.label))
  .range([0, height])
  .padding(0.35);

svg.selectAll("rect")
  .data(data)
  .join("rect")
  .attr("x", 0)
  .attr("y", d => y(d.label))
  .attr("width", 0) // animate from 0
  .attr("height", y.bandwidth())
  .attr("fill", d => d.color)
  .transition()
  .duration(1000)
  .delay((d, i) => i * 200)
  .attr("width", d => x(d.value));`,document.getElementById("code2-content").textContent=`// VIZ 2: Voter ID Requirements — US Choropleth Map

import * as topojson from "topojson-client";

// State-to-category mapping
const stateCategories = {
  "Arkansas": "strict-photo", "Georgia": "strict-photo",
  "Indiana": "strict-photo", "Kansas": "strict-photo",
  // ... (all 50 states + DC mapped)
  "California": "no-id", "Hawaii": "no-id",
};

const colorMap = {
  "strict-photo": "#dc2626",     // red
  "non-strict-photo": "#f97316", // orange
  "strict-non-photo": "#eab308", // yellow
  "non-strict-non-photo": "#818cf8", // purple
  "no-id": "#4ade80",           // green
};

// Fetch TopoJSON from CDN
const us = await d3.json(
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"
);
const states = topojson.feature(us, us.objects.states);

// Projection: AlbersUSA handles AK/HI insets automatically
const projection = d3.geoAlbersUsa()
  .fitSize([width, height], states);

const path = d3.geoPath().projection(projection);

// Draw each state as a <path> element
svg.selectAll("path")
  .data(states.features)
  .join("path")
  .attr("d", path)
  .attr("fill", d => {
    const cat = stateCategories[d.properties.name];
    return colorMap[cat] || "#333";
  })
  .attr("stroke", "#0a0a0a")
  .on("mouseenter", function(event, d) {
    d3.select(this).attr("stroke", "#fff").raise();
    showTooltip(event, d.properties.name);
  })
  .on("mouseleave", function() {
    d3.select(this).attr("stroke", "#0a0a0a");
    hideTooltip();
  });`,document.getElementById("code3-content").textContent=`// VIZ 3: Needle in a Haystack — Unit Chart + Magnified Inset

const totalVotes = 153_000_000;
const totalFindings = 9_824;
const dotsTotal = 1000;
const votesPerDot = totalVotes / dotsTotal; // 153,000

// Unit chart: 40x25 grid of dots
const cols = 40;
svg.selectAll(".vote-dot")
  .data(d3.range(dotsTotal))
  .join("rect")
  .attr("x", (d, i) => (i % cols) * (dotSize + dotGap))
  .attr("y", (d, i) => Math.floor(i / cols) * (dotSize + dotGap))
  .attr("width", dotSize)
  .attr("height", dotSize)
  .attr("fill", "#1e3a2a");

// How many dots would the findings fill?
const findingsDots = totalFindings / votesPerDot; // ~0.064 dots

// Highlight a tiny orange sliver on the first dot
svg.append("rect")
  .attr("x", 0).attr("y", gridOffsetY)
  .attr("width", dotSize * findingsDots) // barely visible
  .attr("height", dotSize)
  .attr("fill", "#f97316");

// Magnified inset: horizontal bar chart for state findings
const insetData = [
  { state: "Virginia", found: 6303 },
  { state: "Texas", found: 2724 },
  { state: "Ohio", found: 499 },
  { state: "Iowa", found: 277 },
  { state: "Michigan", found: 16 },
  { state: "N. Carolina", found: 5 },
];

const x = d3.scaleLinear()
  .domain([0, d3.max(insetData, d => d.found)])
  .range([0, width]);

const y = d3.scaleBand()
  .domain(insetData.map(d => d.state))
  .range([0, height])
  .padding(0.3);

svg.selectAll(".bar")
  .data(insetData).join("rect")
  .attr("x", 0)
  .attr("y", d => y(d.state))
  .attr("width", d => x(d.found))
  .attr("height", y.bandwidth())
  .attr("fill", "#f97316");`,document.getElementById("code4-content").textContent=`// VIZ 4: Who Lacks Documents? — Grouped Horizontal Bars

const data = [
  { group: "Race / Ethnicity", items: [
    { label: "People of color", access: 11, entirely: 3 },
    { label: "White non-Hispanic", access: 8, entirely: 1 },
  ]},
  { group: "Household Income", items: [
    { label: "Under $25k", access: 12 },
    { label: "$25k - $50k", access: 10 },
    { label: "Over $50k", access: 7 },
  ]},
  { group: "Age Group", items: [
    { label: "18 - 29", access: 15 },
    { label: "30 - 49", access: 9 },
    { label: "50 - 64", access: 7 },
    { label: "65+", access: 8 },
  ]},
];

const x = d3.scaleLinear()
  .domain([0, 18])
  .range([0, width]);

// For each row, draw two bars: "Lack access" (orange)
// and "Lack entirely" (red) if data exists
flatData.forEach(d => {
  if (d.isHeader) {
    svg.append("text")
      .attr("x", -margin.left + 10)
      .attr("y", yPos + headerHeight / 2 + 4)
      .attr("fill", "#666")
      .text(d.label.toUpperCase());
    yPos += headerHeight;
  } else {
    // "Lack access" bar
    svg.append("rect")
      .attr("x", 0)
      .attr("y", yPos + rowHeight / 2 - barH - 1)
      .attr("width", x(d.access))
      .attr("height", barH)
      .attr("fill", "#f97316");

    // "Lack entirely" bar (conditional)
    if (d.entirely !== null) {
      svg.append("rect")
        .attr("x", 0)
        .attr("y", yPos + rowHeight / 2 + 1)
        .attr("width", x(d.entirely))
        .attr("height", barH)
        .attr("fill", "#dc2626");
    }
    yPos += rowHeight;
  }
});`,document.getElementById("code5-content").textContent=`// VIZ 5: State Audit Results — Lollipop Chart

const data = [
  { state: "Virginia", found: 6303, registered: 6100000 },
  { state: "Texas", found: 2724, registered: 18000000 },
  { state: "Iowa", found: 277, registered: 2200000 },
  { state: "Ohio", found: 499, registered: 8000000 },
  { state: "Michigan", found: 16, registered: 8400000 },
  { state: "N. Carolina", found: 5, registered: 7400000 },
].map(d => ({ ...d, pct: (d.found / d.registered) * 100 }))
 .sort((a, b) => b.pct - a.pct);

const x = d3.scaleLinear()
  .domain([0, 1])    // 0% to 1% range
  .range([0, width]);

const y = d3.scaleBand()
  .domain(data.map(d => d.state))
  .range([0, height])
  .padding(0.4);

// 1% reference line (for scale context)
svg.append("line")
  .attr("x1", x(1)).attr("x2", x(1))
  .attr("y1", -10).attr("y2", height + 10)
  .attr("stroke", "#dc2626")
  .attr("stroke-dasharray", "6,4");

// Lollipop sticks (lines from 0 to value)
svg.selectAll(".stick")
  .data(data).join("line")
  .attr("x1", 0)
  .attr("x2", d => x(d.pct))
  .attr("y1", d => y(d.state) + y.bandwidth() / 2)
  .attr("y2", d => y(d.state) + y.bandwidth() / 2)
  .attr("stroke", "#f97316")
  .attr("stroke-width", 2);

// Lollipop dots (circles at end of sticks)
svg.selectAll(".dot")
  .data(data).join("circle")
  .attr("cx", d => x(d.pct))
  .attr("cy", d => y(d.state) + y.bandwidth() / 2)
  .attr("r", 6)
  .attr("fill", "#f97316")
  .on("mouseenter", function(event, d) {
    showTooltip(event,
      d.state + ": " + d3.format(",")(d.found) +
      " / " + d3.format(",")(d.registered)
    );
  });

// Percentage labels
svg.selectAll(".pct-label")
  .data(data).join("text")
  .attr("x", d => x(d.pct) + 14)
  .attr("y", d => y(d.state) + y.bandwidth() / 2)
  .text(d => d.pct.toFixed(4) + "%");`})();
