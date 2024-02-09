import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
    apiKey: "AIzaSyDeZG8OR3eqm9jWyrj3eDO2PHSCwkyX7Y",
    authDomain: "signcraft2024.firebaseapp.com",
    projectId: "signcraft2024",
    storageBucket: "signcraft2024.appspot.com",
    messagingSenderId: "85636588826",
    appId: "1:85636588826:web:696d744086d77ba1d2b8a3",
    measurementId: "G-45507LSY73"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage(app);

  const logOut = () => {
    signOut(auth);
  };
  
  export { auth, logOut }; 