import { Observable } from 'rxjs';

type Primitive = number | string | boolean | object;

export type SpyObject<T> = jasmine.SpyObj<T> & {
  [key: string]: Primitive | Observable<any>;
};
