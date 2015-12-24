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
      message: 'What is your git username?',
      store: true,
      validate: function (val) {
        return (val.length) ? true : 'You have to provide a username'
      }
    },
    {
      name: 'git',
      message: 'Would you like to add a git integration? (yes/no)',
      store: true,
      validate: function (val) {
        val = (val.match(/y((es)?|$)/gi).length)
        return true
      }
    },
    {
      name: 'website',
      message: 'What is the URL of your website?',
      store: true,
      validate: function (val) {
        val = (val.length) ? val : ''
        return true
      }
    }], function (props) {
      var self = this
      var tpl = {
        appName: props.appName,
        classifiedAppName: _s.classify(props.appName),
        username: props.username,
        name: self.user.git.name(),
        email: self.user.git.email(),
        website: props.website
      }

      var mv = function (from, to) {
        self.fs.move(self.destinationPath(from), self.destinationPath(to))
      }

      self.fs.copyTpl(self.templatePath() + '/**', self.destinationPath(), tpl)
      mv('gitattributes', '.gitattributes')
      mv('gitignore', '.gitignore')
      mv('_package.json', 'package.json')

      self
        .spawnCommand('git', ['init'])
        .on('close', function () {
          self
            .spawnCommand('git', ['add', '-A'])
            .on('close', function () {
              self
                .spawnCommand('git', ['commit', '-m', '"initial commit"'])
            })
        })

      cb()
    }.bind(this))
  },
  install: function () {
    this.installDependencies({bower: false})
  }
})
