"use strict";
/* Site estático: interações formativas exclusivamente locais, sem transmissão ou nota. */
const $=id=>document.getElementById(id);
function buildNavigation(){
 const cenas=[...document.querySelectorAll('.cena')];
 const sel=$('irpara'),toggle=$('btnAula'),counter=$('contador');
 if(!sel||!toggle||!counter)return;
 cenas.forEach((c,i)=>{const o=document.createElement('option');o.value=c.id;o.textContent=`${i+1}. ${c.dataset.nome||c.querySelector('h2')?.textContent||'Seção'}`;sel.appendChild(o);});
 let aula=false,atual=0;
 function mostrar(i){atual=Math.max(0,Math.min(cenas.length-1,i));cenas.forEach((c,j)=>c.classList.toggle('atual',j===atual));counter.textContent=`${atual+1} / ${cenas.length}`;sel.value=cenas[atual].id;window.scrollTo(0,0);}
 function visibleIndex(){let best=0;cenas.forEach((c,i)=>{if(c.getBoundingClientRect().top<window.innerHeight*.42)best=i;});return best;}
 sel.addEventListener('change',()=>{const i=cenas.findIndex(c=>c.id===sel.value);if(i<0)return;aula?mostrar(i):cenas[i].scrollIntoView({behavior:'smooth'});});
 toggle.addEventListener('click',()=>{aula=!aula;const idx=aula?visibleIndex():0;document.body.classList.toggle('aula',aula);document.documentElement.classList.toggle('aula',aula);toggle.setAttribute('aria-pressed',String(aula));toggle.textContent=aula?'Sair do modo aula':'Modo aula';if(aula)mostrar(idx);else{cenas.forEach(c=>c.classList.remove('atual'));cenas[atual].scrollIntoView({block:'start'});if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});}});
 $('antes').addEventListener('click',()=>mostrar(atual-1));$('depois').addEventListener('click',()=>mostrar(atual+1));
 $('cheia').addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});else document.documentElement.requestFullscreen?.().catch(()=>{});});
 document.addEventListener('keydown',e=>{if(!aula||e.target.closest('input,textarea,select,button,[contenteditable]'))return; if(['ArrowRight','PageDown'].includes(e.key)){e.preventDefault();mostrar(atual+1);}else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();mostrar(atual-1);}else if(e.key==='Escape')toggle.click();});
 if('IntersectionObserver'in window){const obs=new IntersectionObserver(entries=>{if(aula)return;entries.forEach(entry=>{if(entry.isIntersecting)sel.value=entry.target.id;});},{rootMargin:'-35% 0px -50% 0px'});cenas.forEach(c=>obs.observe(c));}
 document.addEventListener('click',e=>{
  const link=e.target.closest('a[href^="#"]');
  if(!link)return;
  const fragment=decodeURIComponent(link.getAttribute('href').slice(1));
  if(!fragment)return;
  const target=document.getElementById(fragment);
  if(!target)return;
  const scene=target.closest('.cena');
  if(!scene)return;
  if(aula){
    const i=cenas.indexOf(scene);if(i<0)return;
    e.preventDefault();mostrar(i);
    // Internal references can point to an element inside the displayed scene.
    if(scene!==target)target.scrollIntoView({block:'start',behavior:'smooth'});
  }
 });
 const hash=decodeURIComponent(location.hash.replace('#',''));if(hash){const node=$(hash);if(node)setTimeout(()=>node.scrollIntoView({block:'start'}),100);}
}
function bindQuizzes(){
 document.querySelectorAll('.quiz').forEach(box=>{
  let answer=null;const choices=[...box.querySelectorAll('.choice')];const feedback=box.querySelector('.feedback');const btn=box.querySelector('.check-answer');
  choices.forEach(choice=>choice.addEventListener('click',()=>{answer=choice.dataset.value;choices.forEach(b=>b.setAttribute('aria-pressed',b===choice?'true':'false'));btn.disabled=false;feedback.innerHTML='';feedback.removeAttribute('data-state');}));
  btn.addEventListener('click',()=>{if(answer===null)return;const ok=answer===box.dataset.correct;feedback.dataset.state=ok?'correct':'incorrect';const lead=document.createElement('strong');lead.textContent=ok?'Correto. ':'Vamos revisar. ';const text=document.createElement('span');text.textContent=box.dataset.explanation;feedback.replaceChildren(lead,text);});
  box.querySelector('.reset-answer')?.addEventListener('click',()=>{answer=null;choices.forEach(b=>b.setAttribute('aria-pressed','false'));btn.disabled=true;feedback.innerHTML='';feedback.removeAttribute('data-state');});
 });
}
function bindJournals(){
 document.querySelectorAll('[data-journal]').forEach(item=>{
   const field=item.querySelector('textarea'),copiar=item.querySelector('[data-copy]'),limpar=item.querySelector('[data-clear]'),msg=item.querySelector('[role="status"]');
   copiar?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(field.value);msg.textContent='Texto copiado. Cole em suas anotações, se desejar.';}catch(e){field.select();msg.textContent='Selecione e copie o texto manualmente.';}});
   limpar?.addEventListener('click',()=>{field.value='';msg.textContent='Rascunho limpo.';});
 });
}
function setCourseLinks(){
 const config=window.CIBERSAST_CONFIG||{};
 document.querySelectorAll('[data-target]').forEach(anchor=>{
  const key=anchor.dataset.target;
  const href=String(config[key]||'').trim();
  if(/^https:\/\/[^\s]+$/i.test(href)){
    anchor.href=href;anchor.target='_blank';anchor.rel='noopener noreferrer';
    anchor.classList.remove('place-link');anchor.removeAttribute('aria-disabled');
    anchor.removeAttribute('title');return;
  }
  const notice=document.createElement('span');
  notice.className='pending-destination';
  notice.textContent=key.startsWith('moodle')
    ?'Link do Moodle ainda não configurado; consulte o ambiente institucional.'
    :'Link externo do GitHub ainda não configurado.';
  anchor.replaceWith(notice);
 });
}
function initialize(){setCourseLinks();buildNavigation();bindQuizzes();bindJournals();}
document.addEventListener('DOMContentLoaded',initialize);
