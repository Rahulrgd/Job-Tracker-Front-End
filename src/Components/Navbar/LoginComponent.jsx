import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useAuth } from "../Security/AuthContext";
import { useNavigate } from "react-router-dom";

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
      navigate("/all-job-posts")
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
            <button className="btn btn-success m-3">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginComponent;
