import { MdOutlineClose } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  commentInputHandler,
  disableCommentContainer,
} from "../slices/userfeed/userfeedSlice";
import { uploadComment } from "../slices/userfeed/actions";

export default function Comments() {
  const dispatch = useDispatch();
  const createComment = useSelector((store) => store.userfeed.createComment);
  const allposts = useSelector((store) => store.userfeed.allPosts);
  const { users } = useSelector((store) => store.users);
  const commentsOn = allposts.find((post) => post._id === createComment.postId);
  const userId = localStorage.getItem("userId");

  const timeStamp = new Date();

  let yearAndMonth = timeStamp.toJSON().slice(0, 8);
  let dateOfMonth = timeStamp.getDate();
  let formattedDateOfMonth = dateOfMonth < 10 ? `0${dateOfMonth}` : dateOfMonth;
  let date = `${yearAndMonth}${formattedDateOfMonth}`;
  let hours = timeStamp.getHours();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  let minutes = timeStamp.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  let time = `${formattedHours}:${formattedMinutes}`;
  return (
    <div className="comment-container-background fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 z-30">
      <div className="conmment-container bg-white top-1/2 lg:top-[52%] left-1/2 lg:left-[65] fixed -translate-x-1/2 lg:-translate-x-[35%] -translate-y-1/2 lg:-translate-y-[48%] border rounded-lg  w-[90%] md:w-[45%] lg:w-[45%] p-3">
        <div className="comment-header flex justify-between pb-3 border-b border-slate-300">
          <p>Comments</p>
          <MdOutlineClose
            size="1.5em"
            className="rounded-full bg-slate-300 p-1"
            onClick={() => dispatch(disableCommentContainer())}
          />
        </div>
        <div className="comment-body h-[55vh] lg:h-[60vh] overflow-auto no-scrollbar">
          {Array.isArray(commentsOn.comment) &&
          commentsOn.comment.length > 0 ? (
            commentsOn.comment.map((com) => {
              return (
                <div className="comments flex w-full pt-2" key={com.user}>
                  <div className="user-identity w-10 h-10 m-1 rounded-full overflow-hidden ">
                    <img
                      src={
                        users.find((user) => user._id === com.user)
                          ?.profileIcon || "../../Profile-Image-Default.jpg"
                      }
                      className="w-full h-full"
                      alt="profileImg"
                    />
                  </div>

                  <div className="user-identity-and-comment flex flex-col pl-2 pb-1 bg-slate-100 rounded-xl w-[75%] lg:w-[90%] text-left">
                    <p className="username font-semibold">
                      {users.find((user) => user._id === com.user)?.firstname +
                        " " +
                        users.find((user) => user._id === com.user)?.lastname}
                      <span className="text-xs font-light text-slate-400 pl-2">
                        {com.date}
                        {" " + com.time}
                      </span>
                    </p>
                    <p className="comment">{com.content}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center p-2 pt-10">Be the first to comment</p>
          )}
        </div>

        <div className="comment-footer relative pt-3 border-t border-slate-300">
          <input
            type="text"
            className="bg-slate-200 p-[6px] rounded-lg w-full"
            value={createComment.data.content}
            onChange={(e) =>
              dispatch(
                commentInputHandler({ user: userId, content: e.target.value })
              )
            }
            placeholder="Enter text here.."
          />
          <RiSendPlaneFill
            size="2.2em"
            className="text-white bg-purple-500 rounded-lg p-2 absolute top-3 right-0"
            onClick={() =>
              dispatch(
                uploadComment({
                  postId: createComment.postId,
                  user: createComment.data.user,
                  content: createComment.data.content,
                  date,
                  time,
                })
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
