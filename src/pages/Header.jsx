import { MdLightMode } from "react-icons/md";

export default function Header() {
  const username = localStorage.getItem("username");
  return (
    <div className="header-container  border border-slate-300 bg-slate-100 p-2 flex justify-between items-center">
      <h3 className="brand-logo font-serif text-2xl text-purple-600">
        Connectify
      </h3>

      <div className="header-right flex justify-between items-center space-x-4 p-1">
        <MdLightMode size="1.7em" />

        <div className="relative">
          <div className="Username flex items-center border border-slate-600 p-1 rounded-full cursor-pointer">
            <p className="username-initial mx-2">{username && username[0]}</p>
            <div className="usermenu absolute right-0 top-10 bg-white border border-slate-300 rounded w-40 shadow-md">
              <button className="block p-2 border-b border-slate-200 w-full text-left">
                View profile
              </button>
              <button className="block p-2 border-b border-slate-200 w-full text-left">
                Delete account
              </button>
              <button className="block p-2 border-b border-slate-200 w-full text-left">
                Feedback
              </button>
              <button className="block p-2 border-b border-slate-200 w-full text-left">
                About us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
