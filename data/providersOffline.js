var providers = {
        map: {},
        array: [
            require('./FoursquareOffline.js'),
            require('./YelpOffline.js')
        ]
    },
    map = providers.map;

providers.array.forEach(function (provider) {
    map[provider.name] = provider;
});

module.exports = providers;
