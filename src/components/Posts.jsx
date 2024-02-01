import { useDispatch, useSelector } from "react-redux";
import { GoKebabHorizontal } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { enablePostMenu, enableEdit } from "../slices/userfeed/userfeedSlice";
import {
  deletePost,
  postLikeHandler,
  postBookMarkHandler,
} from "../slices/userfeed/actions";
import { useNavigate } from "react-router-dom";
import Identity from "./Identity";

export const Posts = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post: postDetails, bookmarks } = useSelector(
    (state) => state.userfeed
  );
  const { users } = useSelector((store) => store.users);

  const loggedInUser = localStorage.getItem("username");
  console.log(data, users);
  return (
    <>
      {data?.map((post) => {
        return (
          <div
            key={post._id}
            className="posts-secondary-container flex flex-col border-2 border-white bg-white shadow-2xl rounded-lg m-2 lg:flex-grow-1 lg:p-2 cursor-pointer"
          >
            <div className="post-header">
              <div className="header-row flex  justify-between items-center py-1">
                <Identity user={post.user} />
                <div className="relative">
                  <GoKebabHorizontal
                    size="1.5em"
                    className="mr-3 lg:mr-2"
                    onClick={() => dispatch(enablePostMenu(post._id))}
                  />

                  {postDetails.postMenu && postDetails.postId === post._id && (
                    <div className="postMenu absolute border border-slate-400 right-10 top-0 bg-white p-2 rounded">
                      <button
                        className="m-1"
                        onClick={() => dispatch(enableEdit(post._id))}
                      >
                        Edit
                      </button>
                      <button
                        className="m-1"
                        onClick={() => dispatch(deletePost(post._id))}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="post-image rounded-lg overflow-hidden">
              {post.image !== "" && (
                <img
                  src={post.image}
                  className="max-h-96"
                  width="100%"
                  height="100%"
                  alt="Post"
                />
              )}
            </div>
            <div className="post-footer flex item-center">
              <div className="icons flex items-center m-2">
                <AiOutlineLike
                  size="1.5em"
                  color={
                    post.likedBy.includes(loggedInUser) ? "blueviolet" : "black"
                  }
                  onClick={() =>
                    dispatch(
                      postLikeHandler({
                        postId: post._id,
                        likedBy: loggedInUser,
                      })
                    )
                  }
                />
                <span className="hidden">Like</span>
              </div>
              <div className="icons flex items-center m-2">
                <GoComment
                  size="1.5em"
                  //  onClick={() => dispatch(enableComments(post._id))}
                />
                <span className="hidden">Comment</span>
              </div>
              <div className="icons flex items-center m-2">
                <MdOutlineBookmarkBorder
                  size="1.5em"
                  color={
                    bookmarks.find((data) => data._id === post._id)
                      ? "blueviolet"
                      : "black"
                  }
                  onClick={() => dispatch(postBookMarkHandler(post._id))}
                />
                <span className="hidden">Bookmark</span>
              </div>
            </div>
            <div className="like-details ml-2 lg:m-2">
              {post.likedBy.length > 0 && (
                <div className="like-content flex items-center relative text-sm">
                  {post.likedBy[0] && (
                    <div className="like-user-image absolute border-2 border-white w-6 h-6 rounded-full cursor-pointer overflow-hidden ">
                      <img
                        src={
                          users.find(
                            (findImage) =>
                              findImage.username === post.likedBy[0]
                          ).profileIcon
                        }
                        className="w-full h-full"
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
                          ).profileIcon
                        }
                        className="w-full h-full"
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
                          ).profileIcon
                        }
                        className="w-full h-full"
                      />
                    </div>
                  )}
                  {post.likedBy.length === 3 ? (
                    <p className="text-sm pl-12 lg:pl-14">
                      {`Liked by ${post.likedBy[0]} and ${
                        post.likedBy.length - 1
                      } others`}
                    </p>
                  ) : (
                    <p
                      className={
                        post.likedBy.length > 1
                          ? "px-1 pl-10 lg:pl-12"
                          : "px-1 pl-7 lg:pl-8"
                      }
                    >
                      Liked by {post.likedBy[0]}
                      {post.likedBy.length === 2 && (
                        <span className="px-1">
                          and
                          <b className="px-1">{post.likedBy.length - 1}</b>
                          others
                        </span>
                      )}
                    </p>
                  )}
                </div>
              )}
            </div>
            {post.content && (
              <div className="content m-2">
                <p className="post-content text-sm">{post.content}</p>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
