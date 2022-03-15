import React, { useContext, useEffect } from "react";
import { useState } from "react";
import signUp from "../../../helpers/Apis/signUp";
import { SnackBarContext } from "../../../Contexts/SnackBarContext";
import { CompanyContext } from "../../../Contexts/CompanyContext";
import { removeUser } from "../../../helpers/Apis/company";
import UsersList from "../../../Components/UsersList/UsersList";
/**
 *  This Component renders  all users added  to the current company
 *
 * @component
 * @param UsersProps
 * @returns {JSX.Element}
 */

export default function Users() {
  const [isSubmitting, setSubmitting] = useState(false);
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const { companyData, handleFetchCompanyData } = useContext(CompanyContext);

  const handleRemoveUser = (user) => {
    setSubmitting(true);
    removeUser({
      userId: user.userId,
      companyId: companyData._id,
    }).then((data) => {
      if (data.error) {
        setSubmitting(false);

        console.error({ error: data.error });
        updateSnackBarMessage(
          data.error.message ? data.error.message : data.error
        );
      } else if (data.success) {
        setSubmitting(false);

        handleFetchCompanyData(companyData._id);
        updateSnackBarMessage("User successfully removed");
      } else {
        setSubmitting(false);

        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage("An unexpected error occurred. Please try again");
      }
    });
  };

  const handleDisplayUser = (user) => {
    return true;
  };
  return (
    <>
      <div className=" companies">
        {companyData.users.length < 1 ? (
          <h5 className="text-light text-center pt-5">
            No user on this company, users list{" "}
          </h5>
        ) : (
          <UsersList
            handleButtonAction={handleRemoveUser}
            buttonTitle={"Remove User"}
            users={companyData.users}
            isSubmitting={isSubmitting}
            displayUser={handleDisplayUser}
          />
        )}
      </div>
    </>
  );
}
