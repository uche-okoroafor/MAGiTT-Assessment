import React, { useContext, useState } from "react";
import { SnackBarContext } from "../../../Contexts/SnackBarContext";
import { CompanyContext } from "../../../Contexts/CompanyContext";
import {
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
} from "../../../helpers/Apis/company";

/**
 *  This Component renders  all companies that is not connected to the  current company
 *
 * @component
 * @param Companiesprops
 * @returns {JSX.Element}
 */

export default function Companies() {
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const { allCompany, companyData, handleFetchCompanyData } =
    useContext(CompanyContext);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSendConnectionRequest = (company) => {
    setSubmitting(true);
    sendConnectionRequest({
      requesterName: companyData.companyName,
      requesterId: companyData._id,
      requesterAddress: companyData.address,
      requesterLocation: companyData.location,
      recipientName: company.companyName,
      recipientId: company._id,
      recipientAddress: company.address,
      recipientLocation: company.location,
    }).then((data) => {
      if (data.error) {
        setSubmitting(false);
        console.error({ error: data.error });
        updateSnackBarMessage(
          data.error.message ? data.error.message : data.error
        );
      } else if (data.success) {
        setSubmitting(false);
        handleFetchCompanyData(companyData._id);
        updateSnackBarMessage("Connection Request Successfully sent");
      } else {
        setSubmitting(false);
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        updateSnackBarMessage("An unexpected error occurred. Please try again");
      }
    });
  };

  const handleAcceptConnectionRequest = (request) => {
    setSubmitting(true);

    acceptConnectionRequest(request).then((data) => {
      if (data.error) {
        setSubmitting(false);
        console.error({ error: data.error });
        updateSnackBarMessage(
          data.error.message ? data.error.message : data.error
        );
      } else if (data.success) {
        setSubmitting(false);
        handleFetchCompanyData(companyData._id);
        updateSnackBarMessage("Connection Request accepted");
      } else {
        setSubmitting(false);
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        updateSnackBarMessage("An unexpected error occurred. Please try again");
      }
    });
  };

  const handleRejectConnectionRequest = (request) => {
    setSubmitting(true);

    rejectConnectionRequest(request).then((data) => {
      if (data.error) {
        setSubmitting(false);
        console.error({ error: data.error });
        updateSnackBarMessage(
          data.error.message ? data.error.message : data.error
        );
      } else if (data.success) {
        setSubmitting(false);
        handleFetchCompanyData(companyData._id);
        updateSnackBarMessage("Connection Request Successfully cancelled");
      } else {
        setSubmitting(false);
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        updateSnackBarMessage("An unexpected error occurred. Please try again");
      }
    });
  };

  const handleRequestButton = (company) => {
    const filterSentRequest = companyData.connectionRequests.find(
      (request) =>
        request.requesterId === companyData._id &&
        request.recipientId === company._id
    );

    if (filterSentRequest) {
      return (
        <span
          style={{ cursor: "default" }}
          className="btn bg-success text-light m-2"
        >
          Request Sent
        </span>
      );
    }
    let requestDetails = {};
    const filterReceivedRequest = companyData.connectionRequests.find(
      (request) => {
        if (
          request.requesterId === company._id &&
          request.recipientId === companyData._id
        ) {
          requestDetails = request;
          return true;
        }
        return false;
      }
    );

    if (filterReceivedRequest) {
      return (
        <>
          <button
            onClick={() => handleRejectConnectionRequest(requestDetails)}
            className="btn btn-danger m-2"
            disabled={isSubmitting}
          >
            Reject Connection
          </button>
          <button
            onClick={() => handleAcceptConnectionRequest(requestDetails)}
            className="btn btn-primary m-2"
            disabled={isSubmitting}
          >
            Accept Connection
          </button>
        </>
      );
    }

    return (
      <button
        onClick={() => handleSendConnectionRequest(company)}
        className="btn btn-primary m-2"
        disabled={isSubmitting}
      >
        Request Connection
      </button>
    );
  };

  const removeCurrentCompany = (company) => {
    if (company._id === companyData._id) {
      return false;
    }
    return true;
  };

  const removeConnectedCompany = (company) => {
    const findConnectedCompany = companyData.connections.find(
      (connection) => connection.companyId === company._id
    );
    if (findConnectedCompany) {
      return false;
    }
    return true;
  };

  return (
    <div className=" companies ">
      {allCompany.length < 1 ? (
        <h5 className="text-light text-center  pt-5">This list is empty </h5>
      ) : (
        <ul className="list-group   ">
          {" "}
          {allCompany.map(
            (company) =>
              removeCurrentCompany(company) &&
              removeConnectedCompany(company) && (
                <li
                  className=" company-list list-group-item mb-3 rounded"
                  key={company._id}
                >
                  <div className="d-flex ">
                    <div className="w-25 d-flex justify-content-center align-item-center">
                      <img
                        className="rounded"
                        src="https://res.cloudinary.com/dkljdspcd/image/upload/v1647182529/one-gusset-briefcase-leather-gold-finishes-tobacco-brown-191400_02_zluh3l.webp"
                        alt="briefcase"
                      />
                    </div>
                    <div className="ml-4 flex-grow-1">
                      {" "}
                      <div className="m-2">
                        <i className="mx-2 bi bi-building"></i>
                        <span>{company.companyName}</span>
                      </div>
                      <div className="m-2">
                        {" "}
                        <i className="mx-2 bi bi-geo-alt-fill"></i>
                        <span>{company.location}</span>
                      </div>
                      <div className="m-2">
                        {" "}
                        <i className="mx-2 bi bi-person-rolodex"></i>
                        <span>{company.contact}</span>
                      </div>
                      <div className="m-2">
                        {" "}
                        <i className="mx-2 bi bi-envelope-fill"></i>
                        <span>{company.email}</span>
                      </div>
                      <div className="m-2 d-flex justify-content-end">
                        {" "}
                        {handleRequestButton(company)}
                      </div>
                    </div>
                  </div>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
}
