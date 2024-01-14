import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../slices/userProfile/action";
import { useDispatch, useSelector } from "react-redux";
import ReactLoader from "../components/ReactLoader";
import { Posts } from "../components/Posts";
import Footer from "./Footer";
import Header from "./Header";
import { FaPlus } from "react-icons/fa";
import PostComposer from "../components/PostComposer";
import { enableUpload } from "../slices/userProfile/userProfileSlice";

export default function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch]);
  const { user, loading, uploadProfileImageStates } = useSelector(
    (store) => store.userProfile
  );
  const { allPosts } = useSelector((store) => store.userfeed);
  const filterPostsForUserProfileView = allPosts.filter(
    (userPosts) => userId === userPosts.user
  );
  console.log(user, "userprofile");
  return (
    <div>
      {loading ? (
        <ReactLoader />
      ) : (
        <>
          <Header />
          <div className="UserProfile lg:flex lg:justify-center">
            <div className="userImage-userDetails flex  justify-center bg-slate-100 lg:border lg:border-slate-100 sm:w-1/2 lg:w-1/2 lg:justify-around">
              <div className="userImage-Name flex flex-col items-center">
                <div className="userImage-upload-icon relative">
                  <div className="userImage w-32 h-32 border border-slate-500 rounded-full overflow-hidden m-3 lg:w-48 lg:h-48">
                    <img
                      src={
                        user[0]?.profileIcon === ""
                          ? "../../Profile-Image-Default.jpg"
                          : user[0]?.profileIcon
                      }
                      className="object-cover w-full h-full"
                      alt="userImage"
                    />
                  </div>
                  <FaPlus
                    className="upload-icon absolute bottom-2 right-5 bg-purple-500 text-white p-1 rounded-xl lg:right-10"
                    size="2em"
                    onClick={() => dispatch(enableUpload())}
                  />
                </div>
                <p className="text-lg">
                  {user[0]?.firstname} {user[0]?.lastname}
                </p>
              </div>
              <div className="userDetails-buttons flex flex-col justify-center lg:flex-grow">
                <div className="userDetails flex justify-center items-center lg:flex-grow">
                  <div className="pl-3 text-center lg:flex-grow">
                    <p>{user?.length}</p>
                    <p>Posts</p>
                  </div>
                  <div className="pl-3 text-center lg:flex-grow">
                    <p>-</p>
                    <p>Follwers</p>
                  </div>
                  <div className="pl-3 text-center lg:flex-grow">
                    <p>-</p>
                    <p>Following</p>
                  </div>
                </div>
                <div className="buttons mt-8 flex">
                  <button className="bg-purple-500 text-white p-1 rounded-sm w-1/2  flex-grow">
                    Edit
                  </button>
                  <button className="bg-purple-500 text-white p-2 rounded-sm w-1/2 ml-1 flex-grow">
                    Following
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="posts mb-20 lg:flex lg:justify-center">
            {filterPostsForUserProfileView.length !== 0 && (
              <Posts data={filterPostsForUserProfileView} />
            )}
          </div>
          <Footer />
          {uploadProfileImageStates.isEnabled && <PostComposer />}
        </>
      )}
    </div>
  );
}
