declare module "koa-rx-router" {
  import {IObservable} from 'rx'

  module RxRouter {
    export interface Options {
      prefix: string
    }
  }

  class RxRouter {
    constructor(opts?:RxRouter.Options)

    get(name:string, path:string): IObservable<any>;
    get(path:string): IObservable<any>;

    post(name:string, path:string): IObservable<any>;
    post(path:string): IObservable<any>;

    put(name:string, path:string): IObservable<any>;
    put(path:string): IObservable<any>;

    del(name:string, path:string): IObservable<any>;
    del(path:string): IObservable<any>;

    routes(): any;
  }

  export = RxRouter
}
