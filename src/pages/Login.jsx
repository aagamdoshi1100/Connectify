import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "../slices/authentication/actions";
import {
  inputsHandler,
  passwordManager,
  disableError,
} from "../slices/authentication/authSlice";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SlUser } from "react-icons/sl";
import { GoLock } from "react-icons/go";
import { validateSignInData } from "../Utils/utils";
import { useState } from "react";
import Brand from "../components/Brand";
import ReactLoader from "../components/ReactLoader";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState();

  const {
    inputs: authCredentials,
    password: { hide: hidePass },
    error,
    success,
    loading,
  } = useSelector((state) => state.auth);
  useEffect(() => {
    setTimeout(() => {
      dispatch(disableError());
    }, 3000);
  }, [dispatch, error.message]);

  useEffect(() => {
    success && navigate("/");
  }, [success, navigate]);

  const login = () => {
    const validateFlag = validateSignInData(authCredentials, setErr);
    if (validateFlag) {
      dispatch(
        loginHandler({
          username: authCredentials.username,
          password: authCredentials.password,
        })
      );
    }
  };

  return (
    <div className="login-container md:w-[80%] flex flex-col md:flex-row md:fixed md:left-[50%] md:top-[48%] md:-translate-x-[50%] md:-translate-y-[50%] bg-white shadow-xl">
      <div className="login-left hidden md:w-[50%]  md:flex md:justify-center md:items-center md:flex-col md:bg-gradient-to-r md:from-indigo-500 md:via-purple-500 md:to-pink-500">
        <p className="text-4xl font-serif text-center m-4 mb-2 text-white">
          Hello, Friend!
        </p>
        <p className="text-white m-4 text-center">
          Enter your details to start journey with us.
        </p>
        <button
          className="bg-transparent border border-white text-white w-10/12 p-2"
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Sign up
        </button>
      </div>
      <div className="login-right md:w-[50%] h-[100vh] md:h-[88vh]">
        <div className=" m-8 mt-20">
          <div className="brand h-12 w-12 mb-4 mt-10 flex items-center">
            <Brand size={"3xl"} />
          </div>
          <h2 className="text-4xl font-serif text-left mt-5 md:my-2">
            Welcome Back
          </h2>
          <p className="text-slate-400 font-serif mb-8">
            Enter credential to continue
          </p>
          <div className="inputs flex justify-center items-center flex-col gap-4 ">
            <div className="relative w-full">
              <SlUser size="1.3em" className="absolute left-3 top-3" />
              <input
                type="text"
                className="p-2 pl-12 w-full border border-slate-400 focus:outline-none"
                placeholder="Enter Username"
                value={authCredentials.username}
                onChange={(e) =>
                  dispatch(
                    inputsHandler({ type: "username", value: e.target.value })
                  )
                }
              />
              {err && err.username !== "" && (
                <p className="error-text text-sm text-red-500 pt-1">
                  {err.username}
                </p>
              )}
            </div>
            <div className="password relative w-full">
              <GoLock size="1.3em" className="absolute left-3 top-3" />
              <input
                type={hidePass ? "password" : "text"}
                className="p-2 pl-12 w-full  border border-slate-400 focus:outline-none"
                placeholder="Password"
                value={authCredentials.password}
                onChange={(e) =>
                  dispatch(
                    inputsHandler({ type: "password", value: e.target.value })
                  )
                }
              />
              {err && err.password !== "" && (
                <p className="error-text text-sm text-red-500 pt-1">
                  {err.password}
                </p>
              )}
              {hidePass ? (
                <FaEyeSlash
                  size="1.3em"
                  className="absolute top-3 right-3"
                  onClick={() => dispatch(passwordManager())}
                />
              ) : (
                <FaRegEye
                  size="1.3em"
                  className="absolute top-3 right-3"
                  onClick={() => dispatch(passwordManager())}
                />
              )}
            </div>
            <button
              className="bg-purple-500 text-white w-full p-2"
              onClick={login}
              disabled={loading}
            >
              Login
            </button>
            <button
              className="bg-yellow-500 text-white w-full p-2"
              onClick={() =>
                dispatch(
                  loginHandler({
                    username: "Test User",
                    password: "TestUser@123",
                  })
                )
              }
              disabled={loading}
            >
              Guest Login
            </button>
            <div className="flex items-center w-full md:hidden">
              <div className="flex-grow border-t border-gray-400"></div>
              <div className="mx-4 text-gray-500">OR</div>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <button
              className="bg-black text-white w-full p-2 md:hidden"
              onClick={() => navigate("/signup")}
            >
              Don't have an account? Sign up
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
        </div>
      </div>
      {loading && (
        <div className="react-loader-signup fixed left-[50%] top-[48%] -translate-x-[50%] -translate-y-[50%] ">
          <ReactLoader size="50" />
        </div>
      )}
    </div>
  );
}
