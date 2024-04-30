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
import { Field, Form, Formik } from "formik";

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
  // ==============================Search Functionality=================================
  const [string, setString] = useState("");

  const onSubmit = async (string) => {
    console.log("On Submit is working...");
    console.log(string)
    const searchString=string.string;
    setString(searchString);
    await retrieveJobPostsContainingString(searchString)
      .then((response) => {
        setAllJobList(response.data);
        console.log(response.data)
      })
      .catch((error) => console.error(error));
  };

  const validate = (string) => {
    const errors = {};
    if (string.length < 3) {
      errors.string =
        "String length can not have less than 3 characters: " + string.length;
    }
  };

  // =========================JSX Start================================
  return (
    <div className="p-3">
      <h3>Dashboard</h3>

      {/* ============================Dashboard======================================= */}
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
        {/* ==========================Top 3 Performer ================================= */}
        <Card>
          <TopThreeCandidatesChart />
        </Card>
        {/* ============================Search Box=============================== */}
        <div className="m-3 d-flex justify-content-end">
          <Formik
            initialValues={{string:string}}
            enableReinitialize={true}
            validate={validate}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={onSubmit}
            className=""
          >
            {(props) => (
              <Form>
                <Row>
                  <Col xs="auto">
                    <Field
                      type="text"
                      className=" mr-sm-2 form-control"
                      name="string"
                    />
                  </Col>
                  <Col xs="auto">
                    <button className="btn btn-primary" type="submit">Search</button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
        {/* ===========================All Job Posts Mapping in Cards============================== */}
        <Row>
          {allJobList.map((item, index) => (
            <Col key={index+1}>
              <Card
                key={item.jobPostId}
                className="my-3"
                style={{
                  width: "18rem",
                  backgroundColor: generateRandomColor(),
                  textDecoration: "none",
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
