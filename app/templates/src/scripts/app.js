module.exports = function app () {
  'use strict'

  let self = {}

  const config = require('./config')
  const router = require('./lib/router')

  self.init = function init () {
    console.log('app.js - config is:', config)
    router.init()
  }

  return self
}()
