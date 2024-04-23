import React from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";

const EditJobPostsComponent = (item) => {
  const { id } = useParams();

  const [title, setTitle] = useState("SpringBoot");
  const [description, setDescription] = useState("SpringBoot Developer");

  const onSubmit = (values) => {
    const jobPost = { 
      jobTitle: values.title,
      jobDescription: values.description
    };
    console.log(jobPost)
  };

  const validate = (values) => {
    const errors = {};
    if (values.title.length < 5) {
      errors.title = "Enter a valid title!";
    }
    if (values.description.length < 5) {
      errors.description = "Enter a valid description!";
    }
    return errors;
  };
  return (
    <div className="container m-5">
      <h2>Edit JobPost Page</h2>
      <br />
      <Formik
        initialValues={{ title, description }}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(prop) => (
          <Form>
            <ErrorMessage
              name="title"
              component="div"
              className="alert alert-warning"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="alert alert-warning"
            />
            <fieldset className="form-group">
              <label className="label">Title</label>
              <Field className="form-control" type="text" name="title" />
            </fieldset>
            <fieldset className="form-group">
              <label className="label">Description</label>
              <Field className="form-control" type="text" name="description" />
            </fieldset>
            <button className="btn btn-success m-3" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditJobPostsComponent;
