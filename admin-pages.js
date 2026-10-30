import {auth,db} from './firebase-config.js';
import {doc,getDocFromServer,setDoc,serverTimestamp} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js';
import {subscribeAdmin,verifyAdmin} from './admin-session.js';
import {cloudRequest} from './community-firebase.js';
import {safeURL} from './admin-data.js';
const select=document.getElementById('admin-page-select'),fields=document.getElementById('admin-page-fields'),status=document.getElementById('admin-page-status'),form=document.getElementById('admin-page-form'),search=document.getElementById('admin-page-search');
let pages=[],selected=null,edits={},activeUid=null,version=0;
function clear(){version++;pages=[];selected=null;edits={};select.replaceChildren();fields.replaceChildren();form.hidden=true;}
function filter(){const term=search.value.trim().toLowerCase();for(const row of fields.children)row.hidden=!row.textContent.toLowerCase().includes(term)&&!row.querySelector('textarea,input').value.toLowerCase().includes(term);}
async function loadPage(){
 const ticket=++version,uid=activeUid;
 selected=pages.find(p=>p.id===select.value);fields.replaceChildren();edits={};form.hidden=true;if(!selected)return;
 status.textContent='Loading page content…';
 try{
  const snap=await cloudRequest(getDocFromServer(doc(db,'publicPages',selected.id)));
  if(ticket!==version||auth.currentUser?.uid!==uid)return;
  if(snap.exists())edits=JSON.parse(snap.data().editsJson||'{}');
  for(const field of selected.fields){
   const row=document.createElement('div'),label=document.createElement('label');label.textContent=field.label;
   const input=document.createElement(field.kind==='text'?'textarea':'input');input.id='edit-'+field.key;input.dataset.field=field.key;input.maxLength=field.kind==='text'?10000:2000;
   if(field.kind==='text')input.rows=field.value.length>160?4:2;
   input.value=typeof edits[field.key]==='string'?edits[field.key]:field.value;
   label.htmlFor=input.id;row.append(label,input);fields.append(row);
  }
  search.value='';form.hidden=false;status.textContent='Edit text, image paths and links, then publish your changes.';
 }catch(error){if(ticket===version)status.textContent='Could not load page editing: '+(error.code||error.message)+'. Publish the updated Firestore rules in '+db.app.options.projectId+'.';}
}
select.addEventListener('change',()=>{if(form.dataset.dirty==='true'&&!confirm('Discard unsaved changes and open another page?')){select.value=selected.id;return;}form.dataset.dirty='false';loadPage();});
search.addEventListener('input',filter);form.addEventListener('input',event=>{if(event.target.dataset.field)form.dataset.dirty='true';});
form.addEventListener('submit',async event=>{
 event.preventDefault();const user=auth.currentUser,page=selected;if(!user||!page)return;
 const button=document.getElementById('admin-page-publish');button.disabled=true;status.textContent='Publishing page…';
 try{
  if(!await verifyAdmin(user))throw Error('Administrator access is required.');
  const updated={};
  for(const field of page.fields){const value=fields.querySelector('[data-field="'+field.key+'"]').value;if(value!==field.value){if(field.kind!=='text')safeURL(value);updated[field.key]=value;}}
  const editsJson=JSON.stringify(updated);if(new TextEncoder().encode(editsJson).length>150000)throw Error('This update is too large. Publish fewer changes at a time.');
  await cloudRequest(setDoc(doc(db,'publicPages',page.id),{id:page.id,version:1,editsJson,updatedAt:serverTimestamp()}),15000);
  if(auth.currentUser?.uid!==user.uid)return;
  edits=updated;form.dataset.dirty='false';status.textContent='Page published. Refresh the public page to see your changes.';
 }catch(error){status.textContent='Publishing failed: '+(error.code||error.message)+'. Your edits remain in this form.';}finally{button.disabled=false;}
});
subscribeAdmin(async state=>{
 if(!state.isAdmin){activeUid=null;clear();return;}
 if(activeUid===state.user.uid)return;activeUid=state.user.uid;const uid=activeUid;
 try{
  const response=await fetch('admin-page-catalog.json?v=20261030',{cache:'no-store'});if(!response.ok)throw Error('Page catalogue could not load.');
  const catalogue=await response.json();if(activeUid!==uid||auth.currentUser?.uid!==uid)return;pages=catalogue;
  for(const page of pages){const option=document.createElement('option');option.value=page.id;option.textContent=page.title;select.append(option);}
  const requested=new URLSearchParams(location.search).get('page');if(pages.some(p=>p.id===requested))select.value=requested;
  await loadPage();
 }catch(error){status.textContent=error.message;}
});
