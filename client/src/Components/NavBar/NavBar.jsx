import React, { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { CompanyContext } from "../../Contexts/CompanyContext";

/**
 * Navigation bar,for easy navigation
 * @component
 * @param NavBar
 * @returns {JSX.Element}
 */

export default function NavBar() {
  const navigate = useNavigate();
  const { logout, loggedInUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [createdCompanyId, setCreatedCompanyId] = useState("");

  const { handleFetchCompanyData } = useContext(CompanyContext);

  useEffect(() => {
    if (loggedInUser) {
      setUsername(loggedInUser.username);
      setCreatedCompanyId(loggedInUser.createdCompanyId);
    }
  }, [loggedInUser]);

  return (
    <>
      (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-primary "
        style={{
          position: "fixed",
          left: "0",
          top: "0",
          width: "100%",
          zIndex: 1,
        }}
      >
        <div className="container-fluid">
          <h6
            onClick={() => navigate("/home")}
            className=" navbar-brand my-2 text-light"
          >
            MAGNiTT
          </h6>

          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div
            className="collapse navbar-collapse ml-2"
            id="navbarButtonsExample"
          >
            <ul className="navbar-nav me-auto mb-2  ml-3 mb-lg-0">
              <li className="nav-item">
                <button
                  className="btn nav-link text-light"
                  onClick={() => navigate("/home")}
                >
                  <i className="bi bi-house-fill ml-4"></i> Home
                </button>
              </li>
            </ul>

            <div className="d-flex align-items-center ">
              {createdCompanyId && (
                <button
                  onClick={() => handleFetchCompanyData(createdCompanyId, true)}
                  className="px-3 me-2 btn btn-success "
                >
                  {" "}
                  <i className="mx-2 bi bi-building "> </i>My Company Profile{" "}
                </button>
              )}

              <button
                type="button"
                onClick={() => navigate("/create/profile")}
                className="btn btn-success px-3 me-2"
              >
                Create a Company Profile
              </button>

              <span className="btn me-3 px-3 text-light font-2 d-flex align-items-center">
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: "25px" }}
                ></i>
                &nbsp;
                {username}{" "}
              </span>

              <button
                type="button"
                onClick={() => logout()}
                className="btn btn-danger "
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      )
    </>
  );
}
