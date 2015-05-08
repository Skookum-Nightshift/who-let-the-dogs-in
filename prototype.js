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
	                items = props.providers.map.Foursquare.getItems(location),
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
	                console.dir(items);
	                console.log(item.getCategory());
	                // TODO: Ask Enrique if it is okay to add a property to a props object?
	                item.categoryDef = categoryMap[item.getCategory()];
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

	module.exports = [ /* {
	        key: 'phone',
	        srcImage: srcImage('phone'),
	        callback: function (number) {
	            window.alert('Call phone number: ' + number);
	        }
	    }, */ {
	        key: 'web',
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
	    ResultList = __webpack_require__(11);

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
	            initial: false,
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
	            initial: false,
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
	            initial = state.initial,
	            linkRight = {
	            srcImage: 'search.svg',
	            setPage: props.setLocationPage
	        },
	            map;

	        console.log(initial);
	        if (!initial) {
	            map = React.createElement('img', { style: styleMap, src: 'TODO.jpg', alt: 'Map' });
	        }

	        return React.createElement(
	            'div',
	            null,
	            React.createElement(Header, { colors: colors, layout: layout, linkRight: linkRight }),
	            React.createElement(CategoryList, { colors: colors, layout: layout, initial: state.initial, categoryDefs: props.categoryDefs, categoriesSelected: state.categoriesSelected, onCategorySelected: this.onCategorySelected }),
	            map,
	            React.createElement(ResultList, { items: state.itemsFiltered, mapIndexDemo: !initial, colors: colors, layout: props.layout, setItemPage: props.setItemPage })
	        );
	    }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Header = __webpack_require__(9);

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
	            React.createElement('img', { style: styleMap, src: 'TODO.jpg', alt: 'Map' }),
	            ';',
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
	    ResultItem = __webpack_require__(12),
	    ContactList = __webpack_require__(13);

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

	        // TO DO: align ContactList at bottom?
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
	            styleList = {
	            listStyle: 'none',
	            width: '100%'
	        },
	            stylePara = {
	            display: 'flex',
	            alignItems: 'baseline',
	            marginLeft: marginWide
	        },
	            styleDirections = {
	            color: colors.colorLink,
	            marginLeft: 'auto',
	            padding: layout.marginNarrow,
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
	            React.createElement('img', { style: styleMap, src: 'TODO.jpg', alt: 'Map' }),
	            React.createElement(
	                'ul',
	                { style: styleList },
	                React.createElement(ResultItem, { colors: colors, layout: layout, item: item }),
	                React.createElement(
	                    'li',
	                    null,
	                    React.createElement(
	                        'p',
	                        { style: stylePara },
	                        React.createElement(
	                            'span',
	                            null,
	                            item.neighborhood
	                        ),
	                        React.createElement(
	                            'span',
	                            { style: styleDirections, onClick: this.onClickDirections },
	                            'Directions'
	                        )
	                    )
	                )
	            ),
	            React.createElement(ContactList, { colors: colors, layout: layout, contactDefs: props.contactDefs, contacts: item.contacts })
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

	var Header = __webpack_require__(9);

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
	            React.createElement(Header, { colors: colors, layout: layout, linkLeft: linkLeft })
	        );
	    }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var providers = {
	        map: {},
	        array: [
	            __webpack_require__(14) /*,
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

	var SymbolDiv = __webpack_require__(15);

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
	        initial: React.PropTypes.bool,
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
	            initial = props.initial,
	            style = {
	            width: '100%',
	            display: 'flex',
	            alignItems: 'flex-start',
	            listStyle: 'none'
	        },
	            categoryItems = props.categoryDefs.map(function (categoryDef) {
	            return React.createElement(CategoryItem, { colors: colors, layout: layout, initial: initial, categoryDef: categoryDef, selected: categoriesSelected[categoryDef.key], onCategorySelected: onCategorySelected });
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

	var ResultItem = __webpack_require__(12);

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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SymbolDiv = __webpack_require__(15),
	    MapIndex = __webpack_require__(17);

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
	            inResultPage = false,
	            // TODO: !props.setItemPage,
	        styleItem = {
	            display: 'flex',
	            alignItems: 'flex-start',
	            paddingTop: layout.marginNarrow,
	            paddingBottom: layout.marginNarrow,
	            borderWidth: '1px',
	            borderBottomStyle: inResultPage ? 'none' : 'solid'
	        },
	            styleDiv = {
	            flexShrink: 1
	        },
	            styleDistance = {
	            flexShrink: 0,
	            marginLeft: 'auto' // align right
	        },
	            item = props.item,
	            city = function city() {
	            if (inResultPage) {
	                return React.createElement(
	                    'p',
	                    null,
	                    item.city + ', ' + item.state + ' ' + item.postalCode
	                );
	            }
	        },

	        // distance = item.distance + 'mi',
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
	                city()
	            ),
	            '//                    ',
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ContactItem = __webpack_require__(18);

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        colors: React.PropTypes.object,
	        layout: React.PropTypes.object,
	        contactDefs: React.PropTypes.array,
	        contacts: React.PropTypes.object
	    },

	    render: function render() {
	        var props = this.props,
	            colors = props.colors,
	            layout = props.layout,
	            contacts = props.contacts,
	            styleList = {
	            listStyle: 'none',
	            width: '100%',
	            marginTop: layout.marginNarrow
	        },
	            contactItems = [];

	        props.contactDefs.forEach(function (contactDef) {
	            var value = contacts[contactDef.key];

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
/* 14 */
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
	          "<span itemprop=\"streetAddress\">1320 S Church St<\/span>",
	          "<span itemprop=\"addressLocality\">Charlotte<\/span>, <span itemprop=\"addressRegion\">NC<\/span> <span itemprop=\"postalCode\">28203<\/span>"
	        ]
	      },
	      "canonicalUrl": "https:\/\/foursquare.com\/v\/craft-growler-shop\/544ad14a498e92c459c5c1ec",
	      "categories": [
	        {
	          "id": "5370f356bcbc57f1066c94c2",
	          "name": "Bar", //"Beer Store",
	          "icon": {
	            "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/nightlife\/beergarden_",
	            "mapPrefix": "https:\/\/ss3.4sqi.net\/img\/categories_map\/nightlife\/beergarden",
	            "suffix": ".png"
	          },
	          "primary": true
	        }
	      ]
	    }
	  }
	]
	},

	    Adapter = __webpack_require__(19),

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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SymbolDiv = __webpack_require__(15);

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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SymbolDiv = __webpack_require__(15);

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
	            color: props.colors.colorLink,
	            borderWidth: '1px',
	            borderTopStyle: 'solid'
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// For more information about the adapted-to interface:
	// https://developers.google.com/places/android/place-details

	// For more information about the adapted-from interface:
	// https://developer.foursquare.com/docs/responses/venue

	// For more information about Adapter pattern: pp. 139-150 in Design Patterns.

	var FoursquareAdapter = function (venueResponse) {
	console.log(venueResponse);
	        this.venueResponse = venueResponse;
	    },
	    prototype = FoursquareAdapter.prototype; // for member functions below

	prototype.getName = function () {
	    return this.venueResponse.name;
	};

	prototype.getAddress = function () {
	    // TODO: what about separate properties? city, state, postalCode
	    return this.venueResponse.location.address; // optional string
	};

	prototype.getID = function () {
	    return this.venueResponse.id;
	};

	prototype.getPhoneNumber = function () {
	    return this.venueResponse.contact.formattedPhone; // TODO: compare to phone
	};

	prototype.getWebsiteUri = function () {
	    return this.venueResponse.url;
	};

	// LatLng has properties latitude and longitude of type double
	prototype.getLatLng = function (){
	    var location = this.venueResponse.location; // TODO: verify type of lat and lng

	    return {
	        latitude: location.lat,
	        longitude: location.lng
	    }; 
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
	console.log(this.venueResponse.categories);
	    this.venueResponse.categories.forEach(function (category) {
	        var value = categoryMap[category.name];

	        if (value) {
	            category = value;
	        }
	    });
	console.log(category);
	    return category;
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