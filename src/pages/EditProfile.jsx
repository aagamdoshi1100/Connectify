import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  interestsFeeder,
  profileDataFeeder,
  removeInterest,
} from "../slices/userProfile/userProfileSlice";
import { setEditedData } from "../slices/userProfile/action";
import { validateProfileData } from "../Utils/utils";
import { useState } from "react";

export default function EditProfile({ editFlag, profileDetails }) {
  const dispatch = useDispatch();
  const inputdata = useSelector((store) => store.userProfile.userProfileData);
  const loggedUserId = localStorage.getItem("userId");
  const [error, setError] = useState();
  const validateProfileInputs = () => {
    const flag = validateProfileData(inputdata, setError);
    if (flag) {
      dispatch(setEditedData({ loggedUserId, data: inputdata }));
    }
  };
  const inputStyle =
    " p-1 mt-2 mb-2 border-b-2 border-purple-700 focus:outline-none ";
  const margin = " mt-2 mb-2 ";
  const textColor = " text-slate-400 ";
  const savedContainerStyle = ` bg-white shadow-xl rounded-xl ${margin} p-2 `;
  return (
    <div className="pb-20">
      <div
        className={
          !editFlag
            ? savedContainerStyle + `flex flex-col`
            : `flex flex-col` + margin
        }
      >
        <p className="mt-2">Date of Birth</p>
        {editFlag ? (
          <input
            type="date"
            placeholder=""
            className={inputStyle}
            value={inputdata.dob}
            onChange={(e) =>
              dispatch(profileDataFeeder({ key: "dob", value: e.target.value }))
            }
          />
        ) : (
          <p className={margin + textColor}>{profileDetails?.dob || "-"}</p>
        )}
        {error && error.dob !== "" && (
          <p className="error-text text-sm text-red-500 ">{error.dob}</p>
        )}
        <p>Bio</p>
        {editFlag ? (
          <input
            type="text"
            placeholder=""
            className={inputStyle}
            value={inputdata.bio}
            onChange={(e) =>
              dispatch(profileDataFeeder({ key: "bio", value: e.target.value }))
            }
          />
        ) : (
          <p className={margin + textColor}>{profileDetails?.bio || "-"}</p>
        )}
        {error && error.bio !== "" && (
          <p className="error-text text-sm text-red-500 ">{error.bio}</p>
        )}
        <p>Email</p>
        {editFlag ? (
          <input
            type="text"
            placeholder=""
            className={inputStyle}
            value={inputdata.email}
            onChange={(e) =>
              dispatch(
                profileDataFeeder({ key: "email", value: e.target.value })
              )
            }
          />
        ) : (
          <p className={margin + textColor}>{profileDetails?.email || "-"}</p>
        )}
        {error && error.email !== "" && (
          <p className="error-text text-sm text-red-500 ">{error.email}</p>
        )}
        <p>Country/Origin</p>
        {editFlag ? (
          <select
            className="p-1 border-b-2 border-purple-700 focus:outline-none"
            value={inputdata.country}
            onChange={(e) =>
              dispatch(
                profileDataFeeder({ key: "country", value: e.target.value })
              )
            }
          >
            <option value="">Select</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Russia">Russia</option>
          </select>
        ) : (
          <p className={margin + textColor}>{profileDetails?.country || "-"}</p>
        )}
        {error && error.country !== "" && (
          <p className="error-text text-sm text-red-500 ">{error.country}</p>
        )}
      </div>
      <div
        className={
          !editFlag ? savedContainerStyle + `flex flex-col` : `flex flex-col`
        }
      >
        <p className="mt-2">Interests</p>
        {editFlag ? (
          <>
            <div className="flex">
              <input
                type="text"
                placeholder=""
                className={inputStyle + "flex-grow"}
                value={inputdata.interest}
                onChange={(e) =>
                  dispatch(
                    profileDataFeeder({
                      key: "interest",
                      value: e.target.value,
                    })
                  )
                }
              />
              <button
                className="bg-purple-500 p-1 mt-2 mb-2 text-white w-20"
                onClick={() => dispatch(interestsFeeder())}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap">
              {inputdata.interestArr.map((int, index) => (
                <p
                  className="flex  items-center justify-center p-1 bg-green-500 text-white rounded-xl m-2"
                  key={index}
                >
                  {int}
                  <MdOutlineClose
                    onClick={() => dispatch(removeInterest(int))}
                  />
                </p>
              ))}
            </div>
            {error && error.interest !== "" && (
              <p className="error-text text-sm text-red-500 ">
                {error.interest}
              </p>
            )}
            <button
              className="bg-purple-500 p-1 mt-2 mb-2 text-white"
              onClick={validateProfileInputs}
            >
              Save changes
            </button>
          </>
        ) : (
          <div className="flex flex-wrap">
            {profileDetails?.interestArr.length > 0 ? (
              profileDetails?.interestArr.map((int, index) => (
                <p
                  className="flex  items-center justify-center p-2 bg-green-500 text-white rounded-xl m-2"
                  key={index}
                >
                  {int}
                </p>
              ))
            ) : (
              <p className={margin + textColor}>No interest</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
