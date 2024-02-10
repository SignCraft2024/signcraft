import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const handleLogin = (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const handleSignIn = (email: string, password: string) => {
	return createUserWithEmailAndPassword(auth, email, password);
};
