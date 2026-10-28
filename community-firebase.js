import {initializeApp,getApps} from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js';
import {getAuth} from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js';
import {getFirestore} from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js';
const config={apiKey:'AIzaSyCEQNYqNKCL2uZSenJlv8AO60fNh31F5fg',authDomain:'kitsamba-writes-africa.firebaseapp.com',projectId:'kitsamba-writes-africa',storageBucket:'kitsamba-writes-africa.firebasestorage.app',messagingSenderId:'345094514691',appId:'1:345094514691:web:11ad3be96e1cc312f04636'};
const app=getApps()[0]||initializeApp(config);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const routes={novel:'novels.html',play:'plays.html',poem:'poems.html'};
