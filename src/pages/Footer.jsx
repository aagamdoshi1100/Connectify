import { IoIosLogOut } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { CiBookmark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showCompose } from "../slices/userfeed/userfeedSlice";
import { logout } from "../slices/footer/footerSlice";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { iconBlockStyle } from "../constants";
import { setSenderRecipientDetails } from "../slices/Chat/chatSlice";

export default function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUserId = localStorage.getItem("userId");

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
    <div className="footer-container fixed bottom-0 bg-white w-full border lg:border-2 border-slate-200 lg:border-white shadow-xl lg:w-[18%] lg:h-[100vh] z-30">
      <div className="footer-icon-container flex justify-around lg:flex-col lg:justify-normal lg:mt-20">
        <div className="lg:border-l-8 border-white lg:hover:border-l-8 hover:border-purple-500">
          <div className={iconBlockStyle} onClick={() => navigate("/")}>
            <AiOutlineHome size="1.8em" className="lg:text-slate-500" />
            <span className="icon-name hidden ml-4 lg:inline-flex lg:text-lg font-serif">
              Home
            </span>
          </div>
        </div>
        <div className="lg:border-l-8 border-white lg:hover:border-l-8 hover:border-purple-500">
          <div
            className={iconBlockStyle}
            onClick={() => navigate("/bookmarks")}
          >
            <CiBookmark size="1.7em" className="lg:text-slate-500" />
            <span className="icon-name hidden lg:inline-flex ml-4 lg:text-lg font-serif">
              Bookamarks
            </span>
          </div>
        </div>
        <div className="lg:border-l-8 border-white lg:hover:border-l-8 hover:border-purple-500">
          <div
            className={iconBlockStyle}
            onClick={() => dispatch(showCompose())}
          >
            <VscDiffAdded size="1.8em" className="lg:text-slate-500" />
            <span className="icon-name hidden lg:inline-flex ml-4 lg:text-lg font-serif">
              Post
            </span>
          </div>
        </div>
        <div className="lg:border-l-8 border-white lg:hover:border-l-8 hover:border-purple-500">
          <div className={iconBlockStyle} onClick={navigateToChats}>
            <IoChatbubbleEllipsesOutline
              size="1.8em"
              className="lg:text-slate-500"
            />
            <span className="icon-name hidden lg:inline-flex ml-4 lg:text-lg font-serif">
              Chats
            </span>
          </div>
        </div>
        <div className="lg:border-l-8 border-white lg:hover:border-l-8 hover:border-purple-500">
          <div className={iconBlockStyle} onClick={logoutHandler}>
            <IoIosLogOut size="1.8em" className="lg:text-slate-500" />
            <span className="icon-name hidden lg:inline-flex ml-4 lg:text-lg font-serif">
              Log out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
