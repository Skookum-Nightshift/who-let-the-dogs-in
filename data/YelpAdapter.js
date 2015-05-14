// For more information about the adapted-to interface:
// https://developers.google.com/places/android/place-details

// For more information about the adapted-from interface:
// https://www.yelp.com/developers/documentation/v2/search_api#rValue

// https://www.yelp.com/developers/documentation/v2/search_api#business

// For more information about Adapter pattern: pp. 139-150 in Design Patterns.

var YelpAdapter = function (business) {
        this.business = business;
    },
    prototype = YelpAdapter.prototype; // for member functions below

// TODO: region?
/*
region // dict: Suggested bounds in a map to display results in
region.span // dict: Span of suggested map bounds
region.span.latitude_delta // double: Latitude width of map bounds
region.span.longitude_delta // double: Longitude height of map bounds
region.center // dict: Center position of map bounds
region.center.latitude // double: Latitude position of map bounds center
region.center.longitude // double: Longitude position of map bounds center
total // number: Total number of business results
businesses // list: The list of business entries
*/

prototype.getName = function () {
    return this.business.name; // string: Name of this business
};

prototype.getAddress = function () {
    // TODO: what about separate string properties? city, state_code, postal_code
    // list: Address for this business formatted for display. Includes all address fields, cross streets and city, state_code, etc.
    var location = this.business.location;

    return location && location.address.join(' ');
};

prototype.getID = function () {
    return this.business.id; // string: Yelp ID for this business
};

prototype.getPhoneNumber = function () {
    // phone string: Phone number for this business with international dialing code (e.g. +442079460000)
    return this.business.display_phone; // string: Phone number for this business formatted for display
};

prototype.getWebsiteUri = function () {
    // url string: URL for business page on Yelp
    // mobile_url string: URL for mobile business page on Yelp
    return this.business.url;
};

// LatLng has properties latitude and longitude of type double
prototype.getLatLng = function (){
    return this.business.coordinate;
};

// LatLngBounds has properties southwest and northeast of type LatLng
prototype.getViewport = function () {
    return null;
};

// getLocale

prototype.getPlaceTypes = function () {
    // Provides a list of category name, alias pairs that this business is associated with.
    // For example,
    // [["Local Flavor", "localflavor"], ["Active Life", "active"], ["Mass Media", "massmedia"]]
    // The alias is provided so you can search with the category_filter.
    // https://www.yelp.com/developers/documentation/v2/all_category_list
    // bars
    // restaurants
    // hotels
    // dog_parks is a subcategory of parks
    return this.business.categories.map(function (category) {
        return category[1];
    });
};

// getCategory is our addition to the API
// return a standard string for the category that matters

var categoryMap = {
        'bars': 'bar',
        'beergardens': 'bar',
        'restaurants': 'restaurant',
        'hotels': 'lodging',
        'dog_parks': 'park'
    };

prototype.getCategory = function () {
    var gotCategory;

    this.business.categories.forEach(function (category) {
        var value = categoryMap[category[1]];
console.log(category[1]);
        if (value) {
            gotCategory = value;
        }
    });
    return gotCategory || 'restaurant';
};

prototype.getDistanceMeters = function () {

    return this.business.distance;
};

prototype.getDistanceMiles = function () {

    return Math.round(this.getDistanceMeters() / 160.9) / 10; // return tenths of miles instead of meters
};

prototype.getState = function () {
    var location = this.business.location;

    return location && location.state_code;
};

prototype.getPostalCode = function () {
    var location = this.business.location;

    return location && location.postal_code;
};

prototype.getCity = function () {
    var location = this.business.location;

    return location && location.city;
};

prototype.getNeighborhoods = function () {
    var location = this.business.location;

    return location && location.neighborhoods;
};


// getPriceLevel: the JavaScript object does not seem to have this property
// An object containing the price tier from 1 (least pricey) - 4 (most pricey) and a message describing the price tier.

prototype.getRating = function () {
    // Rating for this business (value ranges from 1, 1.5, ... 4.5, 5)
    return this.business.rating; // number
};

// TODO:
// categories
// attribution/display requirements
// https://www.yelp.com/developers/display_requirements

module.exports = YelpAdapter;
