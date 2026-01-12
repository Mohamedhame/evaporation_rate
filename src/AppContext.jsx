/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { calculateData } from "./calculate";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isHome, setIsHome] = useState(true);
  const [showMobile, setShowMobile] = useState(false);
  const [data, setData] = useState({
    temperature: "",
    concreteTemperature: "",
    humidity: "",
    windSpeed: "",
    city: "",
    fromForecast: false,
  });

  const [isResult, setIsResult] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  //===============
  const keyMap = {
    Temperature: "temperature",
    "Concrete Temperature": "concreteTemperature",
    Humidity: "humidity",
    "Wind Speed": "windSpeed",
  };

  const handleData = (id, value) => {
    setData((prev) => ({
      ...prev,
      [keyMap[id]]: value,
    }));
  };

  const isEmpty =
    data.temperature == "" ||
    data.concreteTemperature == "" ||
    data.humidity == "" ||
    data.windSpeed == "";

  const calculate = () => {
    const results = calculateData(data);
    setIsResult(results.isResult);
    setIsSuccess(results.isSuccess);
    setValue(results.value);
  };

  return (
    <AppContext.Provider
      value={{
        isHome,
        setIsHome,
        data,
        setData,
        isResult,
        setIsResult,
        isSuccess,
        setIsSuccess,
        value,
        setValue,
        error,
        setError,
        isEmpty,
        handleData,
        calculate,
        showMobile,
        setShowMobile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
