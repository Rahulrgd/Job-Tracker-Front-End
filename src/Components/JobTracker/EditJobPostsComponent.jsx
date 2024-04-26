import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  retrieveJobPostWithId,
  updateUserJobPost,
} from "../api/JobPostApiServices";
import { Alert } from "react-bootstrap";
import { ErrorMessage, Field, Form, Formik } from "formik";

const EditJobPostsComponent = (item) => {
  const { id } = useParams();

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

  useEffect(() => {
    retrieveData(id);
  }, []);

  const [message, setMessage] = useState(false);

  const clearValues = {
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    jobDate: "",
    jobLink: "",
    status: "",
  };

  const navigate = useNavigate();

  const retrieveData = async (id) => {
    try {
      const response = await retrieveJobPostWithId(id);
      setFormValues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values) => {
    try {
      await updateUserJobPost(values);
      setMessage(true);
      setFormValues(clearValues);

      setTimeout(() => {
        setMessage(false);
        navigate("/user-job-posts")
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (values.jobDescription.length < 2 || values.jobDescription.length > 522) {
      errors.jobDescription = `Description length can not be less than 3  or greater than 522 characters: ${values.jobDescription.length}`;
    }
    if (values.jobTitle.length < 2 || values.jobTitle.length > 255) {
      errors.jobTitle = `Job Title length can not be less than 3 and more than 255 characters: ${values.jobTitle.length}`;
    }
    if (values.jobLink.length < 2 || values.jobLink.length > 522) {
      errors.jobTitle = `Job Link length can not be less than 3 and more than 522 characters: ${values.jobLink.length}`;
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
    <div className="container p-3">
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
            <h1>Update Job Posts</h1>
            <br />
            {message && (
              <Alert key="success" variant="success">
                Job post edited successfully. You can add more.
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
              Update Job Post
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditJobPostsComponent;
