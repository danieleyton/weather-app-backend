import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {OpenweatherDataSource} from '../datasources';

export interface Weather {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getWeather(lat: number, lon: number): Promise<object>;
}

export class WeatherProvider implements Provider<Weather> {
  constructor(
    // openweather must match the name property in the datasource json file
    @inject('datasources.openweather')
    protected dataSource: OpenweatherDataSource = new OpenweatherDataSource(),
  ) {}

  value(): Promise<Weather> {
    return getService(this.dataSource);
  }
}
