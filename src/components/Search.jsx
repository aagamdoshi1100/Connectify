import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Identity from "./Identity";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import {
  clearSearchResults,
  storeSearchKeywords,
} from "../slices/users/usersSlices";
import { searchHandler } from "../slices/users/actions";
import { toggleSearch } from "../slices/header/headerSlice";

export default function Search() {
  const dispatch = useDispatch();
  const searchData = useSelector((store) => store.users.search);
  useEffect(() => {
    if (searchData.searchText !== "") {
      const timeout = setTimeout(() => {
        dispatch(searchHandler(searchData.searchText));
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [searchData.searchText]);

  const toggleSearchBarAndClearInput = () => {
    dispatch(toggleSearch());
    dispatch(clearSearchResults());
  };

  return (
    <div className="search relative flex w-[100vw] items-center box-border p-2 lg:justify-center lg:w-[24vw] lg:p-0">
      <IoMdSearch
        className="search-icon absolute left-5 lg:left-3 text-gray-500"
        size="1.3em"
      />
      <input
        type="text"
        className="textbox p-2 lg:p-1 pl-8 lg:pl-10 border border-slate-400 rounded-lg flex-grow"
        placeholder="Search users..."
        value={searchData.searchText}
        onChange={(e) => dispatch(storeSearchKeywords(e.target.value))}
      />
      {searchData.searchText.length !== 0 && (
        <>
          <IoCloseOutline
            className="absolute right-5 lg:right-2"
            size="1.3em"
            onClick={() => dispatch(clearSearchResults())}
          />
          <div className="users absolute top-14 lg:top-9 bg-white w-[95vw] lg:w-[24vw]">
            {searchData.searches.map((user) => (
              <div
                className="user border border-slate-400 bg-white "
                key={user._id}
                onClick={toggleSearchBarAndClearInput}
              >
                <Identity user={user} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
