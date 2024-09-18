export type DiseaseReponseType = {
  id: string;
  sub: string;
  createdAt: Date;
  updatedAt: Date;
  disease: string | null;
  cure: string | null;
  cause: string | null;
  preventions: string | null;
  symptoms: string | null;
  mimeType: string;
  lat: number;
  lng: number;
};

export type InventoryItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sub: string;
  image_url: string;
  createdAt: Date;
  updatedAt: Date;
  shared: boolean;
};

// {"base": "stations", "clouds": {"all": 0}, "cod": 200, "coord": {"lat": 31.2515, "lon": 75.7049}, "dt": 1726635653, "id": 1259827, "main": {"feels_like": 308.15, "grnd_level": 982, "humidity": 59, "pressure": 1008, "sea_level": 1008, "temp": 304.34, "temp_max": 304.34, "temp_min": 304.34}, "name": "Phagwāra", "sys": {"country": "IN", "sunrise": 1726620189, "sunset": 1726664376}, "timezone": 19800, "visibility": 10000, "weather": [{"description": "clear sky", "icon": "01d", "id": 800, "main": "Clear"}], "wind": {"deg": 80, "gust": 1.83, "speed": 1.76}}

export type WeatherResponseType = {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lat: number; lon: number };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  timezone: number;
  visibility: number;
  weather: { description: string; icon: string; id: number; main: string }[];
  wind: { deg: number; gust: number; speed: number };
};


export type ForecastResponseType = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  clouds: { all: number };
  wind: { speed: number; deg: number; gust: number };
  visibility: number;
  pop: number;
  sys: { pod: string };
  dt_txt: string;
}[];