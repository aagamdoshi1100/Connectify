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

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inputs, error, password, success } = useSelector(
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
  console.log(inputs);
  return (
    <div className="signup-container lg:w-[80%] flex lg:fixed lg:left-[50%] lg:top-[45%] lg:-translate-x-[50%] lg:-translate-y-[50%] bg-white shadow-xl">
      <div className="signup-left lg:w-[50%]">
        <div className="pl-4 lg:pl-8">
          <h2 className="text-4xl font-serif text-left m-4 mb-2 mt-16">
            Create account
          </h2>
          <p className="text-slate-400 font-serif ml-4">
            Sign up to get started
          </p>
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
          </div>
          <div className="flex gap-2 w-10/12">
            <div className=" lg:flex-grow">
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
            </div>
            <div className=" lg:flex-grow">
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
          </div>
          <button
            className="bg-purple-500 text-white p-2 w-10/12"
            onClick={() => dispatch(signUpHandler(inputs))}
          >
            Signup
          </button>
          <div className="flex items-center w-10/12 lg:hidden">
            <div className="flex-grow border-t border-gray-400"></div>
            <div className="mx-4 text-gray-500">OR</div>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <button
            className="bg-black text-white w-10/12 p-2 lg:hidden"
            onClick={() => navigate("/login")}
          >
            Already have an account? login
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
      <div className="signup-right hidden lg:w-[50%]  lg:flex lg:justify-center lg:items-center lg:flex-col lg:bg-gradient-to-r lg:from-indigo-500 lg:via-purple-500 lg:to-pink-500">
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
