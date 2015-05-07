var Adapter = require('./YelpAdapter.js'),

    // https://www.yelp.com/developers/documentation/v2/search_api#searchRequest

    urlRoot = 'http://api.yelp.com/v2/search',

    termSuffix = 'term=dog+friendly', // string (optional) Search term

    // string (optional) Category filter can be a list of comma delimited categories
    // TODO: dog_parks versus parks?
    categorySuffix = 'category_filter=bars,restaurants,hotels,dog_parks',

    // limit // number (optional) Number of business results to ret

    sortSuffix = 'sort=1', // number (optional) Sort mode: 1=Distance

    llSuffix = function (location) {
        return 'll=' + location.latitude + ',' + location.longitude; // 35.226074,-80.844034
    },

    // Example location = { latitude: 35.226074, longitude: -80.844034 }
    // Argument of callback is list of adapted item objects (or null if search fails)
    search = function (location, callback) {
        $.get({
            url: [urlRoot, [termSuffix, categorySuffix, sortSuffix, llSuffix(location)].join('&')].join('?'),
            dataType: 'json',
            success: function (data) {
                // data.businesses is an array
                callback(data.businesses.map(function(item) {
                    return new Adapter(item);
                });
            }
        }).fail(callback(null));
    };

module.exports = {
    name: 'Yelp',
    search: search
};
