import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAKaLTYuCZ-tluNougbSO9ZSnnsJgdun0w",
  authDomain: "jagga-reddy-official.firebaseapp.com",
  projectId: "jagga-reddy-official",
  storageBucket: "jagga-reddy-official.firebasestorage.app",
  messagingSenderId: "837408829938",
  appId: "1:837408829938:web:f95a4002868ddf3afefb6b",
  measurementId: "G-DZPNFE46GS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
export const db = getFirestore(app);

// Analytics
// export const analytics = getAnalytics(app);

export default app;