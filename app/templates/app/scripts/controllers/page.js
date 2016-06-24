module.exports = (function page () {
  'use strict'

  let ctrl = {}<% if (stateMachine) { %>
  const signals = require('signals')<% } %>
  <% if (stateMachine) { %>
  ctrl.init = function init (toRoute, state, id) {<% } else { %>
  ctrl.init = function init (toRoute) {<% } %>
    console.log('page.js - init page controller.')<% if (stateMachine) { %>

    ctrl.changedState = new signals.Signal() // now trigger `ctrl.changedState.dispatch(state)` when your state changes to notify the router<% } %>
  }

  ctrl.destroy = function destroy () {
  }

  ctrl.transitionIn = function transitionIn (resolve) {
    TweenMax.fromTo('.main', 0.4, {opacity: 0}, {opacity: 1, onComplete: resolve})
  }

  ctrl.transitionOut = function transitionOut (resolve) {
    TweenMax.fromTo('.main', 0.4, {opacity: 1}, {opacity: 0, onComplete: resolve})
  }

  return ctrl
})()
