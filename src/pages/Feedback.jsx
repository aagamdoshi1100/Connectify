import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegMessage } from "react-icons/fa6";
import {
  manageFeedbackInput,
  manageFeedbackPage,
} from "../slices/users/usersSlices";
import { userFeedback } from "../slices/users/actions";

function Feedback() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const feedbackState = useSelector((store) => store.users.feedback);
  const submitFeedback = () => {
    dispatch(
      userFeedback({
        userId,
        rating: feedbackState.rating,
        message: feedbackState.message,
      })
    );
    dispatch(manageFeedbackPage());
  };
  return (
    <div className="delete-container-background fixed top-0 left-0 w-full h-full bg-black bg-opacity-80">
      <div className="delete-container fixed top-[50%] left-[50%] lg:left-[60%] -translate-x-[50%] -translate-y-[50%] bg-white w-[90vw] h-[72vh] md:h-[60vh] lg:h-[70vh] md:w-[70%] lg:w-[50%] p-4 rounded-xl flex flex-col gap-3 justify-center items-center z-40">
        <p className="font-medium text-lg">Give Feedback</p>
        <p className="text-center">
          Please rate your overall experience with the application.
        </p>
        <div className="flex w-[80%] flex-wrap lg:flex-nowrap justify-center">
          <div
            className="p-2"
            onClick={() =>
              dispatch(
                manageFeedbackInput({ key: "rating", value: "Terrible" })
              )
            }
          >
            <button
              className={
                `Terrible text-3xl lg:text-5xl border border-grey-200 p-2 py-2 lg:py-4 rounded-full ` +
                (feedbackState.rating === "Terrible" ? " border-red-500" : " ")
              }
            >
              😥
            </button>
            <p
              className={
                "text-center text-slate-400 font-serif pt-1" +
                (feedbackState.rating === "Terrible" ? " text-red-500" : " ")
              }
            >
              Terrible
            </p>
          </div>
          <div
            className="p-2"
            onClick={() =>
              dispatch(manageFeedbackInput({ key: "rating", value: "Bad" }))
            }
          >
            <button
              className={
                `Bad text-3xl lg:text-5xl border border-grey-200 p-2 py-2 lg:py-4 rounded-full ` +
                (feedbackState.rating === "Bad" ? " border-red-500" : " ")
              }
            >
              😟
            </button>
            <p
              className={
                "text-center text-slate-400 font-serif pt-1" +
                (feedbackState.rating === "Bad" ? " text-red-500" : " ")
              }
            >
              Bad
            </p>
          </div>
          <div
            className="p-2"
            onClick={() =>
              dispatch(manageFeedbackInput({ key: "rating", value: "Okay" }))
            }
          >
            <button
              className={
                `Okay text-3xl lg:text-5xl border border-grey-200 p-2 py-2 lg:py-4 rounded-full ` +
                (feedbackState.rating === "Okay" ? " border-red-500" : " ")
              }
            >
              🙂
            </button>
            <p
              className={
                "text-center text-slate-400 font-serif pt-1" +
                (feedbackState.rating === "Okay" ? " text-red-500" : " ")
              }
            >
              Okay
            </p>
          </div>
          <div
            className="p-2"
            onClick={() =>
              dispatch(manageFeedbackInput({ key: "rating", value: "Good" }))
            }
          >
            <button
              className={
                `Good text-3xl lg:text-5xl border border-grey-200 p-2 py-2 lg:py-4 rounded-full ` +
                (feedbackState.rating === "Good" ? " border-red-500" : " ")
              }
            >
              😀
            </button>
            <p
              className={
                "text-center text-slate-400 font-serif pt-1" +
                (feedbackState.rating === "Good" ? " text-red-500" : " ")
              }
            >
              Good
            </p>
          </div>
          <div
            className="p-2"
            onClick={() =>
              dispatch(manageFeedbackInput({ key: "rating", value: "Amazing" }))
            }
          >
            <button
              className={
                `Amazing text-3xl lg:text-5xl border border-grey-200 p-2 py-2 lg:py-4 rounded-full ` +
                (feedbackState.rating === "Amazing" ? " border-red-500" : " ")
              }
            >
              😍
            </button>
            <p
              className={
                "text-center text-slate-400 font-serif pt-1" +
                (feedbackState.rating === "Amazing" ? " text-red-500" : " ")
              }
            >
              Amazing
            </p>
          </div>
        </div>
        <div className="flex w-full gap-2 flex-col py-4 relative">
          <p className="font-medium text-sm">
            What are the main reason for your rating?
          </p>
          <input
            type="text"
            className="p-2 pl-10 text-sm outline-gray-300 border-grey-300 border rounded-lg"
            placeholder="Mention a reason for your rating "
            onChange={(e) =>
              dispatch(
                manageFeedbackInput({ key: "message", value: e.target.value })
              )
            }
          />
          <FaRegMessage
            size="1.2em"
            className="absolute top-14 left-3 text-slate-400"
          />
        </div>
        <div className="flex w-full gap-2">
          <button
            className="text-green-600 bg-green-300 w-full p-2 rounded-lg flex-1"
            onClick={submitFeedback}
          >
            Submit
          </button>
          <button
            className="bg-gray-300 w-full p-2 rounded-lg flex-1"
            onClick={() => dispatch(manageFeedbackPage())}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
