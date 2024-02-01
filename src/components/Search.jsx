import { useState } from "react";
import { useSelector } from "react-redux";
import Identity from "./Identity";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";

export default function Search() {
  const [search, setSearch] = useState({
    text: "",
    searches: [],
  });
  const { users } = useSelector((store) => store.users);
  const getSearchResults = (keyword) => {
    const result = users.filter(
      (user) =>
        user.firstname.toLowerCase() === keyword.toLowerCase() ||
        user.lastname.toLowerCase() === keyword.toLowerCase() ||
        user.username.toLowerCase() === keyword.toLowerCase() ||
        user.email.toLowerCase() === keyword.toLowerCase() ||
        user.firstname.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearch({
      ...search,
      text: keyword,
      searches: result,
    });
  };

  return (
    <div className="search relative flex w-[100vw] items-center box-border p-2 lg:justify-center lg:w-[24vw] lg:p-0">
      <IoMdSearch
        className="search-icon absolute left-5 lg:left-3 text-gray-500"
        size="1.3em"
      />
      <input
        type="text"
        className="textbox p-2 lg:p-1 pl-8 lg:pl-10 border border-slate-400 rounded-lg flex-grow"
        placeholder="Search users..."
        value={search.text}
        onChange={(e) => getSearchResults(e.target.value)}
      />
      {search.text.length !== 0 && (
        <>
          <IoCloseOutline
            className="absolute right-5 lg:right-2"
            size="1.3em"
            onClick={() => setSearch({ ...search, text: "", searches: [] })}
          />
          <div className="users absolute top-14 lg:top-9 bg-white w-[95vw] lg:w-[24vw]">
            {search.searches.map((user) => (
              <div
                className="user border border-slate-400 bg-white "
                key={user._id}
              >
                <Identity user={user} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
