import { formatDate } from "../hook/formatDate";

const CardToday = ({ dayData, unitSystem, index, currentWeather }) => {
  const tempUnit = unitSystem === "metric" ? "°C" : "°F";

  const weatherData = currentWeather || dayData;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img
        src={`./weather/${weatherData.icon}.png`}
        alt={weatherData.description}
        className="pt-20 md:py-35"
      />
      <div className="w-full flex flex-col justify-center items-center pt-10 pb-22 md:pt-0 md:pb-0">
        {" "}
        <div className="flex p-5">
          <span className="text-8xl font-semibold text-white dark:text-[#1d2a46]">
            {Math.round(weatherData.temp)}
          </span>
          <span className="text-gray-500 items-center flex text-6xl dark:text-black/90">
            {tempUnit}
          </span>
        </div>
        <p className="text-gray-500 text-4xl font-semibold p-5 dark:text-black/90">
          {weatherData.description}
        </p>
        <h3 className="text-gray-500 p-3 dark:text-black/90">
          Today • {formatDate(weatherData.date)}
        </h3>
        <div className="text-gray-500 p-3 dark:text-black/90">
          <p className="flex gap-2">
            <img
              src="./location_on.svg"
              alt="iconLocation"
              className="h-[20px] w-[20px] dark:bg-[#1d2a46] rounded-full"
            />
            {weatherData.city}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardToday;
