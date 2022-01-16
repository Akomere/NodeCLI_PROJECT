var expect = require('chai').expect
const getData = require("../modules/getData")

describe('getData', function () {
    describe('Peforms asynchronous get request of new event data and updates even data object with the event name as key', function () {

        it('should return updated event object', async function () {
            let interpolatedString = "https://api.sunrise-sunset.org/json?lat=53.3498053&lng=-6.2603097"
            let actionName = "sunset"
            let eventData = {
                location: {
                    ip: '86.40.84.105',
                    success: true,
                    type: 'IPv4',
                    continent: 'Europe',
                    continent_code: 'EU',
                    country: 'Ireland',
                    country_code: 'IE',
                    country_flag: 'https://cdn.ipwhois.io/flags/ie.svg',
                    country_capital: 'Dublin',
                    country_phone: '+353',
                    country_neighbours: 'GB',
                    region: 'County Dublin',
                    city: 'Dublin',
                    latitude: 53.3498053,
                    longitude: -6.2603097,
                    asn: 'AS5466',
                    org: 'Eircom Limited',
                    isp: 'Eircom Limited',
                    timezone: 'Europe/Dublin',
                    timezone_name: 'Greenwich Mean Time',
                    timezone_dstOffset: 0,
                    timezone_gmtOffset: 0,
                    timezone_gmt: 'GMT 0:00',
                    currency: 'Euro',
                    currency_code: 'EUR',
                    currency_symbol: '€',
                    currency_rates: 0.876,
                    currency_plural: 'euros',
                    completed_requests: 220
                }
            }

            let eventDataUpdated = {
                location: {
                    ip: '86.40.84.105',
                    success: true,
                    type: 'IPv4',
                    continent: 'Europe',
                    continent_code: 'EU',
                    country: 'Ireland',
                    country_code: 'IE',
                    country_flag: 'https://cdn.ipwhois.io/flags/ie.svg',
                    country_capital: 'Dublin',
                    country_phone: '+353',
                    country_neighbours: 'GB',
                    region: 'County Dublin',
                    city: 'Dublin',
                    latitude: 53.3498053,
                    longitude: -6.2603097,
                    asn: 'AS5466',
                    org: 'Eircom Limited',
                    isp: 'Eircom Limited',
                    timezone: 'Europe/Dublin',
                    timezone_name: 'Greenwich Mean Time',
                    timezone_dstOffset: 0,
                    timezone_gmtOffset: 0,
                    timezone_gmt: 'GMT 0:00',
                    currency: 'Euro',
                    currency_code: 'EUR',
                    currency_symbol: '€',
                    currency_rates: 0.876,
                    currency_plural: 'euros',
                    completed_requests: 220
                },
                sunset: {
                    results: {
                        sunrise: '8:29:02 AM',
                        sunset: '4:40:33 PM',
                        solar_noon: '12:34:47 PM',
                        day_length: '08:11:31',
                        civil_twilight_begin: '7:50:43 AM',
                        civil_twilight_end: '5:18:52 PM',
                        nautical_twilight_begin: '7:06:57 AM',
                        nautical_twilight_end: '6:02:38 PM',
                        astronomical_twilight_begin: '6:25:18 AM',
                        astronomical_twilight_end: '6:44:17 PM'
                    },
                    status: 'OK'
                }
            }

            let result = await getData(interpolatedString, actionName, eventData)
            expect(result).to.eql(eventDataUpdated)
        });

    });
});

