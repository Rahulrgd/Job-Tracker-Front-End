import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useAuth } from "../Security/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

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

  const [invalidCredentialsMessage, setInvalidCredentialsMessage] =
    useState(false);

  const onSubmit = async (values) => {
    const body = {
      email: values.email,
      password: values.password,
    };
    setFormValues(values);
    const authentication = await (authContext.login(body))
      if (authentication) {
        navigate("/all-job-posts");
      } else {
        setInvalidCredentialsMessage(true);
        setTimeout(() => setInvalidCredentialsMessage(false), 3000);
      }
    
  };

  return (
    <div className="container pt-5">
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
            {invalidCredentialsMessage && (
              <Alert key="danger" variant="danger">
                Invalid Credentials.
              </Alert>
            )}
            <fieldset className="form-group">
              <label className="label m-1">Email</label>
              <Field className="form-control" name="email" type="email" />
            </fieldset>
            <fieldset className="form-group">
              <label className="label m-1">Password</label>
              <Field className="form-control" name="password" type="password" />
            </fieldset>
            <fieldset className="d-flex justify-content-end">
              <button className="btn btn-success m-3">Login</button>
            </fieldset>
          </Form>
        )}
      </Formik>
      <div className="d-flex justify-content-center m-5 text-secondary">
        To create account - 
        <Link className="mx-2" to="/signup">
          click here.
        </Link>
      </div>
    </div>
  );
}

export default LoginComponent;
