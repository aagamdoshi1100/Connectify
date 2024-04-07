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
  const { allPosts } = useSelector((store) => store.userfeed);

  const fetchUserFeed = useCallback(() => {
    dispatch(fetchAllPosts());
    dispatch(disableLoginSuccessRedirection());
  }, [dispatch]);

  useEffect(() => {
    fetchUserFeed();
  }, [fetchUserFeed]);
  return (
    <>
      <Header />
      <div className="userfeed-primary-container md:flex">
        <div className="users-primary-container md:fixed md:left-[69%] lg:left-[67%] md:w-[30%] lg:w-[30%]">
          <Users />
        </div>
        <div className="posts-primary-container mb-20 md:pb-[60px] md:fixed md:left-[24.5%] lg:left-[26%] md:w-[45%] lg:w-[40%] md:overflow-auto md:h-[100vh] no-scrollbar">
          <Posts data={allPosts} />
        </div>
      </div>
      <Footer />
    </>
  );
}
