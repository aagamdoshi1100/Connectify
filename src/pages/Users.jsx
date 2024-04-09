import { useCallback, useEffect } from "react";
import {
  registerFollowing,
  fetchUsers,
  followHandler,
  followBack,
} from "../slices/users/actions";
import { useDispatch, useSelector } from "react-redux";
import { followBtnStyle } from "../constants";
import ReactLoader from "../components/ReactLoader";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fetchUsersData = useCallback(() => {
    dispatch(fetchUsers());
    dispatch(registerFollowing(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  const { users, following, loadingUsers } = useSelector(
    (store) => store.users
  );
  const findMyFollowings = following?.filter(
    (selectMyFollowings) => selectMyFollowings.user === userId
  );
  localStorage.setItem(
    "userProfile",
    JSON.stringify(users.filter((user) => user._id === userId))
  );
  return (
    <div className="users-secondary-container overflow-auto flex md:flex-col pt-3 md:pb-20 md:overflow-auto md:h-[100vh] cursor-pointer no-scrollbar">
      {loadingUsers ? (
        <div className="relative flex justify-center items-center w-[100vw] h-[20vh] md:w-[28vw] md:h-[80vh]">
          <ReactLoader className="absolute" size="40" />
        </div>
      ) : (
        <>
          {Array.isArray(users) && users.length > 0 ? (
            users
              .filter((user) => user._id !== userId)
              .map((user) => {
                const { _id, username, firstname, lastname, profileIcon } =
                  user;
                const btnStatus = findMyFollowings[0]?.following?.find(
                  (obj) => obj.followedUser === _id
                );
                return (
                  <div
                    key={_id}
                    className="user-card border-2 m-1 border-white shadow-2xl md:shadow-xl bg-white w-[35%] flex flex-col justify-center items-center flex-shrink-0 rounded-md box-border lg:flex-row  lg:justify-between md:flex-shrink md:w-[98%] p-1 md:p-2"
                  >
                    <div className="profileIcon-user-details flex flex-col justify-center md:flex md:flex-row md:pl-1">
                      <div className="profileIcon flex justify-center items-center">
                        <div className="profileIcon-border w-14 h-14 rounded-full overflow-hidden ">
                          <img
                            src={
                              profileIcon === ""
                                ? "../../Profile-Image-Default.jpg"
                                : profileIcon
                            }
                            className="profileImage w-full h-full"
                            onClick={() => navigate(`/users/${_id}/profile`)}
                            alt="userProfileImage"
                          />
                        </div>
                      </div>
                      <div className="user-details md:m-2 text-center md:text-left">
                        <p
                          className="md:whitespace-nowrap md:overflow-hidden md:text-ellipsis md:w-[20vw] lg:w-[10vw]"
                          onClick={() => navigate(`/users/${_id}/profile`)}
                        >{`${firstname} ${lastname}`}</p>
                        <p className="text-slate-500 text-sm md:whitespace-nowrap md:overflow-hidden md:text-ellipsis md:w-[20vw] lg:w-[10vw]">{`@${username}`}</p>
                      </div>
                    </div>
                    <div className="user-card-button py-1 flex w-[95%] md:w-[110px]">
                      {btnStatus ? (
                        btnStatus && btnStatus.sender ? (
                          btnStatus.sender && btnStatus.returnFollowed ? (
                            <button
                              className={followBtnStyle}
                              onClick={() =>
                                dispatch(
                                  followHandler({ userId, followingId: _id })
                                )
                              }
                            >
                              Unfollow
                            </button>
                          ) : (
                            <button
                              className={
                                followBtnStyle +
                                "whitespace-nowrap overflow-hidden text-ellipsis md:w-[100px]"
                              }
                              onClick={() =>
                                dispatch(
                                  followHandler({ userId, followingId: _id })
                                )
                              }
                            >
                              Request sent
                            </button>
                          )
                        ) : btnStatus.returnFollowed ? (
                          <button
                            className={followBtnStyle}
                            onClick={() =>
                              dispatch(
                                followHandler({ userId, followingId: _id })
                              )
                            }
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            className={
                              followBtnStyle +
                              "whitespace-nowrap overflow-hidden text-ellipsis md:w-[100px]"
                            }
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
                            dispatch(
                              followHandler({ userId, followingId: _id })
                            )
                          }
                        >
                          Follow
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="flex justify-center items-center w-[100%] pt-10">
              <p>No users found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
