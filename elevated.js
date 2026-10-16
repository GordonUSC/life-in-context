(()=>{
const data=JSON.parse(document.querySelector('#record-data').textContent);
const entries=[['E02','1980–83','The talent search'],['E33','1994','Games as a craft'],['E11','2006','Opening doors'],['E13','2015','The classroom'],['E25','2025','Ethics & possibility']];
const tabs=document.querySelector('.journey-tabs');
const panel=document.querySelector('#journey-story');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function select(i,focus=false){
 tabs.querySelectorAll('button').forEach((b,j)=>{b.setAttribute('aria-selected',String(i===j));b.tabIndex=i===j?0:-1});
 const e=data.events.find(e=>e.id===entries[i][0]);
 panel.setAttribute('aria-labelledby','journey-tab-'+i);
 panel.innerHTML=`<div class="big-index" aria-hidden="true">0${i+1}</div><div><span class="story-evidence">${esc(e.date)} · ${esc(e.evidence)}</span><h3>${esc(e.title)}</h3><p>${esc(e.description)}</p>${e.source_url?`<a href="${esc(e.source_url)}" target="_blank" rel="noopener noreferrer">Source: ${esc(e.source_label)} ↗</a>`:`<span class="story-evidence">${esc(e.source_label)}</span>`}</div>`;
 if(focus)tabs.children[i].focus();
}
entries.forEach((e,i)=>{const b=document.createElement('button');b.type='button';b.role='tab';b.id='journey-tab-'+i;b.setAttribute('aria-controls','journey-story');b.innerHTML=`<strong>${e[1]}</strong><span>${e[2]}</span>`;b.onclick=()=>select(i);b.onkeydown=ev=>{let n=i;if(ev.key==='ArrowRight')n=(i+1)%entries.length;else if(ev.key==='ArrowLeft')n=(i+entries.length-1)%entries.length;else if(ev.key==='Home')n=0;else if(ev.key==='End')n=entries.length-1;else return;ev.preventDefault();select(n,true)};tabs.appendChild(b)});select(0);
// Standard file links are easier to carry into a browser than script-created downloads.
for(const [id,url,label]of[['dl-json','record.json','Download JSON'],['dl-csv','record.csv','Download CSV']]){const b=document.getElementById(id);const a=document.createElement('a');a.href=url;a.download=url;a.textContent=label;b.replaceWith(a)}
const table=document.getElementById('table-disclosure');document.getElementById('q').addEventListener('input',ev=>{if(ev.target.value)table.open=true});
document.querySelectorAll('a[data-path]').forEach(a=>a.addEventListener('click',()=>{table.open=true}));
document.querySelector('#panel').addEventListener('click',ev=>{if(ev.target.closest('button[data-j]'))table.open=true});
window.addEventListener('beforeprint',()=>{table.dataset.wasOpen=String(table.open);table.open=true});window.addEventListener('afterprint',()=>{if(table.dataset.wasOpen==='false')table.open=false});
const progress=document.querySelector('.reading-progress');let queued=false;window.addEventListener('scroll',()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max?100*scrollY/max:0)+'%';queued=false})},{passive:true});
})();
