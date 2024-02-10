import { User } from 'firebase/auth';
import { createContext, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { auth } from '../firebase/firebase';

export const AuthContext = createContext<{
	currentUser: User | null;
}>({
	currentUser: null, // Initial state for currentUser
});
interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	console.log(currentUser);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthProvider;
