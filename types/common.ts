export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

export interface FetchAPIParams {
  method: Method;
  url: string;
  body?: any;
  token?: string;
}

export interface FetchAPIOptions {
  method: Method;
  headers: any;
  body?: any;
}
