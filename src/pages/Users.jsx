import { useCallback, useEffect } from "react";
import {
  registerFollowing,
  fetchUsers,
  followHandler,
  followBack,
} from "../slices/users/actions";
import { useDispatch, useSelector } from "react-redux";
import { followBtnStyle } from "../constants";

export default function Users() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const fetchUsersData = useCallback(() => {
    dispatch(fetchUsers());
    dispatch(registerFollowing(userId));
  }, [dispatch]);

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  const { users, following } = useSelector((store) => store.users);
  const findMyFollowings = following?.filter(
    (selectMyFollowings) => selectMyFollowings.user === userId
  );
  return (
    <div className="users-secondary-container overflow-auto flex lg:flex-col pt-3 lg:pb-20 lg:overflow-auto lg:h-[100vh] no-scrollbar">
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
              className="user-card border-2 m-1 border-white shadow-2xl lg:shadow-xl w-[35%] flex flex-col justify-center items-center flex-shrink-0 rounded-lg box-border lg:flex-row  lg:justify-between lg:flex-shrink lg:w-[90%]"
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
              <div className="user-card-button p-1 flex w-[95%] lg:w-[120px]">
                {btnStatus ? (
                  btnStatus && btnStatus.sender ? (
                    btnStatus.sender && btnStatus.returnFollowed ? (
                      <button
                        className={followBtnStyle}
                        onClick={() =>
                          dispatch(followHandler({ userId, followingId: _id }))
                        }
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className={followBtnStyle}
                        onClick={() =>
                          dispatch(followHandler({ userId, followingId: _id }))
                        }
                      >
                        Request sent
                      </button>
                    )
                  ) : btnStatus.returnFollowed ? (
                    <button
                      className={followBtnStyle}
                      onClick={() =>
                        dispatch(followHandler({ userId, followingId: _id }))
                      }
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className={followBtnStyle}
                      onClick={() =>
                        dispatch(followBack({ userId, followingId: _id }))
                      }
                    >
                      Follow back
                    </button>
                  )
                ) : (
                  <button
                    className={followBtnStyle}
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
