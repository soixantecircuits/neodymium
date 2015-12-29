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
      this.electron = answers.electron
      this.electronVersion = answers.electronVersion
      this.back = answers.back
      done()
    }.bind(this))
  },
  configuring: function () {},
  writing: function () {
    const config = {
      appname: this.appname,
      description: this.description,
      username: this.username,
      git: this.git,
      front: this.front,
      electron: this.electron,
      electronVersion: this.electronVersion,
      back: this.back
    }

    /*
     * A bug (either in the `yeoman-generator` or the `mem-fs-editor` module) crash the generator
     * if you copy without providing a parameter to the destinationPath() method.
     * Got no time (nor internet connection, actually in a train right now) to check on this, but will do.
    */

    this.fs.copyTpl(this.templatePath('LICENSE'), this.destinationPath('LICENSE'), config)
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), config)
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), config)

    if (this.git) {
      this.fs.copyTpl(this.templatePath('gitignore'), this.destinationPath('.gitignore'), config)
      this.fs.copyTpl(this.templatePath('gitattributes'), this.destinationPath('.gitattributes'), config)
    }
    if (this.front) {
      this.fs.copyTpl(this.templatePath('app'), this.destinationPath('app'), config)
      this.fs.copyTpl(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'), config)
      this.fs.copyTpl(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'), config)
    }
    if (this.electron) {
      this.fs.copyTpl(this.templatePath('index-electron.js'), this.destinationPath('index.js'), config)
    }
    if (this.back) {
      this.fs.copyTpl(this.templatePath('server'), this.destinationPath('server'), config)
      if (!this.electron) {
        this.fs.copyTpl(this.templatePath('index-server.js'), this.destinationPath('index.js'), config)
      }
    }
  },
  conflicts: function () {},
  install: function () {
    this.installDependencies({bower: false})
  },
  end: function () {
    if (this.git) {
      let self = this
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
    }
    this.log(yosay('May the CORS be with you.'))
  }
})
