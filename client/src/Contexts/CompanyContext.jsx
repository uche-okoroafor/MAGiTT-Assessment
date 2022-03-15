import React, { useState } from "react";
import { useContext, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { SnackBarContext } from "./SnackBarContext";
import { useNavigate } from "react-router-dom";
import { fetchAllCompany, fetchCompanyData } from "../helpers/Apis/company";

/**
 * this Component is for state management of  the current company and all companies  data
 *
 * @component
 * @param CompanyContextProps
 * @returns {FunctionStringCallback}
 */

const CompanyContext = React.createContext();

const CompanyProvider = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [allCompany, setAllCompany] = useState([]);
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const navigate = useNavigate();

  const updateCompanyData = useCallback(
    (data) => {
      setCompanyData(data);
    },
    [setCompanyData]
  );
  const handleFetchCompanyData = useCallback(
    (companyId, loadPage = false) => {
      fetchCompanyData(companyId).then((data) => {
        if (data.error) {
          console.error({ error: data.error });
          updateSnackBarMessage(
            data.error.message ? data.error.message : data.error
          );
        } else if (data.success) {
          updateCompanyData(data.companyData);
          if (loadPage) {
            navigate(`/profile/${data.companyData.companyName}`);
          }
        } else {
          // should not get here from backend but this catch is for an unknown issue
          console.error({ data });

          updateSnackBarMessage(
            "An unexpected error occurred. Please try again"
          );
        }
      });
    },
    [updateCompanyData]
  );
  // handleFetchAllCompany makes an api request to get all the companies from the database
  const handleFetchAllCompany = useCallback(() => {
    fetchAllCompany().then((data) => {
      if (data.error) {
        console.error({ error: data.error });
        updateSnackBarMessage(
          data.error.message ? data.error.message : data.error
        );
      } else if (data.success) {
        setAllCompany(data.allCompany);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        updateSnackBarMessage("An unexpected error occurred. Please try again");
      }
    });
  }, [updateSnackBarMessage]);

  return (
    <CompanyContext.Provider
      value={{
        isLoading,
        allCompany,
        companyData,
        updateCompanyData,
        handleFetchAllCompany,
        handleFetchCompanyData,
      }}
    >
      {props.children}
    </CompanyContext.Provider>
  );
};

export { CompanyContext, CompanyProvider };
