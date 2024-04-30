import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import {
  deleteUserJobPost,
  retrieveJobPostsContainingString,
} from "../api/JobPostApiServices";
import {
  retrieveUserJobPosts,
  retrieveUserJobPostsContainingString,
} from "../api/UserServicesApi";
import { Alert, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import User30DayPerformanceChart from "../ChartComponents/User30DayPerformanceChart";
import "./User.css";
import { generateRandomColor } from "../JavascriptComponents/RandomColors";
import { ErrorMessage, Field, Formik } from "formik";

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
  // ==============================Search Functionality=================================
  const [string, setString] = useState("");

  const onSubmit = async (values, { setSubmitting }) => {
    console.log("On Submit is working from UserJobPostComponent...");
    const searchString = values.string;
    setString(searchString);
    await retrieveUserJobPostsContainingString(searchString)
      .then((response) => {
        setUserJobList(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));

    // Prevent default form submission behavior
    setSubmitting(false);
  };

  const validate = (values) => {
    const errors = {};
    if (values.string.length < 3) {
      errors.string =
        "String length can not have less than 3 characters: " + string.length;
    }
  };

  // ==========================JSX Start=========================================
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
        {/* ============================User Daily Posts Chart=============================== */}
        <Card>
          <User30DayPerformanceChart />
        </Card>
        {/* ============================Search Box=============================== */}
        <div className="m-3 d-flex justify-content-end">
          <Formik
            initialValues={{ string: string }}
            enableReinitialize={true}
            validate={validate}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={onSubmit}
            className=""
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <ErrorMessage
                name="string"
                component="div"
                className="alert alert-danger"
                />
                <Row>
                  <Col xs="auto">
                    <Field
                      type="text"
                      className=" mr-sm-2 form-control"
                      name="string"
                    />
                  </Col>
                  <Col xs="auto">
                    <button className="btn btn-primary" type="submit">
                      Search
                    </button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
        {/* ================================Users All Job Posts Mapping=================================== */}
        <Row>
          {userJobList.map((item, index) => (
            <Col key={index + 1}>
              <Card
                key={item.jobPostId}
                className="my-3"
                style={{
                  width: "18rem",
                  backgroundColor: generateRandomColor(),
                }}
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

                  <Card.Text className="overflow-auto">
                    {item.jobDescription}
                  </Card.Text>
                </Card.Body>
                <Card.Subtitle className="m-3 text-muted d-flex justify-content-end align-items-end">
                  {item.status}
                </Card.Subtitle>
                <Card.Subtitle className="m-3 h-auto d-flex justify-content-between align-items-end">
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
                </Card.Subtitle>
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
