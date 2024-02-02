import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import UserProfileInfo from './UserProfileInfo';

const ProfilePage: React.FC = () => {
	const [user, setUser] = useState({
		id: null,
		name: '',
		email: '',
		profilePicture: '',
	});

	const [userId] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			const firebaseConfig = {};

			const app = initializeApp(firebaseConfig);
			const db = getFirestore(app);

			const userSnapshot = await getDocs(collection(db, `users/${userId}`));
			const userDoc = userSnapshot.docs[0];
			const { id, name, email, profilePicture } = userDoc.data();
			setUser({ id, name, email, profilePicture });
		};

		fetchUser();
	}, [userId]);

	return (
		<Container className="profile-page">
			<Row>
				<Col md={6}>
					<h1>Profile</h1>
					<div className="user-info">
						<UserProfileInfo label="Nom complet" value={user.name} />
						<UserProfileInfo label="E-mail" value={user.email} />
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default ProfilePage;
