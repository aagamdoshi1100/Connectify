import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "../slices/authentication/actions";
import {
  inputsHandler,
  passwordManager,
  disableError,
} from "../slices/authentication/authSlice";
import { FaEyeSlash, FaRegEye, FaArrowRight } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SlUser } from "react-icons/sl";
import { GoLock } from "react-icons/go";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    inputs: authCredentials,
    password: { hide: hidePass },
    error,
    success,
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
    dispatch(
      loginHandler({
        username: authCredentials.username,
        password: authCredentials.password,
      })
    );
  };

  return (
    <div className="login-container">
      <div className=" m-8 mt-20">
        <h2 className="text-4xl font-serif text-left">Welcome Back</h2>
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
            {hidePass ? (
              <FaEyeSlash
                className="absolute top-3 right-3"
                onClick={() => dispatch(passwordManager())}
              />
            ) : (
              <FaRegEye
                className="absolute top-3 right-3"
                onClick={() => dispatch(passwordManager())}
              />
            )}
          </div>
          <button
            className="bg-purple-500 text-white w-full p-2"
            onClick={login}
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
          >
            Guest Login
          </button>
          <div className="flex items-center w-full">
            <div className="flex-grow border-t border-gray-400"></div>
            <div className="mx-4 text-gray-500">OR</div>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <button
            className="bg-black text-white w-full p-2"
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Sign up
          </button>

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
