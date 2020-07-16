// run in browser
if ('undefined' != typeof require) {
    var expect = require('chai').expect,
        ICAN = require('../ican.js');
}

describe('ICAN', function(){

    describe('.isValid', function(){

        it('should return false when input is not a String', function(){
            expect(ICAN.isValid(1)).to.be.false;
            expect(ICAN.isValid([])).to.be.false;
            expect(ICAN.isValid({})).to.be.false;
            expect(ICAN.isValid(true)).to.be.false;
        });

        it('should return false for an unknown country code digit', function(){
            expect(ICAN.isValid('ZZ68539007547034')).to.be.false;
        });

        it('should return true for a valid belgian ICAN', function(){
            expect(ICAN.isValid('BE68539007547034')).to.be.true;
        });

        it('should return true for a valid Dutch ICAN', function(){
            expect(ICAN.isValid('NL86INGB0002445588')).to.be.true;
        });

        it('should return true for a valid Moldovan ICAN', function(){
            expect(ICAN.isValid('MD75EX0900002374642125EU')).to.be.true;
        });

        it('should return true for a valid Saint-Lucia ICAN', function(){
            expect(ICAN.isValid('LC55HEMM000100010012001200023015')).to.be.true;
        });

        it('should return false for an incorrect check digit', function(){
            expect(ICAN.isValid('BE68539007547035')).to.be.false;
        });

        it('should return true for a valid Côte d\'Ivoire ICAN', function(){
            expect(ICAN.isValid('CI93CI0080111301134291200589')).to.be.true;
        });

        it('should return true for all examples', function(){
            Object.keys(ICAN.countries).forEach(function(countryCode){
                expect(ICAN.isValid(ICAN.countries[countryCode].example)).to.be.true;
            });
        });

        it('should return false for all examples when modifying just one digit', function(){
            Object.keys(ICAN.countries).forEach(function(countryCode){
                var num = ICAN.countries[countryCode].example;
                num = num.slice(0, -1) + ((parseInt(num.slice(-1), 10) + 1) % 10);
                expect(ICAN.isValid(num)).to.be.false;
            });
        });

        it('should return true for a valid Egypt ICAN', function(){
            expect(ICAN.isValid('EG800002000156789012345180002')).to.be.true;
        });
    });

    describe('.electronicFormat', function(){

        it('should format a e-formatted belgian ICAN', function(){
            expect(ICAN.electronicFormat('BE68539007547034')).to.equal('BE68539007547034');
        });

        it('should format a print-formatted belgian ICAN', function(){
            expect(ICAN.electronicFormat('BE68 5390 0754 7034')).to.equal('BE68539007547034');
        });
    });

    describe('.printFormat', function(){

        it('should format a e-formatted belgian ICAN', function(){
            expect(ICAN.printFormat('BE68539007547034')).to.equal('BE68 5390 0754 7034');
        });

        it('should format a print-formatted belgian ICAN', function(){
            expect(ICAN.printFormat('BE68 5390 0754 7034')).to.equal('BE68 5390 0754 7034');
        });
    });

    describe('.toBCAN', function(){

        it('should output the right BCAN from a Belgian ICAN', function(){
            expect(ICAN.toBCAN('BE68 5390 0754 7034', '-')).to.equal('539-0075470-34');
        });

        it('should use space as default separator', function(){
            expect(ICAN.toBCAN('BE68 5390 0754 7034')).to.equal('539 0075470 34');
        });
    });

    describe('.fromBCAN', function(){

        it('should output the right ICAN from a Belgian BCAN', function(){
            expect(ICAN.fromBCAN('BE', '539007547034')).to.equal('BE68539007547034');
        });

        it('should output the right ICAN from a Belgian BCAN, ignoring format', function(){
            expect(ICAN.fromBCAN('BE', '539-0075470-34')).to.equal('BE68539007547034');
        });

        it('should throw an error if the BCAN is invalid', function(){
            expect(function(){
                ICAN.fromBCAN('BE', '1539-0075470-34');
            }).to.throw(Error).and.throw(/Invalid BCAN/);
        });
    });

    describe('.isValidBCAN', function(){

        it('should return false when input is not a String', function(){
            expect(ICAN.isValidBCAN('BE', 1)).to.be.false;
            expect(ICAN.isValidBCAN('BE', {})).to.be.false;
            expect(ICAN.isValidBCAN('BE', [])).to.be.false;
            expect(ICAN.isValidBCAN('BE', true)).to.be.false;
        });

        it('should validate a correct Belgian BCAN', function(){
            expect(ICAN.isValidBCAN('BE', '539007547034')).to.be.true;
        });

        it('should return true for a valid Dutch ICAN', function(){
            expect(ICAN.isValidBCAN('NL', 'INGB0002445588')).to.be.true;
        });

        it('should validate a correct Belgian BCAN, ignoring format', function(){
            expect(ICAN.isValidBCAN('BE', '539-0075470-34')).to.be.true;
        });

        it('should detect invalid BCAN length', function(){
            expect(ICAN.isValidBCAN('BE', '1539-0075470-34')).to.be.false;
        });

        it('should detect invalid BCAN format', function(){
            expect(ICAN.isValidBCAN('BE', 'ABC-0075470-34')).to.be.false;
        });
    });
});
