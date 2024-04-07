import { useSelector } from "react-redux";
import Footer from "../pages/Footer";
import ChatIdentityMapper from "./ChatIdentityMapper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllRooms } from "../slices/Chat/actions";

export default function AllChats() {
  const loggedUserId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllRooms(loggedUserId));
  }, [loggedUserId]);
  const { rooms } = useSelector((store) => store.chats);
  return (
    <>
      <div className="allchats h-[83vh] md:h-[92vh] overflow-auto no-scrollbar bg-slate-50 shadow-2xl pb-[70px]">
        {Array.isArray(rooms) ? (
          rooms?.map((room) => {
            if (room.recipient._id !== loggedUserId) {
              return (
                <>
                  <ChatIdentityMapper
                    user={{
                      recipientDetails: room.recipient,
                      userChats: room.chats,
                    }}
                    key={room._id}
                  />
                  <ChatIdentityMapper
                    user={{
                      recipientDetails: room.recipient,
                      userChats: room.chats,
                    }}
                    key={room._id}
                  />
                  <ChatIdentityMapper
                    user={{
                      recipientDetails: room.recipient,
                      userChats: room.chats,
                    }}
                    key={room._id}
                  />
                  <ChatIdentityMapper
                    user={{
                      recipientDetails: room.recipient,
                      userChats: room.chats,
                    }}
                    key={room._id}
                  />
                </>
              );
            }
          })
        ) : (
          <p>No chats found</p>
        )}
      </div>
      <div className="md:hidden">
        <Footer />
      </div>
    </>
  );
}
