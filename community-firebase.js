// Shared Firebase project for login and community publishing.
import {app,auth,db} from './firebase-config.js';
export {auth,db};
export const routes={novel:'novels.html',play:'plays.html',poem:'poems.html'};
export function cloudRequest(request,milliseconds=12000){let timer;return Promise.race([request,new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('cloud-timeout')),milliseconds)})]).finally(()=>clearTimeout(timer))}
