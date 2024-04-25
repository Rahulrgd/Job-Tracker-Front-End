import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { uploadResume } from "../api/ResumeServicesApi";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UploadResumeComponent = () => {
  const [resumeFile, setResumeFile] = useState(null);

  const validate = (values) => {
    const errors = {};
    if (!values.resumeFile) {
      errors.resumeFile = "Select PDF file and then click on upload.";
    }
    return errors;
  };

  const [showMessage, setMessage] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log("onSubmit button is working.");
    console.log(values);
    const formData = new FormData();
    formData.append("file", resumeFile);
    uploadResume(formData)
      .then((response) => {
        console.log(response);
        setMessage(true);
        setResumeFile(null)
        setTimeout(() => {
          setMessage(false)
          navigate("/user-resumes")
        }, 1000);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="m-3">
      <br />
      <div className="m-3 d-flex justify-content-center">
        <hr />
        <br />
        <h1>Select Resume</h1>
      </div>
      <Formik
        initialValues={{}}
        enableReinitialize={true}
        validate={validate}
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {(props) => (
          <Form>
            <br />
            {showMessage && (
              <Alert key="success" variant="success">
                Resume uploaded successfully.
              </Alert>
            )}
            <ErrorMessage
              name="resumeFile"
              component="div"
              className="alert alert-warning"
            />
            <fieldset className="from-group">
              <Field
                className="form-control d-flex "
                type="file"
                name="resumeFile"
                onChange={(event) => {
                  setResumeFile(event.currentTarget.files[0]);
                }}
              />
            </fieldset>
            <div className="m-3 d-flex justify-content-end">
              <button
                className="btn btn-success"
                type="submit"
                onClick={onSubmit}
              >
                Upload
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadResumeComponent;
