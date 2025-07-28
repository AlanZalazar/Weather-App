import CardDay from "./CardDay";
import TemperatureSwitcher from "./TemperatureSwitcher";

const DaysContainer = ({ unitSystem, setUnitSystem, forecastData }) => {
  return (
    <div className="w-full p-4 lg:p-0  px-10 max-w-[800px]">
      <div className=" justify-center md:justify-center lg:justify-end mb-4 lg:mb-0 lg:pt-4 hidden md:block ">
        <TemperatureSwitcher
          unitSystem={unitSystem}
          setUnitSystem={setUnitSystem}
        />
      </div>

      <div className="flex flex-wrap justify-center md:justify-between gap-3 lg:gap-5 max-w-full overflow-x-auto pb-4 lg:pb-0">
        {forecastData.map((dayData, index) => (
          <CardDay
            key={`${dayData.dt}-${index}`}
            dayData={dayData}
            unitSystem={unitSystem}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default DaysContainer;
