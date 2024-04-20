import Identity from "./Identity";
import { BiSend } from "react-icons/bi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  messageHandler,
  setSenderRecipientDetails,
  receivedMessageEventHandler,
  sentMessageEventHandler,
} from "../slices/Chat/chatSlice";
import { CHAT_API_URL } from "../constants";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import ReactLoader from "./ReactLoader";

export default function OneToOneChat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messageContainerRef = useRef("");
  const [unhide, setUnhide] = useState("");
  const { inputs, messageWindow, loading, rooms } = useSelector(
    (store) => store.chats
  );

  const senderId = localStorage.getItem("userId");

  const timeStamp = new Date();
  let yearAndMonth = timeStamp.toJSON().slice(0, 8);
  let formattedDate =
    timeStamp.getDate() < 10 ? "0" + timeStamp.getDate() : timeStamp.getDate();
  let date = yearAndMonth + formattedDate;
  let hours = timeStamp.getHours();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  let minutes = timeStamp.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  let time = `${formattedHours}:${formattedMinutes}`;

  useEffect(() => {
    const socket = io.connect(`${CHAT_API_URL}`);
    socket.emit("Join_Room", {
      senderId: senderId,
      roomId: "ThisIsCommonRoomForEveryOne",
    });
    socket.on("Receive_Message", (data) => {
      dispatch(receivedMessageEventHandler(data));
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch, senderId]);

  const filterTheSelectedRoom = rooms.filter(
    (room) =>
      room.recipient && room.recipient._id === messageWindow._ids.recipientId
  );

  const sendMessage = (data) => {
    const socket = io.connect(`${CHAT_API_URL}/`);
    socket.emit("Send_Message", data);
    dispatch(
      sentMessageEventHandler({
        roomId: filterTheSelectedRoom[0]._id,
        sentMessage: data,
      })
    );
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current !== "" && messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => scrollToBottom(), [filterTheSelectedRoom[0]?.chats]);

  const backToAllChats = () => {
    dispatch(
      setSenderRecipientDetails({
        senderId,
        recipientId: senderId,
      })
    );
    navigate("/chat-view");
  };

  return (
    <div className="Chat-container bg-white absolute top-0 z-50 w-[100vw] h-[100vh] md:h-[92vh] md:w-[40vw] ">
      {!loading ? (
        <>
          {filterTheSelectedRoom.length > 0 ? (
            <>
              <div className="header bg-white fixed top-0 w-full md:top-14 md:w-[40vw] flex justify-between p-2">
                {filterTheSelectedRoom[0]?.recipient && (
                  <Identity user={filterTheSelectedRoom[0]?.recipient} />
                )}
                <IoReturnUpBackOutline
                  size="1.6em"
                  className="md:hidden mr-5 mt-3"
                  onClick={backToAllChats}
                />
              </div>
              <div
                className="messages-container pt-[68px] h-[90vh] md:h-[82vh] overflow-auto no-scrollbar "
                ref={messageContainerRef}
              >
                {Array.isArray(filterTheSelectedRoom[0]?.chats) &&
                filterTheSelectedRoom[0].chats.length > 0 ? (
                  filterTheSelectedRoom[0].chats.map((chatObj, index) => {
                    const { message, time } = chatObj;
                    return (
                      <div key={index}>
                        <div className="message">
                          <p
                            style={{
                              display:
                                filterTheSelectedRoom[0].chats[index - 1] &&
                                filterTheSelectedRoom[0].chats[index].date ===
                                  filterTheSelectedRoom[0].chats[index - 1].date
                                  ? "none"
                                  : "block",
                            }}
                            className="date text-slate-600 text-center text-sm"
                          >
                            {filterTheSelectedRoom[0].chats[index].date}
                          </p>

                          {senderId === chatObj.senderId ? (
                            <div
                              className="sender p-1 m-1 rounded-md flex flex-row-reverse items-end gap-2"
                              onClick={() => setUnhide(index)}
                            >
                              <span
                                className="user-image border border-slate-500 overflow-hidden rounded-full w-9 h-9"
                                style={{
                                  visibility:
                                    filterTheSelectedRoom[0].chats[index + 1] &&
                                    filterTheSelectedRoom[0].chats[index + 1]
                                      .senderId === chatObj.senderId
                                      ? "hidden"
                                      : "none",
                                }}
                              >
                                <img
                                  src="../../Profile-Image-Default.jpg"
                                  alt="defaultImage"
                                />
                              </span>
                              <div className="flex flex-col gap-0">
                                <p
                                  style={{
                                    display:
                                      unhide === index ? "block" : "none",
                                  }}
                                  className="text-sm items-start"
                                >
                                  {time}
                                </p>
                                <span className="bg-purple-600 text-white p-2 rounded-md break-words max-w-[80vw] md:max-w-[30vw]">
                                  {message}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="recipient p-1 m-1 rounded-md flex items-end gap-2"
                              onClick={() => setUnhide(index)}
                            >
                              <span
                                className="user-image border border-slate-500 overflow-hidden rounded-full w-9 h-9"
                                style={{
                                  visibility:
                                    filterTheSelectedRoom[0].chats[index + 1] &&
                                    filterTheSelectedRoom[0].chats[index + 1]
                                      .recipientId === chatObj.recipientId
                                      ? "hidden"
                                      : "none",
                                }}
                              >
                                <img
                                  src="../../Profile-Image-Default.jpg"
                                  alt="defaultImage"
                                />
                              </span>
                              <div className="flex flex-col gap-0">
                                <p
                                  style={{
                                    display:
                                      unhide === index ? "block" : "none",
                                  }}
                                  className="text-sm items-start"
                                >
                                  {time}
                                </p>
                                <span className="bg-green-500 text-white p-2 rounded-md break-words max-w-[80vw] md:max-w-[30vw]">
                                  {message}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p
                    className="text-center m-32 md:m-40 text-md border text-slate-400 rounded-md shadow-sm p-4 cursor-pointer"
                    onClick={() =>
                      sendMessage({
                        senderId,
                        recipientId: messageWindow._ids.recipientId,
                        date,
                        time,
                        message: "Hi",
                      })
                    }
                  >
                    Say Hi!
                  </p>
                )}
              </div>
              <div className="textbox-send flex gap-2 p-2 shadow-sm fixed bottom-0 w-full md:w-[40vw]">
                <input
                  type="text"
                  className="textbox p-3 border-none bg-slate-200 rounded-lg flex-grow outline-none pr-14"
                  placeholder="Message..."
                  value={inputs.message}
                  onChange={(e) => dispatch(messageHandler(e.target.value))}
                />
                <BiSend
                  size="3em"
                  className="send bg-purple-600 text-white p-3 rounded-xl absolute right-2"
                  onClick={() =>
                    sendMessage({
                      senderId,
                      recipientId: messageWindow._ids.recipientId,
                      date,
                      time,
                      message: inputs.message,
                    })
                  }
                />
              </div>
            </>
          ) : (
            <div className="Initiate-conversion flex justify-center items-center h-full">
              <p className="text-center hidden lg:block text-lg border text-slate-400 rounded-md shadow-sm p-4 cursor-pointer">
                Select a contact to start conversation.
              </p>
              <p
                className="text-center lg:hidden text-lg border text-slate-400 rounded-md shadow-sm p-4 cursor-pointer"
                onClick={backToAllChats}
              >
                Click me to start conversation.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="react-loader-signup fixed left-[50%] top-[48%] -translate-x-[50%] -translate-y-[50%] ">
          <ReactLoader size="50" />
        </div>
      )}
    </div>
  );
}
