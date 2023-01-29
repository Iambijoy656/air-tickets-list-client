import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mt-28">
      <MoonLoader size={60} color="#36d7b7" />
    </div>
  );
};

export default Loading;
