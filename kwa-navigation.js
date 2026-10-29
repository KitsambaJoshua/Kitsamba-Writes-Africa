(()=>{
 const header=document.querySelector('.kwa-header');if(!header)return;
 const links=header.querySelector('.kwa-links'),button=header.querySelector('.kwa-menu');if(!links||!button)return;
 const rules=document.createElement('style');rules.textContent='.kwa-header .kwa-links.kwa-collapsed{display:none!important}';document.head.appendChild(rules);
 const current=location.pathname.split('/').pop()||'index.html';
 links.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===current)a.setAttribute('aria-current','page')});
 links.id=links.id||'kwa-navigation-links';button.setAttribute('aria-controls',links.id);
 function setOpen(open){links.classList.toggle('kwa-collapsed',!open);button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Hide navigation':'Show navigation');}
 setOpen(!window.matchMedia('(max-width:700px)').matches);
 button.addEventListener('click',()=>setOpen(links.classList.contains('kwa-collapsed')));
 header.addEventListener('keydown',event=>{if(event.key==='Escape'&&!links.classList.contains('kwa-collapsed')){setOpen(false);button.focus();}});
})();

// Reader profile is shared by every page using this navigation.
(()=>{const style=document.createElement('link');style.rel='stylesheet';style.href='reader-profile.css?v=20261029';document.head.append(style);import('./reader-profile.js?v=20261029').catch(()=>{/* Keep the sign-in link available if authentication cannot load. */});})();

// Membership action sits at the right edge, separate from the header.
(()=>{
 const sheet=document.createElement('link');sheet.rel='stylesheet';sheet.href='floating-membership.css?v=20261029';document.head.appendChild(sheet);
 const existing=[...document.querySelectorAll('.kwa-header .kwa-subscribe-link')];
 const onPlans=location.pathname.split('/').pop()==='subscriptions.html';
 if(onPlans){for(const link of existing)link.hidden=true;return;}
 const box=document.createElement('div');box.className='kwa-floating-subscription';
 const caption=document.createElement('span');caption.textContent='Join our readers';
 const link=existing.shift()||document.createElement('a');link.href='subscriptions.html';link.textContent='Subscribe →';link.className='kwa-subscribe-link';link.setAttribute('aria-label','View subscription plans');
 for(const duplicate of existing)duplicate.remove();
 box.append(caption,link);document.body.appendChild(box);
})();
