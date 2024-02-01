import { MdLogout } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showCompose } from "../slices/userfeed/userfeedSlice";
import { logout } from "../slices/footer/footerSlice";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { iconBlockStyle } from "../constants";

export default function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="footer-container fixed bottom-0 bg-white w-full border lg:border-2 border-slate-200 lg:border-white shadow-xl lg:w-[18%] lg:h-[100vh] z-30">
      <div className="footer-icon-container flex justify-around lg:flex-col lg:justify-normal lg:mt-20">
        <div className={iconBlockStyle} onClick={() => navigate("/")}>
          <AiOutlineHome size="2em" />
          <span className="icon-name hidden lg:pl-2 lg:inline-flex lg:text-2xl">
            Home
          </span>
        </div>

        <div className={iconBlockStyle} onClick={() => navigate("/bookmarks")}>
          <FaRegBookmark size="1.7em" />
          <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
            Bookamarks
          </span>
        </div>

        <div className={iconBlockStyle} onClick={() => dispatch(showCompose())}>
          <FaRegPlusSquare size="2em" />
          <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
            Post
          </span>
        </div>

        <div className={iconBlockStyle} onClick={() => navigate("/chats")}>
          <IoChatbubbleEllipsesOutline size="2em" />
          <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
            Chats
          </span>
        </div>

        <div className={iconBlockStyle} onClick={logoutHandler}>
          <MdLogout size="2em" />
          <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
            Log out
          </span>
        </div>
      </div>
    </div>
  );
}
