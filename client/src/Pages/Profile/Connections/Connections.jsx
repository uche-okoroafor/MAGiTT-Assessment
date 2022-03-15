import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { SnackBarContext } from "../../../Contexts/SnackBarContext";
import { useNavigate } from "react-router-dom";
import { CompanyContext } from "../../../Contexts/CompanyContext";
import { removeConnection } from "../../../helpers/Apis/company";
import CompaniesList from "../../../Components/CompaniesList/CompaniesList";
/**
 *  This Component renders  all companies connected  to the current company
 *
 * @component
 * @param ConnectionsProps
 * @returns {JSX.Element}
 */

export default function Connections() {
  const [isSubmitting, setSubmitting] = useState(false);
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const { companyData, handleFetchCompanyData } = useContext(CompanyContext);

  const handleRemoveConnection = (connection) => {
    setSubmitting(true);
    removeConnection({
      companyId: companyData._id,
      connectedCompanyId: connection.companyId,
      connectionId: connection._id,
    }).then((data) => {
      if (data.error) {
        setSubmitting(false);
        console.error({ error: data.error });
        updateSnackBarMessage(
          data.error.message ? data.error.message : data.error
        );
      } else if (data.success) {
        handleFetchCompanyData(companyData._id);
        updateSnackBarMessage("Connection  Successfully removed");
        setSubmitting(false);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage("An unexpected error occurred. Please try again");
        setSubmitting(false);
      }
    });
  };

  return (
    <div className=" companies">
      {companyData.connections.length === 0 ? (
        <h5 className="text-light text-center pt-5">
          This company does not have any connection{" "}
        </h5>
      ) : (
        <CompaniesList
          handleButtonAction={handleRemoveConnection}
          buttonTitle={"Remove Connection"}
          companies={companyData.connections}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
