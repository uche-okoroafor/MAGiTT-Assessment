import React from "react";

/**
 *  This Component takes an array as props an render a list
 *
 * @component
 * @param UserListProps
 * @returns {JSX.Element}
 */

export default function UsersList({
  handleButtonAction,
  buttonTitle,
  users,
  isSubmitting,
  displayUser,
}) {
  return (
    <>
      <ul className="list-group  ">
        {" "}
        {users.map(
          (user) =>
            displayUser(user) && (
              <li
                className=" company-list list-group-item mb-3 rounded"
                key={user._id}
              >
                <div className="d-flex ">
                  <div className="w-25 d-flex justify-content-center align-item-center">
                    <img
                      className="rounded"
                      src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                      alt="briefcase"
                    />
                  </div>
                  <div className="ml-4 flex-grow-1">
                    {" "}
                    <div className="m-2">
                      <i className="mx-2 bi bi-building"></i>
                      <span>{user.username}</span>
                    </div>
                    <div className="m-2">
                      {" "}
                      <i className="mx-2 bi bi-geo-alt-fill"></i>
                      <span>{user.occupation}</span>
                    </div>
                    <div className="m-2">
                      {" "}
                      <i className="mx-2 bi bi-envelope-fill"></i>
                      <span>{user.email}</span>
                    </div>
                    <div className="m-2 d-flex justify-content-end">
                      {" "}
                      <button
                        onClick={() => handleButtonAction(user)}
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {buttonTitle}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            )
        )}
      </ul>
    </>
  );
}
