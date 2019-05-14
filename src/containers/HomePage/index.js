import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import LineChart from "../../components/LineChart";
import ErrorOrLoader from "../../components/ErrorOrLoader";
import request from "../../utils/request";

function HomePage() {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    request("/data")
      .then(result => setData(result.values))
      .catch(() => setIsError(true));
  }, []);

  return (
    <Fragment>
      <header className="app__header">D3 Demo App</header>
      <div className="app">
        {data.length > 0 ? (
          <LineChart
            height={500}
            width={800}
            margin={20}
            data={data}
            gridLines={true}
          />
        ) : (
          <ErrorOrLoader isError={isError} />
        )}
      </div>
    </Fragment>
  );
}

export default HomePage;
