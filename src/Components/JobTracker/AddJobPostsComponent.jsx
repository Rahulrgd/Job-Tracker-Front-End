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
    console.log("onSubmit is working...");
    console.log(values);
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
  // =========================Validate Logic=====================================
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
  // ===================Retrieving Resumes============================
  const [userResumeList, setUserResumeList] = useState([]);

  const retrieveData = () => {
    retrieveUserResumes()
      .then((response) => {
        setUserResumeList(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div className="container m-5">
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
                className="form-control"
                name="jobDescription"
                type="text"
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
