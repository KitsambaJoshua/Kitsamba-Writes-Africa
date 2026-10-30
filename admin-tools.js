import {subscribeAdmin} from './admin-session.js';
const header=document.querySelector('.kwa-header');
if(header){
 const bar=document.createElement('div');bar.className='kwa-admin-tools';bar.hidden=true;
 const badge=document.createElement('strong');badge.textContent='Admin';bar.append(badge);
 const page=(location.pathname.split('/').pop()||'index.html').replace(/\.html$/,'');
 const editablePages=new Set(['about','articles','authors','blog','contact','free-books','index','lifestyle','novels','plays','poems','stakeholders','subscriptions','support-payments','videos','silence-at-2pm','streets-of-fate','when-our-hearts-learned-silence']);
 const editHref=editablePages.has(page)?'admin.html?section=pages&page='+encodeURIComponent(page):'admin.html?section=books';
 for(const [label,href] of [['Dashboard','admin.html'],[editablePages.has(page)?'Edit this page':'Manage content',editHref],['Add a Story','add-story.html'],['Books, poems & plays','admin.html?section=books'],['Stakeholders','admin.html?section=people'],['Approvals','admin.html?section=approvals']]){
  const link=document.createElement('a');link.textContent=label;link.href=href;bar.append(link);
 }
 const css=document.createElement('link');css.rel='stylesheet';css.href='admin-tools.css?v=20261030';document.head.append(css);
 header.after(bar);
 subscribeAdmin(state=>{bar.hidden=!state.isAdmin;document.documentElement.classList.toggle('kwa-admin-session',state.isAdmin);});
}
