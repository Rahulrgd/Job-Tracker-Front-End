import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { addJobPostWithId, allJobPosts } from "../api/JobPostApiServices";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Security/AuthContext";

export default function AllJobPostsComponent() {
  const [allJobList, setAllJobList] = useState([]);

  useEffect(() => {
    allJobPosts()
      .then((response) => {
        setAllJobList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [addMessage, setAddMessage] = useState(false);

  const authContext = useAuth();

  const handleAddJobPost = async (jobPostId) => {
    console.log("Handle Add Working Properly");
    console.log(jobPostId);
    await addJobPostWithId(jobPostId)
      .then((response) => {
        console.log(response);
        setAddMessage(true);
        setTimeout(() => {
          setAddMessage(false);
        }, 1000);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="m-5">
      <h1>Dashboard</h1>
      <br />
      {addMessage && (
        <Alert key="success" variant="success">
          Job post added to your account successfully
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>User</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Description</th>
            <th>Date</th>
            <th>Link</th>
            {authContext.isAuthenticated && <th></th>}
          </tr>
        </thead>
        <tbody>
          {allJobList.map((item, index) => (
            <tr key={item.jobPostId}>
              <td>{index + 1}</td>
              <td >{item.username}</td>
              <td >{item.jobTitle}</td>
              <td >{item.companyName}</td>
              <td className="w-100">{item.jobDescription}</td>
              <td className="w-100">{item.jobDate}</td>
              <td>
                <a href={item.jobLink} target="_blank">
                  Link
                </a>
              </td>
              {authContext.isAuthenticated && (
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddJobPost(item.jobPostId)}
                  >
                    add
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
