import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { addJobsApi } from "../api/JobPostApiServices";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Security/AuthContext";

const AddJobPostsComponent = () => {
  const status = [
    "Select an option",
    "BOOKMARKED",
    "APPLIED",
    "ACTIVE",
    "COMPLETED",
    "CANCLED",
    "REJECTED",
    "SELECTED",
  ];

  const [formValues, setFormValues] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    jobDate: "",
    jobLink: "",
    status: "",
  });

  const [message, setMessage] = useState(false);

  const clearValues = {
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    jobDate: "",
    jobLink: "",
    status: "",
  };

  const authContext = useAuth();

  const onSubmit = async (values) => {
    setFormValues(values);
    await addJobsApi(values)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setMessage(true);
          setFormValues(clearValues);
        }
      })
      .catch((error) => console.log(error));

    setTimeout(() => {
      setMessage(false);
    }, 3000);
  };

  const validate = (values) => {
    const errors = {};
    if (values.jobDescription.length < 2) {
      errors.jobDescription = "Description can have less than 3 characters.";
    }
    if (values.jobTitle.length < 2) {
      errors.jobTitle = "Job Title can have less than 3 characters.";
    }
    if (values.companyName.length < 2) {
      errors.companyName = "Company name can have less than 3 characters.";
    }
    if (values.status === status[0]) {
      errors.status = "Select status for job post.";
    }
    return errors;
  };

  return (
    <div className="container m-5">
      <Formik
        initialValues={formValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validate={validate}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {(props) => (
          <Form>
            <h1>Add Job Posts</h1>
            <br />
            {message && (
              <Alert key="success" variant="success">
                Job post added successfully. You can add more.
              </Alert>
            )}
            {!authContext.isAuthenticated && (
              <Alert key="warning" variant="warning">
                Please login first.
              </Alert>
            )}
            <ErrorMessage
              name="jobDescription"
              className="alert alert-warning"
              component="div"
            />
            <ErrorMessage
              name="status"
              className="alert alert-warning"
              component="div"
            />
            <ErrorMessage
              name="jobTitle"
              className="alert alert-warning"
              component="div"
            />
            <ErrorMessage
              name="jobCompany"
              className="alert alert-warning"
              component="div"
            />
            <fieldset className="form-group">
              <label className="label m-1">Job Title</label>
              <Field className="form-control" name="jobTitle" type="text" />
            </fieldset>
            <fieldset className="form-group">
              <label className="label m-1">Company Name</label>
              <Field className="form-control" name="companyName" type="text" />
            </fieldset>
            <fieldset className="form-group">
              <label className="label m-1">Description</label>
              <Field
                className="form-control"
                name="jobDescription"
                type="text"
              />
            </fieldset>
            <fieldset className="form-group">
              <label className="label m-1">Link</label>
              <Field className="form-control" name="jobLink" type="href" />
            </fieldset>
            <fieldset className="form-group">
              <label className="label m-1">Status</label>
              <Field
                className="form-control"
                name="status"
                as="select"
                type="text"
              >
                {status.map((item, index) => (
                  <option key={index + 1} value={item}>
                    {item}
                  </option>
                ))}
              </Field>
            </fieldset>
            <fieldset className="form-group">
              <label className="label m-1">Date</label>
              <Field className="form-control" name="jobDate" type="date" />
            </fieldset>
            <button className="btn btn-success m-3" type="submit">
              Add Job
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddJobPostsComponent;
