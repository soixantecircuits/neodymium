module.exports = (function home () {
  'use strict'

  let ctrl = {}

  ctrl.init = function init () {
    console.log('home.js - init home controller.')
  }

  ctrl.destroy = function destroy () {
    ctrl = {}
  }

  return ctrl
})()
