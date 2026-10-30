import {db} from './firebase-config.js';
import {doc,getDoc} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js';
import {cloudRequest} from './community-firebase.js';
import {safeURL} from './admin-data.js';
const path=location.pathname.split('/').pop()||'index.html';
if(document.querySelector('[data-page-field]')){
 try{
  const snap=await cloudRequest(getDoc(doc(db,'publicPages',path.replace(/\.html$/,''))));
  if(snap.exists()&&snap.data().version===1){
   const edits=JSON.parse(snap.data().editsJson);
   for(const node of document.querySelectorAll('[data-page-field]')){
    const key=node.dataset.pageField,value=edits[key];
    if(typeof value==='string'&&value.length<=10000){
     if(node.tagName==='IMG'){try{node.src=safeURL(value);}catch{}}
     else node.textContent=value;
    }
    if(node.tagName==='A'&&typeof edits[key+'-url']==='string'){try{node.href=safeURL(edits[key+'-url']);}catch{}}
   }
  }
 }catch{/* Retain original content when cloud data is unavailable. */}
}
