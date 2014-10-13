# generator-openfin
[![Build Status](https://api.travis-ci.org/openfin/generator-openfin.svg?branch=master)](https://travis-ci.org/openfin/generator-openfin)

A [Yeoman](http://yeoman.io) generator that scaffolds [OpenFin](http://openfin.co/index.html) applications.


## Getting Started

### Install Node Tools
```bash
npm install -g yo grunt grunt-cli
```

### Install Yeoman Generator

To install generator-openfin from npm, run:

```bash
npm install -g generator-openfin
```

Initiate the generator:

```bash
yo openfin
```

## Using the template

### Grunt tasks
The template makes use of [grunt](http://gruntjs.com/) for linting and serving the content, to run the application in the OpenFin Runtime:
```bash
grunt serve
```

To update the app.json with a URL at build time you can specify a target:
```bash
grunt build --target="http://hosted-app.com"
```

This can be done with the serve task as well
```bash
grunt serve --target="http://hosted-app.com"
```
## License

MIT
