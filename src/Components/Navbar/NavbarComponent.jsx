import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";

function NavbarComponent() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  const nevigate = useNavigate();
    const handleLogout = ()=>{
        authContext.logout()
    }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="#home">
          Job-Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && <Nav.Link as={Link} to="/welcome">
              Home
            </Nav.Link>}
            {isAuthenticated && <Nav.Link as={Link} to="/all-job-posts">
              All Jobs
            </Nav.Link>}
          </Nav>
        </Navbar.Collapse>
        <Nav>
          {isAuthenticated && (
            <Nav.Link as={Link} to="/logout" onClick={handleLogout}>
              Logout
            </Nav.Link>
          )}
          {!isAuthenticated && (
            <Nav.Link eventKey={2} as={Link} to="/login">
              Login
            </Nav.Link>
          )}
          {!isAuthenticated && (
            <Nav.Link eventKey={2} as={Link} to="/signup">
              Signup
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;