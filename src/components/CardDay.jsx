import { formatDate } from "../hook/formatDate";

const CardDay = ({ dayData, unitSystem, index }) => {
  const tempUnit = unitSystem === "metric" ? "°C" : "°F";

  return (
    <div className="text-base lg:text-[18px] w-[120px] lg:w-[140px] bg-[#1f213b] px-2 py-4 text-white justify-center items-center flex flex-col rounded-lg">
      <h3>{formatDate(dayData.date, index)}</h3>
      <img
        src={`./weather/${dayData.icon}.png`}
        alt={dayData.description}
        className="h-[70px] lg:h-[100px] py-3 lg:py-5 object-contain"
      />
      <div className="flex gap-3">
        <span>
          {Math.round(dayData.temp_max)}
          {tempUnit}
        </span>
        <span className="text-gray-500 text-sm lg:text-[16px]">
          {Math.round(dayData.temp_min)}
          {tempUnit}
        </span>
      </div>
    </div>
  );
};

export default CardDay;
