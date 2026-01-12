import Inputs from "./Inputs";
import { useEffect } from "react";
import { getWeather } from "../getWeather";

import { useAppContext } from "../AppContext";

const HomePage = () => {
  const {
    isResult,
    setIsResult,
    data,
    handleData,
    isSuccess,
    value,
    error,
    isEmpty,
    calculate,
    setData,
    setError,
    showMobile,
    setShowMobile,
  } = useAppContext();

  useEffect(() => {
    if (data.fromForecast) return;
    const fetchWeather = async () => {
      const weather = await getWeather();

      if (weather.status === "failure") {
        setError(weather.error);
      } else {
        setData({
          temperature: weather.temperature,
          concreteTemperature: weather.concreteTemperature,
          humidity: weather.humidity,
          windSpeed: weather.windSpeed,
          city: weather.city,
        });
      }
    };

    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onClick={() => {
        if (isResult) {
          setIsResult(false);
        }
        if (showMobile) {
          setShowMobile(false);
        }
      }}
      className="container"
    >
      {data.city && (
        <div className="city">
          <p>{data.city}</p>
        </div>
      )}
      <Inputs
        id={"Temperature"}
        value={data.temperature}
        onHandleCahnge={(value) => handleData("Temperature", value)}
      />
      <Inputs
        id={"Concrete Temperature"}
        value={data.concreteTemperature}
        onHandleCahnge={(value) => handleData("Concrete Temperature", value)}
      />
      <Inputs
        id={"Humidity"}
        value={data.humidity}
        onHandleCahnge={(value) => handleData("Humidity", value)}
      />
      <Inputs
        id={"Wind Speed"}
        value={data.windSpeed}
        onHandleCahnge={(value) => handleData("Wind Speed", value)}
      />

      <div className="result">
        <p style={{ visibility: !isResult && "hidden" }}>
          <span className={isSuccess ? "with-range" : "exceeded"}>{value}</span>{" "}
          kg/m² per hour
        </p>
      </div>

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      <div className="footer">
        <div className="btn">
          <button
            disabled={isEmpty}
            style={{ color: isEmpty && "grey" }}
            onClick={calculate}
          >
            Calculate
          </button>
        </div>
        <div className="copy-right">Designed by Mohamed Hamed</div>
      </div>
    </div>
  );
};

export default HomePage;
