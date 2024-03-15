import { BiImageAdd } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  discardCompose,
  postInputData,
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
import { IoCloudUploadOutline } from "react-icons/io5";

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
    <div className="post-composer-container-background fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-40">
      <div className="post-composer-container top-[40%] left-1/2 fixed -translate-x-1/2 -translate-y-[40%] bg-slate-200 border-slate-300 border rounded-lg  w-[90%] md:w-[45%] lg:w-[45%] z-10 p-3">
        {!uploadProfileImageStates.isEnabled ? (
          post.editPost ? (
            <p className="header font-bold text-lg py-2">Edit Post</p>
          ) : (
            <p className="header font-bold text-lg py-2">New Post</p>
          )
        ) : (
          <p className="header font-bold text-lg py-2">Set Profile Picture</p>
        )}

        <div className="upload-img flex justify-center bg-white rounded-lg">
          {imageData === "" ? (
            <>
              <label htmlFor="image">
                <div className="upload-icon flex justify-center relative">
                  <IoCloudUploadOutline className="text-green-600 bg-white p-8 h-[20vh] w-[82vw] md:w-[40vw] rounded-md" />
                  <p className="upload-text absolute bottom-0 p-1 text-sm">
                    Click to upload image
                  </p>
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
                size="1.5em"
                className="img-discard absolute top-2 left-2 p-1 bg-gray-300 rounded-full"
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

        <div className="create-post-content-box flex flex-col justify-center">
          {!uploadProfileImageStates.isEnabled && (
            <textarea
              className=" my-2 p-2 rounded-md outline-none"
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
          <div className="multiple-btns flex justify-end pt-2">
            <button
              className="bg-gray-300  p-2 rounded-lg w-[20%] mr-2"
              onClick={
                uploadProfileImageStates.isEnabled
                  ? () => dispatch(disableUpload())
                  : () => dispatch(discardCompose())
              }
            >
              Cancel
            </button>
            {!uploadProfileImageStates.isEnabled ? (
              post.editPost ? (
                <button
                  className="update text-purple-900 bg-purple-400 p-2 rounded-lg w-[20%]"
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
                  className="post text-purple-900 bg-purple-400 p-2 rounded-lg w-[20%]"
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
                className="upload text-purple-900 bg-purple-400 p-2 rounded-lg w-[20%]"
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
        </div>

        {createPost.loading ? (
          <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
            <ReactLoader />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
