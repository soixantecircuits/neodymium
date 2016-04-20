# Neodymium :metal:

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

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
|   |       |   # Here comes the app specific modules like routing, translations, storage, etc...
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

*Depending on your configuration, you ~~may~~ will encounter formatting issue right after the app generation. This is because `ejs`, the template engine yeoman uses, leaves empty lines in place of the omitted parts (e.g if you said you don't need a back-end, the back-end portion of your app README will be blank lines instead of not being here at all). This can lead to errors with the `package.json` file being invalid because of misplaced commas, etc. I'm currently looking for a solution to this using the yeoman transform streams, but until I figure this out in a clean and maintenable way, you'll have to deal with this by your own :/*

## Usage

With [yo](https://github.com/yeoman/yo):

```
$ yo neodymium
```

## Develop

It's recommended to use node `v4.2.4` LTS. We cannot guarantee previous versions support, but will sure do our best to. Please post an issue if you encounter troubles with developing on `neodymium`.

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

We follow [a successful git branching model](http://nvie.com/posts/a-successful-git-branching-model/).

Please use the [standard js coding style](https://github.com/feross/standard).

## Credits

This was originally a fork of [sindresorhus' neat generator](https://github.com/sindresorhus/generator-electron).

*See [awesome-electron](https://github.com/sindresorhus/awesome-electron) for more useful Electron resources.*

## License

MIT © [Soixante circuits](http://soixantecircuits.fr)
