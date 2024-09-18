import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";
import { globalStyles } from "@/constants/styles";
import { useData } from "@/contexts/DataContext";
import { ForecastResponseType, WeatherResponseType } from "@/types";
import Axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function Weather() {
  const { language, coords } = useData();
  if (!coords) return null;
  const [weather, setWeather] = useState<WeatherResponseType|null>(null);
  const [forecast, setForecast] = useState<ForecastResponseType|null>(null);
  useEffect(() => {
    if (!coords) return;
    Axios.get<WeatherResponseType>(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: coords.latitude,
          lon: coords.longitude,
          appid: "4f47b76977298dea4583c996a8d4ab7e",
        },
      }
    ).then((res) => {
      setWeather(res.data);
      console.log(res.data);
    });
    Axios.get("https://api.openweathermap.org/data/2.5/forecast", {
      params: {
        lat: coords.latitude,
        lon: coords.longitude,
        appid: "4f47b76977298dea4583c996a8d4ab7e",
      },
    }).then((res) => {
      console.log(JSON.stringify(res.data, null, 2));
      setForecast(res.data.list);
    });
  }, [coords]);
  const [data, setData] = useState({});
  return (
    <ScrollView style={globalStyles.pageWrapper}>
      <ThemedCard>

      <ThemedText>
        {weather?.name} 
      </ThemedText>
      <ThemedText>
        Current Temperature: {weather?.main.temp}
      </ThemedText>
      <ThemedText>
        Wind Speed: {weather?.wind.speed} KM per hour
      </ThemedText>
      </ThemedCard>

      <ThemedCard style={{marginTop:20}}>
        <ThemedText>
          Forecast
        </ThemedText>
        {forecast?.map((item, index) => (
          <ThemedCard key={index} style={{marginVertical:5}}>  
            <ThemedText>
              {moment(item.dt).format("dddd")}
            </ThemedText>
            <ThemedText>
              {item.main.temp}
            </ThemedText>
        </ThemedCard>
        ))}
      </ThemedCard>
    </ScrollView>
  );
}
