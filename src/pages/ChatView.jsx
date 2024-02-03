import AllChats from "../components/AllChats";
import OneToOneChat from "../components/OneToOneChat";
import Footer from "./Footer";
import Header from "./Header";
export default function ChatView() {
  return (
    <div className="chatview">
      <div className="header">
        <Header />
      </div>
      <div className="footer lg:fixed lg:left-[8%]">
        <Footer />
      </div>
      <div className="allchats lg:fixed lg:left-[27%] lg:w-[26%]">
        <AllChats />
      </div>
      <div className="onetoone hidden lg:block lg:fixed lg:left-[53%] lg:w-[35%]">
        <OneToOneChat />
      </div>
    </div>
  );
}
