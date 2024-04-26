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
      <div className="m-3 d-flex justify-content-between">
        <Card.Title className=" d-inline justify-content-end">
          {username}
        </Card.Title>
        <Link
          className=" d-inline justify-content-start text-decoration-none"
          to="/user-resumes"
        >
          {/* <button className="btn btn-secondary">Resumes</button> */}
          Resumes
        </Link>
      </div>

      <UserJobPostsComponent />
    </>
  );
};

export default UserComponent;
