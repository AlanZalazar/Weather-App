import { useState } from "react";

const IPINFO_TOKEN = import.meta.env.VITE_IPINFO_TOKEN;

const LocationButton = ({ setCity }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocationByIP = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const ipResponse = await fetch(
        `https://ipinfo.io/json?token=${IPINFO_TOKEN}`
      );
      const ipData = await ipResponse.json();

      if (ipData.city && ipData.country) {
        setCity(`${ipData.city}, ${ipData.country}`);
      } else {
        await getBrowserGeolocation();
      }
    } catch (ipError) {
      console.error("Error con ipinfo.io:", ipError);

      await getBrowserGeolocation();
    } finally {
      setIsLoading(false);
    }
  };

  const getBrowserGeolocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return resolve();
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=215f44f09bd69755d28776f0e5cb6236`
            );
            const data = await response.json();

            if (data.length > 0) {
              setCity(`${data[0].name}, ${data[0].country}`);
            } else {
              setError("Could not determine your city");
            }
          } catch (error) {
            console.error("Error with reverse geocoding:", error);
            setError("Error getting location data");
          }
          resolve();
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError(
            "Could not get your location. Please enable location services."
          );
          resolve();
        }
      );
    });
  };

  return (
    <div className="relative">
      <button
        onClick={getLocationByIP}
        disabled={isLoading}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2d3250] text-white hover:bg-[#3a4166] transition-colors"
        aria-label="Get my location"
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        ) : (
          <img src="/location.svg" alt="" className="p-2" />
        )}
      </button>

      {error && (
        <div className="absolute top-full mt-2 right-0 w-64 p-2 bg-red-100 text-red-800 text-sm rounded shadow-lg z-10">
          {error}
        </div>
      )}
    </div>
  );
};

export default LocationButton;
