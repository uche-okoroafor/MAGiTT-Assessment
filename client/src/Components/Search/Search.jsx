import React, { useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { SnackBarContext } from "../../Contexts/SnackBarContext";
import { CompanyContext } from "../../Contexts/CompanyContext";
import { searchEmail } from "../../helpers/Apis/user";
import UsersList from "../UsersList/UsersList";
/**
 * Component  searches user by the email address
 *
 * @component
 * @param SearchProps
 * @returns {JSX.Element}
 */

export default function Search({ handleAddUserToCompany, isSubmitting }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const [searchResult, setSearchResult] = useState([]);
  const { companyData } = useContext(CompanyContext);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    searchEmail(debouncedSearch).then((data) => {
      if (data.error) {
        console.error({ error: data.error });
        updateSnackBarMessage(
          data.error.message ? data.error.message : data.error
        );
      } else if (data.success) {
        setSearchResult(data.users);
        if (!data.users.length) {
          updateSnackBarMessage("No result matched your search");
        }
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
      }
    });
  };

  useEffect(() => {
    if (!search) {
      return;
    }
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const removeConnectedUsers = (user) => {
    const findConnectedUser = companyData.users.find(
      (thisUser) => thisUser.userId === user._id
    );
    if (findConnectedUser) {
      return false;
    }
    return true;
  };

  const handleDisplayUser = (user) => {
    return true;
  };
  return (
    <div className="search-container">
      <div className="w-100 my-5 mt-2">
        {" "}
        <input
          type="text"
          placeholder="Search Users by email"
          className=" search-input input  rounded  w-100 p-2"
          onChange={handleChange}
        />
      </div>
      <div>
        <UsersList
          handleButtonAction={handleAddUserToCompany}
          buttonTitle={"Add Users"}
          users={searchResult}
          isSubmitting={isSubmitting}
          displayUser={handleDisplayUser}
        />
      </div>
    </div>
  );
}
