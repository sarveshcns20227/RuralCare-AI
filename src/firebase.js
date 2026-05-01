import { initializeApp } from "firebase/app";

import { 
  getFirestore 
} from "firebase/firestore";

import {
  getAuth
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdcylKVBCjf0g-zk8-cBGQSKbMj79egJc",
  authDomain: "ruralcare-ai-e1c0d.firebaseapp.com",
  projectId: "ruralcare-ai-e1c0d",
  storageBucket: "ruralcare-ai-e1c0d.firebasestorage.app",
  messagingSenderId: "755166931239",
  appId: "1:755166931239:web:7452a1936d773492146102"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);