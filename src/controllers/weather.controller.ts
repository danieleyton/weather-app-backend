// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {get, param, post} from '@loopback/rest';
import {Weather} from '../services';
import {CityRepository} from '../repositories'
import {RedisDataSource} from '../datasources/redis.datasource'

const repo: CityRepository = new CityRepository(new RedisDataSource());

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

      if (Math.random() < 0.1) throw new Error('How unfortunate! The API Request Failed')

      return this.weather.getWeather(country.lat, country.lon);
    }
}
