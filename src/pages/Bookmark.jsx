import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarks } from "../slices/userfeed/actions";
import { Posts } from "../components/Posts";
import ReactLoader from "../components/ReactLoader";
import Users from "./Users";
import Footer from "./Footer";
import Header from "./Header";

export default function Bookmark() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);
  const { bookmarks, loading } = useSelector((store) => store.userfeed);
  return (
    <div>
      {loading ? (
        <ReactLoader />
      ) : (
        <>
          <Header />
          <div className="userfeed-primary-container md:flex">
            <div className="users-primary-container md:fixed md:left-[69%] lg:left-[67%] md:w-[30%] lg:w-[30%]">
              <Users />
            </div>
            <div className="posts-primary-container mb-20 md:pb-[60px] md:fixed md:left-[24.5%] lg:left-[26%] md:w-[45%] lg:w-[40%] md:overflow-auto md:h-[100vh] no-scrollbar">
              <Posts data={bookmarks} />
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
