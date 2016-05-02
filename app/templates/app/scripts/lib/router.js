module.exports = (function router () {
  'use strict'

  const crossroads = require('crossroads')
  const hasher = require('hasher')

  const events = require('./events')

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
  self.queue = null
  self.transitionTimeout = false
  self.transitionTimeoutDelay = 20000


  for (let i = 0; i < paths.length; i++) {
    let path = paths[i]
    for (let j = 0; j < path.routes.length; j++) {
      let route = path.routes[j]
      controllers[route] = require('../controllers/' + path.template)
      views[route] = require('../../partials/' + path.template + '.html')
    }
  }

  self.init = function init () {
    self.initEvents()

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

  self.initEvents = function initEvents () {
    events.transition.on('transition-in-end', self, function (route) {
      // Remove content from #main-new
      removeOldView()
      this.transitionning = false
      clearTimeout(this.transitionTimeout)
      this.transitionTimeout = false
      if (this.queue) {
        handleQueue()
      }
    })<% if (stateMachine) { %>
    events.transition.on('transition-out-end', self, function (fromRoute, toRoute, toState, toId) {
    <% } else { %>
    events.transition.on('transition-out-end', self, function (fromRoute, toRoute) {<% } %>
      // add a class `route` to the body
      setBodyClass(toRoute, fromRoute)
      // init route controller
      <% if (stateMachine) { %>
      controllers[route].init(toRoute, toState, toId)
      // listen to state changes
      controllers[route].changedState.add((toState) => {
        setHashSilently(route + '/' + toState)
      }) <% } else { %>
      controllers[toRoute].init(toRoute)<% } %>
    })
  }

  <% if (stateMachine) { %>
  function handleRoute (route, state, id) {<% } else { %>
  function handleRoute (route) {<% } %>
    if (self.transitionning === true) {
      self.queue = route
      self.transitionTimeout = setTimeout(function () {
        self.transitionning = false
        <% if (stateMachine) { %>
        handleRoute(route, state, id)<% } else { %>
        handleRoute(route)<% } %>
      }, self.transitionTimeoutDelay)
      return
    }
    self.transitionning = true

    // store the last route
    self.past = self.current
    // store current route
    self.current = route
    // destroy current controller
    if (self.past) {
      controllers[self.past].destroy()
    }
    // set route view
    addView(views[route])

    // Call transitionOut on previous view
    if (controllers[self.past]) {
      controllers[self.past].transitionOut(self.past, route, state, id)
    } else {
      events.transition.dispatch('transition-out-end', undefined, route, state, id)
    }
  }

  function handleQueue () {
    self.queue = null
    handleRoute(window.location.hash.replace('#/', ''))
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
    translator.localizeContent()
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
