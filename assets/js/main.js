
(function(){
  const c=window.SITE_CONTENT;
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const nav=[['index.html','Home'],['services.html','Services'],['ongoing-operations.html','Ongoing Operations'],['website-analysis.html','Website Analysis'],['growth-roadmap.html','Growth Roadmap'],['about.html','About'],['contact.html','Contact']];
  const header=document.querySelector('[data-site-header]');
  if(header){header.innerHTML=`<a class="skip-link" href="#main">Skip to main content</a><header class="site-header"><div class="container header-inner"><a class="brand" href="index.html" aria-label="${c.businessName} home"><img src="${c.images.logo}" alt="${c.businessName}, ${c.title}"></a><button class="nav-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="Open navigation">☰</button><nav id="main-nav" class="main-nav" aria-label="Primary navigation">${nav.map(([href,label])=>`<a href="${href}" ${path===href?'aria-current="page"':''}>${label}</a>`).join('')}</nav><a class="btn header-cta schedule-link" href="${c.schedulingUrl}">Book a Discovery Call</a></div></header>`;}
  const footer=document.querySelector('[data-site-footer]');
  if(footer){footer.innerHTML=`<footer class="site-footer"><div class="container footer-top"><div class="footer-brand"><img src="${c.images.logo}" alt="${c.businessName}"><p>I help small business owners create structure behind the scenes so they can lead with confidence and grow with clarity.</p></div><nav class="footer-links" aria-label="Footer navigation"><strong>Quick Links</strong>${nav.filter(x=>!x[1].includes('Ongoing')).map(([h,l])=>`<a href="${h}">${l}</a>`).join('')}</nav><div class="footer-cta"><h3>Ready for greater clarity behind your business?</h3><p>Schedule a discovery call to talk about your business and the support that is right for you.</p><a class="btn schedule-link" href="${c.schedulingUrl}">Book a Discovery Call</a></div></div><div class="container footer-bottom"><span>© <span data-year></span> ${c.businessName} | ${c.title}</span><span class="footer-legal"><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms &amp; Conditions</a><a href="accessibility.html">Accessibility</a></span></div></footer>`;}
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  document.querySelectorAll('[data-image]').forEach(el=>{const key=el.dataset.image;if(c.images[key])el.src=c.images[key]});
  document.querySelectorAll('.schedule-link').forEach(el=>{el.href=c.schedulingUrl;if(c.schedulingUrl.startsWith('#ADD')){el.addEventListener('click',e=>{e.preventDefault();alert('Add the Cal.com URL in assets/js/site-content.js.');});}});
  const toggle=document.querySelector('.nav-toggle'), menu=document.querySelector('.main-nav');
  if(toggle&&menu){toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰';});}
  const io='IntersectionObserver'in window?new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12}):null;
  document.querySelectorAll('.reveal').forEach(el=>io?io.observe(el):el.classList.add('visible'));
  const form=document.querySelector('[data-contact-form]');
  if(form){form.action=c.formAction;form.addEventListener('submit',e=>{if(c.formAction.startsWith('#ADD')){e.preventDefault();const status=form.querySelector('.form-status');status.textContent='The form endpoint still needs to be added in assets/js/site-content.js.';status.focus();}});}
})();
