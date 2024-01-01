import { useEffect } from "react";
import { fetchUsers } from "../slices/users/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Users() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const users = useSelector((store) => store.users.users);
  return (
    <div className="users-container overflow-auto flex lg:flex-col">
      {users.map((user) => {
        const { _id, username, firstname, lastname, profileIcon } = user;
        return (
          <div
            key={_id}
            className="user-card border m-2 border-slate-400 w-[35%] flex flex-col justify-center items-center flex-shrink-0 p-2 rounded-lg box-border lg:flex-row  lg:justify-between lg:flex-shrink"
          >
            <div className="profileIcon-user-details flex flex-col justify-center lg:flex lg:flex-row">
              <div className="profileIcon flex justify-center">
                <div className="profileIcon-border w-16 h-16 rounded-lg bg-green-400 overflow-hidden lg:w-20">
                  <img src={profileIcon} className="profileImg w-full h-full" />
                </div>
              </div>
              <div className="user-details lg:m-2 text-center lg:text-left">
                <p>{`${firstname} ${lastname}`}</p>
                <p className="text-slate-500">{`@${username}`}</p>
              </div>
            </div>
            <div className="user-card-button flex bg-green-100  w-[95%] lg:w-[100px]">
              <button className="flex-grow bg-purple-600 p-1 rounded-lg text-center text-white">
                Follow
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
