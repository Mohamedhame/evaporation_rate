import React, { useEffect, useState } from "react";
import Card from "./Card";
import { date } from "../dateNow";
import { getWeather } from "../getWeather";
import { calculateData } from "../calculate";
import { useAppContext } from "../AppContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Forecast = () => {
  const { setIsHome, setData, showMobile, setShowMobile, setIsResult } =
    useAppContext();
  const [selectedDate, setSelectedDate] = useState(date());
  const [weather, setWeather] = useState({
    city: "",
    weatherList: [],
  });
  const [error, setError] = useState("");

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 5);
  const selected = new Date(selectedDate);

  const todayOnly = new Date();
  todayOnly.setHours(0, 0, 0, 0);

  selected.setHours(0, 0, 0, 0);

  useEffect(() => {
    // تحقق من التاريخ قبل أي fetch
    if (selected < todayOnly) {
      setError("لا يمكن اختيار تاريخ قبل اليوم الحالي");
      setWeather({ city: "", weatherList: [] });
      return;
    }

    if (selected > maxDate) {
      setError("يمكنك اختيار تاريخ خلال 5 أيام فقط");
      setWeather({ city: "", weatherList: [] });
      return;
    }

    const fetchForecast = async () => {
      setError(""); // مسح أي خطأ قديم

      const result = await getWeather(true, selectedDate);

      if (result.status === "failure") {
        setError(result.error);
        setWeather({ city: "", weatherList: [] });
      } else {
        setWeather({
          city: result.city,
          weatherList: result.weatherList,
        });
      }
    };

    fetchForecast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const goToHome = (data) => {
    setData((prev) => ({
      ...prev,
      temperature: data.temperature,
      concreteTemperature: data.temperature,
      humidity: data.humidity,
      windSpeed: data.windSpeed,
      fromForecast: true,
    }));
    setIsResult(false);
    setIsHome(true);
  };

  return (
    <div
      className="container"
      onClick={() => {
        if (showMobile) {
          setShowMobile(false);
        }
      }}
    >
      <div className="city">
        <DatePicker
          selected={new Date(selectedDate)}
          onChange={(date) => setSelectedDate(date.toISOString().split("T")[0])}
          dateFormat="dd-MM-yyyy"
        />
      </div>

      {/* خطأ */}
      {error && <p className="error">{error}</p>}

      {/* تحميل حقيقي فقط */}
      {!error && weather.weatherList.length === 0 && (
        <div className="spinner"></div>
      )}

      {/* بيانات */}
      {!error && weather.weatherList.length > 0 && (
        <div className="container-card">
          {weather.weatherList.map((item, index) => {
            const data = {
              temperature: item.temperature,
              concreteTemperature: item.temperature,
              humidity: item.humidity,
              windSpeed: item.windSpeed,
            };

            return (
              <Card
                key={index}
                hour={item.dateTime.split(" ")[1].slice(0, 5)}
                temperature={item.temperature}
                humidity={item.humidity}
                windSpeed={item.windSpeed}
                value={calculateData(data).value}
                goToHome={() => goToHome(item)}
              />
            );
          })}
        </div>
      )}

      <div className="footer">
        <div className="copy-right">Designed by Mohamed Hamed</div>
      </div>
    </div>
  );
};
export default Forecast;
