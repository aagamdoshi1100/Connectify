import { NavLink } from "react-router-dom";

export default function Login() {
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
          />
          <p className="mt-2 mb-2">Password</p>
          <input
            type="password"
            className="p-2 rounded-lg w-full border border-slate-500"
            placeholder="Password"
          />
          <div className="flex">
            <button className="bg-purple-700 w-1/2 m-1 mt-4 rounded-full p-2 text-white">
              Login
            </button>
            <button className="bg-yellow-500 w-1/2 mt-4 rounded-full p-2 text-white">
              Guest Login
            </button>
          </div>
          <div className="mt-2 flex justify-center">
            <NavLink className="text-blue-700 hover:text-purple-700" to="">
              Don't have an account? Sign up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
