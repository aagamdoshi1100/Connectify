import { useEffect } from "react";
import {
  registerFollowing,
  fetchUsers,
  followHandler,
  followBack,
} from "../slices/users/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Users() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(registerFollowing(userId));
  }, [dispatch]);
  const { users, following } = useSelector((store) => store.users);
  const findMyFollowings = following?.filter(
    (selectMyFollowings) => selectMyFollowings.user === userId
  );
  return (
    <div className="users-secondary-container overflow-auto flex lg:flex-col lg:overflow-auto lg:h-[100vh] no-scrollbar">
      {users
        .filter((user) => user._id !== userId)
        .map((user) => {
          const { _id, username, firstname, lastname, profileIcon } = user;
          const btnStatus = findMyFollowings[0]?.following?.find(
            (obj) => obj.followedUser === _id
          );
          return (
            <div
              key={_id}
              className="user-card border m-2 border-slate-400 w-[35%] flex flex-col justify-center items-center flex-shrink-0 p-2 rounded-lg box-border lg:flex-row  lg:justify-between lg:flex-shrink lg:w-[90%]"
            >
              <div className="profileIcon-user-details flex flex-col justify-center lg:flex lg:flex-row">
                <div className="profileIcon flex justify-center">
                  <div className="profileIcon-border w-16 h-16 rounded-lg bg-green-400 overflow-hidden lg:w-20">
                    <img
                      src={
                        user.profileIcon === ""
                          ? "../../Profile-Image-Default.jpg"
                          : user.profileIcon
                      }
                      className="profileImage w-full h-full"
                    />
                  </div>
                </div>
                <div className="user-details lg:m-2 text-center lg:text-left">
                  <p>{`${firstname} ${lastname}`}</p>
                  <p className="text-slate-500">{`@${username}`}</p>
                </div>
              </div>
              <div className="user-card-button flex bg-green-100  w-[95%] lg:w-[100px]">
                {btnStatus ? (
                  btnStatus && btnStatus.sender ? (
                    btnStatus.sender && btnStatus.returnFollowed ? (
                      <button
                        className="flex-grow bg-purple-600 p-1 rounded-lg text-center text-white"
                        onClick={() =>
                          dispatch(followHandler({ userId, followingId: _id }))
                        }
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className="flex-grow bg-purple-600 p-1 rounded-lg text-center text-white"
                        onClick={() =>
                          dispatch(followHandler({ userId, followingId: _id }))
                        }
                      >
                        Request sent
                      </button>
                    )
                  ) : btnStatus.returnFollowed ? (
                    <button
                      className="flex-grow bg-purple-600 p-1 rounded-lg text-center text-white"
                      onClick={() =>
                        dispatch(followHandler({ userId, followingId: _id }))
                      }
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="flex-grow bg-purple-600 p-1 rounded-lg text-center text-white"
                      onClick={() =>
                        dispatch(followBack({ userId, followingId: _id }))
                      }
                    >
                      Follow back
                    </button>
                  )
                ) : (
                  <button
                    className="flex-grow bg-purple-600 p-1 rounded-lg text-center text-white"
                    onClick={() =>
                      dispatch(followHandler({ userId, followingId: _id }))
                    }
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
