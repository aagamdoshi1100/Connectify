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
    <div className="login-container fixed top-[46%] left-1/2 -translate-x-2/4 -translate-y-2/4 w-10/12 md:w-6/12 lg:w-4/12  border border-slate-500 rounded-lg">
      <h2 className="brand-name text-4xl text-center mt-3">Connectify</h2>
      <div className="inputs flex justify-center items-center mt-5 focus:outline-none">
        <div className="w-11/12">
          <p className="mt-2 mb-2">Username</p>
          <input
            type="text"
            className="p-1 w-full border-b-2 border-purple-700 focus:outline-none"
            value={inputs.username}
            onChange={(e) =>
              dispatch(
                inputsHandler({
                  type: "username",
                  value: e.target.value,
                })
              )
            }
          />
          <p className="mt-2 mb-2">Password</p>
          <div className="relative">
            {password.hide ? (
              <FaEyeSlash
                className="absolute right-2 top-2"
                onClick={() => dispatch(passwordManager())}
              />
            ) : (
              <FaRegEye
                className="absolute right-2 top-2"
                onClick={() => dispatch(passwordManager())}
              />
            )}
            <input
              type={password.hide ? "password" : "text"}
              className="p-1 w-full border-b-2 border-purple-700 focus:outline-none"
              value={inputs.password}
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
          <div className="flex gap-3">
            <div>
              <p className="mt-2 mb-2">Firstname</p>
              <input
                type="text"
                className="p-1 w-full border-b-2 border-purple-700 focus:outline-none"
                value={inputs.firstname}
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
            <div>
              <p className="mt-2 mb-2">Lastname</p>
              <input
                type="text"
                className="p-1 w-full border-b-2 border-purple-700 focus:outline-none"
                value={inputs.lastname}
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
          <p className="mt-2 mb-2">Email</p>
          <input
            type="text"
            className="p-1 w-full border-b-2 border-purple-700 focus:outline-none"
            value={inputs.email}
            onChange={(e) =>
              dispatch(
                inputsHandler({
                  type: "email",
                  value: e.target.value,
                })
              )
            }
          />
          <div className="flex flex-row-reverse">
            <FaArrowRight
              className="bg-purple-700 mt-4 rounded-full p-2 text-white cursor-pointer"
              size="2.5em"
              onClick={() => dispatch(signUpHandler(inputs))}
            />
          </div>
          <div className="mt-2 flex justify-center">
            <NavLink
              className="text-blue-700 hover:text-purple-700 mb-5"
              to="/login"
            >
              Already have an account? login
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
