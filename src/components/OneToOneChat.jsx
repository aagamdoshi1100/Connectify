import Identity from "./Identity";
import { BiSend } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findCurrentRoom } from "../slices/Chat/actions";
import {
  receivedMessageList,
  messageHandler,
  updateSentMessageToList,
} from "../slices/Chat/chatSlice";
import { API_URL, date, time } from "../constants";
import io from "socket.io-client";

const socket = io.connect(`${API_URL}/`);
export default function OneToOneChat() {
  const dispatch = useDispatch();
  const [unhide, setUnhide] = useState("");
  const messageContainerRef = useRef(null);
  const { messageList, inputs } = useSelector((store) => store.chats);

  const loggedUserId = localStorage.getItem("userId");
  const sender = localStorage.getItem("username");
  const targetUserProfile = localStorage.getItem("userProfile");

  const { _id, profileIcon, firstname, lastname, username } =
    JSON.parse(targetUserProfile);

  useEffect(() => {
    scrollToBottom();
  }, [messageList.chats]);

  useEffect(() => {
    dispatch(findCurrentRoom({ loggedUserId, targetUserId: _id }));
    socket.emit("Join_Room", { loggedUserId, targetUserId: _id });
  }, [dispatch]);

  useEffect(() => {
    socket.on("Receive_Message", (data) => {
      dispatch(receivedMessageList(data));
    });
  }, [socket]);

  const sendMessage = async (data) => {
    dispatch(updateSentMessageToList(data.message));
    await socket.emit("Send_Message", data);
  };

  const scrollToBottom = () => {
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  };

  return (
    <div className="Chat-container">
      <div className="header m-2">
        <Identity
          user={{
            _id,
            profileIcon,
            firstname,
            lastname,
            username,
          }}
        />
      </div>
      <div
        className="messages-container fixed top-14 overflow-auto h-[80vh] w-full"
        ref={messageContainerRef}
      >
        {messageList?.chats?.map((chatObj, index) => {
          const { username, message } = chatObj;
          return (
            <div key={index}>
              <div className="message">
                <p
                  style={{
                    display:
                      messageList.chats[index - 1] &&
                      messageList.chats[index].date ===
                        messageList.chats[index - 1].date
                        ? "none"
                        : "block",
                  }}
                  className="date text-slate-600 text-center text-sm"
                >
                  {messageList.chats[index].date}
                </p>

                {username === sender ? (
                  <div
                    className="sender p-1 m-1 rounded-lg flex flex-row-reverse items-end gap-2"
                    onClick={() => setUnhide(index)}
                  >
                    <span
                      className="user-image border border-slate-500 overflow-hidden rounded-full w-9 h-9"
                      style={{
                        visibility:
                          messageList.chats[index + 1] &&
                          messageList.chats[index + 1].username === sender
                            ? "hidden"
                            : "none",
                      }}
                    >
                      <img src="../../Profile-Image-Default.jpg" />
                    </span>
                    <div className="flex flex-col gap-0">
                      <p
                        style={{ display: unhide === index ? "block" : "none" }}
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
                          messageList.chats[index + 1] &&
                          messageList.chats[index + 1].username !== sender
                            ? "hidden"
                            : "none",
                      }}
                    >
                      <img src="../../Profile-Image-Default.jpg" />
                    </span>
                    <div className="flex flex-col gap-0">
                      <p
                        style={{ display: unhide === index ? "block" : "none" }}
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
      <div className="textbox-send flex w-[100vw] items-center fixed bottom-0 gap-4 box-border p-3">
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
              loggedUserId,
              targetUserId: _id,
            })
          }
        />
      </div>
    </div>
  );
}
