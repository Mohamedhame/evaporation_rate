import Header from "./components/Header";
import Inputs from "./components/Inputs";
import { useState, useEffect } from "react";

import "./App.css";
function App() {
  const [data, setData] = useState({
    temperature: "",
    concreteTemperature: "",
    humidity: "",
    windSpead: "",
    city: "",
  });

  const [isResult, setIsResult] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [value, setValue] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const apiKey = "3da8e3a22c5f998124c0e3ffbe1c2cff";
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
          try {
            const res = await fetch(url);
            const newData = await res.json();
            setData({
              ...data,
              temperature: newData.main.temp,
              concreteTemperature: 25,
              humidity: newData.main.humidity,
              windSpead: newData.wind.speed,
              city: newData.name,
            });
            // eslint-disable-next-line no-unused-vars
          } catch (err) {
            setError("حدث خطأ أثناء جلب بيانات الطقس");
          }
        },
        () => {
          setError("يجب السماح للتطبيق بالوصول إلى الموقع");
        }
      );
    } else {
      setError("المتصفح لا يدعم الحصول على الموقع");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleData = (id, value) => {
    const update = { ...data };
    if (id == "Temperature") {
      update.temperature = value;
    }
    if (id == "Concrete Temperature") {
      update.concreteTemperature = value;
    }
    if (id == "Humidity") {
      update.humidity = value;
    }
    if (id == "Wind Speed") {
      update.windSpead = value;
    }
    setData(update);
  };

  const isEmpty =
    data.temperature == "" ||
    data.concreteTemperature == "" ||
    data.humidity == "" ||
    data.windSpead == "";

  const calculate = () => {
    const ta = Number(data.temperature);
    const tc = Number(data.concreteTemperature);
    const r = Number(data.humidity);
    const v = Number(data.windSpead);
    const results =
      5 *
      (Math.pow(tc + 18, 2.5) - (r / 100) * Math.pow(ta + 18, 2.5)) *
      (v + 4) *
      Math.pow(10, -6);
    setIsResult(true);
    if (results > 1) {
      setIsSuccess(false);
    } else {
      setIsSuccess(true);
    }
    setValue(results.toFixed(2));
  };

  return (
    <>
      <Header />
      <div
        onClick={() => {
          if (isResult) {
            setIsResult(false);
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
          value={data.windSpead}
          onHandleCahnge={(value) => handleData("Wind Speed", value)}
        />
        <div className="result">
          <p style={{ visibility: !isResult && "hidden" }}>
            <span className={isSuccess ? "with-range" : "exceeded"}>
              {value}
            </span>{" "}
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
    </>
  );
}

export default App;
