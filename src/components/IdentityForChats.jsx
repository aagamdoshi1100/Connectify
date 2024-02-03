import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUserChatView } from "../slices/Chat/chatSlice";
import { findCurrentRoom } from "../slices/Chat/actions";

export default function IdentityForChats({ user }) {
  const { _id, userDetails, lastChat } = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigationHandler = () => {
    const loggedUserId = localStorage.getItem("userId");
    localStorage.setItem("userProfile", JSON.stringify(userDetails));
    dispatch(currentUserChatView(userDetails));
    dispatch(findCurrentRoom({ loggedUserId, targetUserId: userDetails._id }));
    navigate("/message-view");
  };

  return (
    <div
      className="icon-username flex items-center justify-between m-2 "
      onClick={navigationHandler}
    >
      <div className="username-userIcon flex">
        <div className="user-icon-profile border w-11 h-11 rounded-full  overflow-hidden">
          <img
            src={
              userDetails.profileIcon === ""
                ? "../../Profile-Image-Default.jpg"
                : userDetails.profileIcon
            }
            className="profileImage w-full h-full"
            alt="profile"
          />
        </div>
        <div className="ml-2">
          <p>{`${userDetails.username}`}</p>
          <p className="username text-slate-600">{lastChat?.message}</p>
        </div>
      </div>
      <div className="flex">
        <p className="username text-slate-600">{lastChat?.time}</p>
      </div>
    </div>
  );
}
