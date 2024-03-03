import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserProfile, setEditedData } from "../slices/userProfile/action";
import { useDispatch, useSelector } from "react-redux";
import { Posts } from "../components/Posts";
import Footer from "./Footer";
import Header from "./Header";
import { FaPlus } from "react-icons/fa";
import PostComposer from "../components/PostComposer";
import {
  enableProfileForEditing,
  enableUpload,
  togglerUserDetailsAndPosts,
} from "../slices/userProfile/userProfileSlice";
import EditProfile from "./EditProfile";

export default function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);
  const {
    user,
    userProfileData,
    uploadProfileImageStates,
    editUserProfile,
    isUserDetailsSelected,
  } = useSelector((store) => store.userProfile);
  const { allPosts } = useSelector((store) => store.userfeed);
  const loggedUserId = localStorage.getItem("userId");

  localStorage.setItem("userProfile", JSON.stringify(user[0]));
  const filterPostsForUserProfileView = allPosts.filter(
    (userPosts) => userId === userPosts.user._id
  );
  console.log(user, filterPostsForUserProfileView, "userprofile");
  return (
    <div className="profile-container w-full h-full absolute">
      <Header />
      <div className="profile-footer">
        <Footer />
      </div>
      <div className="profile-secondary flex justify-center">
        <div className="profileImage-backgroundImage absolute top-10 lg:top-20 lg:left-[27%] w-full lg:w-[36%] h-[70%] bg-white border border-white rounded-xl overflow-hidden  shadow-xl">
          <img
            src="https://images.pexels.com/photos/13721769/pexels-photo-13721769.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            className="object-cover w-full h-[30vh]"
            alt="backgroundImage"
          />
          <div className="profile-image absolute top-32 left-[50%] -translate-x-[50%] w-40 h-40 border border-purple-400 bg-white rounded-full p-1">
            <img
              src={
                user[0]?.profileIcon === "" ||
                user[0]?.profileIcon === undefined
                  ? "../../Profile-Image-Default.jpg"
                  : user[0]?.profileIcon
              }
              className="object-cover w-full h-full rounded-full"
              alt="userImage"
            />
            <FaPlus
              className="upload-icon absolute bottom-1 right-3 lg:right-2 bg-purple-500 text-white p-1 rounded-xl"
              size="2em"
              onClick={() => dispatch(enableUpload())}
            />
          </div>
          <div className="user-container flex items-center flex-col absolute bottom-0 w-full pb-7">
            <p className="username text-xl mb-3">
              {user[0]?.firstname} {user[0]?.lastname}
            </p>
            <div className="basic-details flex w-[70%]">
              <div className="pl-3 text-center flex-grow">
                <p>{filterPostsForUserProfileView?.length}</p>
                <p>Posts</p>
              </div>
              <div className="pl-3 text-center flex-grow">
                <p>0</p>
                <p>Follwers</p>
              </div>
              <div className="pl-3 text-center flex-grow">
                <p>0</p>
                <p>Following</p>
              </div>
            </div>
            <div className="profile-actions flex">
              {userId === loggedUserId ? (
                editUserProfile.isEnabled ? (
                  <button
                    className="p-2 bg-purple-500 text-white rounded-xl m-2"
                    onClick={() =>
                      dispatch(
                        setEditedData({ loggedUserId, data: userProfileData })
                      )
                    }
                  >
                    Save changes
                  </button>
                ) : (
                  <button
                    className="p-2 bg-purple-500 text-white rounded-xl m-2"
                    onClick={() => dispatch(enableProfileForEditing())}
                  >
                    Edit Profile
                  </button>
                )
              ) : (
                ""
              )}
              <button
                className="p-2 bg-purple-500 text-white rounded-xl m-2"
                onClick={() => navigate("/user-chat")}
              >
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="user-basic-details absolute w-full lg:w-[32%] top-[76%] lg:top-20 lg:left-[64%] flex flex-col p-4 pb-16 lg:overflow-auto lg:h-[86vh] no-scrollbar">
        <div className="flex pb-15">
          <button
            className={`text-xl text-left pt-2 pb-2 border-b-2 w-[46%] flex grow text-red-400  border-red-500 mr-1 ${
              isUserDetailsSelected === "User details" ? "bg-white" : ""
            }`}
            onClick={() => dispatch(togglerUserDetailsAndPosts("User details"))}
          >
            User details
          </button>
          <button
            className={`text-xl text-left pt-2 pb-2 border-b-2 w-[46%] flex grow text-purple-400  border-purple-500 mr-1 ${
              isUserDetailsSelected === "Posts" ? "bg-white" : ""
            }`}
            onClick={() => dispatch(togglerUserDetailsAndPosts("Posts"))}
          >
            Posts
          </button>
        </div>
        {isUserDetailsSelected === "User details" ? (
          <EditProfile
            editFlag={editUserProfile.isEnabled}
            profileDetails={user[0]}
          />
        ) : (
          <Posts data={filterPostsForUserProfileView} />
        )}
      </div>
      {uploadProfileImageStates.isEnabled && <PostComposer />}
    </div>
  );
}
