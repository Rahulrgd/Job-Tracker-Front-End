import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { addJobPostWithId, allJobPosts } from "../api/JobPostApiServices";
import { Alert, Container } from "react-bootstrap";
import { useAuth } from "../Security/AuthContext";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./DashBoard.css"
import { generateRandomColor } from "../JavascriptComponents/RandomColors";

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

  // ===========================Handle Add Job Posts Method==============================================
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

  // =========================JSX Start================================
  return (
    <div className="p-3">
      <h1>Dashboard</h1>
      <br />
      {addMessage && (
        <Alert key="success" variant="success">
          Job post added to your account successfully
        </Alert>
      )}
      <Container fluid>
        <div className=" text-muted d-flex justify-content-start">
          Total Jobs: {allJobList.length}
        </div>
        <div className="card-container">
            {allJobList.map((item, index) => (
                <Card
                  key={item.jobPostId}
                  className="my-3"
                  style={{ width: "18rem", backgroundColor: generateRandomColor(), }}
                >
                  <Card.Body>
                    <Card.Title className=" text-muted d-flex justify-content-start">
                      {item.jobTitle}
                    </Card.Title>
                    <Card.Subtitle className=" text-muted d-flex justify-content-start">
                      {item.companyName}
                    </Card.Subtitle>

                    <div className="py-2 d-flex d-flex justify-content-end">
                      <Card.Subtitle className="text-muted ">
                        {item.jobDate}
                      </Card.Subtitle>
                    </div>

                    <Card.Text
                      className="overflow-auto"
                    >
                      {item.jobDescription}
                    </Card.Text>
                    <Card.Subtitle className="mb-2 text-muted d-flex justify-content-end">
                      {item.username}
                    </Card.Subtitle>
                    <div className="d-flex justify-content-between">
                      <a href={item.jobLink} target="_blank">
                        Link
                      </a>
                      {authContext.isAuthenticated && (
                        <Button
                          onClick={() => handleAddJobPost(item.jobPostId)}
                          variant="primary"
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
            ))}
        </div>
      </Container>
    </div>
  );
}