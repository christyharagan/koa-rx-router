koa-rx-router
==

Overview
--

Extends [koa-router](https://github.com/alexmingoia/koa-router) by exposing paths as [rx](https://github.com/Reactive-Extensions/RxJS) observables

Usage
--

Install:
```
npm install koa-rx-router
```

Basic Usage:

```TypeScript
import * as RxRouter from 'koa-rx-router'

let router = new RxRouter({
    prefix: '/mlListener'
})

let observable = server.post('/myPath').map(function(value){
  return value + ' Hello World'
})

observable.subscribe(function(value){
  console.log(value)
})

```
