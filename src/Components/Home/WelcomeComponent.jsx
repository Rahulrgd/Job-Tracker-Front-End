import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

function WelcomeComponenet() {
  const { username } = useParams();
  
  

  return (
    <div className="container m-5">
      <h1>Welcome {username} to Job Tracker Application</h1>
      <br />
      <p>Sign-Up to create your Account! And Start Tracking your Job Applications.</p>
      <Button variant="primary" >
        Hello Api
      </Button>
    </div>
  );
}

export default WelcomeComponenet;
