export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

export interface FetchAPIParams {
  method: Method;
  url: string;
  body?: any;
}

export interface FetchAPIOptions {
  method: Method;
  headers: any;
  body?: any;
}
