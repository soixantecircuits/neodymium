module.exports = (function home () {
  'use strict'

  const events = require('./../lib/events')

  let ctrl = {}<% if (stateMachine) { %>
  const signals = require('signals')<% } %><% if (stateMachine) { %>

  ctrl.init = function init (toRoute, state, id) {<% } else { %>

  ctrl.init = function init (toRoute) {<% } %>
    console.log('home.js - init home controller.')<% if (stateMachine) { %>

    ctrl.changedState = new signals.Signal() // now trigger `ctrl.changedState.dispatch(state)` when your state changes to notify the router<% } %>
    // Launch transition In
    ctrl.transitionIn(toRoute)
  }

  ctrl.transitionIn = function transitionIn (route) {
    events.transition.dispatch('transition-in-end', route)
  }
  <% if (stateMachine) { %>
  ctrl.transitionOut = function transitionOut (fromRoute, toRoute, toState, toId) {
    events.transition.dispatch('transition-out-end', fromRoute, toRoute, toState, toId)
  } <% } else { %>
  ctrl.transitionOut = function transitionOut (fromRoute, toRoute) {
    events.transition.dispatch('transition-out-end', fromRoute)
  } <% } %>

  ctrl.destroy = function destroy () {
  }

  return ctrl
})()
