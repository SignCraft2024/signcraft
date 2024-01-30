import { useState } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Image,
  Dropdown,
  DropdownButton,
  Button,
} from 'react-bootstrap';
import '../styles/nav.css';
import logo from '../assets/logo.png';

interface User {
  photoUrl: string;
  fullName: string;
  email: string;
}

const NavBar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to disconnect?');
    if (confirmLogout) {
      setUser(null);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className="d-flex align-items-center">
        <Image src={logo} alt="Logo" />
        <span className="brand-text">SIGN CRAFT</span>
        {user || (
          <Button
            variant="link"
            onClick={handleLogout}
            className="logout-button"
          >
            Log out
          </Button>
        )}
      </Navbar.Brand>

      <Navbar.Collapse id="basic-navbar-nav" role="navigation">
        <Nav className="mr-auto">
        </Nav>
        {user && (
          <Nav className="ml-auto">
            <NavItem>
              <DropdownButton
                as={NavLink}
                title={
                  <Image
                    src={user.photoUrl}
                    roundedCircle
                    className="mr-2"
                    alt={user.fullName}
                  />
                }
              >
                <Dropdown.Item>{user.fullName}</Dropdown.Item>
                <Dropdown.Item>{user.email}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
              </DropdownButton>
            </NavItem>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
