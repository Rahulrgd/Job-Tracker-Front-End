import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { deleteUserJobPost } from "../api/JobPostApiServices";
import { retrieveUserJobPosts } from "../api/UserServicesApi";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserJobPostsComponent = () => {
  const [userJobList, setUserJobList] = useState([]);

  const retrieveData = () => {
    retrieveUserJobPosts()
      .then((response) => setUserJobList(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const [deleteMessage, setDeleteMessage] = useState(false);

  const handleDeleteJobPost = (id) => {
    deleteUserJobPost(id)
      .then((response) => {
        setDeleteMessage(true);
        retrieveData();

        setTimeout(() => {
          setDeleteMessage(false);
        }, 3000);
      })
      .catch((error) => console.log(error));
  };

  const navigate = useNavigate();
  const handleEditJobPost = (id) => {
    navigate(`/editJobPost/${id}`)
  };
  return (
    <div className="container mt-5">
      <h1 className="d-flex justify-content-center">Your job Posts</h1>
      <hr />
      <br />
      {deleteMessage && (
        <Alert key="danger" variant="danger">
          Job Post Deleted
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date</th>
            <th>Link</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {userJobList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.jobTitle}</td>
              <td>{item.companyName}</td>
              <td>{item.jobDescription}</td>
              <td>{item.status}</td>
              <td>{item.jobDate}</td>
              <td>
                {" "}
                <Button href={item.jobLink}>Link</Button>
              </td>
              <td>
                {" "}
                <Button
                  className="btn-success"
                  onClick={() => {
                    handleEditJobPost(item.id);
                  }}
                >
                  Edit
                </Button>
              </td>
              <td>
                {" "}
                <Button
                  className="btn-danger"
                  onClick={() => handleDeleteJobPost(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserJobPostsComponent;