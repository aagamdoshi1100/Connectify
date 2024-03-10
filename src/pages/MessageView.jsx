import AllChats from "../components/AllChats";
import OneToOneChat from "../components/OneToOneChat";
import Footer from "./Footer";
import Header from "./Header";
export default function MessageView() {
  return (
    <div className="chatview">
      <Header />
      <Footer />
      <div className="allchats hidden lg:block lg:fixed lg:left-[26%] lg:w-[27%]">
        <AllChats />
      </div>
      <div className="onetoone lg:fixed lg:left-[53%] lg:w-[35%]">
        <OneToOneChat />
      </div>
    </div>
  );
}
