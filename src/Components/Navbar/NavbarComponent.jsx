import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function NavbarComponent() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  const nevigate = useNavigate();

  const handleLogout = async () => {
    await authContext.logout();
  };

  return (
    <Navbar
      expand="lg"
      className="w-100  navbar navbar-dark bg-dark sticky-top"
    >
      <Container>
        <Navbar.Brand className="fw-bold" as={Link} to="/">
          Job-Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* ==========================User Option============================== */}
            {isAuthenticated && (
              <Nav.Link as={Link} to="/user-profile">
                User
              </Nav.Link>
            )}

            {/* =========================Add Post Option========================= */}
            {isAuthenticated && (
              <Nav.Link as={Link} to="/add-job-posts">
                + Post
              </Nav.Link>
            )}
            {/* ==========================About============================== */}
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>

          {/* ========================Logout Option======================= */}
          <Nav>
            {isAuthenticated && (
              <Nav.Link as={Link} to="/" onClick={handleLogout}>
                Logout
              </Nav.Link>
            )}
            {/* ==========================Login Option========================= */}
            {!isAuthenticated && (
              <Nav.Link
                eventKey={2}
                as={Link}
                to="/login"
                className="justify-content-end"
              >
                Login
              </Nav.Link>
            )}

            {/* =============================== */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
