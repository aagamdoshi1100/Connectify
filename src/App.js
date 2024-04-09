import "./App.css";
import PageNotFound from "./pages/PageNotFound";
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
import RequireAuth from "./components/RequireAuth";
import { Route, Routes } from "react-router-dom";

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
        <Route
          path="/userfeed"
          element={
            <RequireAuth>
              <Userfeed />
            </RequireAuth>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/users/:userId/profile"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />
        <Route path="/search" element={<Search />} />
        <Route
          path="/bookmarks"
          element={
            <RequireAuth>
              <Bookmark />
            </RequireAuth>
          }
        />
        <Route
          path="/user-chat"
          element={
            <RequireAuth>
              <OneToOneChat />
            </RequireAuth>
          }
        />
        <Route
          path="/chats"
          element={
            <RequireAuth>
              <AllChats />
            </RequireAuth>
          }
        />
        <Route
          path="/chat-view"
          element={
            <RequireAuth>
              <ChatView />
            </RequireAuth>
          }
        />
        <Route
          path="/message-view"
          element={
            <RequireAuth>
              <MessageView />
            </RequireAuth>
          }
        />
        <Route
          path="/message-view/:receiverUserId/"
          element={
            <RequireAuth>
              <MessageView />
            </RequireAuth>
          }
        />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route
          path="/compose-post"
          element={
            <RequireAuth>
              <PostComposer />
            </RequireAuth>
          }
        />
        <Route
          path="/comments"
          element={
            <RequireAuth>
              <Comments />
            </RequireAuth>
          }
        />
        <Route
          path="/delete-account"
          element={
            <RequireAuth>
              <DeleteAccount />
            </RequireAuth>
          }
        />
        <Route
          path="/feedback"
          element={
            <RequireAuth>
              <Feedback />
            </RequireAuth>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {showCompomse && <PostComposer />}
      {manageDeletion && <DeleteAccount />}
      {manageFeedback && <Feedback />}
    </div>
  );
}

export default App;
