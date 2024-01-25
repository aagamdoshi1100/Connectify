import { useNavigate } from "react-router-dom";

export default function IdentityForChats({ user }) {
  const { _id, userDetails, lastChat } = user;
  const navigate = useNavigate();
  const navigationHandler = () => {
    localStorage.setItem("userProfile", JSON.stringify(userDetails));
    navigate("/user-chat");
  };

  return (
    <div
      className="icon-username flex items-center justify-between m-2 "
      onClick={navigationHandler}
    >
      <div className="username-userIcon flex">
        <div className="user-icon-profile border border-slate-600 w-10 h-11 rounded-full  overflow-hidden">
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
          <p className="username text-slate-600">{lastChat.message}</p>
        </div>
      </div>
      <div className="flex">
        <p className="username text-slate-600">{lastChat.time}</p>
      </div>
    </div>
  );
}
