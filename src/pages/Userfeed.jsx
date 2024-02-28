import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../slices/userfeed/actions";
import { Posts } from "../components/Posts";
import Users from "./Users";
import Footer from "./Footer";
import { disableLoginSuccessRedirection } from "../slices/authentication/authSlice";
import Header from "./Header";

export default function Userfeed() {
  const dispatch = useDispatch();
  const { allPosts, loading } = useSelector((store) => store.userfeed);

  const fetchUserFeed = useCallback(() => {
    dispatch(fetchAllPosts());
    dispatch(disableLoginSuccessRedirection());
  }, [dispatch]);

  useEffect(() => {
    fetchUserFeed();
  }, [fetchUserFeed]);
  return (
    <div>
      <Header />
      <div className="userfeed-primary-container lg:flex">
        <div className="users-primary-container lg:fixed lg:left-[65%] lg:w-[28%]">
          <Users />
        </div>
        <div className="posts-primary-container mb-20 lg:pb-[60px] lg:fixed lg:left-[25%] lg:w-[40%] lg:overflow-auto lg:h-[100vh] no-scrollbar">
          <Posts data={allPosts} />
        </div>
        <div className="footer-primary-container lg:fixed lg:left-[7%] lg:w-[20%]">
          <Footer />
        </div>
      </div>
    </div>
  );
}
