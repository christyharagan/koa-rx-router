'use strict'

var Router = require('koa-router')
var Rx = require('rx')
var koaBody = require('koa-body')()

module.exports = RxRouter

function RxRouter(opts) {
  if (!this instanceof RxRouter) {
    return new RxRouter(opts)
  }

  this.opts = opts || {}

  this.router = new Router(opts)
}

function createMethod(method) {
  return function() {
    var subject = new Rx.Subject()
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

RxRouter.prototype._post = function(path, cb) {
  this.router.post(path, koaBody, function*(next){
    this.body = yield cb(this.request.body)
    yield* next
  })
}

RxRouter.prototype.routes = function() {
  return this.router.routes()
}
