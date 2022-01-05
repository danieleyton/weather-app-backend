import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'openweather',
  connector: 'rest',
  baseURL: 'https://api.openweathermap.org',
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'POST',
        url: `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${process.env.API_KEY}&units=metric&lang=es`,
      },
      functions: {
        getWeather: ['lat', 'lon'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class OpenweatherDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'openweather';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.openweather', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
