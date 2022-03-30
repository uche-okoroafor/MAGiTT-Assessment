import React, { useContext, useEffect, useCallback } from "react";
import { useState } from "react";
import { SnackBarContext } from "../../Contexts/SnackBarContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { CompanyContext } from "../../Contexts/CompanyContext";
import { UsersContext } from "../../Contexts/UsersContext";
import Search from "../../Components/Search/Search";
import Companies from "./Companies/Companies";
import Connections from "./Connections/Connections";
import AddUsers from "./AddUsers/AddUsers";
import { addUserToCompany } from "../../helpers/Apis/company";

import Users from "./Users/Users";

/**
 *  This Component renders the profile page
 *
 * @component
 * @param ProfileProps
 * @returns {JSX.Element}
 */

export default function Profile() {
  const [displayUsers, setDisplayUsers] = useState(false);
  const [displayConnections, setDisplayConnections] = useState(false);
  const [displayCompanies, setDisPlayCompanies] = useState(true);
  const [displayAddUsers, setDisplayAddUsers] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const [removeNavButton, setRemoveNavButton] = useState(true);

  const { handleFetchUsers } = useContext(UsersContext);
  const { loggedInUser } = useContext(AuthContext);

  const { handleFetchAllCompany, companyData, handleFetchCompanyData } =
    useContext(CompanyContext);

  const handleAddUserToCompany = useCallback((user) => {
    addUserToCompany({
      username: user.username,
      userId: user._id,
      occupation: user.occupation,
      email: user.email,
      companyName: companyData.companyName,
      companyId: companyData._id,
    }).then((data) => {
      if (data.error) {
        console.error({ error: data.error });
        updateSnackBarMessage(
          data.error.message ? data.error.message : data.error
        );
      } else if (data.success) {
        handleFetchCompanyData(companyData._id);
        updateSnackBarMessage("user successfully added");
      } else {
        // should not get here from backend but this catch is for an unknown issue can be displayed
        console.error({ data });
        updateSnackBarMessage("An unexpected error occurred. Please try again");
      }
    });
  }, []);

  useEffect(() => {
    handleFetchAllCompany();
    handleFetchUsers();
  }, []);

  const toggleDisplay = (params) => {
    switch (params) {
      case "users":
        setDisplayUsers(true);
        setDisplayConnections(false);
        setDisPlayCompanies(false);
        setDisplayAddUsers(false);
        setDisplaySearch(false);

        return;

      case "Connections":
        setDisplayUsers(false);
        setDisplayConnections(true);
        setDisPlayCompanies(false);
        setDisplayAddUsers(false);
        setDisplaySearch(false);

        return;

      case "Requests":
        setDisplayUsers(false);
        setDisplayConnections(false);
        setDisPlayCompanies(true);
        setDisplayAddUsers(false);
        setDisplaySearch(false);

        return;

      case "Add Users":
        setDisplayUsers(false);
        setDisplayConnections(false);
        setDisPlayCompanies(false);
        setDisplayAddUsers(true);
        setDisplaySearch(false);
        return;

      case "search":
        setDisplayUsers(false);
        setDisplayConnections(false);
        setDisPlayCompanies(false);
        setDisplayAddUsers(false);
        setDisplaySearch(true);

        return;

      default:
        break;
    }
  };

  return (
    <>
      <div
        className="d-flex position-fixed  w-100  "
        style={{
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          className="w-40  h-100 button-container   position-relative"
          style={{ background: "rgb(6 6 6 / 80%)", width: "40%" }}
        >
          {removeNavButton && (
            <div className="d-flex  flex-wrap profile-btn  ">
              <button
                className={
                  displayUsers
                    ? "btn btn-success  flex-grow-1"
                    : "btn btn-primary  flex-grow-1"
                }
                onClick={() => toggleDisplay("users")}
              >
                Users
              </button>
              <button
                className={
                  displayConnections ? "btn btn-success " : "btn btn-primary "
                }
                onClick={() => toggleDisplay("Connections")}
              >
                Connections
              </button>
              <button
                className={
                  displayCompanies ? "btn btn-success" : "btn btn-primary"
                }
                onClick={() => toggleDisplay("Requests")}
              >
                Requests
              </button>

              <button
                className={
                  displayAddUsers ? "btn btn-success" : "btn btn-primary"
                }
                onClick={() => toggleDisplay("Add Users")}
              >
                Add Users
              </button>
              <button
                className={
                  displaySearch ? "btn btn-success" : "btn btn-primary"
                }
                onClick={() => toggleDisplay("search")}
              >
                Search
              </button>
            </div>
          )}

          <div className="d-flex flex-column align-items-center pt-4">
            <div className="my-2 ">
              <img
                src="https://res.cloudinary.com/dkljdspcd/image/upload/v1647182529/one-gusset-briefcase-leather-gold-finishes-tobacco-brown-191400_02_zluh3l.webp"
                alt=""
                style={{
                  height: "100px",
                  width: "100px",
                  borderRadius: "50%",
                }}
              />
            </div>

            <div className="my-2 d-flex justify-content-space-between  ">
              <i className="mx-2  text-light bi bi-building"></i>

              <h5 className="text-light">{companyData.companyName}</h5>
            </div>
            <div
              className="my-2 d-flex justify-content-center  px-4 "
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "90%",
              }}
            >
              <i className="mx-2  text-light bi bi-person-rolodex"></i>

              <h5 className="text-light ">{companyData.address}</h5>
            </div>
            <div className="my-2 d-flex justify-content-space-between ">
              <i className="mx-2  text-light bi bi-geo-alt-fill"></i>

              <h5 className="text-light">{companyData.location}</h5>
            </div>
            <div className="my-2 d-flex justify-content-space-between ">
              <i className="mx-2  text-light bi bi-envelope-fill"></i>

              <h5 className="text-light">{companyData.email}</h5>
            </div>
            <div className="my-2 d-flex justify-content-space-between ">
              <span className="text-light">
                connections&nbsp; {companyData.connections.length}
              </span>
              &nbsp; &nbsp;
              <span className="text-light">
                Users &nbsp; {companyData.users.length}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-content  d-flex justify-content-center  h-100 p-4  top-0 end-0 position-absolute  ">
          {displayCompanies && <Companies />}
          {displayConnections && <Connections />}
          {displayAddUsers && (
            <AddUsers handleAddUserToCompany={handleAddUserToCompany} />
          )}
          {displayUsers && <Users />}
          {displaySearch && (
            <Search handleAddUserToCompany={handleAddUserToCompany} />
          )}
        </div>
      </div>
    </>
  );
}
