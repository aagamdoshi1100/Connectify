import Loader from "react-js-loader";

export default function ReactLoader() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 ">
      <div className={"row"}>
        <div className={"item"}>
          <Loader
            type="box-up"
            bgColor="purple"
            color="white"
            title={""}
            size={100}
          />
        </div>
      </div>
    </div>
  );
}
