import {Model, model, property} from '@loopback/repository';

@model()
export class City extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  lon: number;

  @property({
    type: 'number',
    required: true,
  })
  lat: number;


  constructor(data?: Partial<City>) {
    super(data);
  }
}

export interface CityRelations {
  // describe navigational properties here
}

export type CityWithRelations = City & CityRelations;
