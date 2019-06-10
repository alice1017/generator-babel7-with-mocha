# generator-babel7-with-mocha

[![Build Status](https://img.shields.io/travis/alice1017/generator-babel7-with-mocha.svg)](https://travis-ci.org/alice1017/generator-babel7-with-mocha)
[![Version of package.json](https://img.shields.io/github/package-json/v/alice1017/generator-babel7-with-mocha.svg?color=success)](https://github.com/alice1017/generator-babel7-with-mocha/blob/master/package.json)
[![Package version](https://img.shields.io/npm/v/generator-babel7-with-mocha.svg)](https://www.npmjs.com/package/generator-babel7-with-mocha)
![Node version](https://img.shields.io/node/v/generator-babel7-with-mocha.svg?color=blue)

A [Yeoman](https://yeoman.io/) generator for **ECMAScript development environment** with the latest **babel@7** and **mocha**.

## devDependencies to be installed

### arround babel

* **@babel/cli**: `^7.4.4`
* **@babel/core**: `^7.4.5`
* **@babel/preset-env**: `^7.4.5`
* **@babel/register**: `^7.4.4`
* **core-js**: `^3.1.3`
* **regenerator-runtime**: `^0.13.2`

<details>
    <summary>
        <b>NOTE: <code>@babel/polyfill</code> has been deprecated as of Babel 7.4.0.</b>
    </summary>

The [Babel document](https://babeljs.io/docs/en/next/babel-polyfill.html) says that `@babel/polyfill` has been deprecated as of Babel 7.4.0.

>🚨 As of Babel 7.4.0, this package has been deprecated in favor of directly including core-js/stable (to polyfill ECMAScript features) and regenerator-runtime/runtime (needed to use transpiled generator functions):

```javascript
import "core-js/stable";
import "regenerator-runtime/runtime";
```

</details>

### arround test

* **mocha**: `^6.1.4`
* **power-assert**: `^1.6.1**
* **babel-plugin-espower**: `^3.0.1`

### another

* **eslint**: `^5.16.0`
* **babel-eslint**: `^10.0.1`

## Structure of generated directory

```text
.
├── .babelrc
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── package.json
├── src
│   └── index.js
└── test
    └── mocha.opts
```
