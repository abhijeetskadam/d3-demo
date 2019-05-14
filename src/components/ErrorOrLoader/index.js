import React from "react";
import "./styles.css";
import Spinner from "@atlaskit/spinner";

function ErrorOrLoader({ isError }) {
  return (
    <div className="app__placeholder">
      {isError ? (
        <span className="app__placeholder--errortext">
          Oppsss, Something went wrong.!!
        </span>
      ) : (
        <Spinner size="large" />
      )}
    </div>
  );
}

export default ErrorOrLoader;
