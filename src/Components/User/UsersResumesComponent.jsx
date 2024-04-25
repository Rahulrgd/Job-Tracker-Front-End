import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { deleteUserJobPost } from "../api/JobPostApiServices";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserResumeWitId, retrieveUserResumes } from "../api/ResumeServicesApi";

const UsersResumeComponent = () => {
  const [userResumeList, setUserResumeList] = useState([]);

  const retrieveData = () => {
    retrieveUserResumes()
      .then((response) => {
        setUserResumeList(response.data);

      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const [deleteMessage, setDeleteMessage] = useState(false);

  const handleDeleteJobPost = (resumeId) => {
    deleteUserResumeWitId(resumeId)
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
    // navigate(`/editJobPost/${id}`);
  };

  return (
    <div>
      <div className=" m-3">
        <h1 className="d-flex justify-content-center">Your Resumes</h1>
        <hr />
        <div className="m-3 d-flex justify-content-end"><Link to="/upload-resume">Upload Resume</Link></div>
        <br />
        {deleteMessage && (
          <Alert key="danger" variant="danger">
            Resume Post Deleted
          </Alert>
        )}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Resumes</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userResumeList.map((item, index) => (
              <tr key={item.resumeId}>
                <td>{index + 1}</td>
                <td>{item.resumeName}</td>
                {/* <td>
                  {" "}
                  <a href={item.jobLink}>Link</a>
                </td> */}
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
                    onClick={() => handleDeleteJobPost(item.resumeId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UsersResumeComponent;
