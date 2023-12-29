import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loginHandler } from "../slices/authentication/actions";
import {
  inputsHandler,
  passwordManager,
  disableError,
} from "../slices/authentication/authSlice";
import { FaEyeSlash, FaRegEye, FaArrowRight } from "react-icons/fa";
import { useEffect } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const {
    inputs: authCredentials,
    password: { hide: hidePass },
    error,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      dispatch(disableError());
    }, 3000);
  }, [error.message]);

  return (
    <div className="login-container fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-10/12 md:w-6/12 lg:w-4/12 h-4/6 border border-slate-500 rounded-lg">
      <h2 className="brand-name text-4xl text-center mt-3">Connectify</h2>
      <div className="inputs flex justify-center items-center mt-5">
        <div className="w-11/12">
          <p className="mt-2 mb-2">Username</p>
          <input
            type="text"
            className="p-2 rounded-lg w-full border border-slate-500"
            placeholder="Username"
            value={authCredentials.username}
            onChange={(e) =>
              dispatch(
                inputsHandler({ type: "username", value: e.target.value })
              )
            }
          />
          <p className="mt-2 mb-2">Password</p>
          <div className="password relative">
            <input
              type={hidePass ? "password" : "text"}
              className="p-2 rounded-lg w-full border border-slate-500"
              placeholder="Password"
              value={authCredentials.password}
              onChange={(e) =>
                dispatch(
                  inputsHandler({ type: "password", value: e.target.value })
                )
              }
            />
            {hidePass ? (
              <FaEyeSlash
                className="absolute top-3 right-2"
                onClick={() => dispatch(passwordManager())}
              />
            ) : (
              <FaRegEye
                className="absolute top-3 right-2"
                onClick={() => dispatch(passwordManager())}
              />
            )}
          </div>
          <div className="flex flex-row-reverse">
            <FaArrowRight
              className="bg-purple-700 mt-4 rounded-full p-2 text-white cursor-pointer"
              size="2.5em"
              onClick={() =>
                dispatch(
                  loginHandler({
                    username: authCredentials.username,
                    password: authCredentials.password,
                  })
                )
              }
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-yellow-500 w-1/2 mt-4 rounded-full p-2 text-white"
              onClick={() =>
                dispatch(
                  loginHandler({
                    username: "Test User",
                    password: "TestUser@123",
                  })
                )
              }
            >
              Guest Login
            </button>
          </div>
          <div className="mt-2 flex justify-center">
            <NavLink className="text-blue-700 hover:text-purple-700" to="">
              Don't have an account? Sign up
            </NavLink>
          </div>
          <div className="flex justify-center mt-8">
            {error.enabled ? (
              <p className="bg-black text-white fixed bottom-2 p-2 rounded-lg">
                {error.message}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
