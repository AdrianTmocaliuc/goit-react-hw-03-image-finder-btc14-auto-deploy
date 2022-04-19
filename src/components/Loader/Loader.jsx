import { Rings } from "react-loader-spinner";
import s from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={s.loader}>
      <Rings height="100" width="100" color="#3f51b5" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
