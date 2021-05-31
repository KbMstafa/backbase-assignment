interface WeatherResponseCoord {
  lon: number;
  lat: number;
}

interface WeatherResponseWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherResponseMain {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

interface WeatherResponseWind {
  speed: number;
  deg: number;
}

interface WeatherResponseClouds {
  all: number;
}

interface WeatherResponseSys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherResponse {
  coord: WeatherResponseCoord;
  weather: WeatherResponseWeather[];
  base: string;
  main: WeatherResponseMain;
  visibility: number;
  wind: WeatherResponseWind;
  clouds: WeatherResponseClouds;
  dt: number;
  sys: WeatherResponseSys;
  id: number;
  name: string;
  cod: number;
}
