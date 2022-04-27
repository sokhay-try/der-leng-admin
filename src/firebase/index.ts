import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEPHOgI_XnH4E0MwkUUeUeVbWcK_EPoao",
  authDomain: "der-leng-a6678.firebaseapp.com",
  projectId: "der-leng-a6678",
  storageBucket: "der-leng-a6678.appspot.com",
  messagingSenderId: "127705668849",
  appId: "1:127705668849:web:6a9c544a923c9567dadd50",
  measurementId: "G-PPYSB99W6K",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
