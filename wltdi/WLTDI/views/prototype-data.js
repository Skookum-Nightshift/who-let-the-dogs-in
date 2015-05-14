module.exports = [{
        id: 0,
        categoryKey: 'park', // bar, restaurant, park, event
        //time: 'yyyy-mm-ddThh:mm:ss +oo:oo', // for event
        dogFriendly: false, // boolean if possible, otherwise string 
        name: 'Freedom Park',
        address: '1900 East Boulevard',
        city: 'Charlotte',
        state: 'NC',
        postalCode: '28203', // zip code
        neighborhood: 'Dilworth, Myers Park',
        contacts: {
            phone: '(704) 432-4280',
            web: 'http://charmeck.org%2Fmecklenburg%2Fcounty%2Fparkandrec%2Fparks%2Fparksbyregion%2Fcentralregion%2Fpages%2Ffreedom.aspx'
        },
        description: '',
        amenities: ['', ''], // list of strings, or booleans, or object?
        hours: '', // string?
        distance: 1.8, // is derived from location of item to current location
        location: { // unless you know that there is a more useful format
            latitude: '35 13 37 N', // TODO: specific format
            longitude: '80 50 36 W'
        }
    }, {
        id: 1,
        categoryKey: 'park',
        name: 'Marshall Park',
        address: '800 East Third Street',
        city: 'Charlotte',
        state: 'NC',
        postalCode: '',
        neighborhood: '',
        contacts: {
            phone: '',
            web: ''
        },
        description: '',
        distance: 1.9,
        location: null
    }, {
        id: 2,
        categoryKey: 'park',
        name: 'Romare Bearden Park',
        address: '300 S Church St',
        city: 'Charlotte',
        state: 'NC',
        postalCode: '28202',
        neighborhood: 'Uptown',
        contacts: {
            phone: '',
            web: ''
        },
        description: '',
        distance: 0.4,
        location: null
    }, {
        id: 3,
        categoryKey: 'park',
//        dogFriendly: true,
        name: 'Frazier Park',
        address: '1201 W Trade St',
        city: 'Charlotte',
        state: 'NC',
        postalCode: '28202',
        neighborhood: 'Third Ward',
        contacts: {
            phone: '704-432-4280',
            web: 'http://charmeck.org/mecklenburg/county/ParkandRec/Parks/ParksByRegion/CentralRegion/Pages/frazier.aspx'
        },
        description: '',
        distance: 1.9, // placeholder
        location: null
    }, {
        id: 4,
        categoryKey: 'park',
//        dogFriendly: true,
        name: 'William R. Davie Park',
        address: '4635 Pineville-Matthews Road',
        city: 'Charlotte',
        state: 'NC',
        postalCode: '28226',
        neighborhood: 'Arboretum',
        contacts: {
            phone: '(704) 541-9880',
            web: 'http://charmeck.org/mecklenburg/county/ParkandRec/Parks/ParksByRegion/SouthRegion/Pages/WilliamRDavie.aspx'
        },
        description: '',
        distance: 13, // placeholder
        location: null
    }, {
        id: 5,
        categoryKey: 'bar',
        dogFriendly: false,
        name: 'Dandelion Market',
        address: '118 W 5th St',
        city: 'Charlotte',
        state: 'NC',
        postalCode: '28202',
        neighborhood: 'Fourth Ward',
        contacts: {
            phone: '(704) 333-7989',
            web: 'http://www.dandelionmarketcharlotte.com'
        },
        description: '',
        distance: 0.3, // placeholder
        location: null
    }];
/*
    {
        id: 7,
        categoryKey: '',
        dogFriendly: false,
        name: '',
        address: '',
        city: 'Charlotte',
        state: 'NC',
        postalCode: '',
        neighborhood: '',
        contacts: {
            phone: '',
            web: ''
        },
        description: '',
        distance: 0, // placeholder
        location: null
    }
*/
