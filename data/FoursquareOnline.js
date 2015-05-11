var Adapter = require('./FoursquareAdapter.js'),

    // https://developer.foursquare.com/start/search
    // https://developer.foursquare.com/docs/venues/search
    // https://api.foursquare.com/v2/venues/search

    urlRoot = 'https://api.foursquare.com/v2/venues/search',

    joinKeyValue = function (key, value) {
        return [key, value].join('=');
    },

    version = joinKeyValue('v', 20130815),

    // A comma separated list of categories to limit results to.
    // bar, food, hotel, dog run (same as park?)
    categorySuffix = joinKeyValue('categoryId', ['4bf58dd8d48988d116941735', '4d4b7105d754a06374d81259', '4bf58dd8d48988d1fa931735', '4bf58dd8d48988d1e5941735'].join(',')),

    limitSuffix = joinKeyValue('limit', '20'), // Number of results to return, up to 50.

    llSuffix = function (location) {
        return joinKeyValue('ll', [location.latitude, location.longitude].join(',')); // 35.226074,-80.844034
    },

    // radius 
    // Limit results to venues within this many meters of the specified location.
    // Defaults to a city-wide area.
    // The maximum supported radius is currently 100,000 meters.
    // If you specify categoryId specifying a radius may improve results.

    // Example location = { latitude: 35.226074, longitude: -80.844034 }
    // Argument of callback is list of adapted item objects (or null if search fails)
    // TODO: what about a recommended region for map, like Yelp?
    search = function (clientID, clientSecret, location, callback) {
//        var url = [urlRoot, [joinKeyValue('client_id', clientID), joinKeyValue('client_secret', clientSecret), categorySuffix, limitSuffix, llSuffix(location)].join('&')].join('?');
console.log(url);

        $.get({
            url: url,
            dataType: 'json',
            success: function (data) {
console.log(data);
                // data is an array of compact venues
                callback(data.map(function(item) {
                    return new Adapter(item);
                }));
            }
        }).fail(callback(null));
    };

module.exports = {
    name: 'Foursquare',
    search: search
};
