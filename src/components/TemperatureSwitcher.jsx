import DarkMode from "./DarkMode";

const TemperatureSwitcher = ({ unitSystem, setUnitSystem }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex pr-7">
        <DarkMode></DarkMode>
      </div>
      <div className="flex items-center space-x-4 justify-end  md:py-6">
        <button
          onClick={() => setUnitSystem("metric")}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            unitSystem === "metric"
              ? "bg-white text-[#1f213b] font-bold dark:bg-sky-600 dark:border dark:border-[#1f213b]"
              : "bg-[#2d3250] text-gray-400 hover:bg-[#3a4166] font-bold dark:bg-gray-600 dark:text-white"
          }`}
          aria-label="Celsius"
        >
          °C
        </button>
        <button
          onClick={() => setUnitSystem("imperial")}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            unitSystem === "imperial"
              ? "bg-white text-[#1f213b] font-bold dark:bg-sky-600 dark:border dark:border-[#1f213b]"
              : "bg-[#2d3250] text-gray-400 hover:bg-[#3a4166] font-bold  dark:bg-gray-600 dark:text-white"
          }`}
          aria-label="Fahrenheit"
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default TemperatureSwitcher;
