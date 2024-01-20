import { useState } from "react";
import { useSelector } from "react-redux";
import Identity from "./Identity";
import { IoCloseOutline } from "react-icons/io5";

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
    <div className="search relative flex w-[100vw] items-center box-border p-3 lg:justify-center lg:w-[24vw] lg:p-0">
      <input
        type="text"
        className="textbox p-2 border border-slate-600 rounded-lg flex-grow"
        placeholder="Search users..."
        value={search.text}
        onChange={(e) => getSearchResults(e.target.value)}
      />
      {search.text.length !== 0 && (
        <>
          <IoCloseOutline
            className="absolute right-5 lg:right-2"
            size="1.7em"
            onClick={() => setSearch({ ...search, text: "", searches: [] })}
          />
          <div className="users absolute top-14 bg-white w-[94vw] lg:w-[25vw]">
            {search.searches.map((user) => (
              <div className="user border border-slate-500 bg-white">
                <Identity user={user} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
