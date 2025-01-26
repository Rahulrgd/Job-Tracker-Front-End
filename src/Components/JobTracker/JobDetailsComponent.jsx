import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addJobPostWithId,
  retrieveJobPostDetailsWithId,
} from "../api/JobPostApiServices";
import { useAuth } from "../Security/AuthContext";
import { Alert, Button } from "react-bootstrap";

function JobDetailsComponent() {
  const { id } = useParams();

  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;

  const [addMessage, setAddMessage] = useState(false);

  const handleAddJobPost = async (jobPostId) => {
    await addJobPostWithId(jobPostId)
      .then((response) => {
        setAddMessage(true);
        setTimeout(() => {
          setAddMessage(false);
        }, 1000);
      })
      .catch((error) => console.log(error));
  };

  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    jobDate: "",
    jobLink: "",
    status: "",
  });

  const retrieveData = () => {
    retrieveJobPostDetailsWithId(id)
      .then((response) => {
        console.log(response.data);
        setJobDetails(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    retrieveData(id);
  }, []);

  return (
    <div className="container my-5">
      <br />
      {addMessage && (
        <Alert key="success" variant="success">
          Job post added to your account successfully
        </Alert>
      )}
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h2>{jobDetails.jobTitle}</h2>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Company:</strong> {jobDetails.companyName}
            </li>
            <li className="list-group-item">
              <strong>Description:</strong> {jobDetails.jobDescription}
            </li>
            <li className="list-group-item">
              <strong>Date Posted:</strong> {jobDetails.jobDate}
            </li>
            <li className="list-group-item">
              <strong>Status:</strong> {jobDetails.jobStatus}
            </li>
            <li className="list-group-item">
              <strong>Link:</strong> <a href={jobDetails.jobLink} target="_blank">
                  Link
                </a>
            </li>
            <li className="list-group-item">
              <strong>UserName:</strong> {jobDetails.username}
            </li>
          </ul>
          {/* <div className="mt-4 text-center">
            <a
              href={jobDetails.jobLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Apply Now
            </a>
          </div> */}
          {/* ==================================Add Job to your account================================ */}

          {authContext.isAuthenticated && (
            <div className="mt-4 text-center">
              <Button
                onClick={() => handleAddJobPost(jobDetails.jobPostId)}
                variant="primary"
              >
                Add Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetailsComponent;
