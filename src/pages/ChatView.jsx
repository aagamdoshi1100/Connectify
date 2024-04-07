import AllChats from "../components/AllChats";
import OneToOneChat from "../components/OneToOneChat";
import Footer from "./Footer";
import Header from "./Header";

export default function ChatView() {
  return (
    <div className="chatview">
      <Header />
      <Footer />
      <div className="allchats md:fixed md:left-[26%] md:w-[30%] cursor-pointer">
        <AllChats />
      </div>
      <div className="onetoone hidden md:block md:fixed md:left-[57%] md:w-[35%] cursor-pointer">
        <OneToOneChat />
      </div>
    </div>
  );
}
