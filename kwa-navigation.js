// Keep main navigation consistent across the website.
(()=>{
 const links=document.querySelector('.kwa-header .kwa-links');if(!links)return;
 const pages=[['index.html','Home'],['about.html','About'],['authors.html','Authors'],['novels.html','Novels'],['book.html','Book Library'],['free-books.html','Free Books'],['articles.html','Articles'],['blog.html','Blog'],['lifestyle.html','Lifestyle'],['plays.html','Plays'],['poems.html','Poems'],['videos.html','Videos'],['stakeholders.html','Stakeholders'],['contact.html','Contact'],['settings.html','Settings']];
 const existing=new Map([...links.querySelectorAll('a')].map(a=>[a.getAttribute('href'),a]));
 const subscription=existing.get('subscriptions.html');links.replaceChildren();if(subscription)links.appendChild(subscription);
 for(const [url,label] of pages){const a=existing.get(url)||document.createElement('a');a.href=url;a.textContent=label;if((location.pathname.split('/').pop()||'index.html')===url)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');links.appendChild(a);}
})();

(()=>{
 const header=document.querySelector('.kwa-header');if(!header)return;
 const links=header.querySelector('.kwa-links'),button=header.querySelector('.kwa-menu');if(!links||!button)return;
 const rules=document.createElement('style');rules.textContent='.kwa-header .kwa-links.kwa-collapsed{display:none!important}';document.head.appendChild(rules);
 const current=location.pathname.split('/').pop()||'index.html';
 links.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===current)a.setAttribute('aria-current','page')});
 links.id=links.id||'kwa-navigation-links';button.setAttribute('aria-controls',links.id);
 function setOpen(open){links.classList.toggle('kwa-collapsed',!open);button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Hide navigation':'Show navigation');}
 const mobile=window.matchMedia('(max-width:700px)');
 setOpen(!mobile.matches);
 const handleViewport=()=>setOpen(!mobile.matches);
 if(mobile.addEventListener)mobile.addEventListener('change',handleViewport);
 else if(mobile.addListener)mobile.addListener(handleViewport);
 button.addEventListener('click',()=>setOpen(links.classList.contains('kwa-collapsed')));
 links.addEventListener('click',event=>{if(mobile.matches && event.target.closest('a'))setOpen(false);});
 document.addEventListener('click',event=>{if(mobile.matches && !header.contains(event.target))setOpen(false);});
 header.addEventListener('keydown',event=>{if(event.key==='Escape'&&!links.classList.contains('kwa-collapsed')){setOpen(false);button.focus();}});
})();

// Reader profile is shared by every page using this navigation.
(()=>{const style=document.createElement('link');style.rel='stylesheet';style.href='reader-profile.css?v=20261029';document.head.append(style);import('./reader-profile.js?v=20261030-admin').catch(()=>{/* Keep the sign-in link available if authentication cannot load. */});})();

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

import('./admin-tools.js?v=20261030').catch(()=>{});
import('./page-content.js?v=20261030').catch(()=>{});

