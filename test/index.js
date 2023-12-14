const ICAN = require('../')
const tape = require('tape')
const samples = require('./samples.json')

samples.valid.forEach(function (f) {
  tape.test('OK - Check ICAN. // ICAN: <' + f.ican.substring(0, 4) + f.ican.slice(-4) + '>', function (t) {
    let valid = ICAN.isValid(f.ican)
    t.plan(1)
    t.ok(valid, 'Valid ICAN: ' + f.ican)
  })
})

samples.invalid.forEach(function (f) {
  tape.test('NOK - Check ICAN. // ICAN: <' + f.ican.substring(0, 4) + f.ican.slice(-4) + '>', function (t) {
    let valid = ICAN.isValid(f.ican)
    t.plan(1)
    t.notOk(valid, 'Invalid ICAN: ' + f.ican)
  })
})

samples.validCrypto.forEach(function (f) {
  tape.test('OK - Check Crypto ICAN. // ICAN: <' + f.ican.substring(0, 4) + f.ican.slice(-4) + '>', function (t) {
    let valid = ICAN.isValid(f.ican, true)
    t.plan(1)
    t.ok(valid, 'Valid ICAN: ' + f.ican)
  })
})

samples.invalidCrypto.forEach(function (f) {
  tape.test('NOK - Check Crypto ICAN. // ICAN: <' + f.ican.substring(0, 4) + f.ican.slice(-4) + '>', function (t) {
    let valid = ICAN.isValid(f.ican, true)
    t.plan(1)
    t.notOk(valid, 'Invalid ICAN: ' + f.ican)
  })
})

samples.print.forEach(function (f) {
  tape.test('OK - Print format. // ICAN: <' + f.ican.substring(0, 4) + f.ican.slice(-4) + '>', function (t) {
    let print = ICAN.printFormat(f.ican)
    t.plan(1)
    t.same(print, f.pair)
  })
})

samples.electronic.forEach(function (f) {
  tape.test('OK - Electronic format. // ICAN: <' + f.ican.substring(0, 4) + f.ican.slice(-4) + '>', function (t) {
    let electronic = ICAN.electronicFormat(f.ican)
    t.plan(1)
    t.same(electronic, f.pair)
  })
})
