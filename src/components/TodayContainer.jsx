import { useState, useEffect } from "react";
import { weather } from "../hook/weather";
import CardToday from "./CardToday";

const TodayContainer = ({ city, unitSystem }) => {
  const [forecast, setForecast] = useState([]); // Cambiado a array vacío

  useEffect(() => {
    const fetchForecast = async () => {
      const result = await weather(city, unitSystem);
      if (result.success) {
        setForecast(result.data || []);
      }
    };

    fetchForecast();
  }, [city, unitSystem]);

  return (
    <div className="relative days-container h-full overflow-hidden">
      <img
        src="/Cloud-background.png"
        alt="nubes"
        className="absolute h-[50%] w-[110%] object-cover opacity-20 dark:opacity-85"
      />
      <div className="flex">
        {forecast.slice(0, 1).map((dayData, index) => (
          <CardToday
            index={index}
            key={index}
            dayData={dayData}
            unitSystem={unitSystem}
          />
        ))}
      </div>
    </div>
  );
};

export default TodayContainer;
