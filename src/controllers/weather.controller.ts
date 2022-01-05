// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {get, param, post} from '@loopback/rest';
import {Weather} from '../services';
import {CityRepository} from '../repositories'
import {RedisDataSource} from '../datasources/redis.datasource'
import { createClient } from "redis";

const repo: CityRepository = new CityRepository(new RedisDataSource());

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

export class WeatherController {
  constructor(
    @inject('services.Weather')
    protected weather: Weather,
  ) {}

  @post(`/{countryName}`)
    async getWeather(
      @param.path.string('countryName') countryName: string,
    ): Promise<object> {
      //Preconditions

      const country = await repo.get(countryName);

      if (Math.random() < 0.1) {
        try {
          throw new Error('How unfortunate! The API Request Failed');
        } catch (error) {
          console.log(error);
          const timestamp = Date.now();
          await client.hSet(`api.errors:${timestamp}`, 'name', error.name);
          await client.hSet(`api.errors:${timestamp}`, 'message', error.message);
          //await client.hSet(`api.errors:${timestamp}`, 'lineNumber', error.lineNumber);
        }
      }

      return this.weather.getWeather(country.lat, country.lon);
    }
}
