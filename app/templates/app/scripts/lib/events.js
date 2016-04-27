module.exports = (function transitionEvents () {
  'use strict'

  const Signal = require('signals')

  let self = {}

  // TODO: Need a refactoring on functions added to Signal object

  /**
   * Create a new Signal object with listener function from eventName
   * 
   * @param {string} eventName - the name of the event you want to create 
   */
  self.add = function add (eventName) {
    self[eventName] = new Signal()

    /**
     * Add an easier event listener and transmit any arguments passed to the signal.dispatch()
     * 
     * @param {string} targetEventName - the event name you want to listen
     * @param {object} context - the context in which the cb must be called (will become `this` in callback) 
     * @param {function} cb - the callback executed when target event is fired
     */
    self[eventName].on = function (targetEventName, context, cb) {
      self[eventName].add(function (eventName) {
        if (eventName === targetEventName) {
          // Remove eventName from arguments passed to cb
          Array.prototype.shift.apply(arguments)
          typeof cb === 'function' ? cb.apply(context, arguments) : console.error('not a function on %s callback', targetEventName)
        }
      }, context)
    }
  }

  return self
})()