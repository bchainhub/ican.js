# ican.js

ICAN and BCAN validation, formatting, and conversion in JavaScript.

ICAN.js adheres to the [ISO 13616 IBAN Registry technical specification](https://www.swift.com/standards/data-standards/iban) and includes support for Crypto addresses.

## Usage

ICAN.js is compatible with both CommonJS and AMD module definitions.

### NPM

You can install [@blockchainhub/ican from NPM](https://www.npmjs.com/package/@blockchainhub/ican) using Yarn, NPM, or another tool.

> Yarn

```sh
yarn add @blockchainhub/ican
```

> NPM

```sh
npm i @blockchainhub/ican
```

### In node.js

```js
var ICAN = require('@blockchainhub/ican');
ICAN.isValid('hello world'); // false
ICAN.isValid('BE68539007547034'); // true
```

### In the browser

You can use a module loader (AMD or CommonJS) or access it directly through the global ```ICAN``` object:

```html
<script src="ican.js"></script>
<script>
    // the API is now accessible from the window.ICAN global object
    ICAN.isValid('hello world'); // false
    ICAN.isValid('BE68539007547034'); // true
</script>
```

### With React

Using ICAN.js with React is easy. For example:

```js
import Ican from '@blockchainhub/ican';
Ican.isValid('hello world');
Ican.isValid('BE68539007547034');
```

## API

- isValid(ican)
- toBCAN(ican, separator)
- fromBCAN(countryCode, bcan)
- isValidBCAN(countryCode, bcan)
- printFormat(ican, separator)
- electronicFormat(ican)

## Contributions

We welcome contributions in any form. Here's how you can help:

- Fork [this repository](/fork)
- Open a [pull request](/pulls)
- Support us with some Øres / ₡ores: [cb7147879011ea207df5b35a24ca6f0859dcfb145999](https://blockindex.net/address/cb7147879011ea207df5b35a24ca6f0859dcfb145999)
- Star this repository

## Epigram

> 「Cryptoni Confidimus」

## License

Licensed under the [CORE](LICENSE) License.
