import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import UserProfileInfo from "./UserProfileInfo";
import SignatureHistory from "./SignatureHistory";
import "../styles/profile.css";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState({
    id: null, 
    name: "",
    email: "",
    profilePicture: "",
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const firebaseConfig = {
        //  configuration Firebase
      };

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
      <Row>
        <Col md={12}>
          <div className="signature-history">
          <SignatureHistory userId={userId ?? 0} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
