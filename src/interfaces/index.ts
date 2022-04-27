// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export interface IProvince {
  id?: string;
  title: string;
  description: string;
}

export interface IFetchDataResponse {
  total: number;
  count: number;
}

export interface IFetchProvince extends IFetchDataResponse {
  results: Array<IProvince>;
}
