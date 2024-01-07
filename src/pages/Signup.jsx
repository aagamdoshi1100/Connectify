import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function Signup() {
  return (
    <div className="login-container fixed top-[46%] left-1/2 -translate-x-2/4 -translate-y-2/4 w-10/12 md:w-6/12 lg:w-4/12  border border-slate-500 rounded-lg">
      <h2 className="brand-name text-4xl text-center mt-3">Connectify</h2>
      <div className="inputs flex justify-center items-center mt-5 focus:outline-none">
        <div className="w-11/12">
          <p className="mt-2 mb-2">Username</p>
          <input
            type="text"
            className="p-1 w-full border-b-2 border-purple-700 focus:outline-none"
          />
          <p className="mt-2 mb-2">Password</p>
          <input
            type="password"
            className="p-1 w-full border-b-2 border-purple-700 focus:outline-none"
          />
          <div className="flex gap-3">
            <div>
              <p className="mt-2 mb-2">Firstname</p>
              <input
                type="text"
                className="p-1 w-full border-b-2 border-purple-700 focus:outline-none"
              />
            </div>
            <div>
              <p className="mt-2 mb-2">Lastname</p>
              <input
                type="text"
                className="p-1 w-full border-b-2 border-purple-700 focus:outline-none"
              />
            </div>
          </div>
          <p className="mt-2 mb-2">Email</p>
          <input
            type="text"
            className="p-1 w-full border-b-2 border-purple-700 focus:outline-none"
          />
          <div className="flex flex-row-reverse">
            <FaArrowRight
              className="bg-purple-700 mt-4 rounded-full p-2 text-white cursor-pointer"
              size="2.5em"
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
        </div>
      </div>
    </div>
  );
}
