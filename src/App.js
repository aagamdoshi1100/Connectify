import "./App.css";
import PageNotFound from "./pages/PageNotFound";
import { Routes, Route } from "react-router";
import Userfeed from "./pages/Userfeed";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Users from "./pages/Users";
import Footer from "./pages/Footer";
import PostComposer from "./components/PostComposer";
import { useSelector } from "react-redux";
import Bookmark from "./pages/Bookmark";
import Signup from "./pages/Signup";

function App() {
  const showCompomse = useSelector(
    (store) => store.userfeed.createPost.showComposeComponent
  );
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Userfeed />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId/profile" element={<UserProfile />} />
        <Route path="/bookmarks" element={<Bookmark />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {showCompomse && <PostComposer />}
    </div>
  );
}

export default App;
