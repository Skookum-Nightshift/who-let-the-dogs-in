/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	document.addEventListener('DOMContentLoaded', function () {

	    var items = __webpack_require__(1),
	        categoryDefs = __webpack_require__(2),
	        contactDefs = __webpack_require__(3),
	        providers = __webpack_require__(8),
	        ResultPage = __webpack_require__(4),
	        LocationPage = __webpack_require__(5),
	        ItemPage = __webpack_require__(6),
	        DirectionsPage = __webpack_require__(7),
	        DogsApp = React.createClass({
	        displayName: 'DogsApp',

	        propTypes: {
	            colors: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            categoryDefs: React.PropTypes.array,
	            contactDefs: React.PropTypes.array,
	            items: React.PropTypes.array, // TODO: superseded by providers
	            providers: React.PropTypes.object
	        },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                categoryDefs: categoryDefs,
	                contactDefs: contactDefs,
	                colors: {
	                    colorMeta: '#0a5a83', // dark blue hsv(200,92,51)
	                    colorSelected: '#80d4ff', // light blue hsx(200,50,100)
	                    colorLink: '#0000ff', // blue hsv(240,100,100)
	                    colorItem: '#000000', // black
	                    colorBackground: '#ffffff' // white
	                },
	                layout: {
	                    lineHeightMeta: '2.5rem',
	                    heightCategoryList: '164px', // 4 * (2.5rem + 1px)
	                    widthSymbol: '1rem',
	                    marginNarrow: '0.5rem',
	                    marginWide: '2.5rem' // marginNarrow + 2 * widthCategorySymbol
	                }
	            };
	        },

	        getInitialState: function getInitialState() {
	            var props = this.props,
	                layout = props.layout,
	                colors = props.colors,

	            // Skookum in Charlotte, NC
	            location = {
	                latitude: 35.226074,
	                longitude: -80.844034
	            },
	                comparison = function comparison(itemA, itemB) {
	                var distanceA = itemA.getDistanceMeters(),
	                    distanceB = itemB.getDistanceMeters();

	                return distanceA === distanceB ? 0 : typeof distanceB !== 'number' || distanceA < distanceB ? -1 : 1;
	            },
	                items = props.providers.map.Foursquare.getItems(location).sort(comparison),
	                styleMap = {
	                display: 'block',
	                width: '100%',
	                boxSizing: 'border-box',
	                height: layout.heightCategoryList,
	                borderColor: colors.colorMeta,
	                borderWidth: '1px',
	                borderBottomStyle: 'solid'
	            },
	                categoryMap = {},
	                indexMap = 0;

	            props.categoryDefs.forEach(function (categoryDef) {
	                categoryMap[categoryDef.key] = categoryDef;
	            });
	            items.forEach(function (item) {
	                console.log(item.getCategory());
	                // TODO: Ask Enrique if it is okay to add a property to a props object?
	                //item.categoryDef = categoryMap[item.getCategory()];
	                item.categoryDef = categoryMap.bar;
	                item.indexMap = ++indexMap; // demo
	            });

	            return {
	                location: location,
	                page: React.createElement(ResultPage, { colors: props.colors, layout: props.layout, categoryDefs: props.categoryDefs, items: items, setItemPage: this.setItemPage, setLocationPage: this.setLocationPage })
	            };
	        },

	        componentWillMount: function componentWillMount() {},

	        setPage: function setPage(page) {
	            this.setState({
	                page: page
	            });
	        },

	        setItems: function setItems(items) {
	            var props = this.props;

	            this.setState({
	                page: React.createElement(ResultPage, { colors: props.colors, layout: props.layout, categoryDefs: props.categoryDefs, items: items, setItemPage: this.setItemPage })
	            });
	        },

	        setLocation: function setLocation(location) {
	            // TODO: get items for new location
	            this.setItems(items);
	        },

	        setLocationPage: function setLocationPage() {
	            var props = this.props,
	                setPrevPage = this.setPage.bind(this, this.state.page);

	            this.setState({
	                page: React.createElement(LocationPage, { colors: props.colors, layout: props.layout, setLocation: this.setLocation, setPrevPage: setPrevPage })
	            });
	        },

	        setItemPage: function setItemPage(item) {
	            var props = this.props,
	                setPrevPage = this.setPage.bind(this, this.state.page);

	            this.setState({
	                page: React.createElement(ItemPage, { colors: props.colors, layout: props.layout, contactDefs: props.contactDefs, item: item, setPrevPage: setPrevPage, setDirectionsPage: this.setDirectionsPage })
	            });
	        },

	        setDirectionsPage: function setDirectionsPage(item) {
	            var props = this.props,
	                setPrevPage = this.setPage.bind(this, this.state.page);

	            this.setState({
	                page: React.createElement(DirectionsPage, { colors: props.colors, layout: props.layout, item: item, setPrevPage: setPrevPage })
	            });
	        },

	        render: function render() {
	            return this.state.page;
	        }
	    });

	    // TODO: property will become the data API object
	    React.render(React.createElement(DogsApp, { items: items, providers: providers }), document.getElementsByTagName('body')[0]);
	});

	// TODO: search for items

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var srcImage = function (name) {
	        return name + '.svg';
	    };

	module.exports = [{ 
	        key: 'bar',
	        text: 'Bars',
	        srcImage: srcImage('glass')
	    }, {
	        key: 'restaurant',
	        text: 'Restaurants',
	        srcImage: srcImage('cutlery')
	    }, {
	        key: 'lodging',
	        text: 'Lodging',
	        srcImage: srcImage('bed')
	    }, {
	        key: 'park',
	        text: 'Parks',
	        srcImage: srcImage('compass')
	    }];


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var srcImage = function (name) {
	        return name + '.svg';
	    };

	module.exports = [{
	        key: 'getPhoneNumber',
	        srcImage: srcImage('phone'),
	        callback: function (number) {
	            window.alert('Call phone number: ' + number);
	        }
	    }, {
	        key: 'getWebsiteUri',
	        srcImage: srcImage('external-link-square'),
	        callback: function (address) {
	            window.open(address); 
	        }
	    }];


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Header = __webpack_require__(9),
	    CategoryList = __webpack_require__(10),
	    Map = __webpack_require__(11),
	    ResultList = __webpack_require__(12);

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        colors: React.PropTypes.object,
	        layout: React.PropTypes.object,
	        categoryDefs: React.PropTypes.array,
	        items: React.PropTypes.array,
	        setItemPage: React.PropTypes.func,
	        setLocationPage: React.PropTypes.func
	    },

	    getInitialState: function getInitialState() {
	        var items = this.props.items,
	            categoriesSelected = {},
	            props = this.props;

	        props.categoryDefs.forEach(function (categoryDef) {
	            categoriesSelected[categoryDef.key] = false; // all false means unfiltered
	        });

	        return {
	            categoriesSelected: categoriesSelected,
	            itemsFiltered: items.concat() // shallow copy
	        };
	    },

	    onCategorySelected: function onCategorySelected(categoryDef) {
	        var categoriesSelected = Object.create(this.state.categoriesSelected),
	            key = categoryDef.key,
	            noneSelected = true,
	            itemsFiltered = [];

	        categoriesSelected[key] = !categoriesSelected[key];
	        this.props.categoryDefs.forEach(function (categoryDef) {
	            noneSelected = noneSelected && !categoriesSelected[categoryDef.key];
	        });

	        this.props.items.forEach(function (item) {
	            if (noneSelected || categoriesSelected[item.getCategory()] === true) {
	                itemsFiltered.push(item);
	            }
	        });

	        this.setState({
	            categoriesSelected: categoriesSelected,
	            itemsFiltered: itemsFiltered
	        });
	    },

	    render: function render() {
	        var props = this.props,
	            colors = props.colors,
	            layout = props.layout,
	            state = this.state,
	            styleMap = {
	            display: 'block',
	            width: '100%',
	            boxSizing: 'border-box',
	            height: layout.heightCategoryList,
	            borderColor: colors.colorMeta,
	            borderWidth: '1px',
	            borderBottomStyle: 'solid'
	        },
	            linkRight = {
	            srcImage: 'search.svg',
	            setPage: props.setLocationPage
	        };

	        return React.createElement(
	            'div',
	            null,
	            React.createElement(Header, { colors: colors, layout: layout, linkRight: linkRight }),
	            React.createElement(CategoryList, { colors: colors, layout: layout, categoryDefs: props.categoryDefs, categoriesSelected: state.categoriesSelected, onCategorySelected: this.onCategorySelected }),
	            React.createElement(Map, { layout: layout }),
	            React.createElement(ResultList, { items: state.itemsFiltered, mapIndexDemo: true, colors: colors, layout: props.layout, setItemPage: props.setItemPage })
	        );
	    }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Header = __webpack_require__(9),
	    Map = __webpack_require__(11);

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        colors: React.PropTypes.object,
	        layout: React.PropTypes.object,
	        item: React.PropTypes.object,
	        setPrevPage: React.PropTypes.func
	    },

	    onClickOK: function onClickOK() {
	        // TODO setLocation()
	        this.props.setPrevPage();
	    },

	    onClickCancel: function onClickCancel() {
	        this.props.setPrevPage();
	    },

	    render: function render() {
	        var props = this.props,
	            colors = props.colors,
	            layout = props.layout,
	            marginWide = layout.marginWide,
	            styleDiv = {},
	            styleMap = {
	            display: 'block',
	            width: '100%',
	            boxSizing: 'border-box',
	            height: layout.heightCategoryList,
	            borderColor: colors.colorMeta,
	            borderWidth: '1px',
	            borderBottomStyle: 'solid'
	        },
	            styleForm = {
	            marginLeft: marginWide,
	            marginRight: marginWide
	        },
	            styleFieldsetInput = {
	            marginTop: '1rem'
	        },
	            styleInput = {
	            borderColor: colors.colorItem,
	            borderWidth: '1px',
	            borderStyle: 'solid'
	        },
	            styleFieldsetButtons = {
	            display: 'flex',
	            alignItems: 'flex-start',
	            marginTop: '1rem'
	        },
	            styleButton = {
	            backgroundColor: colors.colorBackground,
	            borderColor: colors.colorItem,
	            borderWidth: '1px',
	            borderStyle: 'solid',
	            padding: layout.marginNarrow,
	            marginLeft: marginWide
	        };

	        return React.createElement(
	            'div',
	            { style: styleDiv },
	            React.createElement(Header, { colors: colors, layout: layout }),
	            React.createElement(Map, { layout: layout }),
	            React.createElement(
	                'form',
	                { style: styleForm },
	                React.createElement(
	                    'fieldset',
	                    { style: styleFieldsetInput },
	                    React.createElement('input', { type: 'text', style: styleInput })
	                ),
	                React.createElement(
	                    'fieldset',
	                    { style: styleFieldsetButtons },
	                    React.createElement(
	                        'button',
	                        { style: styleButton, onClick: this.onClickOK },
	                        'OK'
	                    ),
	                    React.createElement(
	                        'button',
	                        { style: styleButton, onclick: this.onClickCancel },
	                        'Cancel'
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Header = __webpack_require__(9),
	    Map = __webpack_require__(11),
	    ResultItem = __webpack_require__(13),
	    ContactList = __webpack_require__(14);

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        colors: React.PropTypes.object,
	        layout: React.PropTypes.object,
	        contactDefs: React.PropTypes.array,
	        item: React.PropTypes.object,
	        setPrevPage: React.PropTypes.func,
	        setDirectionsPage: React.PropTypes.func
	    },

	    onClickDirections: function onClickDirections() {
	        // TODO: location too?
	        this.props.setDirectionsPage(this.props.item);
	    },

	    render: function render() {
	        var props = this.props,
	            colors = props.colors,
	            layout = props.layout,
	            marginWide = layout.marginWide,
	            marginNarrow = layout.marginNarrow,

	        // TODO: align ContactList at bottom?
	        styleDiv = {},
	            styleMap = {
	            display: 'block',
	            width: '100%',
	            boxSizing: 'border-box',
	            height: layout.heightCategoryList,
	            borderColor: colors.colorMeta,
	            borderWidth: '1px',
	            borderBottomStyle: 'solid'
	        },
	            styleDirectionsList = {
	            display: 'flex',
	            alignItems: 'flex-start',
	            marginTop: marginNarrow,
	            marginLeft: marginWide,
	            marginRight: marginWide,
	            listStyle: 'none'
	        },
	            styleDirectionsItem = {
	            flexGrow: 1,
	            flexShrink: 1,
	            textAlign: 'center',
	            padding: marginNarrow,
	            borderWidth: '1px',
	            borderStyle: 'solid'
	        },
	            linkLeft = {
	            srcImage: 'angle-left.svg',
	            setPage: props.setPrevPage
	        },
	            item = props.item;

	        // TODO: description, hours, amenities
	        return React.createElement(
	            'div',
	            { style: styleDiv },
	            React.createElement(Header, { colors: colors, layout: layout, linkLeft: linkLeft }),
	            React.createElement(Map, { layout: layout }),
	            React.createElement(ResultItem, { colors: colors, layout: layout, item: item, mapIndexDemo: true }),
	            React.createElement(ContactList, { colors: colors, layout: layout, contactDefs: props.contactDefs, item: item }),
	            React.createElement(
	                'ul',
	                { style: styleDirectionsList },
	                React.createElement(
	                    'li',
	                    { style: styleDirectionsItem, onClick: this.onClickDirections },
	                    React.createElement(
	                        'span',
	                        null,
	                        'Driving'
	                    )
	                ),
	                React.createElement(
	                    'li',
	                    { style: styleDirectionsItem, onClick: this.onClickDirections },
	                    React.createElement(
	                        'span',
	                        null,
	                        'Walking'
	                    )
	                ),
	                React.createElement(
	                    'li',
	                    { style: styleDirectionsItem, onClick: this.onClickDirections },
	                    React.createElement(
	                        'span',
	                        null,
	                        'Bicycling'
	                    )
	                )
	            )
	        );
	    }
	});

	//display: 'flex',
	//alignItems: 'flex-start',
	//alignContent: 'flex-start',
	//flexWrap: 'wrap',
	//overflow: 'hidden'

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Header = __webpack_require__(9),
	    Map = __webpack_require__(11);

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        colors: React.PropTypes.object,
	        layout: React.PropTypes.object,
	        item: React.PropTypes.object,
	        setPrevPage: React.PropTypes.func
	    },

	    render: function render() {
	        var props = this.props,
	            colors = props.colors,
	            layout = props.layout,
	            styleDiv = {},
	            linkLeft = {
	            srcImage: 'angle-left.svg',
	            setPage: props.setPrevPage
	        };

	        return React.createElement(
	            'div',
	            { style: styleDiv },
	            React.createElement(Header, { colors: colors, layout: layout, linkLeft: linkLeft }),
	            React.createElement(Map, { layout: layout })
	        );
	    }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var providers = {
	        map: {},
	        array: [
	            __webpack_require__(15) /*,
	            require('./YelpOffline.js') */
	        ]
	    },
	    map = providers.map;

	providers.array.forEach(function (provider) {
	    map[provider.name] = provider;
	});

	module.exports = providers;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SymbolDiv = __webpack_require__(17);

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        colors: React.PropTypes.object,
	        layout: React.PropTypes.object,
	        linkLeft: React.PropTypes.object,
	        linkRight: React.PropTypes.object
	    },

	    render: function render() {
	        var props = this.props,
	            colors = props.colors,
	            layout = props.layout,
	            linkLeft = props.linkLeft,
	            linkRight = props.linkRight,
	            marginWide = layout.marginWide,
	            styleHeader = {
	            display: 'flex',
	            alignItems: 'flex-start',
	            boxSizing: 'border-box',
	            lineHeight: layout.lineHeightMeta,
	            width: '100%',
	            paddingLeft: linkLeft ? 0 : marginWide,
	            paddingRight: linkRight ? 0 : marginWide,
	            color: colors.colorMeta,
	            backgroundColor: colors.colorBackground,
	            borderWidth: '2px',
	            borderBottomStyle: 'solid'
	        },
	            styleHeading = {
	            flexShrink: 1,
	            fontSize: '1.25rem'
	        },
	            symbolDiv = function symbolDiv(link, alignment) {
	            if (link) {
	                return React.createElement(SymbolDiv, { layout: layout, srcImage: link.srcImage, alignment: alignment, onClick: link.setPage });
	            }
	        },
	            symbolDivLeft = symbolDiv(linkLeft, 'left'),
	            symbolDivRight = symbolDiv(linkRight, 'right');

	        return React.createElement(
	            'header',
	            { style: styleHeader },
	            symbolDivLeft,
	            React.createElement(
	                'h1',
	                { style: styleHeading },
	                'Dogs-in'
	            ),
	            symbolDivRight
	        );
	    }
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var CategoryItem = __webpack_require__(16);

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        colors: React.PropTypes.object,
	        layout: React.PropTypes.object,
	        categoryDefs: React.PropTypes.array,
	        categoriesSelected: React.PropTypes.object,
	        onCategorySelected: React.PropTypes.func
	    },

	    render: function render() {
	        var props = this.props,
	            categoriesSelected = props.categoriesSelected,
	            onCategorySelected = props.onCategorySelected,
	            colors = props.colors,
	            layout = props.layout,
	            style = {
	            width: '100%',
	            display: 'flex',
	            alignItems: 'flex-start',
	            listStyle: 'none'
	        },
	            categoryItems = props.categoryDefs.map(function (categoryDef) {
	            return React.createElement(CategoryItem, { colors: colors, layout: layout, categoryDef: categoryDef, selected: categoriesSelected[categoryDef.key], onCategorySelected: onCategorySelected });
	        });

	        return React.createElement(
	            'ul',
	            { style: style },
	            categoryItems
	        );
	    }
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        colors: React.PropTypes.object,
	        layout: React.PropTypes.object
	        //item: React.PropTypes.object
	    },

	    render: function render() {
	        var props = this.props,
	            layout = props.layout,
	            styleMap = {
	            display: 'block',
	            width: '100%',
	            boxSizing: 'border-box',
	            height: layout.heightCategoryList,
	            borderWidth: '1px',
	            borderBottomStyle: 'solid'
	        };

	        return React.createElement('img', { style: styleMap, src: 'TODO.jpg', alt: 'Map' });
	    }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ResultItem = __webpack_require__(13);

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        items: React.PropTypes.array,
	        mapIndexDemo: React.PropTypes.bool,
	        colors: React.PropTypes.object,
	        layout: React.PropTypes.object,
	        setItemPage: React.PropTypes.func
	    },
	    style: {
	        listStyle: 'none'
	    },
	    render: function render() {
	        var props = this.props,
	            colors = props.colors,
	            layout = props.layout,
	            resultItems = props.items.map(function (item) {
	            return React.createElement(ResultItem, { item: item, mapIndexDemo: props.mapIndexDemo, colors: colors, layout: layout, setItemPage: props.setItemPage });
	        });

	        return React.createElement(
	            'ul',
	            { style: this.style },
	            resultItems
	        );
	    } });

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SymbolDiv = __webpack_require__(17),
	    MapIndex = __webpack_require__(18);

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        item: React.PropTypes.object,
	        mapIndexDemo: React.PropTypes.bool,
	        layout: React.PropTypes.object,
	        setItemPage: React.PropTypes.func
	    },

	    onClick: function onClick() {
	        var props = this.props,
	            setItemPage = props.setItemPage;

	        if (setItemPage) {
	            setItemPage(props.item);
	        }
	    },

	    render: function render() {
	        var props = this.props,
	            layout = props.layout,
	            inItemPage = !props.setItemPage,
	            styleItem = {
	            display: 'flex',
	            alignItems: 'flex-start',
	            paddingTop: layout.marginNarrow,
	            paddingBottom: layout.marginNarrow,
	            borderWidth: '1px',
	            borderBottomStyle: inItemPage ? 'none' : 'solid'
	        },
	            styleDiv = {
	            flexShrink: 1
	        },
	            styleDistance = {
	            flexShrink: 0,
	            marginLeft: 'auto' // align right
	        },
	            item = props.item,
	            neighborhood = function neighborhood() {
	            if (inItemPage && item.getNeighborhood()) {
	                return React.createElement(
	                    'p',
	                    null,
	                    item.getNeighborhood()
	                );
	            }
	        },
	            city = function city() {
	            if (inItemPage) {
	                return React.createElement(
	                    'p',
	                    null,
	                    item.getCity() + ', ' + item.getState() + ' ' + item.getPostalCode()
	                );
	            }
	        },
	            distance = item.getDistanceMiles() + 'mi',
	            // TODO: Foursquare only?
	        index;

	        if (props.mapIndexDemo) {
	            index = item.indexMap;
	        }

	        return React.createElement(
	            'li',
	            { style: styleItem, onClick: this.onClick },
	            React.createElement(SymbolDiv, { layout: layout, srcImage: item.categoryDef.srcImage }),
	            React.createElement(
	                'div',
	                { style: styleDiv },
	                React.createElement(
	                    'p',
	                    null,
	                    item.getName()
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    item.getAddress()
	                ),
	                neighborhood(),
	                city()
	            ),
	            React.createElement(
	                'span',
	                { style: styleDistance },
	                distance
	            ),
	            React.createElement(MapIndex, { colors: props.colors, layout: layout, index: index })
	        );
	    }
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ContactItem = __webpack_require__(19);

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        colors: React.PropTypes.object,
	        layout: React.PropTypes.object,
	        contactDefs: React.PropTypes.array,
	        item: React.PropTypes.object
	    },

	    render: function render() {
	        var props = this.props,
	            colors = props.colors,
	            layout = props.layout,
	            item = props.item,
	            styleList = {
	            listStyle: 'none',
	            width: '100%',
	            marginTop: layout.marginNarrow
	        },
	            contactItems = [];

	        props.contactDefs.forEach(function (contactDef) {
	            var value = item[contactDef.key].call(item);
	            console.log(contactDef.key, value);

	            if (value) {
	                contactItems.push(React.createElement(ContactItem, { colors: colors, layout: layout, contactDef: contactDef, value: value }));
	            }
	        });

	        return React.createElement(
	            'ul',
	            { style: styleList },
	            contactItems
	        );
	    }
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var locationMap = {
	    // Skookum in Charlotte, NC

	    "35.226074,-80.844034": [
	  {
	    "venue": {
	      "id": "544ad14a498e92c459c5c1ec",
	      "name": "Craft Growler Shop",
	      "contact": {
	        "formattedPhone":"(980) 207-3716"
	        },
	      "location": {
	        "address": "1320 S Church St",
	        "lat": 35.219983573512,
	        "lng": -80.856992608206,
	        "distance": 7841,
	        "postalCode": "28203",
	        "cc": "US",
	        "neighborhood": "South End",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "South End, Charlotte",
	        "formattedAddress": [
	          //"<span itemprop=\"streetAddress\">1320 S Church St<\/span>",
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28203<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/craft-growler-shop\/544ad14a498e92c459c5c1ec",
	      "categories": [
	        {
	          "id": "5370f356bcbc57f1066c94c2",
	          "name": "Beer Store",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/nightlife\/beergarden_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/nightlife\/beergarden",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ]
	  }},
	  {
	    "venue": {
	      "id": "4b0cae9ef964a520f44023e3",
	      "name": "Tavern on the Tracks",
	      "location": {
	        "address": "1411 S Tryon St",
	        "crossStreet": "at Bland St",
	        "lat": 35.216971637423,
	        "lng": -80.854657692278,
	        "distance": 7747,
	        "postalCode": "28203",
	        "cc": "US",
	        "neighborhood": "South End",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "South End, Charlotte",
	        "formattedAddress": [
	          //"<span itemprop=\"streetAddress\">1411 S Tryon St<\/span> (at Bland St)",
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28203<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/tavern-on-the-tracks\/4b0cae9ef964a520f44023e3",
	      "canonicalPath": "\/v\/tavern-on-the-tracks\/4b0cae9ef964a520f44023e3",
	      "categories": [
	        {
	          "id": "4bf58dd8d48988d11d941735",
	          "name": "Sports Bar",
	          "pluralName": "Sports Bars",
	          "shortName": "Sports Bar",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/nightlife\/sportsbar_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/nightlife\/pub",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": false,
	      "stats": {
	        "checkinsCount": 5575,
	        "usersCount": 2375,
	        "tipCount": 49
	      },
	      "urlSig": "zQ3xBwZtFQho44fltVWdGF+9iWA=",
	      "price": {
	        "tier": 2,
	        "message": "Moderate",
	        "currency": "$"
	      },
	      "hasMenu": true,
	      "like": false,
	      "dislike": false,
	      "ok": false,
	      "rating": 8,
	      "ratingColor": "73CF42",
	      "ratingSignals": 88,
	      "menu": {
	        "type": "Menu",
	        "label": "Menu",
	        "anchor": "View Menu",
	        "url": "https:\/\/foursquare.com\/v\/tavern-on-the-tracks\/4b0cae9ef964a520f44023e3\/menu",
	        "mobileUrl": "https:\/\/foursquare.com\/v\/4b0cae9ef964a520f44023e3\/device_menu",
	        "canonicalPath": "\/v\/tavern-on-the-tracks\/4b0cae9ef964a520f44023e3\/menu"
	      },
	      "beenHere": {
	        "count": 2,
	        "marked": true
	      },
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "51897c7e498e84cd1cc8b077",
	      "createdAt": 1367964798,
	      "prefix": "https:\/\/irs3.4sqi.net\/img\/general\/",
	      "suffix": "\/6368923_FcTa_W-WalTRFBBsBXQ41cIXKUgl88UVsuXCerKRxdc.jpg",
	      "width": 612,
	      "height": 612,
	      "user": {
	        "id": "6368923",
	        "firstName": "Jeremy",
	        "lastName": "Maes",
	        "gender": "male",
	        "canonicalUrl": "https:\/\/foursquare.com\/grannymaes",
	        "canonicalPath": "\/grannymaes",
	        "photo": {
	          "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	          "suffix": "\/ZU5M0VXNLVA5RI50.png"
	        }
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 2,
	      "items": [
	        {
	          "detail": {
	            "type": "facePile",
	            "object": {
	              "count": 24,
	              "items": [
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "tips": 1,
	                  "visitedCount": 1,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "218787",
	                    "firstName": "Jason",
	                    "lastName": "Yarborough",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/yarby",
	                    "canonicalPath": "\/yarby",
	                    "photo": {
	                      "prefix": "https:\/\/irs1.4sqi.net\/img\/user\/",
	                      "suffix": "\/Z53LPCHFZWBFCMXR.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "tips": 1,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "8073",
	                    "firstName": "Jason",
	                    "lastName": "Keath",
	                    "gender": "male",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/jasonkeath",
	                    "canonicalPath": "\/jasonkeath",
	                    "photo": {
	                      "prefix": "https:\/\/irs3.4sqi.net\/img\/user\/",
	                      "suffix": "\/SPQSJXVR33YE3KAN.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "75594",
	                    "firstName": "Katrina",
	                    "lastName": "Dietz",
	                    "gender": "female",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/kateymarie",
	                    "canonicalPath": "\/kateymarie",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/Y14OVQMCIHCXNU53.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 16,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "277247",
	                    "firstName": "Philip",
	                    "lastName": "Ciccarello",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/user\/277247",
	                    "canonicalPath": "\/user\/277247",
	                    "photo": {
	                      "prefix": "https:\/\/irs1.4sqi.net\/img\/user\/",
	                      "suffix": "\/L2AOYIAH2SMOA2LW.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 5,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "83208",
	                    "firstName": "Scott",
	                    "lastName": "Hepburn",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/user\/83208",
	                    "canonicalPath": "\/user\/83208",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/XJTT0V2SEBWFXJVN.jpg"
	                    }
	                  }
	                }
	              ]
	            }
	          }
	        },
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "55128584498ebc51ebbe08ab",
	              "createdAt": 1427277188,
	              "text": "Thank you Tavern on Tracks for supporting our beer fest. On 5\/16\/15 join us for the South End Hops Fest. Unlimited beer samples, live music, dog friendly & food trucks. Click \"read more\" for info...",
	              "entities": [
	                {
	                  "indices": [
	                    46,
	                    50
	                  ],
	                  "id": "52cb360d498e49ae1f58c89c",
	                  "type": "tip_taste_match",
	                  "text": "beer"
	                },
	                {
	                  "indices": [
	                    115,
	                    127
	                  ],
	                  "id": "532ef12c498ef4d96053c86a",
	                  "type": "tip_taste_match",
	                  "text": "beer samples"
	                },
	                {
	                  "indices": [
	                    129,
	                    139
	                  ],
	                  "id": "52cb360d498e49ae1f58c8c8",
	                  "type": "tip_taste_match",
	                  "text": "live music",
	                  "onUser": true
	                },
	                {
	                  "indices": [
	                    141,
	                    153
	                  ],
	                  "id": "5339d864498ee3e1e504243b",
	                  "type": "tip_taste_match",
	                  "text": "dog-friendly"
	                },
	                {
	                  "indices": [
	                    156,
	                    167
	                  ],
	                  "id": "52e132be498e274cf16caad2",
	                  "type": "tip_taste_match",
	                  "text": "food trucks"
	                }
	              ],
	              "type": "user",
	              "url": "http:\/\/www.southendhopsfestival.com",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/55128584498ebc51ebbe08ab",
	              "canonicalPath": "\/item\/55128584498ebc51ebbe08ab",
	              "urlSig": "zGKALFYSyzKP\/eymAnDyCmCgh3Q=",
	              "likes": {
	                "count": 1,
	                "groups": [
	                  
	                ],
	                "summary": "1 Like"
	              },
	              "logView": true,
	              "user": {
	                "id": "47948792",
	                "firstName": "Third Rock Events",
	                "gender": "none",
	                "canonicalUrl": "https:\/\/foursquare.com\/thirdrockevents",
	                "canonicalPath": "\/thirdrockevents",
	                "photo": {
	                  "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                  "suffix": "\/47948792-YN4B4BSZQ2R0IS3D.png"
	                },
	                "type": "page"
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  {
	    "venue": {
	      "id": "4b05e9f6f964a520b3e522e3",
	      "name": "Common Market",
	      "location": {
	        "address": "1515 S Tryon St",
	        "crossStreet": "btwn Camden & Park",
	        "lat": 35.215601202791,
	        "lng": -80.856802761555,
	        "distance": 7501,
	        "postalCode": "28203",
	        "cc": "US",
	        "neighborhood": "Wilmore",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "Wilmore, Charlotte",
	        "formattedAddress": [
	          //"<span itemprop=\"streetAddress\">1515 S Tryon St<\/span> (btwn Camden &amp; Park)",
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28203<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/common-market\/4b05e9f6f964a520b3e522e3",
	      "canonicalPath": "\/v\/common-market\/4b05e9f6f964a520b3e522e3",
	      "categories": [
	        {
	          "id": "4bf58dd8d48988d146941735",
	          "name": "Deli \/ Bodega",
	          "pluralName": "Delis \/ Bodegas",
	          "shortName": "Deli \/ Bodega",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/food\/deli_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/food\/deli",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": false,
	      "stats": {
	        "checkinsCount": 12310,
	        "usersCount": 3046,
	        "tipCount": 81
	      },
	      "urlSig": "yx0NsjX8R55mkdl9ZICuvtESN9o=",
	      "price": {
	        "tier": 1,
	        "message": "Cheap",
	        "currency": "$"
	      },
	      "hasMenu": true,
	      "like": true,
	      "dislike": false,
	      "ok": false,
	      "rating": 9.5,
	      "ratingColor": "00B551",
	      "ratingSignals": 227,
	      "menu": {
	        "type": "Menu",
	        "label": "Menu",
	        "anchor": "View Menu",
	        "url": "https:\/\/foursquare.com\/v\/common-market\/4b05e9f6f964a520b3e522e3\/menu",
	        "mobileUrl": "https:\/\/foursquare.com\/v\/4b05e9f6f964a520b3e522e3\/device_menu",
	        "canonicalPath": "\/v\/common-market\/4b05e9f6f964a520b3e522e3\/menu"
	      },
	      "beenHere": {
	        "count": 36,
	        "marked": true
	      },
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "507a19e2e4b05ac93d73f5cf",
	      "createdAt": 1350179298,
	      "prefix": "https:\/\/irs2.4sqi.net\/img\/general\/",
	      "suffix": "\/24954480_PinZi5uIO65Cpen7ytKN3su2GsoG0ccJKno7dumWzZo.jpg",
	      "width": 540,
	      "height": 720,
	      "user": {
	        "id": "24954480",
	        "firstName": "Justin",
	        "lastName": "Matlock",
	        "gender": "male",
	        "canonicalUrl": "https:\/\/foursquare.com\/user\/24954480",
	        "canonicalPath": "\/user\/24954480",
	        "photo": {
	          "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	          "suffix": "\/24954480-MHP12B0H0JAI5FEL.jpg"
	        }
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 2,
	      "items": [
	        {
	          "detail": {
	            "type": "facePile",
	            "object": {
	              "count": 55,
	              "items": [
	                {
	                  "liked": true,
	                  "oked": false,
	                  "disliked": false,
	                  "tips": 1,
	                  "visitedCount": 12,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "114274",
	                    "firstName": "Lisa",
	                    "lastName": "Frame",
	                    "gender": "female",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/lisa_frame",
	                    "canonicalPath": "\/lisa_frame",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/114274_1259172233864.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "tips": 1,
	                  "visitedCount": 31,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "415172",
	                    "firstName": "Ted",
	                    "lastName": "Boyd",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/greenmarketguy",
	                    "canonicalPath": "\/greenmarketguy",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/RXSZLDYRWS0K4JPP.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "tips": 1,
	                  "visitedCount": 10,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "299038",
	                    "firstName": "Sara",
	                    "lastName": "Stevens",
	                    "gender": "female",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/saritameow",
	                    "canonicalPath": "\/saritameow",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/RTVAET0QSV4MYFE4.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "tips": 1,
	                  "visitedCount": 1,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "115716",
	                    "firstName": "Susan",
	                    "lastName": "Hil",
	                    "gender": "female",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/user\/115716",
	                    "canonicalPath": "\/user\/115716",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/X0QXHNITZO5CLTVJ.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": true,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 65,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "63300",
	                    "firstName": "Roy",
	                    "lastName": "Morejon",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/roymorejon",
	                    "canonicalPath": "\/roymorejon",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/63300-Q1DUXGNT5YSX5SCB.jpg"
	                    }
	                  }
	                }
	              ]
	            }
	          }
	        },
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "4fa809a9e4b024433887efcc",
	              "createdAt": 1336412585,
	              "text": "Dog friendly outside patio! Try the black bean salad and hummus for sides and make sure go on the weekends for $1 off draft specials. Selections are changed out frequently!",
	              "entities": [
	                {
	                  "indices": [
	                    0,
	                    12
	                  ],
	                  "id": "5339d864498ee3e1e504243b",
	                  "type": "tip_taste_match",
	                  "text": "dog-friendly"
	                },
	                {
	                  "indices": [
	                    13,
	                    26
	                  ],
	                  "id": "52cb360d498e49ae1f58c91d",
	                  "type": "tip_taste_match",
	                  "text": "outdoor seating"
	                },
	                {
	                  "indices": [
	                    36,
	                    52
	                  ],
	                  "id": "52cc5707498ec8fe9f4820be",
	                  "type": "tip_taste_match",
	                  "text": "black beans"
	                },
	                {
	                  "indices": [
	                    57,
	                    63
	                  ],
	                  "id": "52db1e24498e903b1d5961f1",
	                  "type": "tip_taste_match",
	                  "text": "hummus"
	                },
	                {
	                  "indices": [
	                    118,
	                    123
	                  ],
	                  "id": "52cb360d498e49ae1f58c950",
	                  "type": "tip_taste_match",
	                  "text": "draft beer",
	                  "onUser": true
	                }
	              ],
	              "type": "user",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/4fa809a9e4b024433887efcc",
	              "canonicalPath": "\/item\/4fa809a9e4b024433887efcc",
	              "likes": {
	                "count": 1,
	                "groups": [
	                  
	                ],
	                "summary": "1 Like"
	              },
	              "logView": true,
	              "user": {
	                "id": "21976447",
	                "firstName": "Brandon",
	                "lastName": "Jozsa",
	                "gender": "male",
	                "canonicalUrl": "https:\/\/foursquare.com\/user\/21976447",
	                "canonicalPath": "\/user\/21976447",
	                "photo": {
	                  "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                  "suffix": "\/WFIDSX3PXAYCVVLN.jpg"
	                }
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  {
	    "venue": {
	      "id": "4d890fbb1508a143cec9051e",
	      "name": "VBGB Beer Hall And Garden",
	      "location": {
	        "address": "920 Hamilton St",
	        "lat": 35.240607025669,
	        "lng": -80.845191478729,
	        "distance": 10285,
	        "postalCode": "28206",
	        "cc": "US",
	        "neighborhood": "Fourth Ward",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "Fourth Ward, Charlotte",
	        "formattedAddress": [
	          //"<span itemprop=\"streetAddress\">920 Hamilton St<\/span>",
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28206<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/vbgb-beer-hall-and-garden\/4d890fbb1508a143cec9051e",
	      "canonicalPath": "\/v\/vbgb-beer-hall-and-garden\/4d890fbb1508a143cec9051e",
	      "categories": [
	        {
	          "id": "4bf58dd8d48988d117941735",
	          "name": "Beer Garden",
	          "pluralName": "Beer Gardens",
	          "shortName": "Beer Garden",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/nightlife\/beergarden_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/nightlife\/beergarden",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": true,
	      "stats": {
	        "checkinsCount": 9374,
	        "usersCount": 3794,
	        "tipCount": 71
	      },
	      "urlSig": "PHpE+iyDDrC4NJ3z0k+QK4SEIWE=",
	      "price": {
	        "tier": 2,
	        "message": "Moderate",
	        "currency": "$"
	      },
	      "hasMenu": true,
	      "like": false,
	      "dislike": false,
	      "ok": false,
	      "rating": 9.2,
	      "ratingColor": "00B551",
	      "ratingSignals": 252,
	      "menu": {
	        "type": "Menu",
	        "label": "Menu",
	        "anchor": "View Menu",
	        "url": "https:\/\/foursquare.com\/v\/vbgb-beer-hall-and-garden\/4d890fbb1508a143cec9051e\/menu",
	        "mobileUrl": "https:\/\/foursquare.com\/v\/4d890fbb1508a143cec9051e\/device_menu",
	        "canonicalPath": "\/v\/vbgb-beer-hall-and-garden\/4d890fbb1508a143cec9051e\/menu"
	      },
	      "beenHere": {
	        "count": 34,
	        "marked": true
	      },
	      "storeId": "",
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "50e8eb5ce4b0fe07d7969847",
	      "createdAt": 1357441884,
	      "prefix": "https:\/\/irs1.4sqi.net\/img\/general\/",
	      "suffix": "\/1337877_rhEyC8w6i-Gd-prpFRf8JobLQVZzaXnmVRbkTov1oW0.jpg",
	      "width": 720,
	      "height": 540,
	      "user": {
	        "id": "1337877",
	        "firstName": "DJ",
	        "lastName": "Marty",
	        "gender": "male",
	        "canonicalUrl": "https:\/\/foursquare.com\/djmartync",
	        "canonicalPath": "\/djmartync",
	        "photo": {
	          "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	          "suffix": "\/1337877-KJOEJENSUTHD4N4F.jpg"
	        }
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 2,
	      "items": [
	        {
	          "detail": {
	            "type": "facePile",
	            "object": {
	              "count": 37,
	              "items": [
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "tips": 1,
	                  "visitedCount": 53,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "1132430",
	                    "firstName": "April",
	                    "lastName": "Smith",
	                    "gender": "female",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/ape_smith",
	                    "canonicalPath": "\/ape_smith",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/4H0Y311CUZI2UMG3.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": true,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 49,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "114314",
	                    "firstName": "Richard",
	                    "lastName": "Groves",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/englishinvader",
	                    "canonicalPath": "\/englishinvader",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/3DUQ5ICU1TWGMAZG.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": true,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 2,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "146561",
	                    "firstName": "AdrienneC2",
	                    "gender": "female",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/adriennec2",
	                    "canonicalPath": "\/adriennec2",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/20L3EB4EWNPXYHRZ.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": true,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "2005499",
	                    "firstName": "Golphur",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/golphur",
	                    "canonicalPath": "\/golphur",
	                    "photo": {
	                      "prefix": "https:\/\/irs1.4sqi.net\/img\/user\/",
	                      "suffix": "\/4Q3D0SPNGAIUGJWO.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 31,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "173636",
	                    "firstName": "Hunter",
	                    "lastName": "Wilson",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/cltnightlife",
	                    "canonicalPath": "\/cltnightlife",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/OD5ZTEVCGWWWSV2B.jpg"
	                    }
	                  }
	                }
	              ]
	            }
	          }
	        },
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "4ffe50c8e4b0a95e0b737c47",
	              "createdAt": 1342066888,
	              "text": "Dog friendly patio!!!!",
	              "entities": [
	                {
	                  "indices": [
	                    0,
	                    12
	                  ],
	                  "id": "5339d864498ee3e1e504243b",
	                  "type": "tip_taste_match",
	                  "text": "dog-friendly"
	                },
	                {
	                  "indices": [
	                    13,
	                    18
	                  ],
	                  "id": "52cb360d498e49ae1f58c91d",
	                  "type": "tip_taste_match",
	                  "text": "outdoor seating"
	                }
	              ],
	              "type": "user",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/4ffe50c8e4b0a95e0b737c47",
	              "canonicalPath": "\/item\/4ffe50c8e4b0a95e0b737c47",
	              "logView": true,
	              "user": {
	                "id": "1022714",
	                "firstName": "Jess \u2693",
	                "gender": "none",
	                "canonicalUrl": "https:\/\/foursquare.com\/the_last_tycoon",
	                "canonicalPath": "\/the_last_tycoon",
	                "photo": {
	                  "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                  "suffix": "\/Z0KDWWDVATVTOGHU.jpg"
	                }
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  {
	    "venue": {
	      "id": "4b2ceb5bf964a520bbca24e3",
	      "name": "Bojangles' Famous Chicken 'n Biscuits",
	      "location": {
	        "address": "1407 E 3rd St",
	        "lat": 35.213472,
	        "lng": -80.829969,
	        "distance": 9260,
	        "postalCode": "28204",
	        "cc": "US",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "Charlotte, NC",
	        "formattedAddress": [
	          //"<span itemprop=\"streetAddress\">1407 E 3rd St<\/span>",
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28204<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/bojangles-famous-chicken-n-biscuits\/4b2ceb5bf964a520bbca24e3",
	      "canonicalPath": "\/v\/bojangles-famous-chicken-n-biscuits\/4b2ceb5bf964a520bbca24e3",
	      "categories": [
	        {
	          "id": "4bf58dd8d48988d16e941735",
	          "name": "Fast Food Restaurant",
	          "pluralName": "Fast Food Restaurants",
	          "shortName": "Fast Food",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/food\/fastfood_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/food\/fastfood",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": true,
	      "stats": {
	        "checkinsCount": 2881,
	        "usersCount": 988,
	        "tipCount": 14
	      },
	      "urlSig": "mx\/7e1+W2M\/HQUKMyX3LpFMfbwI=",
	      "price": {
	        "tier": 1,
	        "message": "Cheap",
	        "currency": "$"
	      },
	      "hasMenu": true,
	      "like": false,
	      "dislike": false,
	      "ok": false,
	      "rating": 7.2,
	      "ratingColor": "C5DE35",
	      "ratingSignals": 38,
	      "menu": {
	        "type": "Menu",
	        "label": "Menu",
	        "anchor": "View Menu",
	        "url": "https:\/\/foursquare.com\/v\/bojangles-famous-chicken-n-biscuits\/4b2ceb5bf964a520bbca24e3\/menu",
	        "mobileUrl": "https:\/\/foursquare.com\/v\/4b2ceb5bf964a520bbca24e3\/device_menu",
	        "canonicalPath": "\/v\/bojangles-famous-chicken-n-biscuits\/4b2ceb5bf964a520bbca24e3\/menu"
	      },
	      "storeId": "797",
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "4ff60895e4b01a84ed2b1e0e",
	      "createdAt": 1341524117,
	      "prefix": "https:\/\/irs3.4sqi.net\/img\/general\/",
	      "suffix": "\/kPBEYN6Sy7nmV-WE-fFtVc_McmXWXqeFQgY244PJveI.jpg",
	      "width": 537,
	      "height": 720,
	      "user": {
	        "id": "28570941",
	        "firstName": "Daryl",
	        "lastName": "Ghent",
	        "gender": "male",
	        "canonicalUrl": "https:\/\/foursquare.com\/darylghent",
	        "canonicalPath": "\/darylghent",
	        "photo": {
	          "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	          "suffix": "\/ANXPRJTTGKUL1KZ3.jpg"
	        }
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 2,
	      "items": [
	        {
	          "detail": {
	            "type": "facePile",
	            "object": {
	              "count": 12,
	              "items": [
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 15,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "149441",
	                    "firstName": "Mike",
	                    "lastName": "Mahoney",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/mahoney",
	                    "canonicalPath": "\/mahoney",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/WQJ1IWSV1BJ3AA4U.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 9,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "103799",
	                    "firstName": "Bo",
	                    "lastName": "Hussey",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/bohussey",
	                    "canonicalPath": "\/bohussey",
	                    "photo": {
	                      "prefix": "https:\/\/irs3.4sqi.net\/img\/user\/",
	                      "suffix": "\/103799-UKQ5O4PYSYYRIZJH.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 5,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "112450",
	                    "firstName": "Thomas",
	                    "lastName": "Little",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/thomaslittle",
	                    "canonicalPath": "\/thomaslittle",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/-1_1258770718174.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "159795",
	                    "firstName": "Larken",
	                    "lastName": "Egleston",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/larken",
	                    "canonicalPath": "\/larken",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/RBGVJC23XUHYH4DR.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "109692",
	                    "firstName": "Scott",
	                    "lastName": "Lundgren",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/user\/109692",
	                    "canonicalPath": "\/user\/109692",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/109692-DV5MLNFCI0KY5VGG.jpg"
	                    }
	                  }
	                }
	              ]
	            }
	          }
	        },
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "4f608ce7e4b0ae6370e0de40",
	              "createdAt": 1331727591,
	              "text": "Steak biscuits are great!",
	              "entities": [
	                {
	                  "indices": [
	                    0,
	                    5
	                  ],
	                  "id": "52cb360d498e49ae1f58c959",
	                  "type": "tip_taste_match",
	                  "text": "steak",
	                  "onUser": true
	                },
	                {
	                  "indices": [
	                    6,
	                    14
	                  ],
	                  "id": "52dbf13a498efa90fea2a9f0",
	                  "type": "tip_taste_match",
	                  "text": "biscuits"
	                }
	              ],
	              "type": "user",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/4f608ce7e4b0ae6370e0de40",
	              "canonicalPath": "\/item\/4f608ce7e4b0ae6370e0de40",
	              "logView": true,
	              "user": {
	                "id": "10297267",
	                "firstName": "Greg",
	                "lastName": "Davis",
	                "gender": "male",
	                "canonicalUrl": "https:\/\/foursquare.com\/user\/10297267",
	                "canonicalPath": "\/user\/10297267",
	                "photo": {
	                  "prefix": "https:\/\/irs1.4sqi.net\/img\/user\/",
	                  "suffix": "\/I31V3EQSYWTRPL1P.jpg"
	                }
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  {
	    "venue": {
	      "id": "4b05863bf964a520665922e3",
	      "name": "Green's Lunch",
	      "location": {
	        "address": "309 W 4th St",
	        "lat": 35.228559624239,
	        "lng": -80.846484950269,
	        "distance": 9190,
	        "postalCode": "28202",
	        "cc": "US",
	        "neighborhood": "Third Ward",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "Third Ward, Charlotte",
	        "formattedAddress": [
	          //"<span itemprop=\"streetAddress\">309 W 4th St<\/span>",
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28202<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/greens-lunch\/4b05863bf964a520665922e3",
	      "canonicalPath": "\/v\/greens-lunch\/4b05863bf964a520665922e3",
	      "categories": [
	        {
	          "id": "4bf58dd8d48988d16d941735",
	          "name": "Caf\u00e9",
	          "pluralName": "Caf\u00e9s",
	          "shortName": "Caf\u00e9",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/food\/cafe_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/food\/cafe",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": false,
	      "stats": {
	        "checkinsCount": 427,
	        "usersCount": 273,
	        "tipCount": 9
	      },
	      "urlSig": "87xx7Ndn35RmXoH5Nb8aNUHE8Uc=",
	      "price": {
	        "tier": 1,
	        "message": "Cheap",
	        "currency": "$"
	      },
	      "hasMenu": true,
	      "like": false,
	      "dislike": false,
	      "ok": false,
	      "rating": 7,
	      "ratingColor": "C5DE35",
	      "ratingSignals": 17,
	      "menu": {
	        "type": "Menu",
	        "label": "Menu",
	        "anchor": "View Menu",
	        "url": "https:\/\/foursquare.com\/v\/greens-lunch\/4b05863bf964a520665922e3\/menu",
	        "mobileUrl": "https:\/\/foursquare.com\/v\/4b05863bf964a520665922e3\/device_menu",
	        "canonicalPath": "\/v\/greens-lunch\/4b05863bf964a520665922e3\/menu"
	      },
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "5044ecace4b06a6d9fcec6ec",
	      "createdAt": 1346694316,
	      "prefix": "https:\/\/irs1.4sqi.net\/img\/general\/",
	      "suffix": "\/URTYhg2Sjdx1Ad6DwMXRkD-Hvw0l4jFHoYfpjfax9js.jpg",
	      "width": 537,
	      "height": 720,
	      "user": {
	        "id": "24395",
	        "firstName": "Isaac",
	        "lastName": "Salazar",
	        "gender": "male",
	        "canonicalUrl": "https:\/\/foursquare.com\/isaacsalazar",
	        "canonicalPath": "\/isaacsalazar",
	        "photo": {
	          "prefix": "https:\/\/irs1.4sqi.net\/img\/user\/",
	          "suffix": "\/WPUH00153SOAPG4A.jpg"
	        }
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 2,
	      "items": [
	        {
	          "detail": {
	            "type": "facePile",
	            "object": {
	              "count": 3,
	              "items": [
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "119967",
	                    "firstName": "Brandon",
	                    "lastName": "Uttley",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/brandonuttley",
	                    "canonicalPath": "\/brandonuttley",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/119967-RLKESJQ3V2NKQLNW"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "167882",
	                    "firstName": "Andy",
	                    "lastName": "Ciordia",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/ciordia9",
	                    "canonicalPath": "\/ciordia9",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/ZR0WOQ1RIHX40OIX.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "147091",
	                    "firstName": "Lisa",
	                    "lastName": "Hoffmann",
	                    "gender": "female",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/lisahoffmann",
	                    "canonicalPath": "\/lisahoffmann",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/-1_1260241032090.jpg"
	                    }
	                  }
	                }
	              ]
	            }
	          }
	        },
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "52966f0411d251a715ee09a0",
	              "createdAt": 1385590532,
	              "text": "The hot dog, fry and drink special rocks, so does the massive bottles of Texas Pete! Great owners and staff!",
	              "entities": [
	                {
	                  "indices": [
	                    4,
	                    11
	                  ],
	                  "id": "52e132bf498ecd0b3965ecb5",
	                  "type": "tip_taste_match",
	                  "text": "hot dogs"
	                },
	                {
	                  "indices": [
	                    21,
	                    34
	                  ],
	                  "id": "52e132be498e3293bf9f7831",
	                  "type": "tip_taste_match",
	                  "text": "drink specials"
	                },
	                {
	                  "indices": [
	                    73,
	                    83
	                  ],
	                  "id": "53a4e1ba498ee373c1ee83bf",
	                  "type": "tip_taste_match",
	                  "text": "Texas Pete hot sauce"
	                },
	                {
	                  "indices": [
	                    102,
	                    107
	                  ],
	                  "id": "52e132bd498e06583ef9b175",
	                  "type": "tip_taste_match",
	                  "text": "staff"
	                }
	              ],
	              "type": "user",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/52966f0411d251a715ee09a0",
	              "canonicalPath": "\/item\/52966f0411d251a715ee09a0",
	              "logView": true,
	              "user": {
	                "id": "54778575",
	                "firstName": "Bob",
	                "lastName": "Palmer",
	                "gender": "male",
	                "canonicalUrl": "https:\/\/foursquare.com\/robertjpalmer",
	                "canonicalPath": "\/robertjpalmer",
	                "photo": {
	                  "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                  "suffix": "\/KL4GLKCMJ1BSOHSP.jpg"
	                }
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  {
	    "venue": {
	      "id": "4b0985aef964a520b61823e3",
	      "name": "Einstein Bros Bagels",
	      "location": {
	        "address": "1501 South Blvd",
	        "lat": 35.21432511,
	        "lng": -80.854611,
	        "distance": 7546,
	        "postalCode": "28203",
	        "cc": "US",
	        "neighborhood": "Dilworth",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "Dilworth, Charlotte",
	        "formattedAddress": [
	          //"<span itemprop=\"streetAddress\">1501 South Blvd<\/span>",
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28203<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/einstein-bros-bagels\/4b0985aef964a520b61823e3",
	      "canonicalPath": "\/v\/einstein-bros-bagels\/4b0985aef964a520b61823e3",
	      "categories": [
	        {
	          "id": "4bf58dd8d48988d1e0931735",
	          "name": "Coffee Shop",
	          "pluralName": "Coffee Shops",
	          "shortName": "Coffee Shop",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/food\/coffeeshop_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/food\/coffeeshop",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": true,
	      "stats": {
	        "checkinsCount": 3670,
	        "usersCount": 1166,
	        "tipCount": 24
	      },
	      "urlSig": "q7G64u1OIbCo5XeG6XTqtqqLiuo=",
	      "price": {
	        "tier": 1,
	        "message": "Cheap",
	        "currency": "$"
	      },
	      "hasMenu": true,
	      "like": false,
	      "dislike": false,
	      "ok": false,
	      "rating": 7.4,
	      "ratingColor": "C5DE35",
	      "ratingSignals": 58,
	      "menu": {
	        "type": "Menu",
	        "label": "Menu",
	        "anchor": "View Menu",
	        "url": "https:\/\/foursquare.com\/v\/einstein-bros-bagels\/4b0985aef964a520b61823e3\/menu",
	        "mobileUrl": "https:\/\/foursquare.com\/v\/4b0985aef964a520b61823e3\/device_menu",
	        "canonicalPath": "\/v\/einstein-bros-bagels\/4b0985aef964a520b61823e3\/menu"
	      },
	      "beenHere": {
	        "count": 9,
	        "marked": true
	      },
	      "storeId": "4030",
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "51322932e4b0a0027330aa1f",
	      "createdAt": 1362241842,
	      "prefix": "https:\/\/irs0.4sqi.net\/img\/general\/",
	      "suffix": "\/617742_wFZsDkYGYL3hIVdzoDjZ1xDo0bnRBdmWSgdK1lhZ7O8.jpg",
	      "width": 720,
	      "height": 960,
	      "user": {
	        "id": "617742",
	        "firstName": "Jamie",
	        "lastName": "K.",
	        "gender": "male",
	        "canonicalUrl": "https:\/\/foursquare.com\/jkinch",
	        "canonicalPath": "\/jkinch",
	        "photo": {
	          "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	          "suffix": "\/TUIBYQZKR20H21QR.jpg"
	        }
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 2,
	      "items": [
	        {
	          "detail": {
	            "type": "facePile",
	            "object": {
	              "count": 28,
	              "items": [
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "tips": 1,
	                  "visitedCount": 65,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "277247",
	                    "firstName": "Philip",
	                    "lastName": "Ciccarello",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/user\/277247",
	                    "canonicalPath": "\/user\/277247",
	                    "photo": {
	                      "prefix": "https:\/\/irs1.4sqi.net\/img\/user\/",
	                      "suffix": "\/L2AOYIAH2SMOA2LW.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "tips": 1,
	                  "visitedCount": 1,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "120228",
	                    "firstName": "Jim",
	                    "lastName": "Mitchem",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/user\/120228",
	                    "canonicalPath": "\/user\/120228",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/LSE0SZVW22FT01SU.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 15,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "63300",
	                    "firstName": "Roy",
	                    "lastName": "Morejon",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/roymorejon",
	                    "canonicalPath": "\/roymorejon",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/63300-Q1DUXGNT5YSX5SCB.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 14,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "111749",
	                    "firstName": "Dani",
	                    "gender": "none",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/danimburns",
	                    "canonicalPath": "\/danimburns",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/111749_1259965648918.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 13,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "173636",
	                    "firstName": "Hunter",
	                    "lastName": "Wilson",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/cltnightlife",
	                    "canonicalPath": "\/cltnightlife",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/OD5ZTEVCGWWWSV2B.jpg"
	                    }
	                  }
	                }
	              ]
	            }
	          }
	        },
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "4c791bd7794e224b73306428",
	              "createdAt": 1283005399,
	              "text": "Bring any travel mug for a .99 cent refill.",
	              "type": "user",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/4c791bd7794e224b73306428",
	              "canonicalPath": "\/item\/4c791bd7794e224b73306428",
	              "likes": {
	                "count": 3,
	                "groups": [
	                  
	                ],
	                "summary": "3 Likes"
	              },
	              "logView": true,
	              "user": {
	                "id": "277247",
	                "firstName": "Philip",
	                "lastName": "Ciccarello",
	                "gender": "male",
	                "followingRelationship": "followingThem",
	                "canonicalUrl": "https:\/\/foursquare.com\/user\/277247",
	                "canonicalPath": "\/user\/277247",
	                "photo": {
	                  "prefix": "https:\/\/irs1.4sqi.net\/img\/user\/",
	                  "suffix": "\/L2AOYIAH2SMOA2LW.jpg"
	                }
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  {
	    "venue": {
	      "id": "4b0758a4f964a52064fc22e3",
	      "name": "Phat Burrito",
	      "location": {
	        "address": "1537 Camden Rd",
	        "lat": 35.21503,
	        "lng": -80.856648383333,
	        "distance": 7466,
	        "postalCode": "28203",
	        "cc": "US",
	        "neighborhood": "Dilworth",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "Dilworth, Charlotte",
	        "formattedAddress": [
	          //"<span itemprop=\"streetAddress\">1537 Camden Rd<\/span>",
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28203<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/phat-burrito\/4b0758a4f964a52064fc22e3",
	      "canonicalPath": "\/v\/phat-burrito\/4b0758a4f964a52064fc22e3",
	      "categories": [
	        {
	          "id": "4bf58dd8d48988d153941735",
	          "name": "Burrito Place",
	          "pluralName": "Burrito Places",
	          "shortName": "Burritos",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/food\/burrito_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/food\/default",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": false,
	      "stats": {
	        "checkinsCount": 3916,
	        "usersCount": 1818,
	        "tipCount": 59
	      },
	      "urlSig": "4nBohXi9S69qc68qUJn89BTJpZQ=",
	      "price": {
	        "tier": 1,
	        "message": "Cheap",
	        "currency": "$"
	      },
	      "hasMenu": true,
	      "like": false,
	      "dislike": false,
	      "ok": false,
	      "rating": 9.1,
	      "ratingColor": "00B551",
	      "ratingSignals": 121,
	      "menu": {
	        "type": "Menu",
	        "label": "Menu",
	        "anchor": "View Menu",
	        "url": "https:\/\/foursquare.com\/v\/phat-burrito\/4b0758a4f964a52064fc22e3\/menu",
	        "mobileUrl": "https:\/\/foursquare.com\/v\/4b0758a4f964a52064fc22e3\/device_menu",
	        "canonicalPath": "\/v\/phat-burrito\/4b0758a4f964a52064fc22e3\/menu"
	      },
	      "beenHere": {
	        "count": 10,
	        "marked": true
	      },
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "4ecd1bdd99117287c9cdc7b3",
	      "createdAt": 1322064861,
	      "prefix": "https:\/\/irs2.4sqi.net\/img\/general\/",
	      "suffix": "\/2HYP5MSKQEZYAGETY1NDO1AE3IMYHJVSAXR3EI1FFSTWTQBE.jpg",
	      "width": 612,
	      "height": 612,
	      "user": {
	        "id": "16261",
	        "firstName": "Robert",
	        "lastName": "Stribley",
	        "gender": "male",
	        "canonicalUrl": "https:\/\/foursquare.com\/stribs",
	        "canonicalPath": "\/stribs",
	        "photo": {
	          "prefix": "https:\/\/irs3.4sqi.net\/img\/user\/",
	          "suffix": "\/4a39b4390980f.jpg"
	        }
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 2,
	      "items": [
	        {
	          "detail": {
	            "type": "facePile",
	            "object": {
	              "count": 50,
	              "items": [
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "tips": 1,
	                  "visitedCount": 6,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "140602",
	                    "firstName": "David",
	                    "lastName": "Zimmerman",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/user\/140602",
	                    "canonicalPath": "\/user\/140602",
	                    "photo": {
	                      "prefix": "https:\/\/irs3.4sqi.net\/img\/user\/",
	                      "suffix": "\/-1_1259898209013.png"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "tips": 1,
	                  "visitedCount": 3,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "112305",
	                    "firstName": "Ben",
	                    "lastName": "Ullman",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/budesigns",
	                    "canonicalPath": "\/budesigns",
	                    "photo": {
	                      "prefix": "https:\/\/irs1.4sqi.net\/img\/user\/",
	                      "suffix": "\/SSNGVDSTWBOEI2C1.png"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 11,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "137499",
	                    "firstName": "Arleigh",
	                    "lastName": "Jenkins",
	                    "gender": "female",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/user\/137499",
	                    "canonicalPath": "\/user\/137499",
	                    "photo": {
	                      "prefix": "https:\/\/irs1.4sqi.net\/img\/user\/",
	                      "suffix": "\/137499-H2INCLKVX2R4IXNX.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 19,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "109692",
	                    "firstName": "Scott",
	                    "lastName": "Lundgren",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/user\/109692",
	                    "canonicalPath": "\/user\/109692",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/109692-DV5MLNFCI0KY5VGG.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 7,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "103655",
	                    "firstName": "David",
	                    "lastName": "Kyle",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/davidkyle",
	                    "canonicalPath": "\/davidkyle",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/103655_1258667060458.jpg"
	                    }
	                  }
	                }
	              ]
	            }
	          }
	        },
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "4b1aeea170c603bb52428fb4",
	              "createdAt": 1260056225,
	              "text": "order: 2 fish tacos (don't forget the mango salsa). they are amazing and make up for the disappointing chips.",
	              "entities": [
	                {
	                  "indices": [
	                    9,
	                    14
	                  ],
	                  "id": "52cc5703498ee4ff7d523567",
	                  "type": "tip_taste_match",
	                  "text": "fish tacos"
	                },
	                {
	                  "indices": [
	                    14,
	                    19
	                  ],
	                  "id": "52cc5703498ee4ff7d523567",
	                  "type": "tip_taste_match",
	                  "text": "fish tacos",
	                  "onUser": true
	                },
	                {
	                  "indices": [
	                    38,
	                    49
	                  ],
	                  "id": "52cc5708498ec8fe9f4820f1",
	                  "type": "tip_taste_match",
	                  "text": "mango salsa"
	                },
	                {
	                  "indices": [
	                    103,
	                    108
	                  ],
	                  "id": "52e132bd498e84f090541fb4",
	                  "type": "tip_taste_match",
	                  "text": "chips"
	                }
	              ],
	              "type": "user",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/4b1aeea170c603bb52428fb4",
	              "canonicalPath": "\/item\/4b1aeea170c603bb52428fb4",
	              "likes": {
	                "count": 5,
	                "groups": [
	                  
	                ],
	                "summary": "5 Likes"
	              },
	              "logView": true,
	              "user": {
	                "id": "140602",
	                "firstName": "David",
	                "lastName": "Zimmerman",
	                "gender": "male",
	                "followingRelationship": "followingThem",
	                "canonicalUrl": "https:\/\/foursquare.com\/user\/140602",
	                "canonicalPath": "\/user\/140602",
	                "photo": {
	                  "prefix": "https:\/\/irs3.4sqi.net\/img\/user\/",
	                  "suffix": "\/-1_1259898209013.png"
	                }
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  {
	    "venue": {
	      "id": "53bf14e2498e2ae1e924e300",
	      "name": "The Beer Growler",
	      "location": {
	        "lat": 35.215224452466,
	        "lng": -80.853155094623,
	        "distance": 7711,
	        "cc": "US",
	        "neighborhood": "Dilworth",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "Dilworth, Charlotte",
	        "formattedAddress": [
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/the-beer-growler\/53bf14e2498e2ae1e924e300",
	      "canonicalPath": "\/v\/the-beer-growler\/53bf14e2498e2ae1e924e300",
	      "categories": [
	        {
	          "id": "4bf58dd8d48988d116941735",
	          "name": "Bar",
	          "pluralName": "Bars",
	          "shortName": "Bar",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/nightlife\/pub_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/nightlife\/bar",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": false,
	      "stats": {
	        "checkinsCount": 176,
	        "usersCount": 85,
	        "tipCount": 4
	      },
	      "price": {
	        "tier": 2,
	        "message": "Moderate",
	        "currency": "$"
	      },
	      "like": false,
	      "dislike": false,
	      "ok": false,
	      "beenHere": {
	        "count": 2,
	        "marked": true
	      },
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "54750b53498e08aebfb23961",
	      "createdAt": 1416956755,
	      "prefix": "https:\/\/irs3.4sqi.net\/img\/general\/",
	      "suffix": "\/1815873_ICF5GkysJXNMXnwTZiLWwO7PIeS8Lg6U2OhdCK5pBY4.jpg",
	      "width": 1440,
	      "height": 810,
	      "user": {
	        "id": "1815873",
	        "firstName": "Phoenix",
	        "lastName": "Jimenez",
	        "gender": "male",
	        "canonicalUrl": "https:\/\/foursquare.com\/user\/1815873",
	        "canonicalPath": "\/user\/1815873",
	        "photo": {
	          "prefix": "https:\/\/irs3.4sqi.net\/img\/user\/",
	          "suffix": "\/1815873-Y1XL0JXWTGVP5ZF5.jpg"
	        }
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 2,
	      "items": [
	        {
	          "detail": {
	            "type": "facePile",
	            "object": {
	              "count": 1,
	              "items": [
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "142294",
	                    "firstName": "Raindawg",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/raindawg",
	                    "canonicalPath": "\/raindawg",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/VPQSHPQ2WQPP1GOM.jpg"
	                    }
	                  }
	                }
	              ]
	            }
	          }
	        },
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "5512831d498e32ec93ec05bf",
	              "createdAt": 1427276573,
	              "text": "On 5\/16\/15 come join the folks from The Beer Growler at the South End Hops Festival. Unlimited beer tastings, live music, dog friendly & food trucks. Click \"read more\" for ticket information.",
	              "entities": [
	                {
	                  "indices": [
	                    40,
	                    44
	                  ],
	                  "id": "52cb360d498e49ae1f58c89c",
	                  "type": "tip_taste_match",
	                  "text": "beer"
	                },
	                {
	                  "indices": [
	                    45,
	                    52
	                  ],
	                  "id": "52f3be4b498ec4d17b282c65",
	                  "type": "tip_taste_match",
	                  "text": "growlers"
	                },
	                {
	                  "indices": [
	                    95,
	                    99
	                  ],
	                  "id": "52cb360d498e49ae1f58c89c",
	                  "type": "tip_taste_match",
	                  "text": "beer"
	                },
	                {
	                  "indices": [
	                    110,
	                    120
	                  ],
	                  "id": "52cb360d498e49ae1f58c8c8",
	                  "type": "tip_taste_match",
	                  "text": "live music",
	                  "onUser": true
	                },
	                {
	                  "indices": [
	                    122,
	                    134
	                  ],
	                  "id": "5339d864498ee3e1e504243b",
	                  "type": "tip_taste_match",
	                  "text": "dog-friendly"
	                },
	                {
	                  "indices": [
	                    137,
	                    148
	                  ],
	                  "id": "52e132be498e274cf16caad2",
	                  "type": "tip_taste_match",
	                  "text": "food trucks"
	                }
	              ],
	              "type": "user",
	              "url": "http:\/\/www.southendhopsfestival.com",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/5512831d498e32ec93ec05bf",
	              "canonicalPath": "\/item\/5512831d498e32ec93ec05bf",
	              "urlSig": "zGKALFYSyzKP\/eymAnDyCmCgh3Q=",
	              "logView": true,
	              "user": {
	                "id": "47948792",
	                "firstName": "Third Rock Events",
	                "gender": "none",
	                "canonicalUrl": "https:\/\/foursquare.com\/thirdrockevents",
	                "canonicalPath": "\/thirdrockevents",
	                "photo": {
	                  "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                  "suffix": "\/47948792-YN4B4BSZQ2R0IS3D.png"
	                },
	                "type": "page"
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  {
	    "venue": {
	      "id": "4e9b7367775b2c05ae3c1f6a",
	      "name": "American Roadside Burgers",
	      "location": {
	        "address": "440 S Church St",
	        "crossStreet": "Levine Avenue of the Arts",
	        "lat": 35.225325948376,
	        "lng": -80.848257943977,
	        "distance": 8818,
	        "postalCode": "28202",
	        "cc": "US",
	        "neighborhood": "Third Ward",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "Third Ward, Charlotte",
	        "formattedAddress": [
	          //"<span itemprop=\"streetAddress\">440 S Church St<\/span> (Levine Avenue of the Arts)",
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28202<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/american-roadside-burgers\/4e9b7367775b2c05ae3c1f6a",
	      "canonicalPath": "\/v\/american-roadside-burgers\/4e9b7367775b2c05ae3c1f6a",
	      "categories": [
	        {
	          "id": "4bf58dd8d48988d16c941735",
	          "name": "Burger Joint",
	          "pluralName": "Burger Joints",
	          "shortName": "Burgers",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/food\/burger_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/food\/burger",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": true,
	      "stats": {
	        "checkinsCount": 1104,
	        "usersCount": 595,
	        "tipCount": 14
	      },
	      "urlSig": "eMNIZgs0aCRwn\/jtBWXwWz6YmEk=",
	      "price": {
	        "tier": 2,
	        "message": "Moderate",
	        "currency": "$"
	      },
	      "hasMenu": true,
	      "like": false,
	      "dislike": false,
	      "ok": false,
	      "rating": 6,
	      "ratingColor": "FFC800",
	      "ratingSignals": 28,
	      "menu": {
	        "type": "Menu",
	        "label": "Menu",
	        "anchor": "View Menu",
	        "url": "https:\/\/foursquare.com\/v\/american-roadside-burgers\/4e9b7367775b2c05ae3c1f6a\/menu",
	        "mobileUrl": "https:\/\/foursquare.com\/v\/4e9b7367775b2c05ae3c1f6a\/device_menu",
	        "canonicalPath": "\/v\/american-roadside-burgers\/4e9b7367775b2c05ae3c1f6a\/menu"
	      },
	      "storeId": "",
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "52012e5b498e621d68c6b7a4",
	      "createdAt": 1375809115,
	      "prefix": "https:\/\/irs1.4sqi.net\/img\/general\/",
	      "suffix": "\/38780685_pKgkDY8H4ShRXQnJSz_psOf3zOfydUPrayIsxH1s67A.jpg",
	      "width": 720,
	      "height": 960,
	      "user": {
	        "id": "38780685",
	        "firstName": "Chris",
	        "lastName": "Walker",
	        "gender": "male",
	        "canonicalUrl": "https:\/\/foursquare.com\/plastik78",
	        "canonicalPath": "\/plastik78",
	        "photo": {
	          "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	          "suffix": "\/AB5J2XZOKDE2WFPM.jpg"
	        }
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 2,
	      "items": [
	        {
	          "detail": {
	            "type": "facePile",
	            "object": {
	              "count": 8,
	              "items": [
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 4,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "161646",
	                    "firstName": "Andrew",
	                    "lastName": "Dunn",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/andrew_dunn",
	                    "canonicalPath": "\/andrew_dunn",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/BGEOKNXL4PN2AODW.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 2,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "934838",
	                    "firstName": "Joe",
	                    "lastName": "Katon",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/mecklenguy",
	                    "canonicalPath": "\/mecklenguy",
	                    "photo": {
	                      "prefix": "https:\/\/irs3.4sqi.net\/img\/user\/",
	                      "suffix": "\/FAUHFETKARD0PWUK.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "159795",
	                    "firstName": "Larken",
	                    "lastName": "Egleston",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/larken",
	                    "canonicalPath": "\/larken",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/RBGVJC23XUHYH4DR.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "109692",
	                    "firstName": "Scott",
	                    "lastName": "Lundgren",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/user\/109692",
	                    "canonicalPath": "\/user\/109692",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/109692-DV5MLNFCI0KY5VGG.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "111831",
	                    "firstName": "Seth",
	                    "lastName": "wyatt",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/sethjwyatt",
	                    "canonicalPath": "\/sethjwyatt",
	                    "photo": {
	                      "prefix": "https:\/\/irs3.4sqi.net\/img\/user\/",
	                      "suffix": "\/13ON1PCRVEH03CI1.jpg"
	                    }
	                  }
	                }
	              ]
	            }
	          }
	        },
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "4f2b3505e4b0390a20f4f35a",
	              "createdAt": 1328231685,
	              "text": "Try the Roadside Burger - Amazing!! Look at the bacon!! So worth it!!",
	              "entities": [
	                {
	                  "indices": [
	                    17,
	                    23
	                  ],
	                  "id": "52cb360d498e49ae1f58c8dd",
	                  "type": "tip_taste_match",
	                  "text": "burgers",
	                  "onUser": true
	                },
	                {
	                  "indices": [
	                    48,
	                    53
	                  ],
	                  "id": "52db1e24498e96e77d072181",
	                  "type": "tip_taste_match",
	                  "text": "bacon"
	                }
	              ],
	              "type": "user",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/4f2b3505e4b0390a20f4f35a",
	              "canonicalPath": "\/item\/4f2b3505e4b0390a20f4f35a",
	              "logView": true,
	              "user": {
	                "id": "14015499",
	                "firstName": "Burger",
	                "lastName": "Divas",
	                "gender": "female",
	                "canonicalUrl": "https:\/\/foursquare.com\/burgerdivas",
	                "canonicalPath": "\/burgerdivas",
	                "photo": {
	                  "prefix": "https:\/\/irs3.4sqi.net\/img\/user\/",
	                  "suffix": "\/VN1KNEUA05J0KHDA.jpg"
	                }
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  {
	    "venue": {
	      "id": "4ba196d4f964a52078c237e3",
	      "name": "The Pillar",
	      "location": {
	        "address": "312 N Myers St",
	        "lat": 35.223097404551,
	        "lng": -80.833218097687,
	        "distance": 9655,
	        "postalCode": "28202",
	        "cc": "US",
	        "neighborhood": "First Ward",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "First Ward, Charlotte",
	        "formattedAddress": [
	          //"<span itemprop=\"streetAddress\">312 N Myers St<\/span>",
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28202<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/the-pillar\/4ba196d4f964a52078c237e3",
	      "canonicalPath": "\/v\/the-pillar\/4ba196d4f964a52078c237e3",
	      "categories": [
	        {
	          "id": "4bf58dd8d48988d11b941735",
	          "name": "Pub",
	          "pluralName": "Pubs",
	          "shortName": "Pub",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/nightlife\/pub_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/nightlife\/pub",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": false,
	      "stats": {
	        "checkinsCount": 316,
	        "usersCount": 108,
	        "tipCount": 3
	      },
	      "price": {
	        "tier": 1,
	        "message": "Cheap",
	        "currency": "$"
	      },
	      "like": false,
	      "dislike": false,
	      "ok": false,
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "4f3c635ee4b00d955e5ab222",
	      "createdAt": 1329357662,
	      "prefix": "https:\/\/irs2.4sqi.net\/img\/general\/",
	      "suffix": "\/jmMHlnXEaZ3_nw7GhEBCe0aAgA1f2xOtVQYFGwFFrPw.jpg",
	      "width": 540,
	      "height": 720,
	      "user": {
	        "id": "8485176",
	        "firstName": "Michael",
	        "lastName": "Golleher",
	        "gender": "male",
	        "canonicalUrl": "https:\/\/foursquare.com\/technofingers",
	        "canonicalPath": "\/technofingers",
	        "photo": {
	          "prefix": "https:\/\/irs1.4sqi.net\/img\/user\/",
	          "suffix": "\/NI02LOBWUEEMTYWW.jpg"
	        }
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 2,
	      "items": [
	        {
	          "detail": {
	            "type": "facePile",
	            "object": {
	              "count": 3,
	              "items": [
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 0,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "146561",
	                    "firstName": "AdrienneC2",
	                    "gender": "female",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/adriennec2",
	                    "canonicalPath": "\/adriennec2",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/20L3EB4EWNPXYHRZ.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 5,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "282708",
	                    "firstName": "Matthew",
	                    "lastName": "McGlothlin",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/bitflipper1",
	                    "canonicalPath": "\/bitflipper1",
	                    "photo": {
	                      "prefix": "https:\/\/irs3.4sqi.net\/img\/user\/",
	                      "suffix": "\/IVU4P0RNGQGLWW5L.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "159795",
	                    "firstName": "Larken",
	                    "lastName": "Egleston",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/larken",
	                    "canonicalPath": "\/larken",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/RBGVJC23XUHYH4DR.jpg"
	                    }
	                  }
	                }
	              ]
	            }
	          }
	        },
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "4ce642170f196dcbc14136ae",
	              "createdAt": 1290158615,
	              "text": "This is a dog friendly bar so bring your dog to keep you company",
	              "entities": [
	                {
	                  "indices": [
	                    10,
	                    22
	                  ],
	                  "id": "5339d864498ee3e1e504243b",
	                  "type": "tip_taste_match",
	                  "text": "dog-friendly"
	                }
	              ],
	              "type": "user",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/4ce642170f196dcbc14136ae",
	              "canonicalPath": "\/item\/4ce642170f196dcbc14136ae",
	              "likes": {
	                "count": 2,
	                "groups": [
	                  
	                ],
	                "summary": "2 Likes"
	              },
	              "logView": true,
	              "user": {
	                "id": "412517",
	                "firstName": "andrew",
	                "lastName": "corn",
	                "gender": "male",
	                "canonicalUrl": "https:\/\/foursquare.com\/acorndiggity",
	                "canonicalPath": "\/acorndiggity",
	                "photo": {
	                  "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                  "suffix": "\/JDGONJ0D4T1K0MFB.jpg"
	                }
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  {
	    "venue": {
	      "id": "4cc20262d43ba143057555f8",
	      "name": "Frazier Dog Park",
	      "location": {
	        "address": "W. 4th St. and Sycamore",
	        "lat": 35.234331533746,
	        "lng": -80.856689937761,
	        "distance": 9097,
	        "postalCode": "28208",
	        "cc": "US",
	        "neighborhood": "Third Ward",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "Third Ward, Charlotte",
	        "formattedAddress": [
	          //"<span itemprop=\"streetAddress\">W. 4th St. and Sycamore<\/span>",
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28208<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/frazier-dog-park\/4cc20262d43ba143057555f8",
	      "canonicalPath": "\/v\/frazier-dog-park\/4cc20262d43ba143057555f8",
	      "categories": [
	        {
	          "id": "4bf58dd8d48988d1e5941735",
	          "name": "Dog Run",
	          "pluralName": "Dog Runs",
	          "shortName": "Dog Run",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/parks_outdoors\/dogrun_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/parks_outdoors\/dogrun",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": false,
	      "stats": {
	        "checkinsCount": 1602,
	        "usersCount": 396,
	        "tipCount": 6
	      },
	      "like": false,
	      "dislike": false,
	      "ok": false,
	      "rating": 7.4,
	      "ratingColor": "C5DE35",
	      "ratingSignals": 11,
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "52572f9e11d22e79ef32d700",
	      "createdAt": 1381445534,
	      "prefix": "https:\/\/irs1.4sqi.net\/img\/general\/",
	      "suffix": "\/5140718_LoDoYxKXvTBMNo56Ij1nt7frz336Kxqowpl_K6QdoLY.jpg",
	      "width": 720,
	      "height": 960,
	      "user": {
	        "id": "5140718",
	        "firstName": "Alexis\u2744\ufe0f\u26c4\ufe0f",
	        "gender": "none",
	        "canonicalUrl": "https:\/\/foursquare.com\/luvhnrtrualexis",
	        "canonicalPath": "\/luvhnrtrualexis",
	        "photo": {
	          "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	          "suffix": "\/5140718-UJDXBQFT4IGT1DSZ.jpg"
	        }
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 2,
	      "items": [
	        {
	          "detail": {
	            "type": "facePile",
	            "object": {
	              "count": 2,
	              "items": [
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "159795",
	                    "firstName": "Larken",
	                    "lastName": "Egleston",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/larken",
	                    "canonicalPath": "\/larken",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/RBGVJC23XUHYH4DR.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "1132430",
	                    "firstName": "April",
	                    "lastName": "Smith",
	                    "gender": "female",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/ape_smith",
	                    "canonicalPath": "\/ape_smith",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/4H0Y311CUZI2UMG3.jpg"
	                    }
	                  }
	                }
	              ]
	            }
	          }
	        },
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "4f5b78b8e4b0ea8598998a6d",
	              "createdAt": 1331394744,
	              "text": "Nice dog owners. The dogs are super cute.",
	              "entities": [
	                {
	                  "indices": [
	                    36,
	                    40
	                  ],
	                  "id": "531a0ab0498ec7e8053a9995",
	                  "type": "tip_taste_match",
	                  "text": "cute",
	                  "onUser": true
	                }
	              ],
	              "type": "user",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/4f5b78b8e4b0ea8598998a6d",
	              "canonicalPath": "\/item\/4f5b78b8e4b0ea8598998a6d",
	              "logView": true,
	              "user": {
	                "id": "10398423",
	                "firstName": "Danae",
	                "lastName": "Galloway",
	                "gender": "female",
	                "canonicalUrl": "https:\/\/foursquare.com\/uniqchocolat",
	                "canonicalPath": "\/uniqchocolat",
	                "photo": {
	                  "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                  "suffix": "\/HEOQAQ3MB1X4QT4J.jpg"
	                }
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  {
	    "venue": {
	      "id": "5314ad9ee4b0d805d372114f",
	      "name": "South End",
	      "location": {
	        "lat": 35.217709833132,
	        "lng": -80.853695600624,
	        "distance": 7867,
	        "cc": "US",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "Charlotte, NC",
	        "formattedAddress": [
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/south-end\/5314ad9ee4b0d805d372114f",
	      "canonicalPath": "\/v\/south-end\/5314ad9ee4b0d805d372114f",
	      "categories": [
	        {
	          "id": "4f2a25ac4b909258e854f55f",
	          "name": "Neighborhood",
	          "pluralName": "Neighborhoods",
	          "shortName": "Neighborhood",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/parks_outdoors\/neighborhood_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/parks_outdoors\/default",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": false,
	      "stats": {
	        "checkinsCount": 222,
	        "usersCount": 89,
	        "tipCount": 1
	      },
	      "like": false,
	      "dislike": false,
	      "ok": false,
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "551140fd498e4c5e733fc328",
	      "createdAt": 1427194109,
	      "prefix": "https:\/\/irs1.4sqi.net\/img\/general\/",
	      "suffix": "\/47948792_dwZW5pjkTibQHFmNx6-WGRBZsdhv0CPupRfqmiuGaiY.jpg",
	      "width": 634,
	      "height": 634,
	      "user": {
	        "id": "47948792",
	        "firstName": "Third Rock Events",
	        "gender": "none",
	        "canonicalUrl": "https:\/\/foursquare.com\/thirdrockevents",
	        "canonicalPath": "\/thirdrockevents",
	        "photo": {
	          "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	          "suffix": "\/47948792-YN4B4BSZQ2R0IS3D.png"
	        },
	        "type": "page"
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 1,
	      "items": [
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "55113fb3498ebc51ebb00617",
	              "createdAt": 1427193779,
	              "text": "On 5\/16\/15 SouthEnd is the home to the 2nd Annual SouthEnd Hops Festival. Unlimited beer tastings, live music, dog friendly & food trucks. Click \"ream more\" for ticket information...",
	              "entities": [
	                {
	                  "indices": [
	                    84,
	                    88
	                  ],
	                  "id": "52cb360d498e49ae1f58c89c",
	                  "type": "tip_taste_match",
	                  "text": "beer"
	                },
	                {
	                  "indices": [
	                    99,
	                    109
	                  ],
	                  "id": "52cb360d498e49ae1f58c8c8",
	                  "type": "tip_taste_match",
	                  "text": "live music",
	                  "onUser": true
	                },
	                {
	                  "indices": [
	                    111,
	                    123
	                  ],
	                  "id": "5339d864498ee3e1e504243b",
	                  "type": "tip_taste_match",
	                  "text": "dog-friendly"
	                },
	                {
	                  "indices": [
	                    126,
	                    137
	                  ],
	                  "id": "52e132be498e274cf16caad2",
	                  "type": "tip_taste_match",
	                  "text": "food trucks"
	                }
	              ],
	              "type": "user",
	              "url": "http:\/\/www.southendhopsfestival.com",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/55113fb3498ebc51ebb00617",
	              "canonicalPath": "\/item\/55113fb3498ebc51ebb00617",
	              "urlSig": "zGKALFYSyzKP\/eymAnDyCmCgh3Q=",
	              "logView": true,
	              "user": {
	                "id": "47948792",
	                "firstName": "Third Rock Events",
	                "gender": "none",
	                "canonicalUrl": "https:\/\/foursquare.com\/thirdrockevents",
	                "canonicalPath": "\/thirdrockevents",
	                "photo": {
	                  "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                  "suffix": "\/47948792-YN4B4BSZQ2R0IS3D.png"
	                },
	                "type": "page"
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  {
	    "venue": {
	      "id": "4fb82c6ee4b0b491827673ca",
	      "name": "Auto Burger and Fries",
	      "location": {
	        "address": "Uptown",
	        "lat": 35.233270753126,
	        "lng": -80.850349809865,
	        "distance": 9355,
	        "postalCode": "28205",
	        "cc": "US",
	        "neighborhood": "Fourth Ward",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "Fourth Ward, Charlotte",
	        "formattedAddress": [
	          //"<span itemprop=\"streetAddress\">Uptown<\/span>",
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28205<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/auto-burger-and-fries\/4fb82c6ee4b0b491827673ca",
	      "canonicalPath": "\/v\/auto-burger-and-fries\/4fb82c6ee4b0b491827673ca",
	      "categories": [
	        {
	          "id": "4bf58dd8d48988d1cb941735",
	          "name": "Food Truck",
	          "pluralName": "Food Trucks",
	          "shortName": "Food Truck",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/food\/streetfood_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/food\/streetfood",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": false,
	      "stats": {
	        "checkinsCount": 74,
	        "usersCount": 52,
	        "tipCount": 1
	      },
	      "price": {
	        "tier": 1,
	        "message": "Cheap",
	        "currency": "$"
	      },
	      "like": false,
	      "dislike": false,
	      "ok": false,
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "516f1f04e4b0acce055711d4",
	      "createdAt": 1366236932,
	      "prefix": "https:\/\/irs1.4sqi.net\/img\/general\/",
	      "suffix": "\/8622640_WGjTbODEijZxmYl9gThF9oZwfdJVei-v7VInJALy2YY.jpg",
	      "width": 1440,
	      "height": 1920,
	      "user": {
	        "id": "8622640",
	        "firstName": "Brittany",
	        "lastName": "Williams",
	        "gender": "female",
	        "canonicalUrl": "https:\/\/foursquare.com\/britreuter",
	        "canonicalPath": "\/britreuter",
	        "photo": {
	          "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	          "suffix": "\/JOCZGMLDIN2CBVE0.jpg"
	        }
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 1,
	      "items": [
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "500d7cdde4b0081297d234cd",
	              "createdAt": 1343061213,
	              "text": "Get the black bean burger, but sit and eat it. It's so good but a little crumbly! (homemade goodness can be messy!)",
	              "entities": [
	                {
	                  "indices": [
	                    8,
	                    19
	                  ],
	                  "id": "52cc5705498ea56c70080452",
	                  "type": "tip_taste_match",
	                  "text": "black bean burger"
	                },
	                {
	                  "indices": [
	                    19,
	                    25
	                  ],
	                  "id": "52cc5705498ea56c70080452",
	                  "type": "tip_taste_match",
	                  "text": "black bean burger",
	                  "onUser": true
	                },
	                {
	                  "indices": [
	                    83,
	                    91
	                  ],
	                  "id": "52e132bf498ed411ff340f45",
	                  "type": "tip_taste_match",
	                  "text": "homemade food"
	                }
	              ],
	              "type": "user",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/500d7cdde4b0081297d234cd",
	              "canonicalPath": "\/item\/500d7cdde4b0081297d234cd",
	              "logView": true,
	              "user": {
	                "id": "2469139",
	                "firstName": "Christine",
	                "lastName": "Weber",
	                "gender": "female",
	                "canonicalUrl": "https:\/\/foursquare.com\/xine_98",
	                "canonicalPath": "\/xine_98",
	                "photo": {
	                  "prefix": "https:\/\/irs3.4sqi.net\/img\/user\/",
	                  "suffix": "\/XQUKR5Q2NL3TJF53.jpg"
	                }
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  {
	    "venue": {
	      "id": "4b155d1cf964a5209fab23e3",
	      "name": "Matt's Chicago Dog",
	      "location": {
	        "address": "425 S Tryon St",
	        "crossStreet": "at The Green",
	        "lat": 35.223653342905,
	        "lng": -80.846517383433,
	        "distance": 8796,
	        "postalCode": "28202",
	        "cc": "US",
	        "neighborhood": "Uptown",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "Uptown, Charlotte",
	        "formattedAddress": [
	          //"<span itemprop=\"streetAddress\">425 S Tryon St<\/span> (at The Green)",
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28202<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/matts-chicago-dog\/4b155d1cf964a5209fab23e3",
	      "canonicalPath": "\/v\/matts-chicago-dog\/4b155d1cf964a5209fab23e3",
	      "categories": [
	        {
	          "id": "4bf58dd8d48988d16f941735",
	          "name": "Hot Dog Joint",
	          "pluralName": "Hot Dog Joints",
	          "shortName": "Hot Dogs",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/food\/hotdog_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/food\/hotdog",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": false,
	      "stats": {
	        "checkinsCount": 849,
	        "usersCount": 433,
	        "tipCount": 9
	      },
	      "price": {
	        "tier": 1,
	        "message": "Cheap",
	        "currency": "$"
	      },
	      "hasMenu": true,
	      "like": false,
	      "dislike": false,
	      "ok": false,
	      "rating": 7.2,
	      "ratingColor": "C5DE35",
	      "ratingSignals": 26,
	      "menu": {
	        "type": "Menu",
	        "label": "Menu",
	        "anchor": "View Menu",
	        "url": "https:\/\/foursquare.com\/v\/matts-chicago-dog\/4b155d1cf964a5209fab23e3\/menu",
	        "mobileUrl": "https:\/\/foursquare.com\/v\/4b155d1cf964a5209fab23e3\/device_menu",
	        "canonicalPath": "\/v\/matts-chicago-dog\/4b155d1cf964a5209fab23e3\/menu"
	      },
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "51c48b92498ea67ea08fa8d8",
	      "createdAt": 1371835282,
	      "prefix": "https:\/\/irs1.4sqi.net\/img\/general\/",
	      "suffix": "\/7320_5OsGxxhBne7I30f5-lKWLe0fx2RvF-VTKr4ZD-6kKHs.jpg",
	      "width": 960,
	      "height": 720,
	      "user": {
	        "id": "7320",
	        "firstName": "Chris",
	        "lastName": "Harrington",
	        "gender": "male",
	        "followingRelationship": "followingThem",
	        "canonicalUrl": "https:\/\/foursquare.com\/chrisharrington",
	        "canonicalPath": "\/chrisharrington",
	        "photo": {
	          "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	          "suffix": "\/0AKKH1MUUL4LLTLX.jpg"
	        }
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 2,
	      "items": [
	        {
	          "detail": {
	            "type": "facePile",
	            "object": {
	              "count": 8,
	              "items": [
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "tips": 1,
	                  "visitedCount": 13,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "7320",
	                    "firstName": "Chris",
	                    "lastName": "Harrington",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/chrisharrington",
	                    "canonicalPath": "\/chrisharrington",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/0AKKH1MUUL4LLTLX.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 0,
	                  "displayType": "foursquare",
	                  "user": {
	                    "id": "102842",
	                    "firstName": "Susan",
	                    "lastName": "Spaulding",
	                    "gender": "female",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/susanjspaulding",
	                    "canonicalPath": "\/susanjspaulding",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/102842_1260066523965.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 3,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "161646",
	                    "firstName": "Andrew",
	                    "lastName": "Dunn",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/andrew_dunn",
	                    "canonicalPath": "\/andrew_dunn",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/BGEOKNXL4PN2AODW.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 2,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "83208",
	                    "firstName": "Scott",
	                    "lastName": "Hepburn",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/user\/83208",
	                    "canonicalPath": "\/user\/83208",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/XJTT0V2SEBWFXJVN.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "209936",
	                    "firstName": "Genevieve",
	                    "lastName": "Jooste",
	                    "gender": "female",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/genevievejooste",
	                    "canonicalPath": "\/genevievejooste",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/ANDB2Z5HOPLOED3Y.jpg"
	                    }
	                  }
	                }
	              ]
	            }
	          }
	        },
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "51d45211498e6c2cb18af789",
	              "createdAt": 1372869137,
	              "text": "You can't go wrong with a Chicago Style Veggie Dog.",
	              "entities": [
	                {
	                  "indices": [
	                    26,
	                    39
	                  ],
	                  "id": "52cc5705498e1fec6092042f",
	                  "type": "tip_taste_match",
	                  "text": "Chicago style"
	                },
	                {
	                  "indices": [
	                    40,
	                    50
	                  ],
	                  "id": "52cdce80498e5de194dd5e5e",
	                  "type": "tip_taste_match",
	                  "text": "veggie dogs"
	                }
	              ],
	              "type": "user",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/51d45211498e6c2cb18af789",
	              "canonicalPath": "\/item\/51d45211498e6c2cb18af789",
	              "likes": {
	                "count": 3,
	                "groups": [
	                  
	                ],
	                "summary": "3 Likes"
	              },
	              "logView": true,
	              "user": {
	                "id": "7320",
	                "firstName": "Chris",
	                "lastName": "Harrington",
	                "gender": "male",
	                "followingRelationship": "followingThem",
	                "canonicalUrl": "https:\/\/foursquare.com\/chrisharrington",
	                "canonicalPath": "\/chrisharrington",
	                "photo": {
	                  "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                  "suffix": "\/0AKKH1MUUL4LLTLX.jpg"
	                }
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  {
	    "venue": {
	      "id": "4c70636fd7fab1f79e795ec9",
	      "name": "The WFNZ Doghouse",
	      "location": {
	        "address": "401 W Morehead St",
	        "lat": 35.223605745109,
	        "lng": -80.854246616364,
	        "distance": 8307,
	        "postalCode": "28202",
	        "cc": "US",
	        "neighborhood": "South End",
	        "city": "Charlotte",
	        "state": "NC",
	        "country": "United States",
	        "contextLine": "South End, Charlotte",
	        "formattedAddress": [
	          //"<span itemprop=\"streetAddress\">401 W Morehead St<\/span>",
	          //"<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28202<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/the-wfnz-doghouse\/4c70636fd7fab1f79e795ec9",
	      "canonicalPath": "\/v\/the-wfnz-doghouse\/4c70636fd7fab1f79e795ec9",
	      "categories": [
	        {
	          "id": "4bf58dd8d48988d1f1931735",
	          "name": "General Entertainment",
	          "pluralName": "General Entertainment",
	          "shortName": "Entertainment",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/arts_entertainment\/default_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/arts_entertainment\/default",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ],
	      "verified": false,
	      "stats": {
	        "checkinsCount": 951,
	        "usersCount": 577,
	        "tipCount": 4
	      },
	      "like": false,
	      "dislike": false,
	      "ok": false,
	      "rating": 6.9,
	      "ratingColor": "FFC800",
	      "ratingSignals": 21,
	      "saves": {
	        "count": 0,
	        "groups": [
	          
	        ]
	      }
	    },
	    "photo": {
	      "id": "5055e8f2e4b0c9940870a650",
	      "createdAt": 1347807474,
	      "prefix": "https:\/\/irs2.4sqi.net\/img\/general\/",
	      "suffix": "\/32646797_uU3WQ-5Qxda9lsl0dxNgOTR2IEumlpDCfhtAdJM0DN0.jpg",
	      "width": 612,
	      "height": 612,
	      "user": {
	        "id": "32646797",
	        "firstName": "Bryan",
	        "lastName": "Tilley",
	        "gender": "male",
	        "canonicalUrl": "https:\/\/foursquare.com\/user\/32646797",
	        "canonicalPath": "\/user\/32646797",
	        "photo": {
	          "prefix": "https:\/\/irs1.4sqi.net\/img\/user\/",
	          "suffix": "\/445Y3IY0J5LOTYOW.jpg"
	        }
	      },
	      "visibility": "public"
	    },
	    "snippets": {
	      "count": 2,
	      "items": [
	        {
	          "detail": {
	            "type": "facePile",
	            "object": {
	              "count": 8,
	              "items": [
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 3,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "159795",
	                    "firstName": "Larken",
	                    "lastName": "Egleston",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/larken",
	                    "canonicalPath": "\/larken",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/RBGVJC23XUHYH4DR.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "111831",
	                    "firstName": "Seth",
	                    "lastName": "wyatt",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/sethjwyatt",
	                    "canonicalPath": "\/sethjwyatt",
	                    "photo": {
	                      "prefix": "https:\/\/irs3.4sqi.net\/img\/user\/",
	                      "suffix": "\/13ON1PCRVEH03CI1.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "288093",
	                    "firstName": "Nicole",
	                    "lastName": "Pennell",
	                    "gender": "female",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/nicolepennell",
	                    "canonicalPath": "\/nicolepennell",
	                    "photo": {
	                      "prefix": "https:\/\/irs3.4sqi.net\/img\/user\/",
	                      "suffix": "\/MD5KKC0B3HKD22H1.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "407652",
	                    "firstName": "Kim",
	                    "lastName": "Overman",
	                    "gender": "female",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/kimwoverman",
	                    "canonicalPath": "\/kimwoverman",
	                    "photo": {
	                      "prefix": "https:\/\/irs0.4sqi.net\/img\/user\/",
	                      "suffix": "\/PUFCRLBLKR5XH5VB.jpg"
	                    }
	                  }
	                },
	                {
	                  "liked": false,
	                  "oked": false,
	                  "disliked": false,
	                  "visitedCount": 1,
	                  "displayType": "swarm",
	                  "user": {
	                    "id": "142294",
	                    "firstName": "Raindawg",
	                    "gender": "male",
	                    "relationship": "friend",
	                    "followingRelationship": "followingThem",
	                    "canonicalUrl": "https:\/\/foursquare.com\/raindawg",
	                    "canonicalPath": "\/raindawg",
	                    "photo": {
	                      "prefix": "https:\/\/irs2.4sqi.net\/img\/user\/",
	                      "suffix": "\/VPQSHPQ2WQPP1GOM.jpg"
	                    }
	                  }
	                }
	              ]
	            }
	          }
	        },
	        {
	          "detail": {
	            "type": "tip",
	            "object": {
	              "id": "4ea5c566b80336cb03372e3a",
	              "createdAt": 1319486822,
	              "text": "Not quite the Pantherfanz experience... but a short walk to the stadium and the beer is cold",
	              "entities": [
	                {
	                  "indices": [
	                    64,
	                    71
	                  ],
	                  "id": "52e132be498ed411ff340f2f",
	                  "type": "tip_taste_match",
	                  "text": "stadium"
	                },
	                {
	                  "indices": [
	                    80,
	                    84
	                  ],
	                  "id": "52cb360d498e49ae1f58c89c",
	                  "type": "tip_taste_match",
	                  "text": "beer"
	                }
	              ],
	              "type": "user",
	              "canonicalUrl": "https:\/\/foursquare.com\/item\/4ea5c566b80336cb03372e3a",
	              "canonicalPath": "\/item\/4ea5c566b80336cb03372e3a",
	              "likes": {
	                "count": 1,
	                "groups": [
	                  
	                ],
	                "summary": "1 Like"
	              },
	              "logView": true,
	              "user": {
	                "id": "14202249",
	                "firstName": "Dan",
	                "lastName": "Ortel",
	                "gender": "male",
	                "canonicalUrl": "https:\/\/foursquare.com\/pantherdan",
	                "canonicalPath": "\/pantherdan",
	                "photo": {
	                  "prefix": "https:\/\/irs1.4sqi.net\/img\/user\/",
	                  "suffix": "\/ZMFS0NF2BWUJXU5F.jpg"
	                }
	              }
	            }
	          }
	        }
	      ]
	    }
	  }
	]

	// Bar 4bf58dd8d48988d116941735
	// Food 4d4b7105d754a06374d81259
	// Hotel 4bf58dd8d48988d1fa931735
	// Dog Run 4bf58dd8d48988d1e5941735 TODO: or Park 4bf58dd8d48988d163941735
	    },
	    Adapter = __webpack_require__(20),

	    // TODO: Temporary synchronous function until page can be rendered without items!
	    getItems = function (location) {
	        var key = [location.latitude, location.longitude].join(','),
	            data = locationMap[key];

	        return data ? data.map(function (item) {
	                return new Adapter(item.venue);
	            }) :
	            null;
	    },

	    // Example location = { latitude: 35.226074, longitude: -80.844034 }
	    // Argument of callback is list of adapted item objects (or null if search fails)
	    // TODO: what about a recommended region for map, like Yelp?
	    search = function (location, callback) {
	        var key = [location.latitude, location.longitude].join(','),
	            data = locationMap[key],
	            adapted = data ? data.map(function (item) {
	                    return new Adapter(item.venue);
	                }) :
	                null;

	        callback(adapted);
	    };

	module.exports = {
	    name: 'Foursquare',
	    getItems: getItems,
	    search: search
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SymbolDiv = __webpack_require__(17);

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        colors: React.PropTypes.object,
	        layout: React.PropTypes.object,
	        categoryDef: React.PropTypes.object,
	        selected: React.PropTypes.bool,
	        onCategorySelected: React.PropTypes.func
	    },

	    onClick: function onClick() {
	        this.props.onCategorySelected(this.props.categoryDef);
	    },

	    render: function render() {
	        var props = this.props,
	            categoryDef = props.categoryDef,
	            selected = props.selected,
	            colors = props.colors,
	            colorMeta = colors.colorMeta,
	            colorBackground = colors.colorBackground,
	            layout = props.layout,
	            styleItem = {
	            display: 'flex',
	            alignItems: 'flex-start',
	            flexGrow: 1,
	            flexShrink: 1,
	            width: '25%', // TODO: make dependent on data
	            lineHeight: layout.lineHeightMeta,
	            color: selected ? colorBackground : colorMeta,
	            backgroundColor: selected ? colorMeta : colorBackground,
	            borderWidth: '1px',
	            borderBottomStyle: 'solid'
	        },
	            styleText = {
	            flexShrink: 1,
	            marginRight: layout.marginNarrow,
	            whiteSpace: 'nowrap',
	            overflow: 'hidden',
	            textOverflow: 'ellipsis' };

	        //if (/* TODO: media query? */) {
	        //    styleText.display = 'none';
	        //}

	        return React.createElement(
	            'li',
	            { style: styleItem, 'aria-clicked': props.selected, onClick: this.onClick },
	            React.createElement(SymbolDiv, { layout: layout, srcImage: categoryDef.srcImage, onClick: this.onClick }),
	            React.createElement(
	                'span',
	                { style: styleText },
	                categoryDef.text
	            )
	        );
	    }
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        layout: React.PropTypes.object,
	        srcImage: React.PropTypes.string,
	        srcImageOptional: React.PropTypes.string,
	        alignment: React.PropTypes.string,
	        onClick: React.PropTypes.func
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            alignment: 'left'
	        };
	    },

	    render: function render() {
	        var props = this.props,
	            layout = props.layout,
	            width = layout.widthSymbol,
	            marginNarrow = layout.marginNarrow,
	            left = props.alignment === 'left',
	            styleDiv = {
	            flexShrink: 0,
	            display: 'flex',
	            alignItems: 'flex-start',
	            marginLeft: left ? 0 : 'auto',
	            paddingLeft: left ? 0 : marginNarrow,
	            paddingRight: left ? marginNarrow : 0
	        },
	            styleSpan = {
	            flexShrink: 0,
	            width: width,
	            textAlign: 'center'
	        },
	            styleImage = {
	            height: width
	        },
	            img = (function (_img) {
	            function img(_x) {
	                return _img.apply(this, arguments);
	            }

	            img.toString = function () {
	                return _img.toString();
	            };

	            return img;
	        })(function (srcImage) {
	            if (srcImage) {
	                return React.createElement('img', { style: styleImage, src: srcImage });
	            }
	        }),
	            span = (function (_span) {
	            function span(_x2) {
	                return _span.apply(this, arguments);
	            }

	            span.toString = function () {
	                return _span.toString();
	            };

	            return span;
	        })(function (srcImage) {
	            return React.createElement(
	                'span',
	                { style: styleSpan },
	                img(srcImage)
	            );
	        }),
	            spanImage = span(props.srcImage),
	            spanImageOptional = span(props.srcImageOptional);

	        return React.createElement(
	            'div',
	            { style: styleDiv, onClick: props.onClick },
	            left ? spanImageOptional : spanImage,
	            left ? spanImage : spanImageOptional
	        );
	    }
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        colors: React.PropTypes.object,
	        layout: React.PropTypes.object,
	        index: React.PropTypes.number
	    },

	    render: function render() {
	        var props = this.props,
	            colors = props.colors,
	            layout = props.layout,
	            styleDiv = {
	            flexShrink: 0,
	            marginLeft: layout.marginNarrow,
	            minWidth: '2rem', // 2 * layout.widthSymbol,
	            textAlign: 'right'
	        },
	            padding = '0.25em',
	            styleSpan = {
	            fontWeight: 'bold',
	            color: colors.colorBackground,
	            backgroundColor: colors.colorItem,
	            paddingLeft: padding,
	            paddingRight: padding,
	            borderTopLeftRadius: padding,
	            borderBottomLeftRadius: padding
	        },
	            index = props.index,
	            span;

	        if (index) {
	            span = React.createElement(
	                'span',
	                { style: styleSpan },
	                index
	            );
	        }

	        return React.createElement(
	            'div',
	            { style: styleDiv },
	            span
	        );
	    }
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SymbolDiv = __webpack_require__(17);

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        colors: React.PropTypes.object,
	        layout: React.PropTypes.object,
	        contactDef: React.PropTypes.object,
	        value: React.PropTypes.string
	    },

	    onClick: function onClick() {
	        var props = this.props;

	        props.contactDef.callback(props.value);
	    },

	    render: function render() {
	        var props = this.props,
	            layout = props.layout,
	            styleItem = {
	            display: 'flex',
	            alignItems: 'flex-start',
	            lineHeight: layout.lineHeightMeta,
	            color: props.colors.colorLink
	        },
	            styleValue = {
	            flexShrink: 1,
	            marginRight: layout.marginNarrow,
	            whiteSpace: 'nowrap', // TODO: or 2 lines for web address?
	            overflow: 'hidden',
	            textOverflow: 'ellipsis'
	        };

	        return React.createElement(
	            'li',
	            { style: styleItem, onClick: this.onClick },
	            React.createElement(SymbolDiv, { layout: layout, srcImage: props.contactDef.srcImage }),
	            React.createElement(
	                'span',
	                { style: styleValue },
	                props.value
	            )
	        );
	    }
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

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

	    return Math.round(location.distance / 1609); // return miles instead of meters
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


/***/ }
/******/ ]);