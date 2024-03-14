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
import Header from "./pages/Header";
import OneToOneChat from "./components/OneToOneChat";
import Search from "./components/Search";
import AllChats from "./components/AllChats";
import ChatView from "./pages/ChatView";
import MessageView from "./pages/MessageView";
import Comments from "./pages/Comments";
import DeleteAccount from "./pages/DeleteAccount";
import Feedback from "./pages/Feedback";

function App() {
  const showCompomse = useSelector(
    (store) => store.userfeed.createPost.showComposeComponent
  );
  const manageDeletion = useSelector(
    (store) => store.users.accountDeletionReq.isEnabledConfirmation
  );
  const manageFeedback = useSelector((store) => store.users.feedback.isEnabled);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Userfeed />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId/profile" element={<UserProfile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/bookmarks" element={<Bookmark />} />
        <Route path="/user-chat" element={<OneToOneChat />} />
        <Route path="/chats" element={<AllChats />} />
        <Route path="/chat-view" element={<ChatView />} />
        <Route path="/message-view" element={<MessageView />} />
        <Route
          path="/message-view/:receiverUserId/"
          element={<MessageView />}
        />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/compose-post" element={<PostComposer />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {showCompomse && <PostComposer />}
      {manageDeletion && <DeleteAccount />}
      {manageFeedback && <Feedback />}
    </div>
  );
}

export default App;
