import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import Spinner from "@atlaskit/spinner";

function ErrorOrLoader({ isError }) {
  return (
    <div className="app__placeholder center-block">
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

ErrorOrLoader.propTypes = {
  isError: PropTypes.bool.isRequired
};

export default ErrorOrLoader;
