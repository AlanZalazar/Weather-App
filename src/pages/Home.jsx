import { useState, useEffect } from "react";
import { weather as fetchWeather } from "../hook/weather";
import DaysContainer from "../components/DaysContainer";
import Parameters from "../components/Parameters";
import TodayContainer from "../components/TodayContainer";
import CitySearch from "../components/CitySearch";
import LocationButton from "../components/LocationButton";
import TemperatureSwitcher from "../components/TemperatureSwitcher";

const Home = () => {
  const [city, setCity] = useState("Buenos Aires");
  const [unitSystem, setUnitSystem] = useState("metric");
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setLoading(true);
        const result = await fetchWeather(city, unitSystem);

        if (result.success) {
          setForecastData(result.data);
          setError(null);
        } else {
          setError(result.error || "Failed to load weather data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [city, unitSystem]);

  if (loading) return <div className="p-4">Loading weather data...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#110f1d]">
      {forecastData && (
        <div className="flex flex-col lg:flex-row min-h-screen">
          <div className="lg:w-[30%] lg:min-w-[380px] bg-[#1f213b] relative">
            <div className="flex p-4  justify-between w-full items-center absolute z-10 md:px-20">
              <CitySearch city={city} setCity={setCity} />
              <div className="md:hidden">
                <TemperatureSwitcher
                  unitSystem={unitSystem}
                  setUnitSystem={setUnitSystem}
                />
              </div>
              <LocationButton setCity={setCity} />
            </div>
            <TodayContainer city={city} unitSystem={unitSystem} />
          </div>

          <div className="lg:w-[70%] bg-[#110f1d] flex flex-col items-center">
            <DaysContainer
              city={city}
              unitSystem={unitSystem}
              setUnitSystem={setUnitSystem}
              forecastData={forecastData.slice(1)}
            />
            <div className="w-full px-10">
              <Parameters dayData={forecastData[0]} unitSystem={unitSystem} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
