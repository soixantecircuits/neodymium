module.exports = (function router () {
  'use strict'

  const crossroads = require('crossroads')
  const hasher = require('hasher')

  let self = {}

  const paths = [
    'home',
    'page'
  ]

  let controllers = {}
  let views = {}
  let past, current

  for (let i = 0; i < paths.length; i++) {
    let path = paths[i]
    controllers[path] = require('../controllers/' + path)
    views[path] = require('../../partials/' + path + '.html')
  }

  self.init = function init () {
    crossroads.bypassed.add(function (request) {
      <% if (stateMachine) { %>
      crossroads.parse('home/start')
      setHashSilently('home/start')
      <% } else { %>
      crossroads.parse('home')
      setHashSilently('home')
      <% } %>
    })

    <% if (stateMachine) { %>
    crossroads.addRoute('/{route}/{state}/:id:', function (route, state, id) {
    <% } else { %>
    crossroads.addRoute('/{route}', function (route) {
    <% } %>
      // store the last route
      past = current
      // destroy current controller
      if (self.past) {
        controllers[self.past].destroy()
      }
      // set route view
      setView(views[route])
      // add a class `route` to the body
      setBodyClass(route)
      // init route controller
      <% if (stateMachine) { %>
      controllers[route].init()
      <% } else { %>
      controllers[route].init(state, id)
      // listen to state changes
      controllers[route].changedState.add((state) => {
        setHashSilently(route + '/' + state)
      })
      <% } %>
      // store current route
      current = route
    })

    hasher.initialized.add(parseHash)
    hasher.changed.add(parseHash)
    hasher.init()
  }

  function setBodyClass (route) {
    document.body.classList.remove(past + '-view')
    document.body.classList.add(route + '-view')
  }

  function parseHash (newHash, oldHash) {
    crossroads.parse(newHash)
  }

  function setHashSilently (hash) {
    hasher.changed.active = false // disable changed signal
    hasher.setHash(hash) // set hash without dispatching changed signal
    hasher.changed.active = true // re-enable signal
  }

  function setView (view) {
    document.querySelector('.main').innerHTML = view
  }

  return self
})()
