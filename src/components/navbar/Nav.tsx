import { useState } from 'react';
import { Navbar, Nav, Image, Button, Modal } from 'react-bootstrap';
import '../../styles/nav.css';
import logo from '../../assets/logo.png';
import {auth} from '../../firebase-config';

interface User {
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
			auth.signOut();
			setUser(null);
		}
	};

	const handleCloseUserModal = () => {
		setUser(null);
	};

	const handleFetchUserInfo = async () => {
		try {
			const currentUser = auth.currentUser;
			if (currentUser) {
				const userInfo: User = {
					fullName: currentUser.displayName || '',
					email: currentUser.email || '',
				};
				setUser(userInfo);
			} else {
				console.error('No user is currently signed in');
				setUser(null);
			}
		} catch (error) {
			console.error('Error fetching user info:', error);
			setUser(null);
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
