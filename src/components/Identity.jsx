import { useNavigate } from "react-router-dom";

export default function Identity({ user }) {
  const { _id, profileIcon, username, firstname, lastname } = user;
  const navigate = useNavigate();
  return (
    <div
      className="icon-username flex items-center m-2 "
      onClick={() => navigate(`/users/${_id}/profile`)}
    >
      <div className="user-icon-profile border border-slate-600 w-10 h-11 rounded-md  overflow-hidden">
        <img
          src={
            profileIcon === "" ? "../../Profile-Image-Default.jpg" : profileIcon
          }
          className="profileImage w-full h-full"
          alt="profile"
        />
      </div>
      <div className="ml-2">
        <p>{`${firstname} ${lastname}`}</p>
        <p className="username text-slate-600">@{username}</p>
      </div>
    </div>
  );
}
