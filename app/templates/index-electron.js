'use strict'
const electron = require('electron')
const fs = require('fs')
<% if (native){ %>
const server = require('./server/main.js')
<% } %>
const app = electron.app

// report crashes to the Electron project
require('crash-reporter').start()

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')()

// add some command line arguments
app.commandLine.appendArgument('--disable-pinch')
app.commandLine.appendArgument('--overscroll-history-navigation=0')
app.commandLine.appendArgument('--ignore-gpu-blacklist')
app.commandLine.appendSwitch('remote-debugging-port', '8315')

// prevent window being garbage collected
let mainWindow

function onClosed () {
  // dereference the window
  // for multiple windows store them in an array
  mainWindow = null
}

function createMainWindow () {
  const winOptions = {width: 1920, height: 1080}
  if (process.env['NODE_ENV'] !== 'dev') {
    winOptions.kiosk = true
    winOptions.frame = false
    winOptions.resizable = false
    winOptions.fullScreen = true
    winOptions.alwaysOnTop = true
  }
  winOptions.webPreferences = {
    webSecurity: false,
    allowDisplayingInsecureContent: true,
    allowRunningInsecureContent: true,
    plugins: true,
    experimentalFeatures: false,
    experimentalCanvasFeatures: false,
    directWrite: true
  }
  const win = new electron.BrowserWindow(winOptions)
  
  if (process.env['NODE_ENV'] === 'dev') {
    win.loadURL('http://0.0.0.0:' + fs.readFileSync('.port','utf-8'))
    win.openDevTools()
  } else {
    win.loadURL('file://' + __dirname + '/dist/index.html')
  }
  win.on('closed', onClosed)

  return win
}

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', () => {
  mainWindow = createMainWindow()<% if (native){ %>
  server.init()<% } %>
})
