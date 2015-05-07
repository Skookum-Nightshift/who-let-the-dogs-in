// require the providers to access search function

// For example:

// providers['Foursquare'].search(location, callback)
// location = { latitude: Y, longitude: X }
// callback(items) /* array of adapted items */

var providers = {
        map: {},
        array: [
            require('./FoursquareOnline.js'),
            require('./YelpOnline.js')
        ]
    },
    map = providers.map;

providers.array.forEach(function (provider) {
    map[provider.name] = provider;
});

module.exports = providers;
