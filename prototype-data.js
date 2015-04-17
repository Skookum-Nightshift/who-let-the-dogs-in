var items = {
    '0': { // Enrique: will we need ids for the individual item objects?
        category: 'parks', // bar, restaurant, parks, event
        dogFriendly: true, // boolean if possible, otherwise string 
        time: 'yyyy-mm-ddThh:mm:ss +oo:oo', // for event
        name: 'Freedom Park',
        address: '1900 East Boulevard',
        distance: 1.8, // is derived from location of item to current location
        city: 'Charlotte',
        state: 'NC',
        postalCode: '22222', // zip code
        description: '',
        amenities: ['', ''], // list of strings, or booleans, or object?
        hours: '', // string?
        phoneNumber: '', // optional
        webSite: '', // optional
        location: { // unless you know that there is a more useful format
            latitude: '35 13 37 N', // TODO: specific format
            longitude: '80 50 36 W'
        }
    },
    '1': {
        category: 'parks',
        name: 'Marshall Park',
        address: '800 East Third Street',
        distance: 1.9
    },
    '2': {
        category: 'parks',
        name: 'Romare Bearden Park',
        address: '300 South Church Street',
        distance: 0.4
    }
};

