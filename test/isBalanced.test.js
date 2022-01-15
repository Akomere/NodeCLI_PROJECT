var expect = require('chai').expect
const isBalanced = require("../modules/isBalanced")

describe('isBalanced', function () {
    describe('checks if curly brackets are correctly balanced', function () {
        it('should return true', function () {
            let testInputString = "https://api.sunrise-sunset.org/json?lat={{location.latitude}}&lng={{location.longitude}}";
            let result = isBalanced(testInputString)
            expect(result).to.equal(true)
        });

        it('should return false', function () {
            let testInputString = "https://api.sunrise-sunset.org/json?lat={{location.latitude}}&lng={{location.longitude";
            let result = isBalanced(testInputString)
            expect(result).to.equal(false)
        });

        it('should return false', function () {
            let testInputString = "https://api.sunrise-sunset.org/json?lat={{location.latitude}}&lng={location.longitude}}";
            let result = isBalanced(testInputString)
            expect(result).to.equal(false)
        });

        it('should return false', function () {
            let testInputString = "https://api.sunrise-sunset.org/json?lat={{location.latitude}}&lng=location.longitude}}";
            let result = isBalanced(testInputString)
            expect(result).to.equal(false)
        });
    });

    
});