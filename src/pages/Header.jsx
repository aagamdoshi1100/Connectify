import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSearch, toggleHeaderMenu } from "../slices/header/headerSlice";
import Search from "../components/Search";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineSearchOff } from "react-icons/md";
import { useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";
import {
  manageConfirmationPage,
  manageFeedbackPage,
} from "../slices/users/usersSlices";

export default function Header() {
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerMenuRef = useRef(null);
  useClickOutside(headerMenuRef, () => dispatch(toggleHeaderMenu()));
  const { headerMenu, searchManager } = useSelector((store) => store.header);
  return (
    <div className="primary-header-container sticky top-0 w-full bg-white z-30">
      <div className="secondary-header-container  border-2 border-white shadow-lg flex justify-between items-center">
        <img
          src="../../connectify_logo.jpg"
          className="w-[50vw] lg:w-[20vw] h-14"
          alt="brand logo"
        />

        <div className="header-right flex justify-between items-center space-x-4 p-1 lg:pr-5">
          <div className="hidden lg:block">
            <Search />
          </div>
          <div
            className="icon-block flex cursor-pointer lg:m-3 lg:hidden"
            onClick={() => dispatch(toggleSearch())}
          >
            {searchManager.isEnabled ? (
              <MdOutlineSearchOff size="2em" />
            ) : (
              <IoMdSearch size="2em" />
            )}
            <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
              Search
            </span>
          </div>

          <div className="relative">
            <div
              className="Username flex items-center border border-slate-600 p-1 rounded-full cursor-pointer lg:p-1.5"
              onClick={() => dispatch(toggleHeaderMenu())}
            >
              <p className="username-initial mx-2">{username && username[0]}</p>
              {headerMenu.isEnabled ? (
                <div
                  className="usermenu absolute right-0 top-10 lg:top-11 bg-white border border-slate-300 rounded w-40 shadow-md"
                  ref={headerMenuRef}
                >
                  <button
                    className="block p-2 border-b border-slate-200 w-full text-left cursor-pointer"
                    onClick={() => navigate(`/users/${userId}/profile`)}
                  >
                    View profile
                  </button>
                  <button
                    className="block p-2 border-b border-slate-200 w-full text-left cursor-pointer"
                    onClick={() => dispatch(manageConfirmationPage())}
                  >
                    Delete account
                  </button>
                  <button
                    className="block p-2 border-b border-slate-200 w-full text-left cursor-pointer"
                    onClick={() => dispatch(manageFeedbackPage())}
                  >
                    Feedback
                  </button>
                  {/* <button className="block p-2 border-b border-slate-200 w-full text-left cursor-pointer">
                    About us
                  </button> */}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="header-search lg:hidden">
        {searchManager.isEnabled ? <Search /> : ""}
      </div>
    </div>
  );
}
