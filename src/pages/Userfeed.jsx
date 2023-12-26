import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../slices/userfeed/actions";
import { Posts } from "../components/Posts";

export default function Userfeed() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  return (
    <div>
      <Posts />
    </div>
  );
}
