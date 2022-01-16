var expect = require('chai').expect
const interpolatedString = require("../modules/interpolateString")

describe('interpolateString', function () {
    describe('inserts values refrenced objects back into original message or url string', function () {
        
        it('should return string with values interpolated', function () {
            let testString = "Sunset in }, } is at }."
            let param = [ 'Dublin', 'Ireland', '4:40:33 PM' ]
            
            let result = interpolatedString(testString, param)
            expect(result).to.eql("Sunset in Dublin, Ireland is at 4:40:33 PM.")
        });

        it('should return string with empty space at object refrence positions (not loop through input string) if input param undefined', function () {
            let testString = "Sunset in ,  is at ."
            let param = [ 'Dublin', undefined, '4:40:33 PM' ]
            
            let result = interpolatedString(testString, param)
            expect(result).to.eql("Sunset in ,  is at .")
        });

    });  
});