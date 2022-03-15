import React, { useState, useContext, useMemo } from "react";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logoutAPI from "../helpers/Apis/logout";
import loginWithCookies from "../helpers/Apis/loginWithCookies";
import { useLocation } from "react-router-dom";
import { SnackBarContext } from "./SnackBarContext";

/**
 * State management for logged in user
 * @component
 * @param AuthContext
 * @returns {JSX.Element}
 */
const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const { pathname } = useLocation();
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const navigate = useNavigate();

  const updateLoginContext = useCallback(
    (data, loadHomeRoute = true) => {
      setLoggedInUser(data.user);
      if (loadHomeRoute) {
        navigate("/home");
      }
    },
    [navigate]
  );
  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        navigate("/login");
        setLoggedInUser(null);
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then((data) => {
        if (data.success) {
          updateSnackBarMessage("Welcome");
          updateLoginContext(data.success);
        } else {
          setLoggedInUser(null);
          navigate("/login");
        }
      });
    };
    checkLoginWithCookies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logout,
        updateLoginContext,
        loggedInUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
