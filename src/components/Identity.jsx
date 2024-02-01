import { useNavigate } from "react-router-dom";

export default function Identity({ user }) {
  const { _id, profileIcon, username, firstname, lastname } = user;
  const navigate = useNavigate();
  return (
    <div
      className="icon-username flex items-center m-1 "
      onClick={() => navigate(`/users/${_id}/profile`)}
    >
      <div className="user-icon-profile border w-12 h-12 rounded-full  overflow-hidden">
        <img
          src={
            profileIcon === "" ? "../../Profile-Image-Default.jpg" : profileIcon
          }
          className="profileImage w-full h-full"
          alt="profile"
        />
      </div>
      <div className="ml-2">
        <p className="fullname font-light font-[system-ui]">{`${firstname} ${lastname}`}</p>
        <p className="username text-slate-400">@{username}</p>
      </div>
    </div>
  );
}
