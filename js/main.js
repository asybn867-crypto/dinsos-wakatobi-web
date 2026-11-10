const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];

const initMenu=()=>{
 const button=$(".menu-toggle"),sidebar=$("#site-sidebar");
 if(!button||!sidebar)return;
 const close=()=>{sidebar.classList.remove("is-open");button.setAttribute("aria-expanded","false")};
 button.addEventListener("click",()=>{
  const opened=button.getAttribute("aria-expanded")==="true";
  button.setAttribute("aria-expanded",String(!opened));
  sidebar.classList.toggle("is-open",!opened);
 });
 $$(".sidebar-nav a",sidebar).forEach(link=>link.addEventListener("click",close));
 document.addEventListener("keydown",event=>{if(event.key==="Escape")close()});
 document.addEventListener("click",event=>{
  if(window.innerWidth<=850&&!sidebar.contains(event.target)&&!button.contains(event.target))close();
 });
};

const initScrollReveal=()=>{
 const targets=$$("main section:not(.hero),.service-row,.news-feature,.news-item,.org-unit");
 if(!("IntersectionObserver"in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}
  });
 },{threshold:.08,rootMargin:"0px 0px -35px 0px"});
 targets.forEach(element=>{element.classList.add("reveal");observer.observe(element)});
};

const initActiveNavigation=()=>{
 const links=$$(".sidebar-nav a");
 const sections=links.map(link=>$(link.getAttribute("href"))).filter(Boolean);
 if(!("IntersectionObserver"in window))return;
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(entry.isIntersecting)links.forEach(link=>link.classList.toggle("is-active",link.getAttribute("href")==="#"+entry.target.id));
  });
 },{rootMargin:"-25% 0px -65% 0px",threshold:0});
 sections.forEach(section=>observer.observe(section));
};

const initForms=()=>{
 const complaint=$("#complaint-form"),feedback=$("#complaint-feedback");
 complaint?.addEventListener("submit",event=>{
  event.preventDefault();
  if(!complaint.reportValidity())return;
  feedback.textContent="Isian sudah diperiksa di perangkat ini, tetapi belum terkirim. Gunakan SP4N-LAPOR! untuk menyampaikan laporan melalui kanal pengaduan.";
 });
 const admin=$("#admin-login"),adminFeedback=$("#admin-feedback");
 admin?.addEventListener("submit",event=>{
  event.preventDefault();
  if(!admin.reportValidity())return;
  adminFeedback.textContent="Login belum dapat diproses karena server autentikasi belum tersedia.";
 });
};

document.addEventListener("DOMContentLoaded",()=>{
 const year=$("#year");
 if(year)year.textContent=new Date().getFullYear();
 initMenu();
 initScrollReveal();
 initActiveNavigation();
 initForms();
});