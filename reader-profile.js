import {auth} from './firebase-config.js';
import {onAuthStateChanged,signOut} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js';

const actions=document.querySelector('.kwa-header .kwa-actions');
if(actions){
  const login=actions.querySelector('.kwa-login');
  const root=document.createElement('div');
  root.className='kwa-reader-profile';root.hidden=true;
  const trigger=document.createElement('button');
  trigger.type='button';trigger.className='kwa-avatar-button';
  trigger.setAttribute('aria-label','Open account menu');
  trigger.setAttribute('aria-expanded','false');
  trigger.setAttribute('aria-controls','kwa-account-panel');
  const fallback=document.createElement('span');
  fallback.className='kwa-avatar-fallback';fallback.setAttribute('aria-hidden','true');
  const photo=document.createElement('img');photo.alt='';photo.hidden=true;
  photo.referrerPolicy='no-referrer';
  trigger.append(fallback,photo);
  const panel=document.createElement('div');
  panel.id='kwa-account-panel';panel.className='kwa-account-panel';panel.hidden=true;
  const heading=document.createElement('strong');heading.textContent='Your account';
  panel.append(heading);
  for(const [label,url] of [['Account settings','settings.html#profile'],['Reading preferences','settings.html#reading'],['My writing','add-story.html']]){
    const link=document.createElement('a');link.textContent=label;link.href=url;panel.append(link);
  }
  const logout=document.createElement('button');logout.type='button';logout.textContent='Sign out';
  const status=document.createElement('p');status.className='kwa-account-status';status.setAttribute('role','status');
  panel.append(logout,status);root.append(trigger,panel);actions.append(root);
  function close(restoreFocus=false){panel.hidden=true;trigger.setAttribute('aria-expanded','false');if(restoreFocus)trigger.focus();}
  trigger.addEventListener('click',()=>{const open=panel.hidden;panel.hidden=!open;trigger.setAttribute('aria-expanded',String(open));});
  root.addEventListener('keydown',e=>{if(e.key==='Escape'){close(true);e.preventDefault();}});
  document.addEventListener('click',e=>{if(!root.contains(e.target))close();});
  document.addEventListener('focusin',e=>{if(!root.contains(e.target))close();});
  function render(user){
    close();status.textContent='';root.hidden=!user;if(login)login.hidden=!!user;
    photo.hidden=true;photo.removeAttribute('src');fallback.hidden=false;
    if(!user)return;
    let showPhoto=true;
    try{showPhoto=JSON.parse(localStorage.getItem('kitsambaReaderSettings')||'{}').showProfilePicture!==false;}catch{}
    if(user.photoURL&&showPhoto){try{const url=new URL(user.photoURL);if(url.protocol==='https:')photo.src=url.href;}catch{}}
  }
  photo.addEventListener('load',()=>{if(auth.currentUser&&photo.getAttribute('src')){photo.hidden=false;fallback.hidden=true;}});
  photo.addEventListener('error',()=>{photo.hidden=true;fallback.hidden=false;});
  onAuthStateChanged(auth,render);
  window.addEventListener('kwa-profile-updated',()=>render(auth.currentUser));
  window.addEventListener('storage',e=>{if(e.key==='kitsambaReaderSettings')render(auth.currentUser);});
  logout.addEventListener('click',async()=>{
    logout.disabled=true;status.textContent='Signing out…';
    try{await signOut(auth);close();login?.focus();}catch{status.textContent='Could not sign out. Please try again.';}finally{logout.disabled=false;}
  });
}
