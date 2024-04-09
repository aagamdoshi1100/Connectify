import Loader from "react-js-loader";

export default function ReactLoader({ title, size }) {
  return (
    <div className={"row"}>
      <div className={"item"}>
        <Loader
          type="default"
          bgColor="gray"
          color="white"
          title={title || ""}
          size={size || 100}
        />
      </div>
    </div>
  );
}
