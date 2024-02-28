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

  const { users, following, loadingUsers } = useSelector(
    (store) => store.users
  );
  const findMyFollowings = following?.filter(
    (selectMyFollowings) => selectMyFollowings.user === userId
  );
  return (
    <div className="users-secondary-container overflow-auto flex lg:flex-col pt-3 lg:pb-20 lg:overflow-auto lg:h-[100vh] no-scrollbar">
      {loadingUsers ? (
        <div className="relative flex justify-center items-center w-[100vw] lg:w-[28vw] lg:h-[100vh]">
          <ReactLoader className="absolute" />
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
                    className="user-card border-2 m-1 border-white shadow-2xl lg:shadow-xl bg-white w-[35%] flex flex-col justify-center items-center flex-shrink-0 rounded-lg box-border lg:flex-row  lg:justify-between lg:flex-shrink lg:w-[90%]"
                  >
                    <div className="profileIcon-user-details flex flex-col justify-center lg:flex lg:flex-row lg:pl-1">
                      <div className="profileIcon flex justify-center items-center">
                        <div className="profileIcon-border w-14 h-14 rounded-full overflow-hidden ">
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
                        <p className="lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis lg:w-[8vw]">{`${firstname} ${lastname}`}</p>
                        <p className="text-slate-500 text-sm lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis lg:w-[8vw]">{`@${username}`}</p>
                      </div>
                    </div>
                    <div className="user-card-button py-1 flex w-[95%] lg:w-[110px]">
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
                                "whitespace-nowrap overflow-hidden text-ellipsis lg:w-[100px]"
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
                              "whitespace-nowrap overflow-hidden text-ellipsis lg:w-[100px]"
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
