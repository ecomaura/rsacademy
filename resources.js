const $=s=>document.querySelector(s);
const LEADS_ENDPOINT=''; // optional: Formspree / Google Apps Script URL to receive leads
let all=[],f='All';
const yt=u=>{const m=u.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);return m&&'https://www.youtube-nocookie.com/embed/'+m[1]};
const esc=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function open_(){$('#gate').hidden=true;$('#lib').hidden=false;load()}
async function load(){try{all=await(await fetch('resources.json?'+Date.now())).json()}catch{all=[]}
const cl=['All',...new Set(all.map(r=>r.cls))];$('#ft').innerHTML='';
cl.forEach(c=>{const b=document.createElement('button');b.className='chip';b.setAttribute('aria-selected',c==f);b.textContent=c;b.onclick=()=>{f=c;load2()};$('#ft').append(b)});load2()}
function load2(){const l=all.filter(r=>f=='All'||r.cls==f);$('#em').hidden=!!l.length;
[...$('#ft').children].forEach(b=>b.setAttribute('aria-selected',b.textContent==f));
$('#rl').innerHTML=l.map(r=>{let m;if(r.type=='video'){const e=yt(r.url||'');m=e?`<iframe src="${e}" title="${esc(r.title)}" allowfullscreen loading="lazy" style="width:100%;aspect-ratio:16/9;border:0;border-radius:14px"></iframe>`:`<video src="${esc(r.url)}" controls preload="metadata" style="width:100%;border-radius:14px"></video>`}
else m=/\.pdf$/i.test(r.url)?`<a class="btn alt" href="${esc(r.url)}" target="_blank" rel="noopener">📄 Open PDF</a>`:`<a href="${esc(r.url)}" target="_blank" rel="noopener"><img src="${esc(r.url)}" alt="${esc(r.title)}" loading="lazy" style="border-radius:14px"></a>`;
return `<div class="card rv in"><h3>${esc(r.title)}</h3><p>${esc(r.cls)}${r.subject?' · '+esc(r.subject):''}</p><div style="margin-top:12px">${m}</div></div>`}).join('')}
let lead;try{lead=JSON.parse(localStorage.getItem('rsa_lead'))}catch{}
if(lead)open_();
$('#lead').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));d.at=new Date().toISOString();
try{localStorage.setItem('rsa_lead',JSON.stringify(d))}catch{}
if(LEADS_ENDPOINT)fetch(LEADS_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)}).catch(()=>{});
open_()};
