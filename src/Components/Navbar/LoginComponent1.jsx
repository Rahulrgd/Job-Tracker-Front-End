import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const authContext = useAuth();

  const handleSubmit = () => {
    const request = { username: username, password: password };
    if (authContext.login(request)) {
      setShowErrorMessage(false);
      navigate(`/welcome/${username}`);
    } else {
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="container mt-5">
      {showErrorMessage && (
        <Alert key="danger" variant="danger">
          Authentication failed!! Please check your credentials.
        </Alert>
      )}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={handleUsernameChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          name="login"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginComponent;
