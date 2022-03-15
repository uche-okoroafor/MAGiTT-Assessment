import React, { useContext } from "react";
import signUp from "../../helpers/Apis/signUp";
import { SnackBarContext } from "../../Contexts/SnackBarContext";
import { AuthContext } from "../../Contexts/AuthContext";
import SignUpForm from "./SignUpForm/SignUpForm";
import { useNavigate } from "react-router-dom";

/**
 *  This Component renders the SignUp page
 *
 * @component
 * @param SignUpProps
 * @returns {JSX.Element}
 */

export default function SignUp() {
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const { updateLoginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (
    { email, password, occupation, username },
    { setSubmitting }
  ) => {
    setSubmitting(true);
    signUp(username, email, password,occupation).then((data) => {
      if (data.error) {
        console.error({ error: data.error });
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
    <div
      id="login"
      className="login-container container-fluid  border d-flex align-items-center justify-content-center"
    >
      <div className="login-header position-fixed container-fluid t-0 p-3  top-0 start-0 d-flex justify-content-space-between ">
        <div>
          <h4 className="text-light">MAGNITT</h4>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
      <SignUpForm handleSubmit={handleSubmit} />
    </div>
  );
}
