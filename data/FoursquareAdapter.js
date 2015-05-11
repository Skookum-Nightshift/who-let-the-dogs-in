// For more information about the adapted-to interface:
// https://developers.google.com/places/android/place-details

// For more information about the adapted-from interface:
// https://developer.foursquare.com/docs/responses/venue

// For more information about Adapter pattern: pp. 139-150 in Design Patterns.

var FoursquareAdapter = function (venueResponse) {
        this.venueResponse = venueResponse;
    },
    prototype = FoursquareAdapter.prototype; // for member functions below

prototype.getName = function () {
    return this.venueResponse.name;
};

prototype.getAddress = function () {
    var location = this.venueResponse.location;

    return location && location.address; // optional string
};

prototype.getID = function () {
    return this.venueResponse.id;
};

prototype.getPhoneNumber = function () {
    var contact = this.venueResponse.contact;

    return contact && contact.formattedPhone; // TODO: compare to phone
};

prototype.getWebsiteUri = function () {
    //return this.venueResponse.url; // optional url for website of place
    return this.venueResponse.canonicalUrl; // url for Foursquare page
};

// LatLng has properties latitude and longitude of type double
prototype.getLatLng = function (){
    var location = this.venueResponse.location,
        latitude = location && location.lat,
        longitude = location && location.long;

    return location && typeof latitude === 'number' && typeof longitude === 'number' ? {
            latitude: location.lat,
            longitude: location.lng
        } : null; 
};

// LatLngBounds has properties southwest and northeast of type LatLng
prototype.getViewport = function () {
    return null;
};

// getLocale

prototype.getPlaceTypes = function () {
    // TODO
    // https://developer.foursquare.com/docs/responses/category.html
    // https://developer.foursquare.com/docs/venues/categories.html
    // https://developer.foursquare.com/categorytree
    // Bar 4bf58dd8d48988d116941735
    // Food 4d4b7105d754a06374d81259
    // Hotel 4bf58dd8d48988d1fa931735
    // Dog Run 4bf58dd8d48988d1e5941735 TODO: or Park 4bf58dd8d48988d163941735
    return this.venueResponse.categories.map(function (category) {
        return category.name; // TODO: compare pluralName, shortName
    });
};

// getCategory is our addition to the API
// return a standard string for the category that matters

var categoryMap = {
        'Bar': 'Bars',
        'Food': 'Restaurants',
        'Hotel': 'Hotels',
        'Dog Run': 'Dog Parks'
    };

prototype.getCategory = function () {
    var category;
    this.venueResponse.categories.forEach(function (category) {
        var value = categoryMap[category.name];

        if (value) {
            category = value;
        }
    });
    return category;
};

prototype.getDistanceMeters = function () {
    var location = this.venueResponse.location;

    return location && location.distance;
};

prototype.getDistanceMiles = function () {
    var location = this.venueResponse.location;

    return Math.round(location.distance / 160.9) / 10; // return tenths of miles instead of meters
};

prototype.getState = function () {
    var location = this.venueResponse.location;

    return location && location.state;
};

prototype.getPostalCode = function () {
    var location = this.venueResponse.location;

    return location && location.postalCode;
};

prototype.getCity = function () {
    var location = this.venueResponse.location;

    return location && location.city;
};

prototype.getNeighborhood = function () {
    var location = this.venueResponse.location;

    return location && location.neighborhood;
};

// getPriceLevel: the JavaScript object does not seem to have this property
// An object containing the price tier from 1 (least pricey) - 4 (most pricey) and a message describing the price tier.

prototype.getRating = function () {
    return this.venueResponse.rating; // Numerical rating of the venue (0 through 10). Returned as part of an explore result, excluded in search results. Not all venues will have a rating.
};

// TODO:
// categories
// attribution/display requirements

// https://developer.foursquare.com/overview/attribution

// https://developer.foursquare.com/overview/attribution#linking
// provide links back to corresponding Foursquare venue pages whenever you display any basic data
// creating your own place detail page and linking that back to us

// https://developer.foursquare.com/overview/attribution#visual
// If you are displaying a list of venues as part of search results, you do not need to link to us on that screen. Instead, provide Visual Attribution.
// https://foursquare.com/about/logos

module.exports = FoursquareAdapter;
