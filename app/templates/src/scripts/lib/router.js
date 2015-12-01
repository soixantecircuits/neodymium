module.exports = function router(){
  'use strict';

  const crossroads = require('crossroads');
  const signals = require('signals');
  const hasher = require('hasher');

  let self = {};

  const paths = [
    'home',
    'page'
  ];

  let controllers = {};
  let views = {};
  let past, current;

  for (let i = 0; i < paths.length; i++) {
    let path = paths[i];
    controllers[path] = require('../controllers/' + path);
    views[path] = require('../../partials/' + path + '.html');
  }

  self.init = function init(){
    crossroads.addRoute('/{route}', function(route){
      // store the last route
      past = current;
      // destroy current controller
      if(self.past){
        controllers[self.past].destroy();
      }
      // set route view
      setView(views[route]);
      // add a class `route` to the body
      setBodyClass(route);
      // init route controller
      controllers[route].init();
      // store current route
      current = route;
    });

    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();

    crossroads.bypassed.add(function(request){
      crossroads.parse('/home');
    });

    crossroads.parse('/home');
  }

  function setBodyClass(route){
    document.body.classList.remove(past + '-view');
    document.body.classList.add(route + '-view');
  }

  function parseHash (newHash, oldHash){
    crossroads.parse(newHash);
  }

  function setView(view){
    document.querySelector('.main').innerHTML = view;
  }

  return self;
}();
