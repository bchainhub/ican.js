
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
    - `'main'` or `'mainnet'`: Mainnets.
    - `'test'` or `'testnet'`: Testnets.
    - `'enter'` or `'enterprise'`: Enterprise networks.

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
  - `onlyCrypto`: (Optional) Restrict validation to crypto definitions. Accepts the same values as `isValid` (`'main'`/`'mainnet'`, `'test'`/`'testnet'`, `'enter'`/`'enterprise'`).

#### `printFormat(ican, separator)`

- Formats an ICAN for display with separators.
- **Parameters**:
  - `ican`: The ICAN to format.
  - `separator`: (Optional) The separator to use (default is `' '`).

#### `electronicFormat(ican)`

- Converts an ICAN to its electronic format (removing non-alphanumeric characters and uppercasing).

#### `shortFormat(ican, separator, frontCount, backCount, strength)`

- Produces a shortened version of the ICAN with a custom separator.
- **Parameters**:
  - `ican`: The ICAN to shorten.
  - `separator`: (Optional) The separator to use (default is `'…'`).
  - `frontCount`: (Optional) Number of characters to display at the start (default is `4`).
  - `backCount`: (Optional) Number of characters to display at the end and middle parts (default is `4`).
  - `strength`: (Optional) Number of elements to show, from 1 to 4 (default is `2`):
    - `1`: Show only endings (last `backCount` characters), e.g., `…0123`.
    - `2`: Show beginning (`frontCount`) and end (`backCount`), e.g., `CB12…0123`.
    - `3`: Show beginning (`frontCount`), middle (`backCount`), and end (`backCount`), e.g., `CB12…5B35…0123`. The middle is positioned in the earlier-middle area of the available space.
    - `4`: Show extended beginning (2×`frontCount`), middle (`backCount`), and end (`backCount`), e.g., `CB714787…5B35…0123`. Uses the same middle position as strength 3.
- **Returns**: The shortened ICAN. Returns the full ICAN if:
  - There are not enough characters to compose the requested format
  - Parts would overlap with each other
  - Parts would touch each other (no delimiter needed, so full string is shown)

- **Edge Cases**:
  - If parts touch (front reaches middle, or middle reaches end), the continuous section is shown without an additional delimiter between them
  - Invalid `strength` values (< 1 or > 4) default to `2`
  - The middle position is calculated consistently for strengths 3 and 4, ensuring the same middle segment is shown in both cases

- **Examples**:

```js
const ican = 'CB7147879011EA207DF5B35A24CA6F0859DCFB145999'

ICAN.shortFormat(ican)                              // 'CB71…5999' (default: strength 2)
ICAN.shortFormat(ican, '…', 4, 4, 1)                // '…5999' (endings only)
ICAN.shortFormat(ican, '…', 4, 4, 2)                // 'CB71…5999' (beginning + end)
ICAN.shortFormat(ican, '…', 4, 4, 3)                // 'CB71…5B35…5999' (beginning + middle + end)
ICAN.shortFormat(ican, '…', 4, 4, 4)                // 'CB714787…5B35…5999' (extended + middle + end)
ICAN.shortFormat(ican, '-', 4, 4, 3)                // 'CB71-5B35-5999' (custom separator)
ICAN.shortFormat(ican, '…', 6, 6, 3)                // 'CB7147…F5B35A…145999' (custom counts)
```

### Variables

- `ican`: An International Crypto Account Number.
- `bcan`: A country-specific Base Crypto Account Number.
- `countryCode`: The country code for the BCAN.
- `separator`: A separator to format ICAN or BCAN strings.
- `onlyCrypto`: A filter for crypto validation. Accepts `true`, `false`, `'main'`/`'mainnet'`, `'test'`/`'testnet'`, or `'enter'`/`'enterprise'`.
- `frontCount` and `backCount`: Define how many characters to include in the `shortFormat` method.
- `strength`: Controls how many elements to show in `shortFormat` (1-4, default is 2).

## Contributions

We welcome contributions in any form. Here's how you can help:

1. Fork [this repository](/fork).
2. Open a [pull request](/pulls).
3. Support us with some Øres / ₡ores: [cb7147879011ea207df5b35a24ca6f0859dcfb145999](https://blockindex.net/address/cb7147879011ea207df5b35a24ca6f0859dcfb145999).
4. Star this repository.

## License

Licensed under the [CORE](LICENSE) License.
