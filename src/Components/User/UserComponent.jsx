import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { retrieveUserDetails } from "../api/UserServicesApi";
import UserJobPostsComponent from "./UserJobPostsComponents";
import Card from "react-bootstrap/Card";

const UserComponent = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  useEffect(() => {
    retrieveUserDetails()
      .then((response) => {
        setUsername(response.data.fullName);
        setEmail(response.data.email);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div>
        <Card.Title className="m-3 d-flex justify-content-end">
          {username}
        </Card.Title>
        <Link className="m-3 d-flex justify-content-end" to="/user-resumes">Resumes</Link>
      </div>

      <UserJobPostsComponent />
    </>
  );
};

export default UserComponent;
