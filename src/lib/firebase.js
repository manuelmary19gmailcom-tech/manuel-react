import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

<<<<<<< HEAD

=======
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
const firebaseConfig = {
  apiKey: "AIzaSyBjI0cBH5XelKKyPPp0LB8MRD4s8D_2rsM",
  authDomain: "shepered-of-my-soul.firebaseapp.com",
  projectId: "shepered-of-my-soul",
  storageBucket: "shepered-of-my-soul.firebasestorage.app",
  messagingSenderId: "1073683816450",
  appId: "1:1073683816450:web:013dbbede962e8d6a2471b",
  measurementId: "G-NTJK4E0JE5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

<<<<<<< HEAD
googleProvider.setCustomParameters({ prompt: "select_account" });

export default app;
=======
<<<<<<< HEAD
googleProvider.setCustomParameters({
  prompt: "select_account",
});

=======
>>>>>>> 49776bdd37be26ff71f38f5cef997f5b3c554a80
export default app;
>>>>>>> 5358b86567950126d24d4b2790fb5e856e46e46f
