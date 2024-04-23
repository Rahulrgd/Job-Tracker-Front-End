import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { addJobsApi } from "../api/JobPostApiServices";
import { Alert } from "react-bootstrap";

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

  const onSubmit = (values) => {
    setFormValues(values);
    setTimeout(async () => {
      console.log(formValues);
      console.log(values.status);
      await addJobsApi(formValues)
        .then((response) => {
          setMessage(true);
          setFormValues(clearValues);
          console.log(response);
        })
        .catch((error) => console.log(error));
    }, 1);
  };

  const validate = (values) => {
    const errors = {};
    if (values.jobDescription.length < 2) {
      errors.jobDescription = "Description can have less than 3 characters";
    }
    if (values.jobTitle.length < 2) {
      errors.jobTitle = "Job Title can have less than 3 characters";
    }
    if (values.companyName.length < 2) {
      errors.companyName = "Company name can have less than 3 characters";
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
            <ErrorMessage
              name="jobDescription"
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
