
# ican.js

ICAN and BCAN validation, formatting, and conversion in JavaScript.

ICAN.js adheres to the [ISO 13616 IBAN Registry technical specification](https://www.swift.com/standards/data-standards/iban) and includes support for Crypto addresses, including distinctions for mainnets, testnets, and enterprise networks.

## Usage

ICAN.js is compatible with both CommonJS and AMD module definitions.

### NPM

You can install [@blockchainhub/ican from NPM](https://www.npmjs.com/package/@blockchainhub/ican) using Yarn, NPM, or another tool.

> NPM

```sh
npm install @blockchainhub/ican
```

> Bun

```sh
bun add @blockchainhub/ican
```

### In Node.js

```js
const ICAN = require('@blockchainhub/ican');
console.log(ICAN.isValid('hello world')); // false
console.log(ICAN.isValid('BE68539007547034')); // true
```

### In the Browser

You can use a module loader (AMD or CommonJS) or access it directly through the global `ICAN` object:

```html
<script src="ican.js"></script>
<script>
    // The API is now accessible from the window.ICAN global object
    console.log(ICAN.isValid('hello world')); // false
    console.log(ICAN.isValid('BE68539007547034')); // true
</script>
```

### With ESM

Using ICAN.js with React is straightforward:

```ts
import ICAN from '@blockchainhub/ican';
console.log(ICAN.isValid('hello world')); // false
console.log(ICAN.isValid('BE68539007547034')); // true
```

## API

### Methods

#### `isValid(ican, onlyCrypto)`

- Validates an ICAN.
- **Parameters**:
  - `ican`: The ICAN to validate.
  - `onlyCrypto`: (Optional) Restrict validation to crypto definitions. Possible values:
    - `true`: Include all crypto networks.
    - `false`: Exclude crypto networks.
    - `'main'`: Mainnets.
    - `'test'`: Testnets.
    - `'enter'`: Enterprise networks.

#### `toBCAN(ican, separator)`

- Converts an ICAN to its country-specific BCAN representation.
- **Parameters**:
  - `ican`: The ICAN to convert.
  - `separator`: (Optional) The separator to use between BCAN blocks (default is `' '`).

#### `fromBCAN(countryCode, bcan)`

- Converts a BCAN to an ICAN for a specific country.
- **Parameters**:
  - `countryCode`: The country code of the BCAN.
  - `bcan`: The BCAN to convert.

#### `isValidBCAN(countryCode, bcan, onlyCrypto)`

- Validates a BCAN.
- **Parameters**:
  - `countryCode`: The country code of the BCAN.
  - `bcan`: The BCAN to validate.
  - `onlyCrypto`: (Optional) Restrict validation to crypto definitions (same values as `isValid`).

#### `printFormat(ican, separator)`

- Formats an ICAN for display with separators.
- **Parameters**:
  - `ican`: The ICAN to format.
  - `separator`: (Optional) The separator to use (default is `' '`).

#### `electronicFormat(ican)`

- Converts an ICAN to its electronic format (removing non-alphanumeric characters and uppercasing).

#### `shortFormat(ican, separator, frontCount, backCount)`

- Produces a shortened version of the ICAN with a custom separator.
- **Parameters**:
  - `ican`: The ICAN to shorten.
  - `separator`: (Optional) The separator to use (default is `'…'`).
  - `frontCount`: (Optional) Number of characters to display at the start (default is `4`).
  - `backCount`: (Optional) Number of characters to display at the end (default is `4`).

### Variables

- `ican`: An International Crypto Account Number.
- `bcan`: A country-specific Base Crypto Account Number.
- `countryCode`: The country code for the BCAN.
- `separator`: A separator to format ICAN or BCAN strings.
- `onlyCrypto`: A filter for crypto validation (values: `true`, `false`, `'main'`, `'test'`, `'enter'`).
- `frontCount` and `backCount`: Define how many characters to include in the `shortFormat` method.

## Contributions

We welcome contributions in any form. Here's how you can help:

1. Fork [this repository](/fork).
2. Open a [pull request](/pulls).
3. Support us with some Øres / ₡ores: [cb7147879011ea207df5b35a24ca6f0859dcfb145999](https://blockindex.net/address/cb7147879011ea207df5b35a24ca6f0859dcfb145999).
4. Star this repository.

## License

Licensed under the [CORE](LICENSE) License.
