import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { addJobsApi } from "../api/JobPostApiServices";
import { Alert } from "react-bootstrap";
import { useAuth } from "../Security/AuthContext";
import { retrieveUserResumes } from "../api/ResumeServicesApi";

const AddJobPostsComponent = () => {
  const status = [
    { id: 0, value: "Select An Option" },
    { id: 1, value: "BOOKMARKED" },
    { id: 2, value: "APPLIED" },
    { id: 3, value: "ACTIVE" },
    { id: 4, value: "COMPLETED" },
    { id: 5, value: "CANCLED" },
    { id: 6, value: "REJECTED" },
    { id: 7, value: "SELECTED" },
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

  // ========================onSubmit Logic======================================
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
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      setMessage(false);
    }, 3000);
  };
  // =========================Validate Logic=====================================
  const validate = (values) => {
    const errors = {};

    if (values.jobTitle.length < 3 || values.jobTitle.length > 255) {
      errors.jobTitle = `Title can not be less than 3 or greater than 255 characters: ${values.jobTitle.length}`;
    }

    if (values.companyName.length < 3 || values.companyName.length > 255) {
      errors.companyName = `Company name can not be less than 3 or greater than 255 characters: ${values.companyName.length}`;
    }
    if (
      values.jobDescription.length < 3 ||
      values.jobDescription.length > 2550
    ) {
      errors.jobDescription = `Description can not be less than 3 or greater than 2550 characters: ${values.jobDescription.length}`;
    }
    if (values.jobLink.length < 3 || values.jobLink.length > 2048) {
      errors.jobLink = `Job Link can not be less than 3 or greater than 2048 characters: ${values.jobLink.length}`;
    }
    if (values.status.value === "Select An Option") {
      errors.status = "Select status for job post.";
    }
    return errors;
  };
  // ===================Retrieving Resumes============================
  const [userResumeList, setUserResumeList] = useState([]);
  const retrieveData = () => {
    retrieveUserResumes()
      .then((response) => {
        if (response.status === 201) {
          setUserResumeList(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div className="container p-3">
      {/* ==========================Formic Logic================================ */}
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
            <div className="d-flex justify-content-end m-3">
              <button className="btn btn-secondary">Auto Fill - not working now!</button>
            </div>
            {/* ====================Alert Message======================== */}
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
              name="jobTitle"
              className="alert alert-warning"
              component="div"
            />

            <ErrorMessage
              name="companyName"
              className="alert alert-warning"
              component="div"
            />
            <ErrorMessage
              name="jobDescription"
              className="alert alert-warning"
              component="div"
            />
            <ErrorMessage
              name="jobLink"
              className="alert alert-warning"
              component="div"
            />
            <ErrorMessage
              name="status"
              className="alert alert-warning"
              component="div"
            />
            {/* ==============================Input Fields================================== */}
            <fieldset className="my-3 form-group">
              <label className="label m-1">Job Title</label>
              <Field className="form-control" name="jobTitle" type="text" />
            </fieldset>
            <fieldset className="my-3 form-group">
              <label className="label m-1">Company Name</label>
              <Field className="form-control" name="companyName" type="text" />
            </fieldset>
            <fieldset className="my-3 form-group">
              <label className="label m-1">Description</label>
              <Field
                className="form-control "
                name="jobDescription"
                type="text"
                as="textarea"
                style={{ height: "10rem" }}
              />
            </fieldset>
            <fieldset className="my-3 form-group">
              <label className="label m-1">Link</label>
              <Field className="form-control" name="jobLink" type="href" />
            </fieldset>
            {/* ==================Select Status================================== */}
            <fieldset className="my-3 form-group">
              <label className="label m-1">Status</label>
              <Field
                className="form-control"
                name="status"
                as="select"
                type="text"
              >
                {status.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.value}
                  </option>
                ))}
              </Field>
            </fieldset>

            {/* =====================Select Date======================================= */}
            <fieldset className="my-3 form-group">
              <label className="label m-1">Date</label>
              <Field className="form-control" name="jobDate" type="date" />
            </fieldset>

            {/* ===========================Add Job Button========================================= */}
            <div className="my-3 d-flex justify-content-end">
              <button className="btn btn-success m-3" type="submit">
                Add Job
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddJobPostsComponent;
