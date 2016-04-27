module.exports = (function page () {
  'use strict'
  
  const events = require('./../lib/events')

  let ctrl = {}<% if (stateMachine) { %>
  const signals = require('signals')<% } %>
  <% if (stateMachine) { %>
  ctrl.init = function init (state, id) {<% } else { %>
  ctrl.init = function init () {<% } %>
    console.log('page.js - init page controller.')<% if (stateMachine) { %>

    ctrl.changedState = new signals.Signal() // now trigger `ctrl.changedState.dispatch(state)` when your state changes to notify the router<% } %>
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
  } <% } %>

  ctrl.destroy = function destroy () {
  }

  return ctrl
})()
