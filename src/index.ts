import {ApplicationConfig, WeatherAppApplication} from './application';
import {CityRepository} from './repositories'
import {RedisDataSource} from './datasources/redis.datasource'

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new WeatherAppApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  const apiKey = `${process.env.API_KEY}`;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);
  console.log(`Key is ${apiKey}`);

  const repo: CityRepository = new CityRepository(new RedisDataSource());
  const long = -70.6483;
  const lati = -33.4569;

  async function setTest() {
    await repo.set('Santiago', {lon: long, lat: lati});
    await repo.set('Zurich', {lon: 8.55, lat: 47.3667});
    await repo.set('Auckland', {lon: 174.7667, lat: -36.8667});
    await repo.set('Sydney', {lon: 151.2073, lat: -33.8679});
    await repo.set('Londres', {lon: -0.1257, lat: 51.5085});
    await repo.set('Georgia', {lon: -83.5002, lat: 32.7504});

    //const result = await repo.get('Santiago');
    //console.log(result.lon);
  }

  setTest();

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
