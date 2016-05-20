module.exports = (function home () {
  'use strict'

  let ctrl = {}<% if (stateMachine) { %>
  const signals = require('signals')<% } %><% if (stateMachine) { %>

  ctrl.init = function init (toRoute, state, id) {<% } else { %>

  ctrl.init = function init (toRoute) {<% } %>
    console.log('home.js - init home controller.')<% if (stateMachine) { %>

    ctrl.changedState = new signals.Signal() // now trigger `ctrl.changedState.dispatch(state)` when your state changes to notify the router<% } %>
  }

  ctrl.destroy = function destroy () {
  }

  return ctrl
})()
