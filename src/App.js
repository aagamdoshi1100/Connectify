import "./App.css";
import PageNotFound from "./pages/PageNotFound";
import { Routes, Route } from "react-router";
import Userfeed from "./pages/Userfeed";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Userfeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
