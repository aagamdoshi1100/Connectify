import { NavLink, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaRegEye, FaArrowRight } from "react-icons/fa";
import {
  disableError,
  inputsHandler,
  passwordManager,
} from "../slices/authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { signUpHandler } from "../slices/authentication/actions";
import { useEffect } from "react";
import { SlUser } from "react-icons/sl";
import { GoLock } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { validateSignupData } from "../Utils/utils";
import { useState } from "react";
import Brand from "../components/Brand";
import ReactLoader from "../components/ReactLoader";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState();

  const { inputs, error, password, success, loading } = useSelector(
    (store) => store.auth
  );
  useEffect(() => {
    setTimeout(() => {
      dispatch(disableError());
    }, 5000);
  }, [dispatch, error.message]);

  useEffect(() => {
    success && navigate("/");
  }, [success]);

  const validateSignUpInputs = () => {
    const flag = validateSignupData(inputs, setErr);
    if (flag) {
      dispatch(signUpHandler(inputs));
    }
  };
  return (
    <div className="signup-container md:w-[80%] md:h-[88%] flex md:fixed md:left-[50%] md:top-[48%] md:-translate-x-[50%] md:-translate-y-[50%] bg-white shadow-xl">
      <div className="signup-left md:w-[50%] h-[100vh] md:h-[70vh]">
        <div className="pl-8 md:pl-8">
          <div className="brand h-12 w-12 mb-4 mt-10 flex items-center">
            <Brand size={"3xl"} />
          </div>
          <h2 className="text-4xl font-serif text-left">Create account</h2>
          <p className="text-slate-400 font-serif">Sign up to get started</p>
        </div>
        <div className="inputs flex flex-col justify-center items-center mt-5 gap-4">
          <div className="relative w-10/12">
            <SlUser size="1.3em" className="absolute left-3 top-3" />
            <input
              type="text"
              className="p-2 pl-12 w-full border border-slate-400 focus:outline-none"
              value={inputs.username}
              placeholder="Username"
              onChange={(e) =>
                dispatch(
                  inputsHandler({
                    type: "username",
                    value: e.target.value,
                  })
                )
              }
            />
            {err && err.username !== "" && (
              <p className="error-text text-sm text-red-500 pt-1">
                {err.username}
              </p>
            )}
          </div>
          <div className="relative w-10/12">
            <GoLock size="1.3em" className="absolute left-3 top-3" />
            {password.hide ? (
              <FaEyeSlash
                size="1.3em"
                className="absolute right-3 top-3"
                onClick={() => dispatch(passwordManager())}
              />
            ) : (
              <FaRegEye
                size="1.3em"
                className="absolute right-3 top-3"
                onClick={() => dispatch(passwordManager())}
              />
            )}
            <input
              type={password.hide ? "password" : "text"}
              className="p-2 pl-12 w-full border border-slate-400 focus:outline-none"
              value={inputs.password}
              placeholder="Password"
              onChange={(e) =>
                dispatch(
                  inputsHandler({
                    type: "password",
                    value: e.target.value,
                  })
                )
              }
            />
            {err && err.password !== "" && (
              <p className="error-text text-sm text-red-500 pt-1">
                {err.password}
              </p>
            )}
          </div>
          <div className="flex gap-2 w-10/12">
            <div className=" md:flex-grow">
              <input
                type="text"
                className="p-2 w-full border border-slate-400 focus:outline-none"
                value={inputs.firstname}
                placeholder="First name"
                onChange={(e) =>
                  dispatch(
                    inputsHandler({
                      type: "firstname",
                      value: e.target.value,
                    })
                  )
                }
              />
              {err && err.firstname !== "" && (
                <p className="error-text text-sm text-red-500 pt-1">
                  {err.firstname}
                </p>
              )}
            </div>
            <div className=" md:flex-grow">
              <input
                type="text"
                className="p-2 w-full border border-slate-400 focus:outline-none"
                value={inputs.lastname}
                placeholder="Last name"
                onChange={(e) =>
                  dispatch(
                    inputsHandler({
                      type: "lastname",
                      value: e.target.value,
                    })
                  )
                }
              />
              {err && err.lastname !== "" && (
                <p className="error-text text-sm text-red-500 pt-1">
                  {err.lastname}
                </p>
              )}
            </div>
          </div>
          <div className="relative w-10/12">
            <MdOutlineEmail size="1.3em" className="absolute left-3 top-3" />
            <input
              type="text"
              className="p-2 pl-12 w-full border border-slate-400 focus:outline-none"
              value={inputs.email}
              placeholder="Email"
              onChange={(e) =>
                dispatch(
                  inputsHandler({
                    type: "email",
                    value: e.target.value,
                  })
                )
              }
            />
            {err && err.email !== "" && (
              <p className="error-text text-sm text-red-500 pt-1">
                {err.email}
              </p>
            )}
          </div>
          <button
            className="bg-purple-500 text-white p-2 w-10/12"
            onClick={validateSignUpInputs}
            disabled={loading}
          >
            Signup
          </button>
          <div className="flex items-center w-10/12 md:hidden">
            <div className="flex-grow border-t border-gray-400"></div>
            <div className="mx-4 text-gray-500">OR</div>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <button
            className="bg-black text-white w-10/12 p-2 md:hidden"
            onClick={() => navigate("/login")}
          >
            Already have an account? login
          </button>
          <div className="flex justify-center mt-8">
            {error.enabled ? (
              <p className="bg-black text-white fixed bottom-2 p-2 rounded-md">
                {error.message}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        {loading && (
          <div className="react-loader-signup fixed left-[50%] top-[48%] -translate-x-[50%] -translate-y-[50%] ">
            <ReactLoader size="50" />
          </div>
        )}
      </div>
      <div className="signup-right hidden md:w-[50%]  md:flex md:justify-center md:items-center md:flex-col md:bg-gradient-to-r md:from-indigo-500 md:via-purple-500 md:to-pink-500">
        <p className="text-4xl font-serif text-center m-4 mb-2 text-white">
          New Here?
        </p>
        <p className="text-white m-4 text-center">
          Welcome! Join our vibrant community and connect with people worldwide.
        </p>
        <button
          className="bg-transparent border border-white text-white w-10/12 p-2"
          onClick={() => navigate("/login")}
        >
          Already have an account? login
        </button>
      </div>
    </div>
  );
}
