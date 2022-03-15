import React, { useContext } from "react";
import { SnackBarContext } from "../../Contexts/SnackBarContext";
import { AuthContext } from "../../Contexts/AuthContext";
import login from "../../helpers/Apis/login";
import LoginForm from "./LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";

/**
 *  this Component renders the login page
 *
 * @component
 * @param LoginProps
 * @returns {JSX.Element}
 */

export default function Login() {
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const { updateLoginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = ({ email, password }, { setSubmitting }) => {
    setSubmitting(true);
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(
          data.error.message ? data.error.message : data.error
        );
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        setSubmitting(false);
        updateSnackBarMessage("An unexpected error occurred. Please try again");
      }
    });
  };

  return (
    <>
      <div
        id="login"
        className="login-container container-fluid p-0  border d-flex align-items-center justify-content-center"
      >
        <div className="login-header position-fixed container-fluid t-0 p-3  top-0 start-0 d-flex justify-content-space-between ">
          <div>
            <h4 className="text-light">MAGNITT</h4>
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/sign-up")}
            >
              Create account
            </button>
          </div>
        </div>
        <LoginForm handleSubmit={handleSubmit} />
      </div>
    </>
  );
}
