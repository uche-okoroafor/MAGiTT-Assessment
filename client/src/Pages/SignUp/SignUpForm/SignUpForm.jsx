import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

/**
 *  This Component validates the login form
 *
 * @component
 * @param SignUpFormProps
 * @returns {JSX.Element}
 */

export default function SignUpForm({ handleSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="form-container   p-2  rounded ">
      <div className="">
        <h4 className="text-center text-light">Create account</h4>
      </div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          occupation: "",
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Username is required"),
          email: Yup.string()
            .required("Email is required")
            .email("Email is not valid"),
          password: Yup.string()
            .required("Password is required")
            .max(100, "Password is too long")
            .min(6, "Password too short"),
          confirmPassword: Yup.string().when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Passwords does not match, retype password"
            ),
          }),
        })}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-1">
              <label htmlFor="username" className="form-label text-light">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                required
                autoComplete="username"
                autoFocus
                className="form-control"
                aria-describedby="userHelp"
                // error={touched.email && Boolean(errors.email)}
                value={values.username}
                onChange={handleChange}
              />
              <span className="text-danger">
                {touched.username ? errors.username : ""}
              </span>
            </div>{" "}
            <div className="mb-1">
              <label htmlFor="email" className="form-label text-light">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                autoFocus
                className="form-control"
                aria-describedby="emailHelp"
                // error={touched.email && Boolean(errors.email)}
                value={values.email}
                onChange={handleChange}
              />
              <span className="text-danger">
                {touched.email ? errors.email : ""}
              </span>
            </div>{" "}
            <div className="mb-1">
              <label htmlFor="Occupation" className="form-label text-light">
                Occupation
              </label>
              <input
                id="occupation"
                type="text"
                name="occupation"
                // autoComplete="occupation"
                autoFocus
                className="form-control"
                value={values.occupation}
                onChange={handleChange}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="password" className="form-label text-light">
                Password
              </label>
              <input
                className="form-control"
                name="password"
                id="password"
                required
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
              />
              <span className="text-danger">
                {touched.password ? errors.password : ""}
              </span>
            </div>
            <div className="mb-1">
              <label
                htmlFor="confirmPassword"
                className="form-label text-light"
              >
                Confirm Password
              </label>
              <input
                className="form-control"
                name="confirmPassword"
                id="confirmPassword"
                required
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={values.confirmPassword}
                onChange={handleChange}
              />
              <span className="text-danger">
                {touched.confirmPassword ? errors.confirmPassword : ""}
              </span>
            </div>
            <div className=" d-grid mt-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn  btn-primary  p-2 "
              >
                {isSubmitting ? (
                  <div
                    className=" spinner-border text-light"
                    style={{ height: "20px", width: "20px" }}
                  ></div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
