import { useState, useEffect } from "react";
import { weather } from "../hook/weather";
import CardToday from "./CardToday";

const TodayContainer = ({ city, unitSystem }) => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const result = await weather(city, unitSystem);

        if (result.success) {
          setForecast(result.data);
          setError(null);
        } else {
          setError(result.error || "Failed to load forecast");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city, unitSystem]);

  //if (loading) return <div>Loading weather data...</div>;
  //if (error) return <div>Error: {error}</div>;
  //if (!forecast) return <div>No forecast data available</div>;

  return (
    <div className="relative days-container h-full overflow-hidden">
      <img
        src="/Cloud-background.png"
        alt="nubes"
        className="absolute h-[50%] w-[110%] object-cover opacity-20"
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
