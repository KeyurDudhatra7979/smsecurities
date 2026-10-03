const menu=document.querySelector('.menu'),links=document.querySelector('.links');
menu?.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open);document.body.classList.toggle('menu-open',open)});
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}));
document.getElementById('year').textContent=new Date().getFullYear();
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -30px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const header=document.querySelector('.header'),progress=document.querySelector('.page-progress span');
const onScroll=()=>{header?.classList.toggle('scrolled',scrollY>20);const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%'};
addEventListener('scroll',onScroll,{passive:true});onScroll();
// All counters in a visible section start together and count smoothly to their own targets.
const format=n=>Math.round(n).toLocaleString('en-IN');
function animateCounter(el,duration=1500){const target=Number(el.dataset.target)||0;if(reduceMotion){el.textContent=format(target);return}const start=performance.now();const tick=now=>{const p=Math.min(1,(now-start)/duration),eased=1-Math.pow(1-p,4);el.textContent=format(target*eased);if(p<1)requestAnimationFrame(tick);else el.textContent=format(target)};requestAnimationFrame(tick)}
const counterGroups=new Set([...document.querySelectorAll('.counter')].map(el=>el.closest('section')||el.parentElement));
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.querySelectorAll('.counter').forEach(el=>{if(!el.dataset.ran){el.dataset.ran='1';animateCounter(el)}});counterObserver.unobserve(entry.target)}}),{threshold:.25});
counterGroups.forEach(group=>counterObserver.observe(group));
// Active navigation follows the section currently in view.
const navLinks=[...document.querySelectorAll('.links a[href^="#"]')];
const sectionMap=new Map(navLinks.map(a=>[a.getAttribute('href').slice(1),a]));
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.classList.remove('active'));sectionMap.get(e.target.id)?.classList.add('active')}})},{rootMargin:'-35% 0px -55% 0px',threshold:0});
document.querySelectorAll('main section[id]').forEach(s=>sectionObserver.observe(s));
// Better validation + WhatsApp handoff.
const form=document.getElementById('enquiryForm');
form?.querySelectorAll('input[required]').forEach(input=>{const err=document.createElement('div');err.className='field-error';err.textContent=input.name==='phone'?'Enter a valid 10-digit Indian mobile number.':'Please complete this field.';input.insertAdjacentElement('afterend',err);input.addEventListener('input',()=>input.closest('label').classList.toggle('has-error',!input.validity.valid&&input.value.length>0))});
form?.addEventListener('submit',e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();form.querySelectorAll('input[required]').forEach(i=>i.closest('label').classList.toggle('has-error',!i.validity.valid));return}const data=new FormData(form),text=`Hello S.M. Securities,\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nInterested in: ${data.get('interest')}\nMessage: ${data.get('message')||''}`;window.open(`https://wa.me/919033720298?text=${encodeURIComponent(text)}`,'_blank','noopener');form.querySelector('.formStatus').textContent='Your enquiry is ready in WhatsApp. Please send the message to complete it.'});
// Small grouped stagger only for non-numeric cards; counters themselves always run together.
document.querySelectorAll('.serviceGrid,.processGrid,.principles,.trustCards,.whyGrid,.teamCards').forEach(group=>[...group.children].forEach((item,index)=>item.style.transitionDelay=`${Math.min(index*55,180)}ms`));
