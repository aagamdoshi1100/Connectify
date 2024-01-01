import { useDispatch, useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { FiBookmark } from "react-icons/fi";
import {
  enablePostMenu,
  enableEdit,
  enableComments,
} from "../slices/userfeed/userfeedSlice";
import {
  deletePost,
  postLikeHandler,
  postBookMarkHandler,
} from "../slices/userfeed/actions";
import { useNavigate } from "react-router-dom";

export const Posts = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postDetails = useSelector((state) => state.userfeed.post);
  const bookmarks = useSelector((state) => state.userfeed.bookmarks);
  const loggedInUser = localStorage.getItem("username");

  return (
    <div>
      {data?.map((post) => {
        return (
          <div
            key={post._id}
            className="post flex flex-col border border-slate-400 rounded-lg m-4 sm:w-2/5 md:w-2/5 lg:w-1/2"
          >
            <div className="post-header">
              <div className="header-row flex  justify-between items-center ">
                <div
                  className="icon-username flex items-center m-2 "
                  onClick={() => navigate(`/users/${post.user._id}/profile`)}
                >
                  <div className="user-icon border border-slate-600 w-10 h-11 rounded-md"></div>
                  <div className="ml-2">
                    <p>{`${post.user.firstname} ${post.user.lastname}`}</p>
                    <p className="username">@{post.user.username}</p>
                  </div>
                </div>
                <div className="relative">
                  <BsThreeDotsVertical
                    size="2em"
                    className="mr-3"
                    onClick={() => dispatch(enablePostMenu(post._id))}
                  />

                  {postDetails.postMenu && postDetails.postId === post._id && (
                    <div className="postMenu absolute border border-slate-400 right-10 top-0 bg-white p-2 rounded">
                      <p
                        className="m-1"
                        onClick={() => dispatch(enableEdit(post._id))}
                      >
                        Edit
                      </p>
                      <p
                        className="m-1"
                        onClick={() => dispatch(deletePost(post._id))}
                      >
                        Delete
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <hr className="border border-slate-400" />

              <div className="content m-2">
                <p>{post.content}</p>
              </div>
            </div>
            <div className="post-image">
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
            <div className="post-footer flex item-center justify-around">
              <div className="icons flex items-center m-2">
                <p className="text-xl mr-2">{post.likedBy.length}</p>
                <AiOutlineLike
                  size="2em"
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
                  size="2em"
                  onClick={() => dispatch(enableComments(post._id))}
                />
                <span className="hidden">Comment</span>
              </div>
              <div className="icons flex items-center m-2">
                <FiBookmark
                  size="2em"
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
          </div>
        );
      })}
    </div>
  );
};
