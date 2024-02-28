import { BiImageAdd } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  discardCompose,
  postInputData,
  showCompose,
} from "../slices/userfeed/userfeedSlice";
import { createNewPost, editPostContent } from "../slices/userfeed/actions";
import ReactLoader from "./ReactLoader";
import { useState } from "react";
import { base64Convertor } from "../Utils/utils";
import {
  clearImageState,
  disableUpload,
  setImageToState,
} from "../slices/userProfile/userProfileSlice";
import { setProfilePicture } from "../slices/userProfile/action";

export default function PostComposer() {
  const dispatch = useDispatch();
  const { createPost, post } = useSelector((store) => store.userfeed);
  const { uploadProfileImageStates } = useSelector(
    (store) => store.userProfile
  );
  const userId = localStorage.getItem("userId");
  const [imgDimension, setImgDimension] = useState({
    height: "350px",
    width: "100%",
  });

  const base64Handler = async (file) => {
    const reducedImageData = await base64Convertor(file);
    setImgDimension({
      ...imgDimension,
      height: reducedImageData.height,
      width: reducedImageData.width,
    });
    if (uploadProfileImageStates.isEnabled) {
      dispatch(setImageToState(reducedImageData.url));
    } else {
      dispatch(
        postInputData({ type: "createPostImage", data: reducedImageData.url })
      );
    }
  };
  const imageData = uploadProfileImageStates.isEnabled
    ? uploadProfileImageStates.image
    : createPost.createPostImage;

  return (
    <div className="post-composer-container top-[40%] left-1/2 fixed -translate-x-1/2 -translate-y-[40%] bg-slate-200 border-slate-300 border rounded-lg  w-[90%] md:w-[45%] lg:w-[45%]">
      <div className="box-discard flex justify-end m-2">
        <MdOutlineClose
          size="2em"
          onClick={
            uploadProfileImageStates.isEnabled
              ? () => dispatch(disableUpload())
              : () => dispatch(discardCompose())
          }
        />
      </div>
      <div className="upload-img flex justify-center">
        {imageData === "" ? (
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
              src={imageData}
              className="uploaded-img"
              width={imgDimension.width}
              height={imgDimension.height}
              alt="upload"
            />
            <MdOutlineClose
              size="3em"
              className="img-discard absolute top-0 p-3"
              onClick={
                uploadProfileImageStates.isEnabled
                  ? () => dispatch(clearImageState())
                  : () =>
                      dispatch(
                        postInputData({ type: "createPostImage", data: "" })
                      )
              }
            />
          </div>
        )}
      </div>

      <div className="create-post-content-box flex">
        {!uploadProfileImageStates.isEnabled && (
          <textarea
            className="m-2 flex-grow"
            rows="2"
            value={createPost.createPostContent}
            placeholder="Write something..."
            onChange={(e) =>
              dispatch(
                postInputData({
                  type: "createPostContent",
                  data: e.target.value,
                })
              )
            }
          ></textarea>
        )}
      </div>
      <div className="multiple-btns flex justify-end p-2">
        {!uploadProfileImageStates.isEnabled ? (
          post.editPost ? (
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
          )
        ) : (
          <button
            className="post  bg-violet-700 text-white p-2 rounded-lg w-[30%]"
            onClick={() =>
              dispatch(
                setProfilePicture({
                  image: uploadProfileImageStates.image,
                  userId,
                })
              )
            }
          >
            Upload
          </button>
        )}
      </div>
      {createPost.loading ? (
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
          <ReactLoader />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
