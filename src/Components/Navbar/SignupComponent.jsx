import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Alert } from "react-bootstrap";
import { signUpServicesApi } from "../api/UserServicesApi";

function SignupComponent() {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = (values) => {
    const errors = {};
    if (values.fullName.length < 3) {
      errors.fullName = "FullName can not have less than 3 characters.";
    }
    if (values.password.length < 8) {
      errors.password = "Password can not have less than 8 characters.";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password and Confirm Password are not same.";
    }
    return errors;
  };

  const clearValues = () => {
    setFormValues({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const [successMessage, setSuccessMessage] = useState(false);

  const onSubmit = async (values) => {
    const user = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    };
    const userString = JSON.stringify(user, null, 2).replace(/'/g, '"');
    console.log(userString);
    setFormValues(values);

    try {
      const response = await signUpServicesApi(user);
      setSuccessMessage(true);
      setTimeout(() => {
        clearValues();
      }, 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <Formik
        initialValues={formValues}
        enableReinitialize={true}
        validate={validate}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            {successMessage && (
              <Alert key="success" variant="success">
                Account Created Successfull!!
              </Alert>
            )}
            <div className="d-flex justify-content-center">
              <h1>Sign Up Page</h1>
            </div>
            <ErrorMessage
              name="fullName"
              component="div"
              className="alert alert-warning"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="alert alert-warning"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="alert alert-warning"
            />
            <fieldset className="form-group m-3">
              <label className="label m-1">Full Name</label>
              <Field type="text" className="form-control" name="fullName" />
            </fieldset>
            <fieldset className="form-group m-3">
              <label className="label m-1">Email</label>
              <Field type="email" className="form-control" name="email" />
            </fieldset>
            <fieldset className="form-group m-3">
              <label className="label m-1">Password</label>
              <Field type="password" className="form-control" name="password" />
            </fieldset>
            <fieldset className="form-group m-3">
              <label className="label m-1">Confirm Password</label>
              <Field
                type="password"
                className="form-control"
                name="confirmPassword"
              />
            </fieldset>
            <button className="btn btn-success" type="submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignupComponent;
