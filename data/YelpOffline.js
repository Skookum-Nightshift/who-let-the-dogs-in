var locationMap = {

    // Asheville, NC
    "35.538932,-82.5654054": [
    ],

    // Hilton Head, SC
    "32.1894928,-80.7488113": [
    ],

    // Skookum in Charlotte, NC
    "35.226074,-80.844034": [
    ]

    Adapter = require('./YelpAdapter.js'),

    // Example location = { latitude: 35.226074, longitude: -80.844034 }
    // Argument of callback is list of adapted item objects (or null if search fails)
    // TODO: what about a recommended region for map, like Yelp?
    search = function (location, callback) {
        var key = [location.latitude, location.longitude].join(','),
            data = locationMap[key];
            adapted = data ? data.map(function (item) {
                    return new Adapter(item);
                } :
                null;

        callback(adapted);
    };

module.exports = {
    name: 'Yelp',
    search: search
};
