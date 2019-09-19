import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Name
// - Email
// - Password
// - Terms of Service (checkbox)
// - A Submit button to send our form data to the server.

const OnboardForm = ({ values, errors, touched, status }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (status) {
      setUser([...user, status]);
    }
  }, [status, user]);

  return (
    <div>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        <Field type="text" name="email" placeholder="Email" />
        <Field type="text" name="password" placeholder="Password" />
        <div>
          <label>Accept Terms</label>
          <label>
            I have read and agree to the Terms of Service.
            <Field type="checkbox" name="agreeToTerms" />
          </label>
        </div>
        <button>Submit</button>
      </Form>
    </div>
  );
};

const FormikOnboardForm = withFormik({
  mapPropsToVaules({ name, email, password, agreeToTerms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      agreeToTerms: agreeToTerms || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter your name to proceed."),
    email: Yup.string().email("Please enter a vaild email")
  }),

  handleSubmit(values, { setStatus }) {
      axios.post("https://reqres.in/api/users", values)
      .then(res => {
          setStatus(res.data);
      })
      .catch(err => console.log(err.res));
  }
})(OnboardForm);

console.log("This is the HOC", FormikOnboardForm);
export default FormikOnboardForm;
