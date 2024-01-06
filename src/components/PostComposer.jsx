import { BiImageAdd } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { postInputData, showCompose } from "../slices/userfeed/userfeedSlice";
import { createNewPost } from "../slices/userfeed/actions";

export default function PostComposer() {
  const dispatch = useDispatch();
  const postData = useSelector((store) => store.userfeed.createPost);
  const userId = localStorage.getItem("userId");

  const base64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      dispatch(postInputData({ type: "createPostImage", data: reader.result }));
    };
  };

  return (
    <div className="post-composer-container top-[40%] left-1/2 fixed -translate-x-1/2 -translate-y-[40%] bg-slate-200 border-slate-300 border rounded-lg  w-[90%] md:w-[45%] lg:w-[45%]">
      <div className="box-discard flex justify-end m-2">
        <MdOutlineClose size="2em" onClick={() => dispatch(showCompose())} />
      </div>

      <div
        className="absolute"
        onClick={() =>
          dispatch(postInputData({ type: "createPostImage", data: "" }))
        }
      >
        {postData.createPostImage !== "" && (
          <MdOutlineClose
            size="3em"
            className="img-discard relative top-0 p-3"
          />
        )}
      </div>
      <div className="upload-img flex items-center justify-center border border-slate-400 h-[40vh] lg:h-[50vh]">
        {postData.createPostImage === "" ? (
          <>
            <label htmlFor="image">
              <div className="upload-icon">
                <BiImageAdd size="5em" />
              </div>
            </label>
            <input
              type="file"
              id="image"
              className="file-selector hidden"
              onChange={(e) => base64(e.target.files[0])}
            />
          </>
        ) : (
          <img
            src={postData.createPostImage}
            className="uploaded-img w-full h-full"
            alt="upload"
          />
        )}
      </div>

      <div className="create-post-content-box flex">
        <textarea
          className="m-2 flex-grow"
          rows="2"
          placeholder="Write something..."
          onChange={(e) =>
            dispatch(
              postInputData({ type: "createPostContent", data: e.target.value })
            )
          }
        ></textarea>
      </div>
      <div className="multiple-btns flex justify-end p-2">
        <button className="post  bg-violet-700 text-white p-2 rounded-lg w-[30%]">
          Update
        </button>
        <button
          className="post  bg-violet-700 text-white p-2 rounded-lg w-[30%]"
          onClick={() =>
            dispatch(
              createNewPost({
                content: postData.createPostContent,
                image: postData.createPostImage,
                user: userId,
              })
            )
          }
        >
          Post
        </button>
      </div>
    </div>
  );
}
