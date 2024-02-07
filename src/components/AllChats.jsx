import { useSelector } from "react-redux";
import Footer from "../pages/Footer";
import ChatIdentityMapper from "./ChatIdentityMapper";

export default function AllChats() {
  const { rooms } = useSelector((store) => store.chats);
  return (
    <>
      <div className="allchats h-[83vh] lg:h-[92vh] overflow-auto no-scrollbar bg-white shadow-2xl">
        {Array.isArray(rooms) ? (
          rooms?.map((room) => {
            return (
              <ChatIdentityMapper
                user={{
                  recipientDetails: room.recipient,
                  userChats: room.chats,
                }}
                key={room._id}
              />
            );
          })
        ) : (
          <p>No chats found</p>
        )}
      </div>
      <div className="lg:hidden">
        <Footer />
      </div>
    </>
  );
}
