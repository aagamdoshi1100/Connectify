import { useDispatch, useSelector } from "react-redux";
import { GoKebabHorizontal } from "react-icons/go";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { GoComment } from "react-icons/go";
import { MdOutlineBookmarks } from "react-icons/md";
import { MdBookmarks } from "react-icons/md";
import {
  enablePostMenu,
  enableEdit,
  enableCommentComponent,
} from "../slices/userfeed/userfeedSlice";
import {
  deletePost,
  postLikeHandler,
  postBookMarkHandler,
} from "../slices/userfeed/actions";
import { useNavigate } from "react-router-dom";
import Identity from "./Identity";
import ReactLoader from "./ReactLoader";
import { useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";
import Comments from "../pages/Comments";

export const Posts = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postMenuRef = useRef(null);
  useClickOutside(postMenuRef, () => dispatch(enablePostMenu("")));
  const {
    post: postDetails,
    bookmarks,
    loadingPosts,
    createComment,
  } = useSelector((state) => state.userfeed);
  const { users } = useSelector((store) => store.users);

  const loggedInUser = localStorage.getItem("username");
  //console.log(data, users);
  return (
    <>
      {loadingPosts ? (
        <div className="flex justify-center items-center w-[100vw] h-[40vh] md:w-[40vw] md:h-[80vh]">
          <ReactLoader size="40" />
        </div>
      ) : (
        <>
          {Array.isArray(data) && data.length > 0 ? (
            data?.map((post) => {
              return (
                <div
                  key={post._id}
                  className="posts-secondary-container flex flex-col border-2 border-white bg-white md:shadow-md rounded-lg m-2 lg:flex-grow-1 lg:p-2 cursor-pointer"
                >
                  <div className="post-header">
                    <div className="header-row flex  justify-between items-center py-1">
                      <div className="flex">
                        <Identity user={post.user} />
                        <p className="p-1 pt-2 pl-2 text-slate-400 text-xs">
                          {post.createdAt.slice(0, 10)}
                        </p>
                      </div>

                      <div className="relative">
                        <GoKebabHorizontal
                          size="1.5em"
                          className="mr-3 lg:mr-2"
                          onClick={() => dispatch(enablePostMenu(post._id))}
                        />

                        {postDetails.postMenu &&
                          postDetails.postId === post._id && (
                            <div
                              className="postMenu absolute flex flex-col border border-slate-400 right-10 top-0 bg-white p-2 rounded"
                              ref={postMenuRef}
                            >
                              {loggedInUser === post.user.username ? (
                                <>
                                  <button
                                    className="m-1 text-left"
                                    onClick={() =>
                                      dispatch(enableEdit(post._id))
                                    }
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="m-1 text-left"
                                    onClick={() =>
                                      dispatch(deletePost(post._id))
                                    }
                                  >
                                    Delete
                                  </button>{" "}
                                </>
                              ) : (
                                <button
                                  className="m-1 text-left whitespace-nowrap"
                                  onClick={() =>
                                    navigate(`/users/${post.user._id}/profile`)
                                  }
                                >
                                  View profile
                                </button>
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="post-image rounded-lg overflow-hidden">
                    {post.image !== "" && (
                      <img
                        src={post.image}
                        className="max-h-96 object-contain"
                        width="100%"
                        height="100%"
                        alt="Post"
                      />
                    )}
                  </div>
                  <div className="post-footer flex item-center">
                    <div className="icons flex items-center m-2">
                      {post.likedBy.includes(loggedInUser) ? (
                        <FaHeart
                          size="1.7em"
                          color={"red"}
                          onClick={() =>
                            dispatch(
                              postLikeHandler({
                                postId: post._id,
                                likedBy: loggedInUser,
                              })
                            )
                          }
                        />
                      ) : (
                        <FaRegHeart
                          size="1.7em"
                          onClick={() =>
                            dispatch(
                              postLikeHandler({
                                postId: post._id,
                                likedBy: loggedInUser,
                              })
                            )
                          }
                        />
                      )}
                      <span className="hidden">Like</span>
                    </div>
                    <div className="icons flex items-center m-2">
                      <GoComment
                        size="1.7em"
                        onClick={() =>
                          dispatch(enableCommentComponent(post._id))
                        }
                      />
                      <span className="hidden">Comment</span>
                    </div>
                    {createComment.isEnabled ? <Comments /> : ""}
                    <div className="icons flex items-center m-2">
                      {bookmarks.find((data) => data._id === post._id) ? (
                        <MdBookmarks
                          size="1.7em"
                          color={
                            bookmarks.find((data) => data._id === post._id)
                              ? "blueviolet"
                              : "black"
                          }
                          onClick={() =>
                            dispatch(postBookMarkHandler(post._id))
                          }
                        />
                      ) : (
                        <MdOutlineBookmarks
                          size="1.7em"
                          color={
                            bookmarks.find((data) => data._id === post._id)
                              ? "blueviolet"
                              : "black"
                          }
                          onClick={() =>
                            dispatch(postBookMarkHandler(post._id))
                          }
                        />
                      )}
                      <span className="hidden">Bookmark</span>
                    </div>
                  </div>
                  {post.likedBy.length > 0 && (
                    <div className="like-details ml-2 lg:m-2">
                      <div className="like-content flex items-center py-1 md:py-0 relative text-sm">
                        {post.likedBy[0] && (
                          <div className="like-user-image absolute border-2 border-white w-6 h-6 rounded-full cursor-pointer overflow-hidden ">
                            <img
                              src={
                                users.find(
                                  (findImage) =>
                                    findImage.username === post.likedBy[0]
                                )?.profileIcon ||
                                "../../Profile-Image-Default.jpg"
                              }
                              className="w-full h-full"
                              alt="likedBy"
                            />
                          </div>
                        )}
                        {post.likedBy[1] && (
                          <div className="like-user-image absolute left-3 lg:left-4 border border-white w-6 h-6 rounded-full cursor-pointer overflow-hidden ">
                            <img
                              src={
                                users.find(
                                  (findImage) =>
                                    findImage.username === post.likedBy[1]
                                )?.profileIcon ||
                                "../../Profile-Image-Default.jpg"
                              }
                              className="w-full h-full"
                              alt="likedBy"
                            />
                          </div>
                        )}
                        {post.likedBy[2] && (
                          <div className="like-user-image absolute left-6 lg:left-7 border-2 border-white w-6 h-6 rounded-full cursor-pointer overflow-hidden ">
                            <img
                              src={
                                users.find(
                                  (findImage) =>
                                    findImage.username === post.likedBy[2]
                                ).profileIcon ||
                                "../../Profile-Image-Default.jpg"
                              }
                              className="w-full h-full"
                              alt="likedBy"
                            />
                          </div>
                        )}
                        {post.likedBy.length > 2 ? (
                          <p className="LikedByText text-sm pl-14">
                            {`Liked by ${post.likedBy[0]} and ${
                              post.likedBy.length - 1
                            } others`}
                          </p>
                        ) : (
                          <p
                            className={
                              post.likedBy.length === 2
                                ? "px-1 pl-10 lg:pl-11"
                                : "px-1 pl-7 lg:pl-8"
                            }
                          >
                            Liked by {post.likedBy[0]}
                            {post.likedBy.length === 2 && (
                              <span className="px-1">
                                and
                                <span className="px-1">
                                  {post.likedBy.length - 1}
                                </span>
                                others
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {post.content && (
                    <div className="content m-2 lg:mt-0 ">
                      <p className="post-content text-sm">{post.content}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="lg:w-[100%] lg:h-[80vh] flex flex-col justify-center items-center p-10 shadow-none">
              <img
                src="../../No-post.jpg"
                className="h-[40vh] lg:h-[40vh] w-[80vw] lg:w-[20vw] object-cover  mix-blend-multiply"
                alt="no-posts-img"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
