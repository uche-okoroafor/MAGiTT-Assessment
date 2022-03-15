import React from "react";

/**
 *  This Component takes an array as props an render a list
 *
 * @component
 * @param CompaniesListProps
 * @returns {JSX.Element}
 */

export default function CompaniesList({
  handleButtonAction,
  buttonTitle,
  companies,
  isSubmitting,
}) {
  return (
    <>
      {companies.length === 0 ? (
        <h5 className="text-light text-center pt-5">
          This company does not have any connection{" "}
        </h5>
      ) : (
        <ul className="list-group  ">
          {" "}
          {companies.map((company) => (
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
                    <button
                      onClick={() => handleButtonAction(company)}
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {buttonTitle}
                    </button>{" "}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
