import React from "react";
import Button from "react-bootstrap/Button";
import { useAuth } from "../Security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogoutComponent() {
  return (
    <div className="container">
      <h1>
        You are loged out.
      </h1>
      <h2>Thank You for using our Application.</h2>
    </div>
  );
}
