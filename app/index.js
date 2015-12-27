'use strict'

const generators = require('yeoman-generator')
const _s = require('underscore.string')
const yosay = require('yosay')
const cheers = [
  "You're great. Don't ever change.",
  'Roses are red and your code is rad.',
  "You can't touch this. Toum toumtoum toum ... toum toum ... toum toum. You can't touch this.",
  "If you don't find love, love will find you.",
  'Have a nice code session :)'
]

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
  },
  initializing: function () {
    this.log(yosay(cheers[Math.floor(Math.random() * cheers.length)]))
  },
  prompting: function () {
    let done = this.async()

    const prompts = [
      {
        name: 'appname',
        message: "What's your app name?",
        type: 'input',
        default: _s.slugify(this.appname),
        filter: function (val) {
          return _s.slugify(val)
        }
      },
      {
        name: 'description',
        message: 'What describe your app best?',
        type: 'input'
      },
      {
        name: 'username',
        message: "What's your user name?",
        type: 'input',
        store: true
      },
      {
        name: 'git',
        message: 'Will you need git?',
        type: 'confirm',
        default: true
      },
      {
        name: 'front',
        message: 'Will you need a front-end?',
        type: 'confirm',
        default: true
      },
      {
        name: 'electron',
        message: 'Will you need electron support?',
        type: 'confirm',
        default: true,
        when: function (answers) {
          return answers.front
        }
      },
      {
        name: 'electronVersion',
        message: 'What version of electron will you need?',
        type: 'input',
        default: '0.35.0',
        store: true,
        when: function (answers) {
          return answers.electron
        }
      },
      {
        name: 'back',
        message: 'Will you need a back-end?',
        type: 'confirm',
        default: true
      }
    ]

    this.prompt(prompts, function (answers) {
      this.appname = answers.appname
      this.description = answers.description
      this.username = answers.username
      this.git = answers.git
      this.front = answers.front
      this.back = answers.back
      this.electron = answers.electron
      this.electronVersion = answers.electronVersion
      done()
    }.bind(this))
  },
  configuring: function () {},
  writing: function () {
    this.fs.copy(this.templatePath() + '/LICENSE', this.destinationPath())
    this.fs.copy(this.templatePath() + '/README.md', this.destinationPath())
    this.fs.copy(this.templatePath() + '/_package.json', this.destinationPath() + '/package.json')

    if (this.git) {
      this.fs.copy(this.templatePath() + '/gitignore', this.destinationPath() + '/.gitignore')
      this.fs.copy(this.templatePath() + '/gitattributes', this.destinationPath() + '/.gitattributes')
    }
    if (this.front) {
      this.fs.copy(this.templatePath() + '/app', this.destinationPath() + '/app')
      this.fs.copy(this.templatePath() + '/webpack.config.js', this.destinationPath())
      this.fs.copy(this.templatePath() + '/gulpfile.js', this.destinationPath())
    }
    if (this.electron) {
      this.fs.copy(this.templatePath() + '/index-electron.js', this.destinationPath() + '/index.js')
    }
    if (this.back) {
      this.fs.copy(this.templatePath() + '/server', this.destinationPath() + '/server')
      if (!this.electron) {
        this.fs.copy(this.templatePath() + '/index-server.js', this.destinationPath() + '/index.js')
      }
    }
  },
  conflicts: function () {},
  install: function () {
    this.log('install')
  },
  end: function () {
    this.log(yosay('May the CORS be with you.'))
  }
})
