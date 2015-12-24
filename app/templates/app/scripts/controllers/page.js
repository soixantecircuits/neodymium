module.exports = function page(){
  'use strict';

  let ctrl = {};

  ctrl.init = function init(){
    console.log('page.js - init page controller.');
  }

  ctrl.destroy = function destroy(){
    ctrl = {};
  }

  return ctrl;
}();
