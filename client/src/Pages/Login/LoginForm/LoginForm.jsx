import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

/**
 *  This Component validates the login form
 *
 * @component
 * @param LoginProps
 * @returns {JSX.Element}
 */

export default function LoginForm({ handleSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-container   p-5  ">
      <div className="">
        <h4 className="text-center text-light">Login</h4>
      </div>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required("Email is required")
            .email("Email is not valid"),
          password: Yup.string()
            .required("Password is required")
            .max(100, "Password is too long")
            .min(6, "Password too short"),
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
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-light">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                autoFocus
                className="form-control"
                aria-describedby="emailHelp"
                value={values.email}
                onChange={handleChange}
              />
              <span className="text-danger">
                {touched.email ? errors.email : ""}
              </span>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-light">
                Password
              </label>
              <input
                className="form-control"
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
              />
              <span className="text-danger">
                {touched.password ? errors.password : ""}
              </span>
            </div>

            <div className=" d-grid mt-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn   btn-primary  p-2 "
              >
                {isSubmitting ? (
                  <div
                    className="spinner-border text-light "
                    style={{ height: "20px", width: "20px" }}
                  ></div>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
