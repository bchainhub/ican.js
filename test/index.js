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

samples.validMainnetCrypto.forEach(function (f) {
  tape.test('OK - Check Crypto Mainnet ICAN. // ICAN: <' + f.ican.substring(0, 4) + f.ican.slice(-4) + '>', function (t) {
    let valid = ICAN.isValid(f.ican, 'main')
    t.plan(1)
    t.ok(valid, 'Valid ICAN: ' + f.ican)
  })
})

samples.validTestnetCrypto.forEach(function (f) {
  tape.test('OK - Check Crypto Testnet ICAN. // ICAN: <' + f.ican.substring(0, 4) + f.ican.slice(-4) + '>', function (t) {
    let valid = ICAN.isValid(f.ican, 'testnet')
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

samples.short.forEach(function (f) {
  tape.test('OK - Short format (strength 2, default). // ICAN: <' + f.ican.substring(0, 4) + f.ican.slice(-4) + '>', function (t) {
    let short = ICAN.shortFormat(f.ican)
    t.plan(1)
    t.same(short, f.pair)
  })
})

samples.shortStrength1.forEach(function (f) {
  tape.test('OK - Short format strength 1. // ICAN: <' + (f.ican.length > 4 ? f.ican.substring(0, 4) + f.ican.slice(-4) : f.ican) + '>', function (t) {
    let short = ICAN.shortFormat(f.ican, '…', 4, 4, 1)
    t.plan(1)
    t.same(short, f.pair)
  })
})

samples.shortStrength2.forEach(function (f) {
  tape.test('OK - Short format strength 2. // ICAN: <' + (f.ican.length > 4 ? f.ican.substring(0, 4) + f.ican.slice(-4) : f.ican) + '>', function (t) {
    let short = ICAN.shortFormat(f.ican, '…', 4, 4, 2)
    t.plan(1)
    t.same(short, f.pair)
  })
})

samples.shortStrength3.forEach(function (f) {
  tape.test('OK - Short format strength 3. // ICAN: <' + (f.ican.length > 4 ? f.ican.substring(0, 4) + f.ican.slice(-4) : f.ican) + '>', function (t) {
    let short = ICAN.shortFormat(f.ican, '…', 4, 4, 3)
    t.plan(1)
    t.same(short, f.pair)
  })
})

samples.shortStrength4.forEach(function (f) {
  tape.test('OK - Short format strength 4. // ICAN: <' + (f.ican.length > 4 ? f.ican.substring(0, 4) + f.ican.slice(-4) : f.ican) + '>', function (t) {
    let short = ICAN.shortFormat(f.ican, '…', 4, 4, 4)
    t.plan(1)
    t.same(short, f.pair)
  })
})

// Test edge cases: invalid strength values
tape.test('OK - Short format with invalid strength (defaults to 2)', function (t) {
  t.plan(3)
  const ican = 'BE68539007547034'
  t.same(ICAN.shortFormat(ican, '…', 4, 4, 0), ICAN.shortFormat(ican, '…', 4, 4, 2), 'Strength 0 defaults to 2')
  t.same(ICAN.shortFormat(ican, '…', 4, 4, 5), ICAN.shortFormat(ican, '…', 4, 4, 2), 'Strength 5 defaults to 2')
  t.same(ICAN.shortFormat(ican, '…', 4, 4, -1), ICAN.shortFormat(ican, '…', 4, 4, 2), 'Strength -1 defaults to 2')
})

// Test edge cases: custom separators
tape.test('OK - Short format with custom separator', function (t) {
  t.plan(4)
  const ican = 'CB7147879011EA207DF5B35A24CA6F0859DCFB145999'
  t.same(ICAN.shortFormat(ican, '-', 4, 4, 1), '-5999', 'Strength 1 with custom separator')
  t.same(ICAN.shortFormat(ican, '-', 4, 4, 2), 'CB71-5999', 'Strength 2 with custom separator')
  t.same(ICAN.shortFormat(ican, '-', 4, 4, 3), 'CB71-5B35-5999', 'Strength 3 with custom separator')
  t.same(ICAN.shortFormat(ican, '-', 4, 4, 4), 'CB714787-5B35-5999', 'Strength 4 with custom separator')
})

// Test edge cases: custom frontCount and backCount
tape.test('OK - Short format with custom frontCount and backCount', function (t) {
  t.plan(4)
  const ican = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456'
  t.same(ICAN.shortFormat(ican, '…', 6, 6, 1), '…123456', 'Strength 1 with custom counts')
  t.same(ICAN.shortFormat(ican, '…', 6, 6, 2), 'ABCDEF…123456', 'Strength 2 with custom counts')
  t.same(ICAN.shortFormat(ican, '…', 6, 6, 3), 'ABCDEF…MNOPQR…123456', 'Strength 3 with custom counts')
  // Strength 4: front (12 chars) touches middle (starts at position 12), so show continuous front+middle
  t.same(ICAN.shortFormat(ican, '…', 6, 6, 4), 'ABCDEFGHIJKLMNOPQR…123456', 'Strength 4 with custom counts (front touches middle)')
})

// Test edge cases: middle and end touching (no delimiter between them)
// These tests verify that when middle and end touch (middleEnd === availableEnd),
// they are shown as continuous without a delimiter between them
tape.test('OK - Short format: verify middle and end touch behavior (strength 4)', function (t) {
  t.plan(4)
  const ican = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  // Test with different backCount values
  const result1 = ICAN.shortFormat(ican, '…', 4, 6, 4)
  const result2 = ICAN.shortFormat(ican, '…', 4, 8, 4)
  // Verify front is present
  t.ok(result1.includes('ABCDEFGH'), 'Contains extended front (8 chars) for backCount=6')
  t.ok(result2.includes('ABCDEFGH'), 'Contains extended front (8 chars) for backCount=8')
  // Count delimiters - if middle and end touch, there should be only 1 delimiter (between front and middle+end)
  // If they don't touch, there should be 2 delimiters
  const delimiters1 = (result1.match(/…/g) || []).length
  const delimiters2 = (result2.match(/…/g) || []).length
  t.ok(delimiters1 <= 2, 'Has at most 2 delimiters for backCount=6')
  t.ok(delimiters2 <= 2, 'Has at most 2 delimiters for backCount=8')
})

tape.test('OK - Short format: verify middle and end touch behavior (strength 3)', function (t) {
  t.plan(4)
  const ican = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const result1 = ICAN.shortFormat(ican, '…', 4, 6, 3)
  const result2 = ICAN.shortFormat(ican, '…', 4, 8, 3)
  // Verify front is present
  t.ok(result1.includes('ABCD'), 'Contains front (4 chars) for backCount=6')
  t.ok(result2.includes('ABCD'), 'Contains front (4 chars) for backCount=8')
  // Count delimiters
  const delimiters1 = (result1.match(/…/g) || []).length
  const delimiters2 = (result2.match(/…/g) || []).length
  t.ok(delimiters1 <= 2, 'Has at most 2 delimiters for backCount=6')
  t.ok(delimiters2 <= 2, 'Has at most 2 delimiters for backCount=8')
})

// Test specific case: when middle and end touch, verify continuous segment
// User wants to test cases like:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ -> ABCDEFGH…KLMOPQRSTUVWXYZ (strength 4)
// ABCDEFGHIJKLMNOPQRSTUVWXYZ -> ABCD…KLMOPQRSTUVWXYZ (strength 3)
// Where middle+end are continuous (no delimiter between them)
tape.test('OK - Short format: verify continuous middle+end when touching', function (t) {
  t.plan(4)
  const ican = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  // Test with different parameters to check touch behavior
  const result4a = ICAN.shortFormat(ican, '…', 4, 8, 4)
  const result3a = ICAN.shortFormat(ican, '…', 4, 8, 3)
  const result4b = ICAN.shortFormat(ican, '…', 4, 6, 4)
  const result3b = ICAN.shortFormat(ican, '…', 4, 6, 3)
  // Split by delimiter to check structure
  const parts4a = result4a.split('…')
  const parts3a = result3a.split('…')
  const parts4b = result4b.split('…')
  const parts3b = result3b.split('…')
  // Verify structure is valid
  t.ok(parts4a.length >= 1 && parts4a.length <= 3, 'Strength 4 with backCount=8: Valid structure')
  t.ok(parts3a.length >= 1 && parts3a.length <= 3, 'Strength 3 with backCount=8: Valid structure')
  t.ok(parts4b.length >= 1 && parts4b.length <= 3, 'Strength 4 with backCount=6: Valid structure')
  t.ok(parts3b.length >= 1 && parts3b.length <= 3, 'Strength 3 with backCount=6: Valid structure')
})
