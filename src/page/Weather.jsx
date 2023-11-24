import { useState, useEffect } from "react";

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [currentLocalDate, setCurrentLocalDate] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const api = {
    key: "57d01a64f1a98c240ed38a3ae5a9b96d",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          setCurrentLocalDate(getCurrentLocalDate());
          setBackgroundImage(getBackgroundImage(result.weather[0].main));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setWeather({});
          setCurrentLocalDate("");
          setBackgroundImage("");
        });
    }
  };

  const getCurrentLocalDate = () => {
    const date = new Date();
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getBackgroundImage = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return "url('https://source.unsplash.com/featured/?clear-sky')";
      case "Clouds":
        return "url('https://source.unsplash.com/featured/?cloud')";
      case "Rain":
        return "url('https://source.unsplash.com/featured/?rain')";
      default:
        return "url('https://source.unsplash.com/featured/?weather')";
    }
  };

  useEffect(() => {
    setBackgroundImage(getBackgroundImage(weather.weather?.[0]?.main));
  }, [weather]);

  return (
    <div
      className="h-screen w-screen flex pt-6 items-start justify-center bg-cover"
      style={{ backgroundImage: backgroundImage }}
    >
      <div className="max-w-screen-lg w-full mx-auto p-6 rounded-lg shadow-md bg-[#333] ">
        <input
          type="text"
          placeholder="Search Weather Of a City..."
          className="p-2 mt-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
        {weather.main && (
          <div className="text-center mt-6">
            <div className="text-3xl font-bold mb-2">
              {weather.name}, {weather.sys.country}
            </div>
            {currentLocalDate && (
              <div className="text-lg mb-4">{currentLocalDate}</div>
            )}
            <div className="text-6xl font-bold">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="text-lg">{weather.weather[0].description}</div>
          </div>
        )}
        {weather.message && (
          <div className="mt-6 text-red-500 text-lg">{weather.message}</div>
        )}
      </div>
    </div>
  );
};

export default Weather;
