import { BiLogOut, BiBookBookmark } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showCompose } from "../slices/userfeed/userfeedSlice";

export default function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="footer-icon-container flex m-5 justify-around lg:flex-col lg:justify-normal">
      <div
        className="icon-block flex cursor-pointer lg:m-3"
        onClick={() => navigate("/")}
      >
        <AiOutlineHome size="2em" />
        <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
          Home
        </span>
      </div>

      <div className="icon-block flex cursor-pointer lg:m-3">
        <IoMdSearch size="2em" />
        <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
          Search
        </span>
      </div>

      <div
        className="icon-block flex cursor-pointer lg:m-3"
        onClick={() => dispatch(showCompose())}
      >
        <FaRegPlusSquare size="2em" />
        <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
          Post
        </span>
      </div>

      <div className="icon-block flex cursor-pointer lg:m-3">
        <BiBookBookmark size="2em" />
        <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
          Bookmark
        </span>
      </div>

      <div className="icon-block flex cursor-pointer lg:m-3">
        <BiLogOut size="2em" />
        <span className="icon-name hidden lg:inline-flex ml-3 lg:text-xl">
          Log out
        </span>
      </div>
    </div>
  );
}
