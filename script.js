const header=document.querySelector('.site-header'),menuToggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.site-nav'),navLinks=document.querySelectorAll('.site-nav a'),reveals=document.querySelectorAll('.reveal'),counters=document.querySelectorAll('[data-count]'),year=document.querySelector('#year');
function updateHeader(){header.classList.toggle('scrolled',window.scrollY>30)}window.addEventListener('scroll',updateHeader);updateHeader();
menuToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');document.body.classList.toggle('menu-open',open);menuToggle.setAttribute('aria-expanded',open)});
navLinks.forEach(l=>l.addEventListener('click',()=>{nav.classList.remove('open');document.body.classList.remove('menu-open');menuToggle?.setAttribute('aria-expanded','false')}));
const ro=new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}}),{threshold:.12});reveals.forEach(e=>ro.observe(e));
function animate(el){const target=Number(el.dataset.count),prefix=el.dataset.prefix||'',suffix=el.dataset.suffix||'',start=performance.now(),duration=1300;function step(now){const p=Math.min((now-start)/duration,1),ease=1-Math.pow(1-p,3);el.textContent=`${prefix}${Math.floor(ease*target)}${suffix}`;if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)}
const co=new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){animate(e.target);o.unobserve(e.target)}}),{threshold:.5});counters.forEach(e=>co.observe(e));if(year)year.textContent=new Date().getFullYear();

// Keep slideshow animation from running while the page is hidden.
document.addEventListener("visibilitychange",()=>{const s=document.querySelector(".hero-slideshow");if(s)s.style.animationPlayState=document.hidden?"paused":"running"});


// Shared Get Involved dropdown behavior.
const navDropdown=document.querySelector('.nav-dropdown');
const dropdownToggle=document.querySelector('.nav-dropdown-toggle');
function setDropdown(open){
  if(!navDropdown||!dropdownToggle)return;
  navDropdown.classList.toggle('open',open);
  dropdownToggle.setAttribute('aria-expanded',String(open));
}
dropdownToggle?.addEventListener('click',(event)=>{
  event.stopPropagation();
  setDropdown(!navDropdown.classList.contains('open'));
});
document.addEventListener('click',(event)=>{
  if(navDropdown&&!navDropdown.contains(event.target))setDropdown(false);
});
document.addEventListener('keydown',(event)=>{
  if(event.key==='Escape'){
    setDropdown(false);
    nav?.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded','false');
  }
});
window.addEventListener('resize',()=>{
  if(window.innerWidth>760){
    nav?.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded','false');
  }
});
