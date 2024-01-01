import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../slices/userfeed/actions";
import { Posts } from "../components/Posts";
import ReactLoader from "../components/ReactLoader";

export default function Userfeed() {
  const dispatch = useDispatch();
  const { allPosts, loading } = useSelector((store) => store.userfeed);
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return <div>{loading ? <ReactLoader /> : <Posts data={allPosts} />}</div>;
}
