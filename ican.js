/* global define */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory) // AMD (e.g., RequireJS)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory({}) // Node.js or CommonJS
  } else {
    root.ICAN = factory({}) // Browser global
  }
}(this, function (exports) {
  'use strict'

  const A = 'A'.charCodeAt(0)
  const Z = 'Z'.charCodeAt(0)
  const NON_ALPHANUM = /[^a-zA-Z0-9]/g
  const EVERY_FOUR_CHARS = /(.{4})(?!$)/g

  // Utility functions
  const iso13616Prepare = (ican) => {
    const rearranged = ican.slice(4) + ican.slice(0, 4)
    return rearranged.toUpperCase().split('').map(char => {
      const code = char.charCodeAt(0)
      return (code >= A && code <= Z) ? code - A + 10 : char
    }).join('')
  }

  const iso7064Mod97 = (ican) => {
    let remainder = ican
    while (remainder.length > 2) {
      const block = remainder.slice(0, 9)
      remainder = (parseInt(block, 10) % 97).toString() + remainder.slice(block.length)
    }
    return parseInt(remainder, 10) % 97
  }

  const parseStructure = (structure) => {
    return new RegExp('^' + structure.match(/.{3}/g).map(block => {
      const [pattern, repeats] = [block[0], parseInt(block.slice(1), 10)]
      const formatMap = {
        A: '0-9A-Za-z',
        B: '0-9A-Z',
        C: 'A-Za-z',
        H: '0-9A-Fa-f',
        F: '0-9',
        L: 'a-z',
        U: 'A-Z',
        W: '0-9a-z'
      }
      return `([${formatMap[pattern]}]{${repeats}})`
    }).join('') + '$')
  }

  const electronicFormat = (ican) => ican.replace(NON_ALPHANUM, '').toUpperCase()

  // Specification class
  class Specification {
    constructor (countryCode, length, structure, crypto, example) {
      this.countryCode = countryCode
      this.length = length
      this.structure = structure
      this.crypto = this.normalizeCrypto(crypto)
      this.example = example
    }

    normalizeCrypto (crypto) {
      if (crypto === 'main' || crypto === 'mainnet') return 'main'
      if (crypto === 'test' || crypto === 'testnet') return 'test'
      if (crypto === 'enter' || crypto === 'enterprise') return 'enter'
      return crypto
    }

    get regex () {
      if (!this._cachedRegex) {
        this._cachedRegex = parseStructure(this.structure)
      }
      return this._cachedRegex
    }

    isValid (ican, onlyCrypto = false) {
      ican = electronicFormat(ican)
      return this.length === ican.length &&
        this.countryCode === ican.slice(0, 2) &&
        (!onlyCrypto || this.isMatchingCrypto(onlyCrypto)) &&
        this.regex.test(ican.slice(4)) &&
        iso7064Mod97(iso13616Prepare(ican)) === 1
    }

    isMatchingCrypto (onlyCrypto) {
      if (typeof onlyCrypto === 'string') {
        if (onlyCrypto === 'mainnet') onlyCrypto = 'main'
        else if (onlyCrypto === 'testnet') onlyCrypto = 'test'
        else if (onlyCrypto === 'enterprise') onlyCrypto = 'enter'
      }
      if (onlyCrypto === true) return this.crypto !== false
      return this.crypto === onlyCrypto
    }

    toBCAN (ican, separator = ' ') {
      return this.regex.exec(ican.slice(4)).slice(1).join(separator)
    }

    fromBCAN (bcan) {
      if (!this.isValidBCAN(bcan)) throw new Error('Invalid BCAN')
      const remainder = iso7064Mod97(iso13616Prepare(this.countryCode + '00' + bcan))
      const checkDigit = ('0' + (98 - remainder)).slice(-2)
      return this.countryCode + checkDigit + bcan
    }

    isValidBCAN (bcan, onlyCrypto = false) {
      return this.length - 4 === bcan.length &&
        (!onlyCrypto || this.isMatchingCrypto(onlyCrypto)) &&
        this.regex.test(bcan)
    }
  }

  // Country specifications
  const countries = {}

  const addSpecification = (spec) => {
    countries[spec.countryCode] = spec
  }

  addSpecification(new Specification('AD', 24, 'F04F04A12', false, 'AD1200012030200359100100'))
  addSpecification(new Specification('AE', 23, 'F03F16', false, 'AE070331234567890123456'))
  addSpecification(new Specification('AL', 28, 'F08A16', false, 'AL47212110090000000235698741'))
  addSpecification(new Specification('AT', 20, 'F05F11', false, 'AT611904300234573201'))
  addSpecification(new Specification('AZ', 28, 'U04A20', false, 'AZ21NABZ00000000137010001944'))
  addSpecification(new Specification('BA', 20, 'F03F03F08F02', false, 'BA391290079401028494'))
  addSpecification(new Specification('BE', 16, 'F03F07F02', false, 'BE68539007547034'))
  addSpecification(new Specification('BG', 22, 'U04F04F02A08', false, 'BG80BNBG96611020345678'))
  addSpecification(new Specification('BH', 22, 'U04A14', false, 'BH67BMAG00001299123456'))
  addSpecification(new Specification('BR', 29, 'F08F05F10U01A01', false, 'BR9700360305000010009795493P1'))
  addSpecification(new Specification('BY', 28, 'A04F04A16', false, 'BY13NBRB3600900000002Z00AB00'))
  addSpecification(new Specification('CH', 21, 'F05A12', false, 'CH9300762011623852957'))
  addSpecification(new Specification('CR', 22, 'F04F14', false, 'CR72012300000171549015'))
  addSpecification(new Specification('CY', 28, 'F03F05A16', false, 'CY17002001280000001200527600'))
  addSpecification(new Specification('CZ', 24, 'F04F06F10', false, 'CZ6508000000192000145399'))
  addSpecification(new Specification('DE', 22, 'F08F10', false, 'DE89370400440532013000'))
  addSpecification(new Specification('DK', 18, 'F04F09F01', false, 'DK5000400440116243'))
  addSpecification(new Specification('DO', 28, 'U04F20', false, 'DO28BAGR00000001212453611324'))
  addSpecification(new Specification('EE', 20, 'F02F02F11F01', false, 'EE382200221020145685'))
  addSpecification(new Specification('EG', 29, 'F04F04F17', false, 'EG800002000156789012345180002'))
  addSpecification(new Specification('ES', 24, 'F04F04F01F01F10', false, 'ES9121000418450200051332'))
  addSpecification(new Specification('FI', 18, 'F06F07F01', false, 'FI2112345600000785'))
  addSpecification(new Specification('FO', 18, 'F04F09F01', false, 'FO6264600001631634'))
  addSpecification(new Specification('FR', 27, 'F05F05A11F02', false, 'FR1420041010050500013M02606'))
  addSpecification(new Specification('GB', 22, 'U04F06F08', false, 'GB29NWBK60161331926819'))
  addSpecification(new Specification('GE', 22, 'U02F16', false, 'GE29NB0000000101904917'))
  addSpecification(new Specification('GI', 23, 'U04A15', false, 'GI75NWBK000000007099453'))
  addSpecification(new Specification('GL', 18, 'F04F09F01', false, 'GL8964710001000206'))
  addSpecification(new Specification('GR', 27, 'F03F04A16', false, 'GR1601101250000000012300695'))
  addSpecification(new Specification('GT', 28, 'A04A20', false, 'GT82TRAJ01020000001210029690'))
  addSpecification(new Specification('HR', 21, 'F07F10', false, 'HR1210010051863000160'))
  addSpecification(new Specification('HU', 28, 'F03F04F01F15F01', false, 'HU42117730161111101800000000'))
  addSpecification(new Specification('IE', 22, 'U04F06F08', false, 'IE29AIBK93115212345678'))
  addSpecification(new Specification('IL', 23, 'F03F03F13', false, 'IL620108000000099999999'))
  addSpecification(new Specification('IS', 26, 'F04F02F06F10', false, 'IS140159260076545510730339'))
  addSpecification(new Specification('IT', 27, 'U01F05F05A12', false, 'IT60X0542811101000000123456'))
  addSpecification(new Specification('IQ', 23, 'U04F03A12', false, 'IQ98NBIQ850123456789012'))
  addSpecification(new Specification('JO', 30, 'A04F22', false, 'JO15AAAA1234567890123456789012'))
  addSpecification(new Specification('KW', 30, 'U04A22', false, 'KW81CBKU0000000000001234560101'))
  addSpecification(new Specification('KZ', 20, 'F03A13', false, 'KZ86125KZT5004100100'))
  addSpecification(new Specification('LB', 28, 'F04A20', false, 'LB62099900000001001901229114'))
  addSpecification(new Specification('LC', 32, 'U04F24', false, 'LC07HEMM000100010012001200013015'))
  addSpecification(new Specification('LI', 21, 'F05A12', false, 'LI21088100002324013AA'))
  addSpecification(new Specification('LT', 20, 'F05F11', false, 'LT121000011101001000'))
  addSpecification(new Specification('LU', 20, 'F03A13', false, 'LU280019400644750000'))
  addSpecification(new Specification('LV', 21, 'U04A13', false, 'LV80BANK0000435195001'))
  addSpecification(new Specification('MC', 27, 'F05F05A11F02', false, 'MC5811222000010123456789030'))
  addSpecification(new Specification('MD', 24, 'U02A18', false, 'MD24AG000225100013104168'))
  addSpecification(new Specification('ME', 22, 'F03F13F02', false, 'ME25505000012345678951'))
  addSpecification(new Specification('MK', 19, 'F03A10F02', false, 'MK07250120000058984'))
  addSpecification(new Specification('MR', 27, 'F05F05F11F02', false, 'MR1300020001010000123456753'))
  addSpecification(new Specification('MT', 31, 'U04F05A18', false, 'MT84MALT011000012345MTLCAST001S'))
  addSpecification(new Specification('MU', 30, 'U04F02F02F12F03U03', false, 'MU17BOMM0101101030300200000MUR'))
  addSpecification(new Specification('NL', 18, 'U04F10', false, 'NL91ABNA0417164300'))
  addSpecification(new Specification('NO', 15, 'F04F06F01', false, 'NO9386011117947'))
  addSpecification(new Specification('PK', 24, 'U04A16', false, 'PK36SCBL0000001123456702'))
  addSpecification(new Specification('PL', 28, 'F08F16', false, 'PL61109010140000071219812874'))
  addSpecification(new Specification('PS', 29, 'U04A21', false, 'PS92PALS000000000400123456702'))
  addSpecification(new Specification('PT', 25, 'F04F04F11F02', false, 'PT50000201231234567890154'))
  addSpecification(new Specification('QA', 29, 'U04A21', false, 'QA30AAAA123456789012345678901'))
  addSpecification(new Specification('RO', 24, 'U04A16', false, 'RO49AAAA1B31007593840000'))
  addSpecification(new Specification('RS', 22, 'F03F13F02', false, 'RS35260005601001611379'))
  addSpecification(new Specification('SA', 24, 'F02A18', false, 'SA0380000000608010167519'))
  addSpecification(new Specification('SC', 31, 'U04F04F16U03', false, 'SC18SSCB11010000000000001497USD'))
  addSpecification(new Specification('SE', 24, 'F03F16F01', false, 'SE4550000000058398257466'))
  addSpecification(new Specification('SI', 19, 'F05F08F02', false, 'SI56263300012039086'))
  addSpecification(new Specification('SK', 24, 'F04F06F10', false, 'SK3112000000198742637541'))
  addSpecification(new Specification('SM', 27, 'U01F05F05A12', false, 'SM86U0322509800000000270100'))
  addSpecification(new Specification('ST', 25, 'F08F11F02', false, 'ST68000100010051845310112'))
  addSpecification(new Specification('SV', 28, 'U04F20', false, 'SV62CENR00000000000000700025'))
  addSpecification(new Specification('TL', 23, 'F03F14F02', false, 'TL380080012345678910157'))
  addSpecification(new Specification('TN', 24, 'F02F03F13F02', false, 'TN5910006035183598478831'))
  addSpecification(new Specification('TR', 26, 'F05F01A16', false, 'TR330006100519786457841326'))
  addSpecification(new Specification('UA', 29, 'F25', false, 'UA511234567890123456789012345'))
  addSpecification(new Specification('VA', 22, 'F18', false, 'VA59001123000012345678'))
  addSpecification(new Specification('VG', 24, 'U04F16', false, 'VG96VPVG0000012345678901'))
  addSpecification(new Specification('XK', 20, 'F04F10F02', false, 'XK051212012345678906'))

  // The following countries are not included in the official ICAN registry but use the ICAN specification

  // Angola
  addSpecification(new Specification('AO', 25, 'F21', false, 'AO69123456789012345678901'))
  // Burkina
  addSpecification(new Specification('BF', 27, 'F23', false, 'BF2312345678901234567890123'))
  // Burundi
  addSpecification(new Specification('BI', 16, 'F12', false, 'BI41123456789012'))
  // Benin
  addSpecification(new Specification('BJ', 28, 'F24', false, 'BJ39123456789012345678901234'))
  // Ivory
  addSpecification(new Specification('CI', 28, 'U02F22', false, 'CI70CI1234567890123456789012'))
  // Cameron
  addSpecification(new Specification('CM', 27, 'F23', false, 'CM9012345678901234567890123'))
  // Cape Verde
  addSpecification(new Specification('CV', 25, 'F21', false, 'CV30123456789012345678901'))
  // Algeria
  addSpecification(new Specification('DZ', 24, 'F20', false, 'DZ8612345678901234567890'))
  // Iran
  addSpecification(new Specification('IR', 26, 'F22', false, 'IR861234568790123456789012'))
  // Madagascar
  addSpecification(new Specification('MG', 27, 'F23', false, 'MG1812345678901234567890123'))
  // Mali
  addSpecification(new Specification('ML', 28, 'U01F23', false, 'ML15A12345678901234567890123'))
  // Mozambique
  addSpecification(new Specification('MZ', 25, 'F21', false, 'MZ25123456789012345678901'))
  // Senegal
  addSpecification(new Specification('SN', 28, 'U01F23', false, 'SN52A12345678901234567890123'))

  // The following are regional and administrative French Republic subdivision ICAN specification (same structure as FR, only country code vary)
  addSpecification(new Specification('GF', 27, 'F05F05A11F02', false, 'GF121234512345123456789AB13'))
  addSpecification(new Specification('GP', 27, 'F05F05A11F02', false, 'GP791234512345123456789AB13'))
  addSpecification(new Specification('MQ', 27, 'F05F05A11F02', false, 'MQ221234512345123456789AB13'))
  addSpecification(new Specification('RE', 27, 'F05F05A11F02', false, 'RE131234512345123456789AB13'))
  addSpecification(new Specification('PF', 27, 'F05F05A11F02', false, 'PF281234512345123456789AB13'))
  addSpecification(new Specification('TF', 27, 'F05F05A11F02', false, 'TF891234512345123456789AB13'))
  addSpecification(new Specification('YT', 27, 'F05F05A11F02', false, 'YT021234512345123456789AB13'))
  addSpecification(new Specification('NC', 27, 'F05F05A11F02', false, 'NC551234512345123456789AB13'))
  addSpecification(new Specification('BL', 27, 'F05F05A11F02', false, 'BL391234512345123456789AB13'))
  addSpecification(new Specification('MF', 27, 'F05F05A11F02', false, 'MF551234512345123456789AB13'))
  addSpecification(new Specification('PM', 27, 'F05F05A11F02', false, 'PM071234512345123456789AB13'))
  addSpecification(new Specification('WF', 27, 'F05F05A11F02', false, 'WF621234512345123456789AB13'))

  // Digital Assets

  // Core Blockchain - Mainnet
  addSpecification(new Specification('CB', 44, 'H40', 'main', 'CB661234567890ABCDEF1234567890ABCDEF12345678'))
  // Core Blockchain - Testnet [Devín]
  addSpecification(new Specification('AB', 44, 'H40', 'test', 'AB841234567890ABCDEF1234567890ABCDEF12345678'))
  // Core Blockchain - Enterprise [Koliba]
  addSpecification(new Specification('CE', 44, 'H40', 'enter', 'CE571234567890ABCDEF1234567890ABCDEF12345678'))

  // Exports
  exports.isValid = (ican, onlyCrypto = false) => {
    if (typeof ican !== 'string') return false
    ican = electronicFormat(ican)
    const spec = countries[ican.slice(0, 2)]
    return spec ? spec.isValid(ican, onlyCrypto) : false
  }

  exports.toBCAN = (ican, separator) => {
    ican = electronicFormat(ican)
    const spec = countries[ican.slice(0, 2)]
    if (!spec) throw new Error('No country with code ' + ican.slice(0, 2))
    return spec.toBCAN(ican, separator)
  }

  exports.fromBCAN = (countryCode, bcan) => {
    const spec = countries[countryCode]
    if (!spec) throw new Error('No country with code ' + countryCode)
    return spec.fromBCAN(electronicFormat(bcan))
  }

  exports.isValidBCAN = (countryCode, bcan, onlyCrypto = false) => {
    const spec = countries[countryCode]
    return spec ? spec.isValidBCAN(electronicFormat(bcan), onlyCrypto) : false
  }

  exports.printFormat = (ican, separator = ' ') => electronicFormat(ican).replace(EVERY_FOUR_CHARS, '$1' + separator)

  exports.shortFormat = (ican, separator = '…', frontCount = 4, backCount = 4) => {
    const formatted = electronicFormat(ican)
    return formatted.slice(0, frontCount) + separator + formatted.slice(-backCount)
  }

  exports.electronicFormat = electronicFormat
  exports.countries = countries

  return exports
}))
