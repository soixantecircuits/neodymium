'use strict'
var yeoman = require('yeoman-generator')
var _s = require('underscore.string')

module.exports = yeoman.generators.Base.extend({
  init: function () {
    var cb = this.async()

    this.prompt([{
      name: 'appName',
      message: "What's your app name?",
      default: this.appname.replace(/\s/g, '-'),
      filter: function (val) {
        return _s.slugify(val)
      }
    }, {
      name: 'username',
      message: 'What is your GitHub username?',
      store: true,
      validate: function (val) {
        return val.length > 0 ? true : 'You have to provide a username'
      }
    }, {
      name: 'website',
      message: 'What is the URL of your website?',
      store: true,
      validate: function (val) {
        return val.length > 0 ? true : 'You have to provide a website URL'
      }
    }], function (props) {
      var tpl = {
        appName: props.appName,
        classifiedAppName: _s.classify(props.appName),
        username: props.username,
        name: this.user.git.name(),
        email: this.user.git.email(),
        website: props.website
      }

      var mv = function (from, to) {
        this.fs.move(this.destinationPath(from), this.destinationPath(to))
      }.bind(this)

      this.fs.copyTpl(this.templatePath() + '/**', this.destinationPath(), tpl)
      mv('gitattributes', '.gitattributes')
      mv('gitignore', '.gitignore')
      mv('_package.json', 'package.json')

      cb()
    }.bind(this))
  },
  install: function () {
    this.installDependencies({bower: false})
  }
})
