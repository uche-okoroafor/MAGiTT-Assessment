import React, { useState, useCallback } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SnackBarContext } from "./SnackBarContext";
import { fetchAllUser } from "../helpers/Apis/user";
import { useLocation } from "react-router-dom";

/**
 * this Component is for state management of all user data
 *
 * @component
 * @param UsersContextProps
 * @returns {FunctionStringCallback}
 */

const UsersContext = React.createContext();

const UsersProvider = (props) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const { pathname } = useLocation();

  // updateUsers updates users from the database

  const updateUsers = (data) => {
    setUsers(data);
  };
  // handleFetchUsers makes an api request to get all users

  const handleFetchUsers = useCallback(async () => {
    fetchAllUser().then((data) => {
      if (data.error) {
        console.error({ error: data.error });
      } else if (data.success) {
        updateUsers(data.users);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    handleFetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        updateUsers,
        handleFetchUsers,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export { UsersContext, UsersProvider };
