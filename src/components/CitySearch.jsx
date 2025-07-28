import { useState, useEffect, useRef } from "react";

const CitySearch = ({ city, setCity }) => {
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        handleCancel();
      }
    };

    if (isSearching) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearching]);

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  const handleCancel = () => {
    setIsSearching(false);
    setInputValue("");
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      await fetchSuggestions(inputValue.trim());
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(`${suggestion.name}, ${suggestion.country}`);
    handleCancel();
  };

  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSearching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputValue.trim() && isSearching) {
        fetchSuggestions(inputValue.trim());
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, isSearching]);

  return (
    <div className="relative" ref={searchRef}>
      {!isSearching ? (
        <button
          onClick={handleSearchClick}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#2d3250] text-white hover:bg-[#3a4166] transition-colors"
        >
          <svg
            className="h-5 w-5 md:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="hidden md:block">Search for Places</span>
        </button>
      ) : (
        <div className="fixed inset-0 bg-[#110f1d]/90 z-50 flex items-start justify-center pt-20 px-4 h-100 lg:w-[30%] lg:min-w-[380px]">
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center bg-[#2d3250] rounded-full shadow-xl">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search city..."
                className="w-full p-4 px-5 bg-transparent text-white focus:outline-none rounded-full"
              />
              <div className="absolute right-2 flex gap-1">
                <button
                  type="submit"
                  className="p-2 text-blue-400 hover:text-blue-500"
                  disabled={!inputValue.trim() || isLoading}
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
                    "Search"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="p-2 text-gray-400 hover:text-gray-300"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {suggestions.length > 0 && (
              <div className="absolute z-10 mt-2 w-full bg-[#2d3250] rounded-lg shadow-lg overflow-hidden">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={`${suggestion.name}-${suggestion.country}-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 hover:bg-[#3a4166] cursor-pointer flex justify-between text-white"
                  >
                    <span>{suggestion.name}</span>
                    <span className="text-gray-400">{suggestion.country}</span>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default CitySearch;
