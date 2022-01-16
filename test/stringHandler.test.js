var expect = require('chai').expect
const stringHandler = require("../modules/stringHandler")

describe('stringHandler', function () {
    describe('handles input string and extracts object reference', function () {
        it('should return array of interpolated values and string values with refrences extracted', function () {
            const eventVal = {
                datetime: {
                    abbreviation: 'GMT',
                    client_ip: '86.40.84.105',
                    datetime: '2022-01-16T03:25:11.481087+00:00',
                    day_of_week: 0,
                    day_of_year: 16,
                    dst: false,
                    dst_from: null,
                    dst_offset: 0,
                    dst_until: null,
                    raw_offset: 0,
                    timezone: 'Europe/Dublin',
                    unixtime: 1642303511,
                    utc_datetime: '2022-01-16T03:25:11.481087+00:00',
                    utc_offset: '+00:00',
                    week_number: 2
                }
            }
            const testMessage = "Current time:\n\t{{datetime.datetime}}"
            
            let [resultString, valueArray] = stringHandler(testMessage, eventVal)
            expect(valueArray).to.eql(['2022-01-16T03:25:11.481087+00:00'])
            expect(resultString).to.equal('Current time:\n\t}')
        });

        it('should return string without interpolation due to object refernces undefined in given object i.e {{something.datetime}}', function () {
            const eventVal = {
                datetime: {
                    abbreviation: 'GMT',
                    client_ip: '86.40.84.105',
                    datetime: '2022-01-16T03:25:11.481087+00:00',
                    day_of_week: 0,
                    day_of_year: 16,
                    dst: false,
                    dst_from: null,
                    dst_offset: 0,
                    dst_until: null,
                    raw_offset: 0,
                    timezone: 'Europe/Dublin',
                    unixtime: 1642303511,
                    utc_datetime: '2022-01-16T03:25:11.481087+00:00',
                    utc_offset: '+00:00',
                    week_number: 2
                }
            }
            const testMessage = "Current time:\n\t{{sonething.datetime}}"
            
            let [resultString, valueArray] = stringHandler(testMessage, eventVal)
            expect(resultString).to.equal('Current time:\n\t')
        });
    });
});