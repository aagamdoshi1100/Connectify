import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRooms } from "../slices/Chat/actions";
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import IdentityForChats from "./IdentityForChats";

export default function AllChats() {
  const dispatch = useDispatch();
  const loggedUserId = localStorage.getItem("userId");
  useEffect(() => {
    dispatch(fetchAllRooms(loggedUserId));
  }, [dispatch]);
  const { usersChatProfiles } = useSelector((store) => store.chats);
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        {usersChatProfiles?.map((profile) => {
          return (
            <IdentityForChats
              user={{
                userDetails: profile.user1 || profile.user2,
                lastChat: profile.chats[profile.chats.length - 1],
              }}
              key={profile._id}
            />
          );
        })}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
