(function(){
const R='ecomaura/rsacademy',$=s=>document.querySelector(s),api=(p,o={})=>fetch('https://api.github.com/repos/'+R+'/contents/'+p,{...o,headers:{Authorization:'Bearer '+$('#tk').value.trim(),Accept:'application/vnd.github+json'}});
const b64=s=>btoa(unescape(encodeURIComponent(s))),st=t=>$('#st').textContent=t;
const rd=f=>new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>ok(r.result.split(',')[1]);r.onerror=no;r.readAsDataURL(f)});
async function getJson(){const r=await api('resources.json?ref=main&t='+Date.now());if(!r.ok)throw Error('Cannot read resources (check token)');const j=await r.json();return{sha:j.sha,list:JSON.parse(decodeURIComponent(escape(atob(j.content.replace(/\n/g,'')))))}}
async function putJson(list,sha){const r=await api('resources.json',{method:'PUT',body:JSON.stringify({message:'Update resources',branch:'main',sha,content:b64(JSON.stringify(list,null,1))})});if(!r.ok)throw Error('Save failed: '+r.status)}
function draw(l){$('#al').innerHTML=l.map(r=>`<div class="card" style="margin-bottom:10px;display:flex;justify-content:space-between;gap:10px;align-items:center"><span><b>${r.title}</b><br>${r.type} · ${r.cls}</span><button class="btn ghost" data-id="${r.id}" type="button">Delete</button></div>`).join('')||'<p>Nothing yet.</p>'}
$('#tk').onchange=async()=>{try{draw((await getJson()).list)}catch(e){st(e.message)}};
$('#up').onsubmit=async e=>{e.preventDefault();const bt=e.target.querySelector('button');bt.disabled=true;try{
const files=[...$('#fi').files],links=$('#yu').value.split('\n').map(s=>s.trim()).filter(Boolean),n=files.length+links.length;
if(!n)throw Error('Add files or links');const big=files.find(f=>f.size>25e6);if(big)throw Error(big.name+' is over 25 MB. Use a YouTube link instead.');
const base=$('#ti').value.trim(),T=nm=>base?(n>1?base+' – '+nm:base):nm,cls=$('#cl').value,subject=$('#su').value,date=new Date().toISOString().slice(0,10),items=[],bad=[];let i=0;
for(const f of files){i++;st(`Uploading ${i} of ${n}: ${f.name}`);try{const p='uploads/'+Date.now()+'-'+f.name.replace(/[^\w.-]/g,'_');
const r=await api(p,{method:'PUT',body:JSON.stringify({message:'Add '+f.name,branch:'main',content:await rd(f)})});if(!r.ok)throw 0;
items.push({id:Date.now()+'-'+i,type:/\.(mp4|webm)$/i.test(f.name)?'video':'paper',title:T(f.name.replace(/\.[^.]+$/,'')),cls,subject,url:p,date})}catch{bad.push(f.name)}}
for(const u of links){i++;items.push({id:Date.now()+'-'+i,type:'video',title:T('Video '+(i-files.length)),cls,subject,url:u,date})}
if(items.length){st('Saving list...');const{sha,list}=await getJson();const all=[...items,...list];await putJson(all,sha);draw(all)}
st(`Published ${items.length} of ${n}.`+(bad.length?' Failed: '+bad.join(', '):' Items appear on the site in about a minute.'));e.target.reset();$('#tk').value=$('#tk').value}catch(x){st(x.message)}bt.disabled=false};
$('#al').onclick=async e=>{const id=e.target.dataset.id;if(!id||!confirm('Delete this item?'))return;try{const{sha,list}=await getJson();const it=list.find(x=>x.id==id);
if(it&&it.url.startsWith('uploads/')){const g=await api(it.url+'?ref=main');if(g.ok)await api(it.url,{method:'DELETE',body:JSON.stringify({message:'Remove file',branch:'main',sha:(await g.json()).sha})})}
const n=list.filter(x=>x.id!=id);await putJson(n,(await getJson()).sha);draw(n)}catch(x){st(x.message)}};

})();
