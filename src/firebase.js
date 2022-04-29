import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKaLGmhrzQ_sVgTP1b1Xk-aU4XJvUd1qo",
  authDomain: "imagegram-6ab21.firebaseapp.com",
  projectId: "imagegram-6ab21",
  storageBucket: "imagegram-6ab21.appspot.com",
  messagingSenderId: "355688405644",
  appId: "1:355688405644:web:2439adb0a6fbb107e839a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);