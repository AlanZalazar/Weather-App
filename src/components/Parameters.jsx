import React from "react";

const Parameters = ({ dayData, unitSystem }) => {
  if (!dayData) return <div>Loading parameters...</div>;

  const speedUnit = unitSystem === "metric" ? "m/s" : "mph";
  const visibilityUnit = unitSystem === "metric" ? "km" : "miles";
  const visibility =
    unitSystem === "metric"
      ? (dayData.visibility / 1000).toFixed(2)
      : (dayData.visibility / 1609).toFixed(2);

  const getWindDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="flex flex-col text-white justify-center items-center w-full lg:p-0 ">
      <div className="w-full lg:w-[800px]">
        <h2 className="text-2xl lg:text-3xl font-semibold py-2 lg:py-4 lg:pt-20">
          Today's Hightlights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-7">
          <div className="bg-[#1f213b] p-4 rounded-lg text-center">
            <p className="text-gray-400 text-base lg:text-[18px]">
              Wind Status
            </p>
            <p className="text-4xl lg:text-6xl font-bold p-3 lg:p-5">
              {dayData.wind_speed.toFixed(2)}
              <span className="text-base lg:text-lg"> {speedUnit}</span>
            </p>
            <div className="flex items-center justify-center gap-2">
              <div
                className="flex justify-center items-center w-8 h-8 rounded-full bg-[#ffffff4d]"
                style={{ transform: `rotate(${dayData.wind_deg}deg)` }}
              >
                <img
                  alt="Wind Direction"
                  src="/navigation.svg"
                  className="w-[18px] h-[18px]"
                  style={{ color: "transparent" }}
                />
              </div>
              <span>{getWindDirection(dayData.wind_deg)}</span>
            </div>
          </div>

          <div className="bg-[#1f213b] p-4 rounded-lg text-center px-15">
            <p className="text-gray-400 text-base lg:text-[18px]">Humidity</p>
            <p className="text-4xl lg:text-6xl font-bold p-3 lg:p-5">
              {dayData.humidity}
              <span className="text-base lg:text-lg">%</span>
            </p>
            <div className="text-xs lg:text-[12px] justify-between flex text-gray-300">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{ width: `${dayData.humidity}%` }}
              ></div>
            </div>
            <span className="text-xs lg:text-[12px] justify-end flex text-gray-300 mt-1">
              %
            </span>
          </div>

          <div className="bg-[#1f213b] p-4 rounded-lg text-center">
            <p className="text-gray-400 text-base lg:text-[18px]">Visibility</p>
            <p className="text-4xl lg:text-6xl font-bold p-3 lg:p-5">
              {visibility}
              <span className="text-base lg:text-lg"> {visibilityUnit}</span>
            </p>
          </div>

          <div className="bg-[#1f213b] p-4 rounded-lg text-center">
            <p className="text-gray-400 text-base lg:text-[18px]">
              Air Pressure
            </p>
            <p className="text-4xl lg:text-6xl font-bold p-3 lg:p-5">
              {dayData.pressure}
              <span className="text-base lg:text-lg"> hPa</span>
            </p>
          </div>
        </div>
      </div>
      <p className="text-xs lg:text-[12px] p-4 text-gray-300">
        Created by <span className="font-bold">AlanZalazar</span> - Funval2025
      </p>
    </div>
  );
};

export default Parameters;
