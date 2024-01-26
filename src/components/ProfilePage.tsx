import  { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import UserProfileInfo from "./UserProfileInfo";
import SignatureHistory from "./SignatureHistory";
import "../styles/profile.css"; 

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    profilePicture: "url_de_la_photo", 
  });

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
            <SignatureHistory userId={user.id} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
