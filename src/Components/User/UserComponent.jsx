import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { retrieveUserDetails } from "../api/UserServicesApi";

const UserComponent = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  useEffect(() => {
    retrieveUserDetails()
      .then((response) => {
        setUsername(response.data.fullName)
        setEmail(response.data.email)
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="container m-5">
      <h1>This is user Component!</h1>
      <div>User Name: {username}</div>
      <div>Email: {email}</div>

      <Link to="/add-job-posts" className="m-2">
        <Button className="btn btn-success">+ Add New Job Posts</Button>
      </Link>
      <Link to="/user-job-posts" className="m-2">
        <Button className="btn">Your job Posts</Button>
      </Link>
      <Link to="/user-resumes" className="m-2">
        <Button className="btn">Your Resumes</Button>
      </Link>
    </div>
  );
};

export default UserComponent;
