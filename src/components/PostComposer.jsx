import { BiImageAdd } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { postInputData, showCompose } from "../slices/userfeed/userfeedSlice";
import { createNewPost, editPostContent } from "../slices/userfeed/actions";
import ReactLoader from "./ReactLoader";
import { useState } from "react";
import { base64Convertor } from "../Utils/utils";

export default function PostComposer() {
  const dispatch = useDispatch();
  const { createPost, post } = useSelector((store) => store.userfeed);
  const userId = localStorage.getItem("userId");
  const [imgDimension, setImgDimension] = useState({
    height: 0,
    width: 0,
  });

  const base64Handler = async (file) => {
    const reducedImageData = await base64Convertor(file);
    setImgDimension({
      ...imgDimension,
      height: reducedImageData.height,
      width: reducedImageData.width,
    });
    dispatch(
      postInputData({ type: "createPostImage", data: reducedImageData.url })
    );
  };

  return (
    <div className="post-composer-container top-[40%] left-1/2 fixed -translate-x-1/2 -translate-y-[40%] bg-slate-200 border-slate-300 border rounded-lg  w-[90%] md:w-[45%] lg:w-[45%]">
      <div className="box-discard flex justify-end m-2">
        <MdOutlineClose size="2em" onClick={() => dispatch(showCompose())} />
      </div>
      <div className="upload-img flex justify-center">
        {createPost.createPostImage === "" ? (
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
              onChange={(e) => base64Handler(e.target.files[0])}
            />
          </>
        ) : (
          <div className="relative h-[80%]">
            <img
              src={createPost.createPostImage}
              className="uploaded-img"
              width={imgDimension.width}
              height={imgDimension.height}
              alt="upload"
            />
            <MdOutlineClose
              size="3em"
              className="img-discard absolute top-0 p-3"
              onClick={() =>
                dispatch(postInputData({ type: "createPostImage", data: "" }))
              }
            />
          </div>
        )}
      </div>

      <div className="create-post-content-box flex">
        <textarea
          className="m-2 flex-grow"
          rows="2"
          value={createPost.createPostContent}
          placeholder="Write something..."
          onChange={(e) =>
            dispatch(
              postInputData({ type: "createPostContent", data: e.target.value })
            )
          }
        ></textarea>
      </div>
      <div className="multiple-btns flex justify-end p-2">
        {post.editPost ? (
          <button
            className="post  bg-violet-700 text-white p-2 rounded-lg w-[30%]"
            onClick={() =>
              dispatch(
                editPostContent({
                  body: {
                    content: createPost.createPostContent,
                    image: createPost.createPostImage,
                  },
                  postId: post.postId,
                })
              )
            }
          >
            Update
          </button>
        ) : (
          <button
            className="post  bg-violet-700 text-white p-2 rounded-lg w-[30%]"
            onClick={() =>
              dispatch(
                createNewPost({
                  content: createPost.createPostContent,
                  image: createPost.createPostImage,
                  user: userId,
                })
              )
            }
          >
            Post
          </button>
        )}
      </div>
      {createPost.loading ? <ReactLoader /> : ""}
    </div>
  );
}
