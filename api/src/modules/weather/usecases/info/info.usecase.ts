import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { InfoCommand } from './info.command';

@Injectable()
export class Info {
  async execute(command: InfoCommand) {
    const { lat, lng } = command;
    const key = '4f47b76977298dea4583c996a8d4ab7';
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=minutely,hourly,alerts&appid=${key}`;
    console.log(url);
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new HttpException('Error fetching weather data', 500);
    }
  }
}
