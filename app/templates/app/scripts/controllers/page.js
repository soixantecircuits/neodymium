module.exports = (function page () {
  'use strict'

  let ctrl = {}
  <% if (stateMachine) { %>
  const signals = require('signals')
  <% } %>

  <% if (stateMachine) { %>
  ctrl.init = function init (state, id) {
  <% } else { %>
  ctrl.init = function init () {
  <% } %>
    console.log('page.js - init page controller.')
    <% if (stateMachine) { %>

    ctrl.changedState = new signals.Signal() // now trigger `ctrl.changedState.dispatch(state)` when your state changes to notify the router
    <% } %>
  }

  ctrl.destroy = function destroy () {
    ctrl = {}
  }

  return ctrl
})()
