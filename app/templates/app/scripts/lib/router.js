module.exports = (function router () {
  'use strict'

  const crossroads = require('crossroads')
  const hasher = require('hasher')
  const Q = require('q')

  let isTransitionning = false

  let self = {}

  const paths = [
    {
      routes: ['home'],
      template: 'home'
    },
    {
      routes: ['page-1', 'page-2'],
      template: 'page'
    }
  ]

  let controllers = {}
  let views = {}
  self.past = ''
  self.current = ''

  for (let i = 0; i < paths.length; i++) {
    let path = paths[i]
    for (let j = 0; j < path.routes.length; j++) {
      let route = path.routes[j]
      controllers[route] = require('../controllers/' + path.template)
      views[route] = require('../../partials/' + path.template + '.html')
    }
  }

  self.init = function init () {
    crossroads.bypassed.add(function (request) {<% if (stateMachine) { %>
      crossroads.parse('home/start')
      setHashSilently('home/start')<% } else { %>
      crossroads.parse('home')
      setHashSilently('home')<% } %>
    })<% if (stateMachine) { %>

    crossroads.addRoute('/{route}/{state}/:id:', function (route, state, id) {<% } else { %>

    crossroads.addRoute('/{route}', function (route) {<% } %> <% if (stateMachine) { %>
      handleRoute(route, state, id) <% } else { %>
      handleRoute(route) <% } %>
    })

    hasher.initialized.add(parseHash)
    hasher.changed.add(parseHash)
    hasher.init()
  }


  function handleRoute (route, state, id) {
    // store the last route
    self.past = self.current
    // store current route
    self.current = route
    // destroy current controller
    if (self.past) {
      controllers[self.past].destroy()
    }
    handleTransitions(function () {
      // set route view
      addView(views[route])
      removeOldView()
      setBodyClass(route)
      // Init controller
      controllers[route] && controllers[route].init && controllers[route].init(route, state, id)
    })
  }

  function handleTransitions (routeCallback) {
    isTransitionning = true
    let transitionOut = null

    if (controllers[self.past]) {
      transitionOut = (typeof (controllers[self.past].transitionOut) === 'function')
                      ? controllers[self.past].transitionOut
                      : null
    }
    let transitionIn = null
    if (controllers[self.current]) {
      transitionIn = ((typeof controllers[self.current].transitionIn) === 'function')
                      ? controllers[self.current].transitionIn
                      : null
    }

    triggerTransition(transitionOut,
      function promiseCallback () {
        triggerTransition(transitionIn, function () {
          ;(typeof (routeCallback) === 'function') && routeCallback()
          isTransitionning = false
        }, function () {
          ;(typeof (routeCallback) === 'function') && routeCallback()
        })
      }, function defaultCallback () {
        ;(typeof (routeCallback) === 'function') && routeCallback()
        isTransitionning = false
      })
  }

  function triggerTransition (transition, promiseCallback, defaultCallback) {
    if (transition) {
      Q.Promise(transition)
      .then(function success () {
        ;(typeof (promiseCallback) === 'function') && promiseCallback()
      }, function error (error) {
        ;(typeof (defaultCallback) === 'function') && defaultCallback()
        console.log('router.js - ', error)
      })
    } else {
      ;(typeof (defaultCallback) === 'function') && defaultCallback()
    }
  }

  function setBodyClass (route) {
    document.body.classList.remove(self.past + '-view')
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

  function addView (view) {
    document.querySelector('#main-new').innerHTML = view
  }

  function removeOldView () {
    var oldContainer = document.querySelector('#main')
    var newContainer = document.querySelector('#main-new')
    oldContainer.id = 'main-new'
    newContainer.id = 'main'
    oldContainer.innerHTML = ''
  }

  return self
})()
