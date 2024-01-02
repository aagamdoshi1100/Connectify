import "./App.css";
import PageNotFound from "./pages/PageNotFound";
import { Routes, Route } from "react-router";
import Userfeed from "./pages/Userfeed";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Users from "./pages/Users";
import Footer from "./pages/Footer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Userfeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId/profile" element={<UserProfile />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
