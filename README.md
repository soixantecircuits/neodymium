# Neodymium :metal:

> Scaffolds a clean and combat ready electron app.

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
├── src
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
* Integrate Bootstrap css
* Integrate Vue.js
* Make electron support optionnal
* Propose a Phonegap support
* Find a way to copy just the `node_modules` the app needs

## Contributing

Make PR on the `dev` branch.

## Credits

This was originally a fork of [sindresorhus' neat generator](https://github.com/sindresorhus/generator-electron).

*See [awesome-electron](https://github.com/sindresorhus/awesome-electron) for more useful Electron resources.*

## License

MIT © [Soixante circuits](http://soixantecircuits.fr)
