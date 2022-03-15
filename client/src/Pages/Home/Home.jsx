import React, { useContext, useEffect } from "react";
import { CompanyContext } from "../../Contexts/CompanyContext";
import CompaniesList from "../../Components/CompaniesList/CompaniesList";
/**
 * this Component renders the homepage of the application
 *
 * @component
 * @param Home
 * @returns {JSX.Element}
 */

export default function Home() {
  const { handleFetchAllCompany, allCompany, handleFetchCompanyData } =
    useContext(CompanyContext);

  useEffect(() => {
    handleFetchAllCompany();
  }, []);

  const handleViewCompanyProfile = (company) => {
    handleFetchCompanyData(company._id, true);
  };

  return (
    <>
      {" "}
      <div className="Home-container  container-fluid d-flex justify-content-center pt-5  align-items-center ">
        <div style={{ width: "60%" }}>
          {allCompany.length ? (
            <CompaniesList
              handleButtonAction={handleViewCompanyProfile}
              buttonTitle={"View Profile"}
              companies={allCompany}
              isSubmitting={false}
            />
          ) : (
            <h4 className="text-light">
              No company in the database, create a company
            </h4>
          )}
        </div>
      </div>
    </>
  );
}
