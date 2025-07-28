import { useState, useEffect } from "react";
import { weather as fetchWeather } from "../hook/weather";
import DaysContainer from "../components/DaysContainer";
import Parameters from "../components/Parameters";
import TodayContainer from "../components/TodayContainer";
import CitySearch from "../components/CitySearch";
import LocationButton from "../components/LocationButton";
import TemperatureSwitcher from "../components/TemperatureSwitcher";
import DarkMode from "../components/DarkMode";

const Home = () => {
  const [city, setCity] = useState("Buenos Aires");
  const [unitSystem, setUnitSystem] = useState("metric");
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    fetchWeather(city, unitSystem).then(
      (result) => result.success && setForecastData(result.data || [])
    );
  }, [city, unitSystem]);

  return (
    <div className="min-h-screen bg-[#110f1d] ">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="lg:w-[30%] lg:min-w-[380px] bg-[#1f213b] relative dark:bg-sky-500">
          <div className="flex p-4 justify-between w-full items-center absolute z-10 md:px-20">
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

        <div className="lg:w-[70%] bg-[#110f1d] dark:bg-[#d9e1f1] flex flex-col items-center">
          <DaysContainer
            unitSystem={unitSystem}
            setUnitSystem={setUnitSystem}
            forecastData={forecastData.slice(1)}
          />
          <div className="w-full px-10">
            <Parameters dayData={forecastData[0]} unitSystem={unitSystem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
