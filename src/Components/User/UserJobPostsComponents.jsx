import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import { deleteUserJobPost } from "../api/JobPostApiServices";
import { retrieveUserJobPosts } from "../api/UserServicesApi";
import { Alert, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    navigate(`/editJobPost/${id}`);
  };
  return (
    <div className=" m-3">
      <br />
      <h1 className="d-flex justify-content-center">Your job Posts</h1>
      <br />
      {deleteMessage && (
        <Alert key="danger" variant="danger">
          Job Post Deleted
        </Alert>
      )}

      {/* ==================================================== */}
      <Container fluid>
        <div className=" text-muted d-flex justify-content-start">
          Total Jobs: {userJobList.length}
        </div>
        <Row className="d-flex justify-conent-center">
          {userJobList.map((item, index) => (
            <Col className="" md="auto">
              <Card
                key={item.jobPostId}
                className="my-3"
                style={{ width: "18rem" }}
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
                    style={{ height: "9rem" }}
                    className="overflow-auto"
                  >
                    {item.jobDescription}
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted d-flex justify-content-end">
                    {item.status}
                  </Card.Subtitle>
                  <div className="d-flex justify-content-between">
                    <a href={item.jobLink} target="_blank">
                      Link
                    </a>
                    <Button
                      className="btn-success"
                      onClick={() => {
                        handleEditJobPost(item.id);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      className="btn-danger"
                      onClick={() => handleDeleteJobPost(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* ================================================================= */}
    </div>
  );
};

export default UserJobPostsComponent;
