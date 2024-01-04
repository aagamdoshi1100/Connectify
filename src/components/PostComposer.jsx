import { BiImageAdd } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";

export default function PostComposer() {
  //   const hide = {
  //     display: "none",
  //     visibility: "none",
  //   };
  //   const show = {
  //     display: "block",
  //     visibility: "visible",
  //   };
  //   const base64 = (file) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       userFeedDispacher({
  //         type: "CREATE_POST_IMAGE",
  //         payload: reader.result,
  //       });
  //     };
  //   };

  return (
    <div className="post-composer-container top-[40%] left-1/2 fixed -translate-x-1/2 -translate-y-[40%] bg-slate-200 border-slate-300 border rounded-lg  w-[90%] md:w-[45%] lg:w-[45%]">
      <div className="box-discard flex justify-end m-2">
        <MdOutlineClose size="2em" />
      </div>

      <div className="upload-img flex items-center justify-center border border-slate-400 h-[40vh] lg:h-[50vh]">
        <MdOutlineClose
          size="2em"
          className="img-discard relative top-0 right-0"
        />
        <label htmlFor="image">
          <div className="upload-icon">
            <BiImageAdd size="5em" />
          </div>
        </label>
        <input type="file" id="image" className="file-selector hidden" />
        <img src="" className="uploaded-img w-full h-full" alt="upload" />
      </div>

      <div className="create-post-content-box flex">
        <textarea
          className="m-2 flex-grow"
          rows="2"
          placeholder="Write something..."
        ></textarea>
      </div>
      <div className="multiple-btns flex justify-end p-2">
        <button className="post  bg-violet-700 text-white p-2 rounded-lg w-[30%]">
          Update
        </button>
        <button className="post  bg-violet-700 text-white p-2 rounded-lg w-[30%]">
          Post
        </button>
      </div>
    </div>
  );
}
