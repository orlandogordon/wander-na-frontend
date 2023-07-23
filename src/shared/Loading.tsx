import { FadeLoader } from "react-spinners";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="flex h-full w-full justify-center">
      <FadeLoader className=" h-32 w-32" />
    </div>
  );
};

export default Loading;
