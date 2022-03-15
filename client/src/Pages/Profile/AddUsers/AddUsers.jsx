import React, { useContext } from "react";
import UsersList from "../../../Components/UsersList/UsersList";
import { CompanyContext } from "../../../Contexts/CompanyContext";
import { UsersContext } from "../../../Contexts/UsersContext";

/**
 *  this component renders list of users
 * @component
 * @param AddUsersProps
 * @returns {JSX.Element}
 */

export default function AddUsers({ handleAddUserToCompany, isSubmitting }) {
  const { companyData } = useContext(CompanyContext);
  const { users } = useContext(UsersContext);

  const removeConnectedUsers = (user) => {
    const findConnectedUser = companyData.users.find(
      (thisUser) => thisUser.userId === user._id
    );
    if (findConnectedUser) {
      return false;
    }
    return true;
  };

  return (
    <>
      <div className=" companies">
        {users.length < 1 ? (
          <h5 className="text-light text-center pt-5">
            There is no addable user on the list{" "}
          </h5>
        ) : (
          <UsersList
            handleButtonAction={handleAddUserToCompany}
            buttonTitle={"Add Users"}
            users={users}
            isSubmitting={isSubmitting}
            displayUser={removeConnectedUsers}
          />
        )}
      </div>
    </>
  );
}
