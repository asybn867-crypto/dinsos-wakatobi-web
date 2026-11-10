const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
const initMenu=()=>{
 const button=$(".menu-toggle"),sidebar=$("#site-sidebar");
 if(!button||!sidebar)return;
 const close=()=>{sidebar.classList.remove("is-open");button.setAttribute("aria-expanded","false")};
 button.addEventListener("click",()=>{const opened=button.getAttribute("aria-expanded")==="true";button.setAttribute("aria-expanded",String(!opened));sidebar.classList.toggle("is-open",!opened)});
 $$(".sidebar-nav a",sidebar).forEach(link=>link.addEventListener("click",close));
 document.addEventListener("keydown",event=>{if(event.key==="Escape")close()});
 document.addEventListener("click",event=>{if(innerWidth<=850&&!sidebar.contains(event.target)&&!button.contains(event.target))close()});
};
const initScrollReveal=()=>{
 const targets=$$("main section,.service-row,.news-feature,.news-item,.org-unit,.admin-login-page");
 if(!("IntersectionObserver"in window)||matchMedia("(prefers-reduced-motion: reduce)").matches){targets.forEach(el=>el.classList.add("is-visible"));return}
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:"0px 0px -35px 0px"});
 targets.forEach((element,index)=>{element.classList.add("reveal");element.style.transitionDelay=(index%4)*65+"ms";observer.observe(element)});
};
const initPageTransitions=()=>{
 document.body.classList.add("page-enter");
 document.addEventListener("click",event=>{
  const link=event.target.closest("a[href]");
  if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target==="_blank"||link.hasAttribute("download"))return;
  const url=new URL(link.href,location.href);
  if(url.origin!==location.origin||url.pathname===location.pathname&&url.hash)return;
  if(url.pathname.endsWith(".html")||url.pathname==="/"){event.preventDefault();document.documentElement.classList.add("is-leaving");setTimeout(()=>location.href=url.href,220)}
 });
};
const initForms=()=>{
 const complaint=$("#complaint-form"),feedback=$("#complaint-feedback");
 complaint?.addEventListener("submit",event=>{event.preventDefault();if(!complaint.reportValidity())return;feedback.textContent="Isian sudah diperiksa di perangkat ini, tetapi belum terkirim. Gunakan SP4N-LAPOR! untuk menyampaikan laporan."});
 const admin=$("#admin-login"),adminFeedback=$("#admin-feedback");
 admin?.addEventListener("submit",event=>{event.preventDefault();if(!admin.reportValidity())return;adminFeedback.textContent="Login belum dapat diproses karena server autentikasi belum tersedia."});
};
document.addEventListener("DOMContentLoaded",()=>{const year=$("#year");if(year)year.textContent=new Date().getFullYear();initMenu();initScrollReveal();initPageTransitions();initForms()});