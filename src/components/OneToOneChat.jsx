import Identity from "./Identity";
import { BiSend } from "react-icons/bi";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  messageHandler,
  setSenderRecipientDetails,
  receivedMessageEventHandler,
} from "../slices/Chat/chatSlice";
import { API_URL, date, time } from "../constants";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import ReactLoader from "./ReactLoader";

export default function OneToOneChat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [unhide, setUnhide] = useState("");
  const messageContainerRef = useRef(null);

  const senderId = localStorage.getItem("userId");
  const senderUsername = localStorage.getItem("username");
  const targetUserProfile = localStorage.getItem("userProfile");

  const { inputs, messageWindow, loading, rooms } = useSelector(
    (store) => store.chats
  );

  console.log(messageWindow, "mw", rooms, "rooms");

  const { _id, profileIcon, firstname, lastname, username } =
    JSON?.parse(targetUserProfile);

  // useEffect(() => {
  //  scrollToBottom();
  // }, [messageWindow.userChats]);

  useEffect(() => {
    const socket = io.connect(`${API_URL}/`);
    socket.emit("Join_Room", {
      loggedUserId: senderId,
      targetUserId: messageWindow._ids.recipientId,
    });

    socket.on("Receive_Message", (data) => {
      console.log(data, "rec");
      dispatch(receivedMessageEventHandler(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const sendMessage = async (data) => {
    const socket = io.connect(`${API_URL}/`);
    await socket.emit("Send_Message", data);
  };

  const scrollToBottom = () => {
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  };

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
    <div className="Chat-container bg-white shadow-2xl absolute top-0 z-50 w-[100vw] h-[100vh] lg:h-[92vh] lg:w-[40vw] ">
      {!loading ? (
        <>
          <div className="header flex justify-between m-2">
            <Identity user={messageWindow.recipient} />
            <IoReturnUpBackOutline
              size="1.6em"
              className="lg:hidden mr-5 mt-3"
              onClick={backToAllChats}
            />
          </div>
          <div
            className="messages-container h-[82vh] lg:h-[72vh] overflow-auto no-scrollbar"
            ref={messageContainerRef}
          >
            {Array.isArray(messageWindow.userChats) &&
              messageWindow?.userChats.map((chatObj, index) => {
                const { username, message } = chatObj;
                return (
                  <div key={index}>
                    <div className="message">
                      <p
                        style={{
                          display:
                            messageWindow.userChats[index - 1] &&
                            messageWindow.userChats[index].date ===
                              messageWindow.userChats[index - 1].date
                              ? "none"
                              : "block",
                        }}
                        className="date text-slate-600 text-center text-sm"
                      >
                        {messageWindow.userChats[index].date}
                      </p>

                      {username === senderUsername ? (
                        <div
                          className="sender p-1 m-1 rounded-lg flex flex-row-reverse items-end gap-2"
                          onClick={() => setUnhide(index)}
                        >
                          <span
                            className="user-image border border-slate-500 overflow-hidden rounded-full w-9 h-9"
                            style={{
                              visibility:
                                messageWindow.userChats[index + 1] &&
                                messageWindow.userChats[index + 1].username ===
                                  senderUsername
                                  ? "hidden"
                                  : "none",
                            }}
                          >
                            <img src="../../Profile-Image-Default.jpg" />
                          </span>
                          <div className="flex flex-col gap-0">
                            <p
                              style={{
                                display: unhide === index ? "block" : "none",
                              }}
                              className="text-sm items-start"
                            >
                              {chatObj.time}
                            </p>
                            <span className="bg-purple-600 text-white p-2 rounded-lg">
                              {message}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="recipient p-1 m-1 rounded-lg flex items-end gap-2"
                          onClick={() => setUnhide(index)}
                        >
                          <span
                            className="user-image border border-slate-500 overflow-hidden rounded-full w-9 h-9"
                            style={{
                              visibility:
                                messageWindow.userChats[index + 1] &&
                                messageWindow.userChats[index + 1].username !==
                                  senderUsername
                                  ? "hidden"
                                  : "none",
                            }}
                          >
                            <img src="../../Profile-Image-Default.jpg" />
                          </span>
                          <div className="flex flex-col gap-0">
                            <p
                              style={{
                                display: unhide === index ? "block" : "none",
                              }}
                              className="text-sm items-start"
                            >
                              {chatObj.time}
                            </p>
                            <span className="bg-purple-600 text-white p-2 rounded-lg">
                              {message}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="textbox-send flex gap-2 p-2">
            <input
              type="text"
              className="textbox p-2 border border-slate-600 rounded-lg flex-grow"
              placeholder="Message..."
              value={inputs.message}
              onChange={(e) => dispatch(messageHandler(e.target.value))}
            />
            <BiSend
              size="2.5em"
              className="send bg-purple-600 text-white p-3 rounded-full"
              onClick={() =>
                sendMessage({
                  message: {
                    username: localStorage.getItem("username"),
                    date,
                    time,
                    message: inputs.message,
                  },
                  loggedUserId: senderId,
                  targetUserId: messageWindow._ids.recipientId,
                })
              }
            />
          </div>
        </>
      ) : (
        <ReactLoader />
      )}
    </div>
  );
}
