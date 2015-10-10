'use strict'

var Router = require('koa-router')
var Rx = require('rx')
var koaBody = require('koa-body')()

module.exports.RxRouter = RxRouter

function RxRouter(opts) {
  if (!this instanceof RxRouter) {
    return new RxRouter(opts)
  }

  this.opts = opts || {}

  this.router = new Router(opts)
}

function createMethod(method) {
  return function() {
    var subject = new Rx.ReplaySubject(1)
    var args = []
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i]
    }
    args.push(koaBody)
    args.push(function *(next){
      subject.onNext(this.request.body)

      yield* next
    })
    this.router[method].apply(this.router, args)

    return subject.share()
  }
}

RxRouter.prototype.get = createMethod('get')
RxRouter.prototype.post = createMethod('post')
RxRouter.prototype.put = createMethod('put')
RxRouter.prototype.del = createMethod('del')
RxRouter.prototype.delete = createMethod('del')

RxRouter.prototype.routes = function() {
  return this.router.routes()
}
