import { BiLogOut } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegPlusSquare } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showCompose } from "../slices/userfeed/userfeedSlice";
import { logout } from "../slices/footer/footerSlice";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="footer-container fixed bottom-0 w-full bg-white border border-slate-300 lg:border-white lg:w-[20%] lg:h-[88%]">
      <div className="footer-icon-container flex m-3 justify-around lg:flex-col lg:justify-normal lg:m-5">
        <div
          className="icon-block flex cursor-pointer lg:m-3"
          onClick={() => navigate("/")}
        >
          <AiOutlineHome size="2em" />
          <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
            Home
          </span>
        </div>

        <div className="icon-block flex cursor-pointer lg:m-3">
          <MdLightMode size="1.7em" />
          <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
            Day/Night
          </span>
        </div>

        <div
          className="icon-block flex cursor-pointer lg:m-3"
          onClick={() => dispatch(showCompose())}
        >
          <FaRegPlusSquare size="2em" />
          <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
            Post
          </span>
        </div>

        <div
          className="icon-block flex cursor-pointer lg:m-3"
          onClick={() => navigate("/bookmarks")}
        >
          <IoChatbubbleEllipsesOutline size="2em" />
          <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
            Chats
          </span>
        </div>

        <div
          className="icon-block flex cursor-pointer lg:m-3"
          onClick={logoutHandler}
        >
          <BiLogOut size="2em" />
          <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
            Log out
          </span>
        </div>
      </div>
    </div>
  );
}
