import {auth,db} from './firebase-config.js';
import {onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js';
import {doc,getDocFromServer} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js';
import {cloudRequest} from './community-firebase.js';

let state={user:null,isAdmin:false,error:null};
const listeners=new Set();
function notify(){for(const listener of listeners)listener(state);}
export function subscribeAdmin(listener){listeners.add(listener);listener(state);return ()=>listeners.delete(listener);}
export async function verifyAdmin(user=auth.currentUser){
 if(!user)return false;
 const role=await cloudRequest(getDocFromServer(doc(db,'siteAdmins',user.uid)),15000);
 return auth.currentUser?.uid===user.uid&&!role.metadata.fromCache&&role.exists()&&role.data().enabled===true;
}
onAuthStateChanged(auth,async user=>{
 state={user,isAdmin:false,error:null};notify();
 if(!user)return;
 try{const isAdmin=await verifyAdmin(user);if(auth.currentUser?.uid!==user.uid)return;state={user,isAdmin,error:null};}
 catch(error){if(auth.currentUser?.uid!==user.uid)return;state={user,isAdmin:false,error:error.code||error.message};}
 notify();
});
