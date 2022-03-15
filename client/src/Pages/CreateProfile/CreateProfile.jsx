import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createCompanyProfile } from "../../helpers/Apis/company";
import { SnackBarContext } from "../../Contexts/SnackBarContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { CompanyContext } from "../../Contexts/CompanyContext";
import CreateProfileForm from "./CreateProfileForm/CreateProfileForm";

/**
 * Component  is for creating company profile
 *
 * @component
 * @param CreateProfileProps
 * @returns {JSX.Element}
 */

export default function CreateProfile() {
  const navigate = useNavigate();
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const { loggedInUser, updateLoginContext } = useContext(AuthContext);
  const { updateCompanyData } = useContext(CompanyContext);

  const handleErrorMessage = (error) => {
    const errorMessage = error.message ? error.message : error;
    if (
      errorMessage.includes(" duplicate") &&
      errorMessage.includes(" email")
    ) {
      updateSnackBarMessage(
        "This email address has already been used to register another company.Please, change email address"
      );
    } else {
      updateSnackBarMessage(
        "This company name has already been used to register another company.Please, change company name"
      );
    }
  };

  const handleSubmit = (
    { companyName, address, email, contact, location },
    { setSubmitting }
  ) => {
    createCompanyProfile(
      companyName,
      address,
      email,
      contact,
      location,
      loggedInUser.username
    ).then((data) => {
      if (data.error) {
        console.error({ error: data.error });
        setSubmitting(false);

        handleErrorMessage(data.error);
      } else if (data.success) {
        const user = loggedInUser;
        user.createdCompanyId = data.companyData._id;
        updateCompanyData(data.companyData);
        updateLoginContext({ user }, false);
        navigate(`/profile/${companyName}`);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage("An unexpected error occurred. Please try again");
      }
    });
  };
  return (
    <div
      className="container-fluid d-flex justify-content-center pt-3 align-items-center"
      style={{ minWidth: "100vh" }}
    >
      <CreateProfileForm handleSubmit={handleSubmit} />
    </div>
  );
}
