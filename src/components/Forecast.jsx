import React, { useEffect, useState } from "react";
import Card from "./Card";
import { date } from "../dateNow";
import { getWeather } from "../getWeather";
import { calculateData } from "../calculate";
import { useAppContext } from "../AppContext";

const Forecast = () => {
  const { setIsHome, setData, showMobile, setShowMobile } = useAppContext();
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
    const fetchForecast = async () => {
      const result = await getWeather(true, selectedDate);

      if (result.status === "failure") {
        setError(result.error);
        setWeather({ city: "", weatherList: [] });
      } else {
        setWeather({
          city: result.city,
          weatherList: result.weatherList,
        });
        setError("");
      }
    };

    fetchForecast();
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
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="container-card">
        {selected < todayOnly ? (
          <div className="error">لا يمكن اختيار تاريخ قبل اليوم الحالي</div>
        ) : selected > maxDate ? (
          <div className="error">يمكنك اختيار تاريخ خلال 5 أيام فقط</div>
        ) : (
          weather.weatherList.map((item, index) => {
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
          })
        )}
      </div>
    </div>
  );
};
export default Forecast;
