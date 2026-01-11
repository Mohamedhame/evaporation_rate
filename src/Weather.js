const API_KEY = "3da8e3a22c5f998124c0e3ffbe1c2cff";

export class Weather {
  async getWeather(lat, lon) {
    const params = new URLSearchParams({
      lat,
      lon,
      units: "metric",
      appid: API_KEY,
    });

    const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("فشل في جلب بيانات الطقس");
    }

    const data = await res.json();

    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      city: data.name,
    };
  }
}


//const url = `https://api.openweathermap.org/data/2.5/weather?lat=30.968722&lon=27.758083&units=metric&appid=${apiKey}`;
