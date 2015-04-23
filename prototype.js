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
	            items: React.PropTypes.array
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
	                categoryMap = {},
	                indexMap = 0;

	            props.categoryDefs.forEach(function (categoryDef) {
	                categoryMap[categoryDef.key] = categoryDef;
	            });
	            items.forEach(function (item) {
	                // TODO: Ask Enrique if it is okay to add a property to a props object?
	                item.categoryDef = categoryMap[item.categoryKey];
	                item.indexMap = ++indexMap; // demo
	            });

	            return {
	                page: React.createElement(ResultPage, { colors: props.colors, layout: props.layout, categoryDefs: props.categoryDefs, items: items, setItemPage: this.setItemPage, setLocationPage: this.setLocationPage })
	            };
	        },

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
	    React.render(React.createElement(DogsApp, { items: items }), document.getElementsByTagName('body')[0]);
	});

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
	        dogFriendly: true,
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
	        dogFriendly: true,
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
	        key: 'park',
	        text: 'Parks',
	        srcImage: srcImage('compass')
	    }, {
	        key: 'event',
	        text: 'Events',
	        srcImage: srcImage('calendar')
	    }];


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var srcImage = function (name) {
	        return name + '.svg';
	    };

	module.exports = [{
	        key: 'phone',
	        srcImage: srcImage('phone'),
	        callback: function (number) {
	            window.alert('Call phone number: ' + number);
	        }
	    }, {
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

	var Header = __webpack_require__(8),
	    CategoryList = __webpack_require__(9),
	    ResultList = __webpack_require__(10);

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
	            initial: true,
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
	            if (noneSelected || categoriesSelected[item.categoryKey] === true) {
	                idsFiltered.push(item);
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
	            styleSideBySide = {
	            display: 'flex',
	            alignItems: 'flex-start',
	            width: '100%'
	        },
	            styleMap = {
	            flexGrow: 1,
	            flexShrink: 1,
	            boxSizing: 'border-box',
	            height: layout.heightCategoryList,
	            borderColor: colors.colorMeta,
	            borderWidth: '1px',
	            borderLeftStyle: 'solid',
	            borderBottomStyle: 'solid'
	        },
	            initial = state.initial,
	            linkRight = {
	            srcImage: 'search.svg',
	            setPage: props.setLocationPage
	        },
	            map;

	        if (!initial) {
	            map = React.createElement('img', { style: styleMap, src: 'TODO.jpg', alt: 'Map' });
	        }

	        return React.createElement(
	            'div',
	            null,
	            React.createElement(Header, { colors: colors, layout: layout, linkRight: linkRight }),
	            React.createElement(
	                'div',
	                { style: styleSideBySide },
	                React.createElement(CategoryList, { colors: colors, layout: layout, initial: state.initial, categoryDefs: props.categoryDefs, categoriesSelected: state.categoriesSelected, onCategorySelected: this.onCategorySelected }),
	                map
	            ),
	            React.createElement(ResultList, { items: state.itemsFiltered, mapIndexDemo: !initial, colors: colors, layout: props.layout, setItemPage: props.setItemPage })
	        );
	    }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Header = __webpack_require__(8);

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

	var Header = __webpack_require__(8),
	    ResultItem = __webpack_require__(11),
	    ContactList = __webpack_require__(12);

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
	            styleImage = {
	            boxSizing: 'border-box',
	            width: '100%',
	            height: layout.heightCategoryList,
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
	            React.createElement('img', { style: styleImage, src: 'TODO.jpg', alt: 'Picture' }),
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

	var Header = __webpack_require__(8);

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

	'use strict';

	var SymbolDiv = __webpack_require__(14);

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
	                return React.createElement(SymbolDiv, { layout: layout, srcImage: link.srcImage, alignment: alignment, setPage: link.setPage });
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var CategoryItem = __webpack_require__(13);

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
	            listStyle: 'none',
	            width: initial ? '100%' : layout.marginWide
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ResultItem = __webpack_require__(11);

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SymbolDiv = __webpack_require__(14),
	    MapIndex = __webpack_require__(15);

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
	            inResultPage = !props.setItemPage,
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
	            distance = item.distance + 'mi',
	            index;

	        if (props.mapIndexDemo) {
	            index = item.indexMap;
	        }

	        return React.createElement(
	            'li',
	            { style: styleItem, onClick: this.onClick },
	            React.createElement(SymbolDiv, { layout: layout, srcImage: item.categoryDef.srcImage, srcImageOptional: item.dogFriendly ? 'paw.svg' : '' }),
	            React.createElement(
	                'div',
	                { style: styleDiv },
	                React.createElement(
	                    'p',
	                    null,
	                    item.name
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    item.address
	                ),
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ContactItem = __webpack_require__(16);

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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SymbolDiv = __webpack_require__(14);

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        colors: React.PropTypes.object,
	        layout: React.PropTypes.object,
	        initial: React.PropTypes.bool,
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
	            lineHeight: layout.lineHeightMeta,
	            color: selected ? colorBackground : colorMeta,
	            backgroundColor: selected ? colorMeta : colorBackground,
	            borderWidth: '1px',
	            borderBottomStyle: 'solid'
	        },
	            styleText = {
	            flexShrink: 1,
	            marginRight: layout.marginNarrow
	        };

	        if (!props.initial) {
	            styleText.display = 'none';
	        }

	        return React.createElement(
	            'li',
	            { style: styleItem, 'aria-clicked': props.selected, onClick: this.onClick },
	            React.createElement(SymbolDiv, { layout: layout, srcImage: categoryDef.srcImage }),
	            React.createElement(
	                'span',
	                { style: styleText },
	                categoryDef.text
	            )
	        );
	    }
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = React.createClass({
	    displayName: 'exports',

	    propTypes: {
	        layout: React.PropTypes.object,
	        srcImage: React.PropTypes.string,
	        srcImageOptional: React.PropTypes.string,
	        alignment: React.PropTypes.string,
	        setPage: React.PropTypes.func
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            alignment: 'left'
	        };
	    },

	    onClick: function onClick() {
	        this.props.setPage();
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
	            { style: styleDiv, onClick: this.onClick },
	            left ? spanImageOptional : spanImage,
	            left ? spanImage : spanImageOptional
	        );
	    }
	});

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SymbolDiv = __webpack_require__(14);

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

/***/ }
/******/ ]);