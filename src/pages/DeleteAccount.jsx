import React from "react";
import { useDispatch } from "react-redux";
import { manageConfirmationPage } from "../slices/users/usersSlices";
import { deleteUserAccount } from "../slices/users/actions";
import { useNavigate } from "react-router-dom";

function DeleteAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const finalDeletionProcess = () => {
    dispatch(deleteUserAccount(userId));
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    dispatch(manageConfirmationPage());
    navigate("/login");
  };
  return (
    <div className="delete-container-background fixed top-0 left-0 w-full h-full bg-black bg-opacity-80">
      <div className="delete-container fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white w-[90vw] h-[60vh] md:w-[40%] lg:w-[40%] p-4 rounded-xl flex flex-col gap-3 justify-center items-center z-40">
        <img
          src="../../delete-account.jpg"
          alt="delete-account-img"
          className="h-[40%] w-[60%] object-contain"
        />
        <p className="font-medium">Delete your account</p>
        <p className="text-center">
          You will lose all of your data by deleting you account. This action
          cannot be undone.
        </p>
        <button
          className="text-red-600 bg-red-300 w-full p-2 rounded-lg"
          onClick={() => finalDeletionProcess()}
        >
          Delete account
        </button>
        <button
          className="bg-gray-300 w-full p-2 rounded-lg"
          onClick={() => dispatch(manageConfirmationPage())}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
