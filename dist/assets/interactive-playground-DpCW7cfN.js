import"./transform-DGvXF_4U.js";import{d as j,P as w}from"./init-tutor-Cq4VzOVI.js";import{s as $}from"./select-PKtlUnGw.js";function z(n){return`
  .pg-container {
    background: #141414;
    border: 1px solid #222;
    border-radius: 8px;
    font-family: var(--sans);
    overflow: hidden;
  }

  .pg-layout {
    display: flex;
    gap: 0;
  }

  /* Stack vertically on narrow screens */
  @media (max-width: 600px) {
    .pg-layout {
      flex-direction: column;
    }
    .pg-controls {
      border-right: none !important;
      border-bottom: 1px solid #222;
    }
  }

  .pg-controls {
    flex: 0 0 200px;
    padding: 14px 16px;
    border-right: 1px solid #222;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow-y: auto;
    max-height: 400px;
  }

  .pg-control-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .pg-control-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .pg-control-label {
    color: #888;
    font-size: 11px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .pg-control-value {
    color: ${n};
    font-size: 12px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    min-width: 32px;
    text-align: right;
  }

  .pg-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    background: #333;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }

  .pg-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${n};
    cursor: pointer;
    border: none;
  }

  .pg-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${n};
    cursor: pointer;
    border: none;
  }

  .pg-slider::-moz-range-track {
    height: 4px;
    background: #333;
    border-radius: 2px;
    border: none;
  }

  .pg-preview {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
  }

  .pg-preview svg {
    display: block;
    background: #1a1a1a;
    border-radius: 4px;
    max-width: 100%;
    height: auto;
  }
`}let y=!1,E=null;function L(n){if(y&&E===n)return;y=!0,E=n;const p=document.createElement("style");p.textContent=z(n),document.head.appendChild(p)}function I(n,p){const C=j(),N=w[C]||w.d3;L(N.color);const{width:k=400,height:P=200,controls:f=[],render:b}=p,s=document.getElementById(n);if(!s)throw new Error(`Playground: no element found with id "${n}"`);const i={};f.forEach(e=>{i[e.name]=e.value}),s.innerHTML="",s.classList.add("pg-container");const d=document.createElement("div");d.className="pg-layout";const u=document.createElement("div");u.className="pg-controls";const m={},g={};f.forEach(e=>{const t=document.createElement("div");t.className="pg-control-group";const r=document.createElement("div");r.className="pg-control-header";const a=document.createElement("span");a.className="pg-control-label",a.textContent=e.label||e.name;const l=document.createElement("span");l.className="pg-control-value",l.textContent=e.value,g[e.name]=l,r.appendChild(a),r.appendChild(l);const o=document.createElement("input");o.type="range",o.className="pg-slider",o.min=e.min,o.max=e.max,o.step=e.step!=null?e.step:1,o.value=e.value,m[e.name]=o,o.addEventListener("input",()=>{const v=Number(o.value);i[e.name]=v,l.textContent=v,x()}),t.appendChild(r),t.appendChild(o),u.appendChild(t)});const h=document.createElement("div");h.className="pg-preview";const c=document.createElementNS("http://www.w3.org/2000/svg","svg");c.setAttribute("width","100%"),c.setAttribute("viewBox",`0 0 ${k} ${P}`),h.appendChild(c);const S=$(c);d.appendChild(u),d.appendChild(h),s.appendChild(d);function x(){typeof b=="function"&&b(S,{...i})}return x(),{update(e){for(const[t,r]of Object.entries(e)){if(!(t in i))continue;const a=Number(r);i[t]=a,m[t]&&(m[t].value=a),g[t]&&(g[t].textContent=a)}x()}}}export{I as c};
