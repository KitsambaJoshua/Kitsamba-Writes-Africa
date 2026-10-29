(()=>{const header=document.querySelector('.kwa-header');if(!header)return;const links=header.querySelector('.kwa-links'),button=header.querySelector('.kwa-menu');const current=location.pathname.split('/').pop()||'index.html';links.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===current)a.setAttribute('aria-current','page')});button.addEventListener('click',()=>{links.classList.toggle('kwa-collapsed');button.setAttribute('aria-expanded',String(!links.classList.contains('kwa-collapsed')))});})();

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
