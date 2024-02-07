import { useState } from 'react';
import { Navbar, Nav, Image, Button, Modal } from 'react-bootstrap';
import '../../styles/nav.css';
import logo from '../../assets/logo.png';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

const firebaseConfig = {
	//configuration Firebase
};

firebase.initializeApp(firebaseConfig);

const getUserInfoFromFirebase = async (): Promise<User | null> => {
	try {
		const currentUser = firebase.auth().currentUser;
		if (currentUser) {
			const userInfo: User = {
				photoUrl: currentUser.photoURL || '',
				fullName: currentUser.displayName || '',
				email: currentUser.email || '',
			};
			return userInfo;
		} else {
			console.error('No user is currently signed in');
			return null;
		}
	} catch (error) {
		console.error('Error fetching user info:', error);
		return null;
	}
};

interface User {
	photoUrl: string;
	fullName: string;
	email: string;
}

const UserModal: React.FC<{ user: User | null; onClose: () => void }> = ({
	user,
	onClose,
}) => {
	return (
		<Modal show={!!user} onHide={onClose} centered>
			<Modal.Header closeButton>User info</Modal.Header>
			<Modal.Body>
				<p>Full: {user?.fullName}</p>
				<p>Email: {user?.email}</p>
			</Modal.Body>
		</Modal>
	);
};

const NavBar: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);

	const handleLogout = () => {
		const confirmLogout = window.confirm(
			'Are you sure you want to disconnect?',
		);
		if (confirmLogout) {
			setUser(null);
		}
	};

	const handleCloseUserModal = () => {
		setUser(null);
	};

	const handleFetchUserInfo = async () => {
		const userInfo = await getUserInfoFromFirebase();
		if (userInfo) {
			setUser(userInfo);
		}
	};

	return (
		<>
			<Navbar bg="light" expand="lg" className="d-flex justify-content-between">
				<Navbar.Brand className="d-flex align-items-center">
					<Image src={logo} alt="Logo" />
					<span className="brand-text mr-2">SIGN CRAFT</span>
				</Navbar.Brand>

				<Nav>
					<Button variant="link" onClick={handleFetchUserInfo}>
						<i className="bi bi-person-circle fs-4"></i>
					</Button>
					<Button variant="link" onClick={handleLogout}>
						<i className="bi bi-box-arrow-right fs-4"></i>
					</Button>
				</Nav>
			</Navbar>

			<UserModal user={user} onClose={handleCloseUserModal} />
		</>
	);
};

export default NavBar;
