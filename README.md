# Neodymium :metal:

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

> Scaffolds a clean and combat ready app for the browser/electron/nodejs.

```
your-app/
├── LICENSE
├── README.md
├── .package.json
├── dist
|   |   # Here comes the webpack compiled files
│   └── index.html
├── .editorconfig
├── .gitattributes
├── .gitignore
├── index.js
├── app
|   |   # You'll probably want to add an `assets` folder here
│   ├── entry.js
│   ├── index.html
│   ├── partials
|   |   |   # Your templates goes there
│   │   ├── home.html
│   │   └── page.html
│   ├── scripts
│   │   ├── app.js
│   │   ├── config.js
│   │   ├── controllers
|   |   |   |   # Your controllers should have the same name as their attached template
│   │   │   ├── home.js
│   │   │   └── page.js
│   │   └── lib
│   │       └── router.js
│   └── styles
│       └── main.css
├── server
|   |   # Everything related to server should go there
│   └── main.js # The entry point of the server
└── webpack.config.js
```

## Install

```
$ npm install --global generator-neodymium
```

## Usage

With [yo](https://github.com/yeoman/yo):

```
$ yo neodymium
```

## To do

* ~~Integrate webpack~~
* ~~Add livereload in dev mode~~
* Make kiosk mode optionnal
* Integrate Bootstrap / Foundation css
* Integrate Vue.js
* ~~Make electron support optionnal~~
* Propose a Phonegap support
* Find a way to copy just the `node_modules` the electron app needs
* Write tests !

## Develop

It's recommended to use node `v4.2.4` LTS. I cannot guarantee previous versions support, but will sure do my best to. Please post an issue if you encounter troubles with developing on `neodymium`.

```
# Clone the repo and `cd` into it
$ git clone git@github.com:soixantecircuits/neodymium.git && cd neodymium
# Install the generator dependencies
$ npm i
# Now, create a symlink in your global `node_modules` folder.
# (If you have previously installed neodymium via the npm package, you should run `npm remove --global generator-neodymium` before this command)
$ npm link
```

The `yo neodymium` command will now execute your local version of neodymium. Enjoy :)

## Contributing

Create a `feature-[name-of-the-feature]` branch and make PR on the `dev` branch. Please use the [standard js coding style](https://github.com/feross/standard).

## Credits

This was originally a fork of [sindresorhus' neat generator](https://github.com/sindresorhus/generator-electron).

*See [awesome-electron](https://github.com/sindresorhus/awesome-electron) for more useful Electron resources.*

## License

MIT © [Soixante circuits](http://soixantecircuits.fr)
