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
          {/* ==========================User Option============================== */}
          <Nav className="me-auto">
            {isAuthenticated && (
              <Nav.Link as={Link} to="/user-profile">
                User
              </Nav.Link>
            )}
            {/* =========================Add Post Option========================= */}
            {isAuthenticated && (
              <Nav.Link as={Link} to="/add-job-posts">
                Add Post
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {/* ============================Search Box=============================== */}
            <Form inline className="">
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Not Implemented Yet"
                    className=" mr-sm-2"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Search</Button>
                </Col>
              </Row>
            </Form>
          </Nav>
          <Nav>
            {/* ========================Logout Option======================= */}
            {isAuthenticated && (
              <Nav.Link as={Link} to="/logout" onClick={handleLogout}>
                Logout
              </Nav.Link>
            )}
            {/* ==========================Login Option========================= */}
            {!isAuthenticated && (
              <Nav.Link eventKey={2} as={Link} to="/login" className="justify-content-end">
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
