import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import {
  addJobPostWithId,
  allJobPosts,
  retrieveJobPostsContainingString,
} from "../api/JobPostApiServices";
import { Alert, Container, Dropdown, FormGroup } from "react-bootstrap";
import { useAuth } from "../Security/AuthContext";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./DashBoard.css";
import { generateRandomColor } from "../JavascriptComponents/RandomColors";
import TopThreeCandidatesChart from "../ChartComponents/TopThreeCandidatesChart";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TotalJobPostsPerDayChart from "../ChartComponents/TotalJobPostsPerDayChart";
import { countTotalUsers } from "../api/UserServicesApi";

import $ from 'jquery';

export default function AllJobPostsComponent() {
  const [allJobList, setAllJobList] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    retrieveTotalUsers();

    allJobPosts()
      .then((response) => {
        setAllJobList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // ==============================isAuthenticated================================
  const [addMessage, setAddMessage] = useState(false);

  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;

  // ==========================Retrive Total Users==================================================
  const retrieveTotalUsers = () => {
    countTotalUsers()
      .then((response) => {
        console.log(response.data);
        setTotalUsers(response.data);
      })
      .catch((error) => console.error(error));
  };

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
  // ==============================Search Functionality=================================
  const [string, setString] = useState("");

  const onSubmit = async (string) => {
    const searchString = string.string;
    setString(searchString);
    await retrieveJobPostsContainingString(searchString)
      .then((response) => {
        setAllJobList(response.data);
      })
      .catch((error) => console.error(error));
  };

  const validate = (values) => {
    const errors = {};
    if (values.string.length < 3) {
      errors.string =
        "String length can not have less than 3 characters: " + string.length;
    }
  };
  // =========================Job Description Expand Feature========================================
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const renderDescription = (item) => {
    if (isExpanded) {
      return item.jobDescription;
    } else {
      // Limiting the word count
      const words = item.jobDescription.split(" ");
      const limitedDescription = words.slice(0, 20).join(" ") + "...";
      return limitedDescription;
    }
  };

  const handleCardClick = (item) => {
    if (!isExpanded) {
      toggleDescription();
      $("#description").addClass("expanded");
    } else {
      toggleDescription();
      $("#description").removeClass("expanded");
    }
  };

  // =========================JSX Start================================
  return (
    <div className="p-3">
      {!isAuthenticated && (
        <Alert
          className="d-flex justify-content-center"
          type="danger"
          variant="danger"
        >
          Please log-in to access all the features!
        </Alert>
      )}
      <h3>Dashboard</h3>

      {/* ============================Dashboard======================================= */}
      <br />
      {addMessage && (
        <Alert key="success" variant="success">
          Job post added to your account successfully
        </Alert>
      )}
      <Container fluid>
        {/* ==========================Count Jobpost and Total Users==================== */}
        <Row className=" text-muted">
          <Col>
            <p>Total Jobs: {allJobList.length}</p>
          </Col>
          <Col>
            <p>Total Users: {totalUsers}</p>
          </Col>
        </Row>

        {/* ==========================Top 3 Performer Chart================================= */}
        <Row md={2}>
          <Col className="py-1">
            <Card>
              <TopThreeCandidatesChart />
            </Card>
          </Col>
          {/* ==========================Total Job Posts Per Day Chart================================= */}
          <Col className="py-1">
            <Card>
              <TotalJobPostsPerDayChart />
            </Card>
          </Col>
        </Row>
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
              <Form>
                {/* <ErrorMessage
                  name="string"
                  component="div"
                  className="alert alert-danger"
                /> */}
                <Row s={2}>
                  <Col>
                    <Field
                      type="text"
                      className="w-100 mr-sm-2 form-control my-2"
                      name="string"
                      placeholder="Search"
                    />
                  </Col>
                  <Col>
                    {/* <div className="d-flex justify-content-center"> */}
                    <button
                      className="btn btn-primary my-2 shadow-sm"
                      type="submit"
                    >
                      Search
                    </button>
                    {/* </div> */}
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
        {/* ===========================All Job Posts Mapping in Cards============================== */}
        <Row>
          {allJobList.map((item, index) => (
            <Col key={index + 1}>
              <Card
                key={item.jobPostId}
                className="my-3"
                style={{
                  width: "18rem",
                  backgroundColor: generateRandomColor(),
                  textDecoration: "none",
                }}
              >
                <Card.Body onClick={(item)=>handleCardClick(item)}>
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
                  
                  {/* ====================================== */}
                </Card.Body>
                <Card.Subtitle className="m-3 text-muted d-flex justify-content-end">
                  {item.username}
                </Card.Subtitle>
                <Card.Subtitle className="mx-3 text-muted d-flex justify-content-end">
                  {item.jobStatus}
                </Card.Subtitle>
                <div className="m-3 d-flex justify-content-between">
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
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
