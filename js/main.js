const $=(selector,root=document)=>root.querySelector(selector);
const initForms=()=>{
 const complaint=$("#complaint-form"),feedback=$("#complaint-feedback");
 complaint?.addEventListener("submit",event=>{event.preventDefault();if(!complaint.reportValidity())return;feedback.textContent="Isian sudah diperiksa di perangkat ini, tetapi belum terkirim. Gunakan SP4N-LAPOR! untuk menyampaikan laporan."});
 const admin=$("#admin-login"),adminFeedback=$("#admin-feedback");
 admin?.addEventListener("submit",event=>{event.preventDefault();if(!admin.reportValidity())return;adminFeedback.textContent="Login belum dapat diproses karena server autentikasi belum tersedia."});
};
document.addEventListener("DOMContentLoaded",()=>{const year=$("#year");if(year)year.textContent=new Date().getFullYear();initForms()});