import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBjI0cBH5XelKKyPPp0LB8MRD4s8D_2rsM",
  authDomain: "shepered-of-my-soul.firebaseapp.com",
  projectId: "shepered-of-my-soul",
  storageBucket: "shepered-of-my-soul.firebasestorage.app",
  messagingSenderId: "1073638316450",
  appId: "1:1073638316450:web:013dbde962e8d6a2471b",
  measurementId: "G-NTJK4E0JE5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export default app;