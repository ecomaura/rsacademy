const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
$('#mb')?.addEventListener('click',()=>$('nav').classList.toggle('open'));
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});
$$('.rv').forEach(e=>io.observe(e));
const co=new IntersectionObserver(e=>e.forEach(x=>{if(!x.isIntersecting)return;co.unobserve(x.target);const t=+x.target.dataset.n,s=performance.now();
(function f(n){const p=Math.min((n-s)/1200,1);x.target.textContent=Math.round(t*p).toLocaleString()+(x.target.dataset.s||'');p<1&&requestAnimationFrame(f)})(s)}));
$$('[data-n]').forEach(e=>co.observe(e));
// program picker
const D={
'CBSE':['Classes 7–10','Maths, Science, English, Social Science, Hindi/Sanskrit. NCERT-first teaching with board-pattern practice papers.'],
'ICSE':['Classes 7–10','Strong focus on English, Maths, Physics, Chemistry, Biology, History & Civics, Geography. Concept depth plus internal-assessment guidance.'],
'IGCSE':['Grades 7–10','Cambridge syllabus for Maths, Sciences and English. Past-paper drills, command-word training and practical skills support.'],
'IB':['MYP & DP prep','MYP Grades 7–10 in Maths, Sciences, Language & Literature; criteria-based assessment help and inquiry-led projects.'],
'Science 11–12 · CBSE':['Classes 11 & 12','Physics, Chemistry, Maths, Biology. Board + JEE/NEET-aligned foundations, weekly tests and doubt clinics.'],
'Science 11–12 · State Board':['Std 11 & 12','GSEB-style Physics, Chemistry, Maths, Biology with chapter-wise tests and board paper practice.']};
const ch=$('#chips');if(ch){Object.keys(D).forEach((k,i)=>{const b=document.createElement('button');b.className='chip';b.role='tab';b.textContent=k;b.setAttribute('aria-selected',i==0);b.onclick=()=>{$$('.chip',ch).forEach(c=>c.setAttribute('aria-selected',c==b));show(k)};ch.append(b)});
function show(k){$('#pt').textContent=k+' · '+D[k][0];$('#pd').textContent=D[k][1]}show('CBSE')}
$('#enq')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);
const m=`Name: ${f.get('n')}\nPhone: ${f.get('p')}\nClass/Board: ${f.get('c')}\nMessage: ${f.get('m')}`;
$('#ok').textContent='Thanks '+f.get('n')+'! Opening WhatsApp so you can send your enquiry.';
window.open('https://wa.me/91XXXXXXXXXX?text='+encodeURIComponent(m),'_blank')});
