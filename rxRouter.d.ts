declare module "koa-rx-router" {
  import {Observable} from 'rx'

  module RxRouter {
    export interface Options {
      prefix: string
    }
  }

  class RxRouter {
    constructor(opts?:RxRouter.Options)

    get(name:string, path:string): Observable<any>
    get(path:string): Observable<any>

    post(name:string, path:string): Observable<any>
    post(path:string): Observable<any>

    _post(path: string, ret:(...args:any[])=>any): void

    put(name:string, path:string): Observable<any>
    put(path:string): Observable<any>

    del(name:string, path:string): Observable<any>
    del(path:string): Observable<any>

    routes(): any
  }

  export = RxRouter
}
