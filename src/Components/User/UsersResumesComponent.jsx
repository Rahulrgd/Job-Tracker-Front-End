import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  deleteUserResumeWitId,
  downloadUserResume,
  retrieveUserResumes,
} from "../api/ResumeServicesApi";
import save from "save-file";

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

  const saveFile = (data, resumeName) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", resumeName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const [downloadMeassage, setDownloadMessage] = useState(false);

  const handleDownloadJobPost = (resumeId, resumeName) => {
    downloadUserResume(resumeId)
      .then((response) => {
        save(response.data, `${resumeName}`);
        setDownloadMessage(true);
        setTimeout(() => setDownloadMessage(false), 3000);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className=" m-3">
        <h1 className="d-flex justify-content-center">Your Resumes</h1>
        <hr />
        <div className="m-3 d-flex justify-content-end">
          <Link
            to="/upload-resume"
            className="m-3 d-flex justify-content-end text-decoration-none"
          >
            <button className="btn btn-secondary">Upload Resume</button>
          </Link>
        </div>
        <br />
        {deleteMessage && (
          <Alert key="danger" variant="danger">
            Resume Post Deleted
          </Alert>
        )}
        {downloadMeassage && (
          <Alert key="success" variant="success">
            Downloading resume....
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
                <td className="">
                  {" "}
                  <Button
                    className="btn-warning"
                    onClick={() => {
                      handleDownloadJobPost(item.resumeId, item.resumeName);
                    }}
                  >
                    Download
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
