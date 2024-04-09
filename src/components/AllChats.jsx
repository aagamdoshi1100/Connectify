import { useSelector } from "react-redux";
import Footer from "../pages/Footer";
import ChatIdentityMapper from "./ChatIdentityMapper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllRooms } from "../slices/Chat/actions";
import ReactLoader from "./ReactLoader";

export default function AllChats() {
  const loggedUserId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllRooms(loggedUserId));
  }, [loggedUserId]);
  const { rooms, loading } = useSelector((store) => store.chats);
  return (
    <>
      <div className="allchats h-[83vh] md:h-[92vh] overflow-auto no-scrollbar bg-slate-50 shadow-2xl pb-[70px]">
        {Array.isArray(rooms) ? (
          rooms?.map((room) => {
            if (room.recipient._id !== loggedUserId) {
              return (
                <ChatIdentityMapper
                  user={{
                    recipientDetails: room.recipient,
                    userChats: room.chats,
                  }}
                  key={room._id}
                />
              );
            }
          })
        ) : (
          <p>No chats found</p>
        )}
      </div>
      {loading && (
        <div className="react-loader-signup fixed left-[50%] top-[48%] -translate-x-[50%] -translate-y-[50%] ">
          <ReactLoader size="50" />
        </div>
      )}
      <div className="md:hidden">
        <Footer />
      </div>
    </>
  );
}
