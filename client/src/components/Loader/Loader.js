import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Styles from "./loader.module.css";

function Loader() {
  const [loading, setLoading] = useState(true);
  return (
    <div className={Styles.loader_box}>
      <ClipLoader
        size={170}
        color={"blue"}
        loading={loading}
      />
    </div>
  );
}

export default Loader;
