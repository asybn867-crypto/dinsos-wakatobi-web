const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el};
const renderStructure=items=>{const chart=document.querySelector(".org-chart");if(!chart||!items.length)return;chart.replaceChildren();const byParent=new Map();for(const item of items){const key=item.parent_id||"";if(!byParent.has(key))byParent.set(key,[]);byParent.get(key).push(item)}const build=item=>{const node=make("article","org-node");node.append(make("strong","",item.name));if(item.office_holder)node.append(make("span","org-holder",item.office_holder));if(item.description)node.append(make("small","",item.description));const children=byParent.get(item.id)||[];if(children.length){const group=make("div","org-branches");for(const child of children.sort((a,b)=>a.sort_order-b.sort_order||a.name.localeCompare(b.name)))group.append(build(child));node.append(group)}return node};const roots=(byParent.get("")||[]).sort((a,b)=>a.sort_order-b.sort_order||a.name.localeCompare(b.name));for(const root of roots){const node=build(root);node.classList.add("org-top");chart.append(node)}};
const revealElements=()=>{const targets=document.querySelectorAll("main>section:not(.hero),.news-feature,.news-item,.program-item,.service-grid article,.document-list>div,.hotline-card");if(!("IntersectionObserver"in window)){targets.forEach(el=>el.classList.add("is-visible"));return}const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:"0px 0px -35px 0px"});targets.forEach(el=>{el.classList.add("reveal");observer.observe(el)})};
const initMenu=()=>{const button=document.querySelector(".menu-toggle"),nav=document.querySelector("#site-nav");if(!button||!nav)return;button.addEventListener("click",()=>{const open=button.getAttribute("aria-expanded")==="true";button.setAttribute("aria-expanded",String(!open));nav.classList.toggle("is-open",!open)});nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{button.setAttribute("aria-expanded","false");nav.classList.remove("is-open")}))};
const ready=()=>{document.body.classList.add("page-ready");document.body.classList.remove("is-loading")};
window.addEventListener("load",()=>{initMenu();revealElements();const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;setTimeout(ready,reduced?0:650)});
document.addEventListener("DOMContentLoaded",()=>{const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear()});
const initPublicTools=()=>{
 const search=document.querySelector("#site-search"),results=document.querySelector("#search-results");
 if(search&&results){
  const searchable=[...document.querySelectorAll("main section,main article,main details")].filter(el=>el.id!=="beranda");
  const close=()=>{results.hidden=true;searchable.forEach(el=>el.classList.remove("search-hit"))};
  search.addEventListener("input",()=>{
   const q=search.value.trim().toLocaleLowerCase("id");
   results.replaceChildren();searchable.forEach(el=>el.classList.remove("search-hit"));
   if(!q){close();return}
   const matches=searchable.filter(el=>el.innerText.toLocaleLowerCase("id").includes(q)).slice(0,12);
   if(!matches.length){results.textContent="Tidak ada hasil yang cocok.";results.hidden=false;return}
   const heading=make("strong","",matches.length+" hasil ditemukan");results.append(heading);
   matches.forEach(el=>{const a=make("a","",el.querySelector("h2,h3,summary")?.textContent||el.id||"Informasi");const small=make("small","",el.innerText.trim().replace(/\s+/g," ").slice(0,105));a.href="#"+(el.id||el.closest("section")?.id||"konten");a.append(small);a.addEventListener("click",close);results.append(a)});
   results.hidden=false;
  });
  search.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
  document.addEventListener("click",e=>{if(!results.contains(e.target)&&e.target!==search)close()});
 }
 const toggle=document.querySelector(".access-toggle"),panel=document.querySelector("#access-tools");
 if(toggle&&panel){toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")==="true";toggle.setAttribute("aria-expanded",String(!open));panel.hidden=open})}
 document.querySelectorAll("[data-font]").forEach(btn=>btn.addEventListener("click",()=>{document.body.classList.remove("font-large","font-small");if(btn.dataset.font==="up")document.body.classList.add("font-large");if(btn.dataset.font==="down")document.body.classList.add("font-small")}));
 document.querySelector("[data-contrast]")?.addEventListener("click",()=>document.body.classList.toggle("high-contrast"));
 document.querySelector("[data-reset]")?.addEventListener("click",()=>{document.body.classList.remove("font-large","font-small","high-contrast")});
 document.addEventListener("keydown",e=>{if(e.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();search?.focus()}});
};
document.addEventListener("DOMContentLoaded",initPublicTools);
