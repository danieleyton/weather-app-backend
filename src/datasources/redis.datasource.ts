import {inject, lifeCycleObserver, ValueOrPromise} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'some-redis',
  connector: 'kv-redis',
  host: '127.0.0.1',
  port: 6379,
  password: '',
  db: 0,
};

@lifeCycleObserver('datasource')
export class RedisDataSource extends juggler.DataSource {
  static readonly dataSourceName = config.name;
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.redis', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
