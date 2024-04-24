import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useAuth } from "../Security/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LoginComponent() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const validate = (values) => {
    const errors = {};
    if (values.password.length < 8) {
      errors.password = "Password can not have less than 8 characters";
    }
    return errors;
  };

  const authContext = useAuth();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    const body = {
      username: values.email,
      password: values.password,
    };
    setFormValues(values);
    if (authContext.login(body)) {
      navigate("/all-job-posts");
    }
  };

  return (
    <div className="container mt-5">
      <Formik
        initialValues={formValues}
        enableReinitialize-={true}
        validate={validate}
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {(props) => (
          <Form className="form">
            <ErrorMessage
              name="password"
              component="div"
              className="alert alert-warning"
            />
            <fieldset className="form-group">
              <label className="label m-1">Email</label>
              <Field className="form-control" name="email" type="email" />
            </fieldset>
            <fieldset className="form-group">
              <label className="label m-1">Password</label>
              <Field className="form-control" name="password" type="password" />
            </fieldset>
            <div className="d-flex justify-content-end">
              <button className="btn btn-success m-3">
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="d-flex justify-content-center m-5 text-secondary">
        To create account
        <Link className="mx-2" to="/signup">
          click here.
        </Link>
      </div>
    </div>
  );
}

export default LoginComponent;
