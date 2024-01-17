import { MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleHeaderMenu } from "../slices/header/headerSlice";

export default function Header() {
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { headerMenu } = useSelector((store) => store.header);
  return (
    <div className="header-container  border border-slate-300 bg-slate-100 p-2 flex justify-between items-center">
      <h3 className="brand-logo font-serif text-2xl text-purple-600">
        Connectify
      </h3>

      <div className="header-right flex justify-between items-center space-x-4 p-1">
        <MdLightMode size="1.7em" />

        <div className="relative">
          <div
            className="Username flex items-center border border-slate-600 p-1 rounded-full cursor-pointer"
            onClick={() => dispatch(toggleHeaderMenu())}
          >
            <p className="username-initial mx-2">{username && username[0]}</p>
            {headerMenu.isEnabled ? (
              <div className="usermenu absolute right-0 top-10 bg-white border border-slate-300 rounded w-40 shadow-md">
                <button
                  className="block p-2 border-b border-slate-200 w-full text-left cursor-pointer"
                  onClick={() => navigate(`/users/${userId}/profile`)}
                >
                  View profile
                </button>
                <button
                  className="block p-2 border-b border-slate-200 w-full text-left cursor-pointer"
                  onClick={() => navigate("/bookmarks")}
                >
                  Bookamarks
                </button>
                <button className="block p-2 border-b border-slate-200 w-full text-left cursor-pointer">
                  Delete account
                </button>
                <button className="block p-2 border-b border-slate-200 w-full text-left cursor-pointer">
                  Feedback
                </button>
                <button className="block p-2 border-b border-slate-200 w-full text-left cursor-pointer">
                  About us
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
