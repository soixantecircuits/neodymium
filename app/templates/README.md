# <%= appName %>

> <%= appName %> by <%= username %>

## Develop

#### Prerequisites

* `node >= v4.0.0` ([download here](http://nodejs.org))
* `webpack` ([download here](https://github.com/webpack/webpack))

#### Install dependencies

```
$ npm install
```

#### Run

```
$ webpack --progress --colors
$ npm start
```
*You can use the `--watch` switch with the `webpack` command to compile each time you save a file. In this case you'll need to run `npm start` in an other shell.*

## Build

```
$ webpack
$ npm run build
```

Builds the app for OS X, Linux, and Windows, using [electron-packager](https://github.com/maxogden/electron-packager). It will result in an [asar packaged](https://github.com/atom/electron/blob/master/docs/tutorial/application-packaging.md) app.

Neodymium also provides more developers friendly build scripts:
```
$ npm run build-osx # unpackaged osx 64bits app
$ npm run build-linux # unpackaged linux 64bits app
$ npm run build-win # unpackaged windows 64bits app
```
## License

MIT © [<%= name %>](<%= website %>)
