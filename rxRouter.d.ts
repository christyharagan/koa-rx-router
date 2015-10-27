import {Observable} from 'rx'

export interface Options {
  prefix: string
}

export class RxRouter {
  constructor(opts?: Options)

  get(name: string, path: string): Observable<any>
  get(path: string): Observable<any>

  post(name: string, path: string): Observable<any>
  post(path: string): Observable<any>

  put(name: string, path: string): Observable<any>
  put(path: string): Observable<any>

  del(name: string, path: string): Observable<any>
  del(path: string): Observable<any>

  routes(): any
}
