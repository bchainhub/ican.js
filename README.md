# ican.js

ICAN and BCAN validation, formatting and conversion in Javascript.
Check the demo on [demo page] to try it.

[demo page]: https://cryptohub-digital.github.io/ican.js/

ICAN.js follows the [ISO 13616 IBAN Registry technical specification](https://www.swift.com/standards/data-standards/iban) with the addition of the Crypto addresses.

## Usage

ICAN.js is compatible with both commonjs and AMD module definition. It can be used as a [node.js module](#in-nodejs) and [in the browser](#in-the-browser). It also has a bower manifest, a [Typescript definition](#with-typescript) and a [Meteor wrapper](#with-meteor-framework).

### NPM

You can install [@cryptohub/ican from NPM](https://www.npmjs.com/package/@cryptohub/ican) using Yarn, NPM or another tool.

> Yarn
```sh
yarn add @cryptohub/ican
```

> NPM
```sh
npm i @cryptohub/ican
```

### In node.js

```js
var ICAN = require('ican');
ICAN.isValid('hello world'); // false
ICAN.isValid('BE68539007547034'); // true
```

### In the browser

Using a module loader (AMD or commonjs) or directly through the global ```ICAN``` object:

```html
<script src="ican.js"></script>
<script>
    // the API is now accessible from the window.ICAN global object
    ICAN.isValid('hello world'); // false
    ICAN.isValid('BE68539007547034'); // true
</script>
```

### With TypeScript
The library is also available from the typescript language. To do this, [download the definition](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/ican) and add a reference to this:
```typescript
/// <reference path="ican.d.ts" />
ICAN.isValid('hello world');
ICAN.isValid('BE68539007547034');
```

## API

    * isValid(ican)
    * toBCAN(ican, separator)
    * fromBCAN(countryCode, bcan)
    * isValidBCAN(countryCode, bcan)
    * printFormat(ican, separator)
    * electronicFormat(ican)

## License

[CORE license](LICENSE)
