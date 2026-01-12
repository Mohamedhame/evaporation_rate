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
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState({ city: "", weatherList: [] });
  const [error, setError] = useState("");

  // التاريخ اليوم وحد أقصى 5 أيام
  const todayOnly = new Date();
  todayOnly.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setDate(todayOnly.getDate() + 5);
  maxDate.setHours(0, 0, 0, 0);

  const selected = new Date(selectedDate);
  selected.setHours(0, 0, 0, 0);

  // جلب بيانات الطقس
  useEffect(() => {
    const fetchForecast = async () => {
      setIsLoading(true); // تشغيل الـ spinner
      setError("");

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

      setIsLoading(false); // إيقاف الـ spinner بعد التحميل
    };

    fetchForecast();
  }, [selectedDate]);

  // الانتقال من forecast للـ HomePage
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
        if (showMobile) setShowMobile(false);
      }}
    >
      <div className="city">
        <DatePicker
          selected={new Date(selectedDate)}
          onChange={(date) => setSelectedDate(date.toISOString().split("T")[0])}
          dateFormat="dd-MM-yyyy"
        />
      </div>

      {/* 1️⃣ خطأ من API */}
      {error && <p className="error">{error}</p>}

      {/* 2️⃣ خطأ في التاريخ */}
      {!error && selected < todayOnly && (
        <p className="error">لا يمكن اختيار تاريخ قبل اليوم الحالي</p>
      )}
      {!error && selected > maxDate && (
        <p className="error">يمكنك اختيار تاريخ خلال 5 أيام فقط</p>
      )}

      {/* 3️⃣ التحميل */}
      {!error && selected >= todayOnly && selected <= maxDate && isLoading && (
        <div className="spinner"></div>
      )}

      {/* 4️⃣ عرض البيانات */}
      {!error &&
        selected >= todayOnly &&
        selected <= maxDate &&
        !isLoading &&
        weather.weatherList.length > 0 && (
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
