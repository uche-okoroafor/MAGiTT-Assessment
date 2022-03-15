import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

/**
 * Component  handles form validations
 *
 * @component
 * @param CreateProfileFormProps
 * @returns {JSX.Element}
 */

export default function CreateProfileForm({ handleSubmit }) {
  return (
    <div className="form-container  p-2 pt-0 rounded ">
      <h4 className="text-light text-center">Create Company Profile</h4>
      <Formik
        initialValues={{
          companyName: "",
          email: "",
          address: "",
          contact: "",
          location: "",
        }}
        validationSchema={Yup.object().shape({
          companyName: Yup.string().required("Company name is required"),
          email: Yup.string()
            .required("Email is required")
            .email("Email is not valid"),
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
              <label htmlFor="companyName" className="form-label text-light">
                CompanyName
              </label>
              <input
                id="companyName"
                type="text"
                name="companyName"
                required
                autoFocus
                className="form-control"
                aria-describedby="userHelp"
                value={values.companyName}
                onChange={handleChange}
              />
              <span className="text-danger">
                {touched.companyName ? errors.companyName : ""}
              </span>
            </div>{" "}
            <div className="mb-1 ">
              <label htmlFor="email" className="form-label text-light">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoFocus
                className="form-control"
                aria-describedby="emailHelp"
                value={values.email}
                onChange={handleChange}
              />
              <span className="text-danger">
                {touched.email ? errors.email : ""}
              </span>
            </div>{" "}
            <div className="mb-1">
              <label htmlFor="address" className="form-label text-light">
                Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                autoFocus
                className="form-control"
                value={values.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="location" className="form-label text-light">
                Location
              </label>
              <input
                id="location"
                type="text"
                name="location"
                autoFocus
                className="form-control"
                value={values.location}
                onChange={handleChange}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="contact" className="form-label text-light">
                Contact Number
              </label>
              <input
                id="contact"
                type="tel"
                name="contact"
                autoFocus
                className="form-control"
                value={values.contact}
                onChange={handleChange}
              />
            </div>
            <div className=" d-grid mt-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn  btn-primary  p-2 "
              >
                {isSubmitting ? (
                  <div className=" spinner-border text-light"></div>
                ) : (
                  "Create Profile"
                )}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
