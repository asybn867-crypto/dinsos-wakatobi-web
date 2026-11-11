const $=(selector,root=document)=>root.querySelector(selector);
const categories={"Bantuan sosial":"bantuan-sosial","Rehabilitasi sosial":"rehabilitasi","Pengaduan layanan":"lainnya","Aspirasi":"lainnya","Lainnya":"lainnya"};
const initForms=()=>{
 const complaint=$("#complaint-form"),feedback=$("#complaint-feedback");
 complaint?.addEventListener("submit",async event=>{
  event.preventDefault();
  if(!complaint.reportValidity())return;
  const button=complaint.querySelector('button[type="submit"]');
  const data=new FormData(complaint);
  const description=String(data.get("uraian")||"").trim()+"\nLokasi: "+String(data.get("lokasi")||"").trim();
  button.disabled=true;feedback.textContent="Mengirim pengaduan…";
  try{
   const response=await fetch("/api/complaints",{method:"POST",headers:{"content-type":"application/json"},credentials:"same-origin",body:JSON.stringify({category:categories[String(data.get("kategori"))]||"lainnya",title:String(data.get("judul")||"").trim(),description})});
   const result=await response.json();
   if(!response.ok)throw new Error(result.error||"Pengaduan gagal dikirim");
   feedback.textContent="Pengaduan berhasil dikirim. Simpan kode tiket ini: "+result.trackingCode;
   complaint.reset();
  }catch(error){feedback.textContent=error.message}
  finally{button.disabled=false}
 });
 const admin=$("#admin-login"),adminFeedback=$("#admin-feedback");
 admin?.addEventListener("submit",async event=>{
  event.preventDefault();if(!admin.reportValidity())return;
  adminFeedback.textContent="Backend login tersedia melalui API. Panel admin perlu dihubungkan ke sesi autentikasi.";
 });
};
document.addEventListener("DOMContentLoaded",()=>{const year=$("#year");if(year)year.textContent=new Date().getFullYear();initForms()});
