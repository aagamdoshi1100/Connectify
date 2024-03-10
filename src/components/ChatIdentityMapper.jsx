import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSenderRecipientDetails } from "../slices/Chat/chatSlice";

export default function ChatIdentityMapper({ user }) {
  const { recipientDetails, userChats } = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const senderId = localStorage.getItem("userId");

  const navigateToUserChat = () => {
    dispatch(
      setSenderRecipientDetails({
        senderId,
        recipientId: recipientDetails._id,
      })
    );
    navigate(`/message-view/${recipientDetails._id}/`);
  };

  return (
    <div
      className="icon-username flex items-center justify-between bg-white shadow-md border-white border rounded-md p-3 m-2"
      onClick={navigateToUserChat}
    >
      <div className="username-userIcon flex">
        <div className="user-icon-profile border w-11 h-11 rounded-full  overflow-hidden">
          <img
            src={
              recipientDetails?.profileIcon === ""
                ? "../../Profile-Image-Default.jpg"
                : recipientDetails?.profileIcon
            }
            className="profileImage w-full h-full"
            alt="profile"
          />
        </div>
        <div className="ml-2">
          <p className="font-[500] text-sm">{`${recipientDetails?.username}`}</p>
          <p className="lastchat-message text-slate-600 text-sm whitespace-nowrap overflow-hidden text-ellipsis w-[60vw] lg:w-[15vw]">
            {userChats.length > 0 && userChats[userChats.length - 1].message}
          </p>
        </div>
      </div>
      <div className="flex">
        <p className="lastchat-time text-slate-600 text-[12px]">
          {userChats.length > 0 && userChats[userChats.length - 1].time}
        </p>
      </div>
    </div>
  );
}
