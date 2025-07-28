import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export const weather = async (city, system = "metric") => {
  try {
    const response = await axios.get(
      `${API_URL}${city}&appid=${API_KEY}&units=${system}`
    );
    const forecastList = response.data.list;

    const dailyForecast = {};

    const middayData = {};

    forecastList.forEach((item) => {
      const [date, time] = item.dt_txt.split(" ");
      if (time === "12:00:00") {
        middayData[date] = {
          icon: item.weather[0].icon,
          description: item.weather[0].description,
          weather_main: item.weather[0].main,
          temp: item.main.temp,
          feels_like: item.main.feels_like,
        };
      }
    });

    forecastList.forEach((item) => {
      const [date, time] = item.dt_txt.split(" ");

      if (!dailyForecast[date]) {
        const hasMiddayData = middayData[date] !== undefined;

        dailyForecast[date] = {
          date,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          temp: item.main.temp,
          feels_like: item.main.feels_like,
          humidity: item.main.humidity,
          pressure: item.main.pressure,
          sea_level: item.main.sea_level,
          grnd_level: item.main.grnd_level,

          icon: hasMiddayData ? middayData[date].icon : item.weather[0].icon,
          description: hasMiddayData
            ? middayData[date].description
            : item.weather[0].description,
          weather_main: hasMiddayData
            ? middayData[date].weather_main
            : item.weather[0].main,
          wind_speed: item.wind.speed,
          wind_deg: item.wind.deg,
          wind_gust: item.wind.gust,
          visibility: item.visibility,
          clouds: item.clouds.all,
          pop: item.pop,
          city: response.data.city.name,
          country: response.data.city.country,
          sunrise: response.data.city.sunrise,
          sunset: response.data.city.sunset,
          timezone: response.data.city.timezone,
          observation_time: hasMiddayData ? "12:00:00" : time,
        };
      } else {
        if (item.main.temp_min < dailyForecast[date].temp_min) {
          dailyForecast[date].temp_min = item.main.temp_min;
        }
        if (item.main.temp_max > dailyForecast[date].temp_max) {
          dailyForecast[date].temp_max = item.main.temp_max;
        }
      }
    });

    Object.keys(dailyForecast).forEach((date) => {
      if (!middayData[date]) {
        const closestToMidday = forecastList
          .filter((item) => item.dt_txt.startsWith(date))
          .filter((item) => {
            const hour = parseInt(item.dt_txt.split(" ")[1].split(":")[0]);
            return hour >= 9 && hour <= 15;
          })
          .sort((a, b) => {
            const timeA = Math.abs(
              12 - parseInt(a.dt_txt.split(" ")[1].split(":")[0])
            );
            const timeB = Math.abs(
              12 - parseInt(b.dt_txt.split(" ")[1].split(":")[0])
            );
            return timeA - timeB;
          })[0];

        if (closestToMidday) {
          dailyForecast[date].icon = closestToMidday.weather[0].icon;
          dailyForecast[date].description =
            closestToMidday.weather[0].description;
          dailyForecast[date].weather_main = closestToMidday.weather[0].main;
          dailyForecast[date].observation_time =
            closestToMidday.dt_txt.split(" ")[1];
        }
      }
    });

    return {
      success: true,
      data: Object.values(dailyForecast).slice(0, 6),
      city: response.data.city.name,
      country: response.data.city.country,
      timezone: response.data.city.timezone,
    };
  } catch (error) {
    console.error(`Error fetching data from ${city}:`, error);
    return {
      success: false,
      error: error.message,
    };
  }
};
