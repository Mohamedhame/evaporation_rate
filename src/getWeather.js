import { Weather } from "./Weather";
import { date } from "./dateNow";
export function getWeather(isForecast = false, dateNow = date()) {
  return new Promise((resolve) => {
    const weather = new Weather();

    if (!("geolocation" in navigator)) {
      resolve({
        status: "failure",
        error: "المتصفح لا يدعم الحصول على الموقع",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          if (isForecast) {
            const weatherData = await weather.getWeatherByDate(
              lat,
              lon,
              dateNow
            );
            resolve({
              status: "success",
              city: weatherData.city,
              date: weatherData.date,
              weatherList: weatherData.weatherList,
            });
          } else {
            const weatherData = await weather.getWeather(lat, lon);
            resolve({
              status: "success",
              temperature: weatherData.temperature,
              concreteTemperature: weatherData.temperature,
              humidity: weatherData.humidity,
              windSpeed: (weatherData.windSpeed * 3.6).toFixed(2),
              city: weatherData.city,
            });
          }

          // eslint-disable-next-line no-unused-vars
        } catch (err) {
          resolve({
            status: "failure",
            error: "حدث خطأ أثناء جلب بيانات الطقس",
          });
        }
      },
      () => {
        resolve({
          status: "failure",
          error: "يجب السماح للتطبيق بالوصول إلى الموقع",
        });
      }
    );
  });
}
