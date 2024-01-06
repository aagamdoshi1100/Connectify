import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarks } from "../slices/userfeed/actions";
import { Posts } from "../components/Posts";
import ReactLoader from "../components/ReactLoader";

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
        <div className="mb-20">
          <Posts data={bookmarks} />
        </div>
      )}
    </div>
  );
}
