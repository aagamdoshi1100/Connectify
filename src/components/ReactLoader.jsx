import Loader from "react-js-loader";

export default function ReactLoader() {
  return (
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
  );
}
