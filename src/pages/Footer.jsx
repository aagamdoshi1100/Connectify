import { IoIosLogOut } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { CiBookmark } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showCompose } from "../slices/userfeed/userfeedSlice";
import { logout } from "../slices/footer/footerSlice";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { setSenderRecipientDetails } from "../slices/Chat/chatSlice";

export default function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUserId = localStorage.getItem("userId");
  const location = useLocation();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  const navigateToChats = () => {
    dispatch(
      setSenderRecipientDetails({
        senderId: loggedUserId,
        recipientId: loggedUserId,
      })
    );
    navigate("/chat-view");
  };

  return (
    <div className="footer-container fixed bottom-0 bg-white border md:border-2 border-slate-200 md:border-white shadow-xl w-[100vw] md:w-[25%] md:h-[100vh] z-20">
      <div className="footer-icon-container flex justify-around md:flex-col md:justify-normal md:mt-20">
        {/* Home */}
        <div
          className={
            location.pathname === "/"
              ? "border-b-4 md:border-b-0 md:border-l-8 border-purple-500 bg-slate-100"
              : "" + " md:border-l-8 md:border-white  hover:border-purple-500"
          }
        >
          <div
            className="icon-block flex cursor-pointer p-3 md:border md:border-white md:p-3 hover:bg-slate-100 md:hover:shadow-md"
            onClick={() => navigate("/")}
          >
            <AiOutlineHome size="1.8em" className="md:text-slate-500" />
            <span className="icon-name hidden ml-4 md:inline-flex md:text-md font-serif">
              Home
            </span>
          </div>
        </div>
        {/* Bookmarks */}
        <div
          className={
            location.pathname === "/bookmarks"
              ? "border-b-4 md:border-b-0 md:border-l-8 border-purple-500 bg-slate-100"
              : "" + " md:border-l-8 md:border-white  hover:border-purple-500"
          }
        >
          <div
            className="icon-block flex cursor-pointer p-3 md:border md:border-white md:p-3 hover:bg-slate-100 md:hover:shadow-md"
            onClick={() => navigate("/bookmarks")}
          >
            <CiBookmark size="1.7em" className="md:text-slate-500" />
            <span className="icon-name hidden md:inline-flex ml-4 md:text-md font-serif">
              Bookmarks
            </span>
          </div>
        </div>
        {/* Create post */}
        <div className="md:border-l-8 border-white md:hover:border-l-8 hover:border-purple-500">
          <div
            className=" icon-block flex cursor-pointer p-3 md:border md:border-white md:p-3 hover:bg-slate-100 md:hover:shadow-md "
            onClick={() => dispatch(showCompose())}
          >
            <VscDiffAdded size="1.8em" className="md:text-slate-500" />
            <span className="icon-name hidden md:inline-flex ml-4 md:text-md font-serif">
              Post
            </span>
          </div>
        </div>
        {/* Chats */}
        <div
          className={
            location.pathname === "/chat-view"
              ? "border-b-4 md:border-b-0 md:border-l-8 border-purple-500 bg-slate-100"
              : "" + " md:border-l-8 md:border-white  hover:border-purple-500"
          }
        >
          <div
            className="icon-block flex cursor-pointer p-3 md:border md:border-white md:p-3 hover:bg-slate-100 md:hover:shadow-md"
            onClick={navigateToChats}
          >
            <IoChatbubbleEllipsesOutline
              size="1.8em"
              className="md:text-slate-500"
            />
            <span className="icon-name hidden md:inline-flex ml-4 md:text-md font-serif">
              Chats
            </span>
          </div>
        </div>
        {/* Logout */}
        <div className="md:border-l-8 border-white md:hover:border-l-8 hover:border-purple-500">
          <div
            className=" icon-block flex cursor-pointer p-3 md:border md:border-white md:p-3 hover:bg-slate-100 md:hover:shadow-md "
            onClick={logoutHandler}
          >
            <IoIosLogOut size="1.8em" className="md:text-slate-500" />
            <span className="icon-name hidden md:inline-flex ml-4 md:text-md font-serif">
              Log out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
