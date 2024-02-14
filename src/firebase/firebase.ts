import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.VITE_API_KEY,
	authDomain: process.env.VITE_AUTH_DOMAIN,
	projectId: process.env.VITE_PROJECT_ID,
	storageBucket: process.env.VITE_STORAGE_BUCKET,
	messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
	appId: process.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const handleLogin = (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const handleSignIn = (email: string, password: string) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
	return signOut(auth);
};
