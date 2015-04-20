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

	document.addEventListener('DOMContentLoaded', function () {

	var ResultPage = __webpack_require__(1),
	    ItemPage = __webpack_require__(2),
	    DogsApp = React.createClass({displayName: "DogsApp",
	        propTypes: {
	            colors: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            categoryDefs: React.PropTypes.array,
	            contactDefs: React.PropTypes.array,
	            items: React.PropTypes.object
	        },

	        getDefaultProps: function () {
	            var srcImage = function (name) {
	                    return name + '.svg';
	                };

	            return {
	                categoryDefs: [{ 
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
	                }],
	                contactDefs: [{
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
	                }],
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

	        getInitialState: function () {
	            var props = this.props,
	                items = props.items,
	                idsItems = Object.keys(items),
	                categoryMap = {};

	            props.categoryDefs.forEach(function (categoryDef) {
	                categoryMap[categoryDef.key] = categoryDef;
	            });
	            idsItems.forEach(function (id) {
	                var item = items[id];

	                // TODO: Ask Enrique if it is okay to add a property to a props object?
	                item.categoryDef = categoryMap[item.categoryKey];
	            });

	            return {
	                idSelected: null,
	                idsOrdered: idsItems.sort(function (idA, idB) {
	                    return items[idA].distance - items[idB].distance;
	                })
	            };
	        },

	        onResultItemSelected: function(item) {
	            this.setState({
	                itemSelected: item
	            });
	        },

	        render: function () {
	            var props = this.props,
	                state = this.state,
	                itemSelected = state.itemSelected;

	            if (itemSelected) {
	                // TODO: DirectionsPage?
	                return (
	                    React.createElement(ItemPage, {colors: props.colors, layout: props.layout, contactDefs: props.contactDefs, item: itemSelected})
	                );
	            } else {
	                // TO DO: LocationPage?
	                return (
	                    React.createElement(ResultPage, {colors: props.colors, layout: props.layout, categoryDefs: props.categoryDefs, items: props.items, idsOrdered: state.idsOrdered, onResultItemSelected: this.onResultItemSelected})
	                );
	            }
	        }
	    });

	React.render(React.createElement(DogsApp, {items: items}), document.getElementsByTagName('body')[0]);

	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Header = __webpack_require__(3),
	    CategoryList = __webpack_require__(4),
	    ResultList = __webpack_require__(5);

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            colors: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            categoryDefs: React.PropTypes.array,
	            items: React.PropTypes.object,
	            idsOrdered: React.PropTypes.array,
	            onResultItemSelected: React.PropTypes.func
	        },

	        getInitialState: function () {
	            var items = this.props.items,
	                categoriesSelected = {},
	                props = this.props;

	            props.categoryDefs.forEach(function (categoryDef) {
	                categoriesSelected[categoryDef.key] = false; // all false means unfiltered
	            });

	            return {
	                initial: true,
	                categoriesSelected: categoriesSelected,
	                idsFiltered: props.idsOrdered.concat() // copy
	            };
	        },

	        onCategorySelected: function (categoryDef) {
	            var categoriesSelected = Object.create(this.state.categoriesSelected),
	                key = categoryDef.key,
	                noneSelected = true,
	                items = this.props.items,
	                idsFiltered = [];

	            categoriesSelected[key] = !categoriesSelected[key];
	            this.props.categoryDefs.forEach(function (categoryDef) {
	                noneSelected = noneSelected && !categoriesSelected[categoryDef.key];
	            });

	            this.props.idsOrdered.forEach(function (id) {
	                if (noneSelected || categoriesSelected[items[id].categoryKey] === true) {
	                    idsFiltered.push(id);
	                }
	            });

	            this.setState({
	                initial: false,
	                categoriesSelected: categoriesSelected,
	                idsFiltered: idsFiltered
	            });
	        },

	        render: function () {
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
	                map;

	            if (!state.initial) {
	                map = React.createElement("img", {style: styleMap, src: "TODO.jpg", alt: "Map"})
	            }

	            return (
	                React.createElement("div", null, 
	                    React.createElement(Header, {colors: colors, layout: layout}), 
	                    React.createElement("div", {style: styleSideBySide}, 
	                        React.createElement(CategoryList, {colors: colors, layout: layout, initial: state.initial, categoryDefs: props.categoryDefs, categoriesSelected: state.categoriesSelected, onCategorySelected: this.onCategorySelected}), 
	                        map
	                    ), 
	                    React.createElement(ResultList, {items: props.items, idsFiltered: state.idsFiltered, layout: props.layout, onResultItemSelected: props.onResultItemSelected})
	                )
	            );
	        }
	    });


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Header = __webpack_require__(3),
	    ResultItem = __webpack_require__(6),
	    ContactList = __webpack_require__(7);

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            colors: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            contactDefs: React.PropTypes.array,
	            item: React.PropTypes.object
	        },

	        render: function () {
	            var props = this.props,
	                colors = props.colors,
	                layout = props.layout,
	                marginWide = layout.marginWide,
	                // TO DO: align ContactList at bottom?
	                styleDiv = {
	                    //display: 'flex',
	                    //alignItems: 'flex-start',
	                    //alignContent: 'flex-start',
	                    //flexWrap: 'wrap',
	                    //overflow: 'hidden'
	                },
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
	                styleItem = {
	                    marginLeft: marginWide
	                }
	                item = props.item;

	            // TODO: description, hours, amenities, directions
	            return (
	                React.createElement("div", {style: styleDiv}, 
	                    React.createElement(Header, {colors: colors, layout: layout}), 
	                    React.createElement("img", {style: styleImage, src: "TODO.jpg", alt: "Picture"}), 
	                    React.createElement("ul", {style: styleList}, 
	                        React.createElement(ResultItem, {item: item, layout: layout}), 
	                        React.createElement("li", {style: styleItem}, 
	                            React.createElement("p", null, item.neighborhood)
	                        )
	                    ), 
	                    React.createElement(ContactList, {colors: colors, layout: layout, contactDefs: props.contactDefs, contacts: item.contacts})
	                )
	            );
	        }
	    });


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            colors: React.PropTypes.object,
	            layout: React.PropTypes.object
	        },

	        render: function () {
	            var props = this.props,
	                colors = props.colors,
	                layout = props.layout,
	                styleHeader = {
	                    //dispay: 'flex',
	                    boxSizing: 'border-box',
	                    lineHeight: layout.lineHeightMeta,
	                    width: '100%',
	                    paddingLeft: layout.marginWide,
	                    paddingRight: layout.marginNarrow,
	                    color: colors.colorMeta,
	                    backgroundColor: colors.colorBackground,
	                    borderWidth: '2px',
	                    borderBottomStyle: 'solid'
	                },
	                styleHeading = {
	                    fontSize: '1.25rem'
	                };

	            return (
	                React.createElement("header", {style: styleHeader}, 
	                    React.createElement("h1", {style: styleHeading}, "Dogs-in")
	                )
	            );
	        }
	    });


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var CategoryItem = __webpack_require__(8);

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            colors: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            initial: React.PropTypes.bool,
	            categoryDefs: React.PropTypes.array,
	            categoriesSelected: React.PropTypes.object,
	            onCategorySelected: React.PropTypes.func
	        },

	        render: function () {
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
	                    return React.createElement(CategoryItem, {colors: colors, layout: layout, initial: initial, categoryDef: categoryDef, selected: categoriesSelected[categoryDef.key], onCategorySelected: onCategorySelected});
	                });

	            return (
	                React.createElement("ul", {style: style}, categoryItems)
	            );
	        }
	    });


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var ResultItem = __webpack_require__(6);

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            items: React.PropTypes.object,
	            idsFiltered: React.PropTypes.array,
	            layout: React.PropTypes.object,
	            onResultItemSelected: React.PropTypes.func
	        },
	        style: {
	            listStyle: 'none'
	        },
	        render: function () {
	            var props = this.props,
	                items = props.items,
	                layout = props.layout,
	                resultItems = props.idsFiltered.map(function (id) {
	                        return (
	                            React.createElement(ResultItem, {item: items[id], layout: layout, onResultItemSelected: props.onResultItemSelected})
	                        );
	                    });

	            return (
	                React.createElement("ul", {id: "list", style: this.style}, resultItems)
	            );
	        },
	    });


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var SymbolDiv = __webpack_require__(9);

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            item: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            onResultItemSelected: React.PropTypes.func
	        },

	        onClick: function () {
	            var props = this.props,
	                onResultItemSelected = props.onResultItemSelected;

	            if (onResultItemSelected) {
	                onResultItemSelected(props.item);
	            }
	        },

	        render: function () {
	            var props = this.props,
	                layout = props.layout,
	                inResultPage = !props.onResultItemSelected,
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
	                    marginLeft: 'auto', // align right
	                    marginRight: layout.marginNarrow
	                },
	                item = props.item,
	                city = function () {
	                    if (inResultPage) {
	                        return (
	                            React.createElement("p", null, item.city + ', ' + item.state + ' ' + item.postalCode)
	                        );
	                    }
	                },
	                distance = item.distance + 'mi';

	            return (
	                React.createElement("li", {style: styleItem, onClick: this.onClick}, 
	                    React.createElement(SymbolDiv, {layout: layout, srcImage: item.categoryDef.srcImage, srcImageOptional: item.dogFriendly ? 'paw.svg' : ''}), 
	                    React.createElement("div", {style: styleDiv}, 
	                        React.createElement("p", null, item.name), 
	                        React.createElement("p", null, item.address), 
	                        city()
	                    ), 
	                    React.createElement("span", {style: styleDistance}, distance)
	                )
	            );
	        }
	    });


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var ContactItem = __webpack_require__(10);

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            colors: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            contactDefs: React.PropTypes.array,
	            contacts: React.PropTypes.object
	        },

	        render: function () {
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
	                    contactItems.push(React.createElement(ContactItem, {colors: colors, layout: layout, contactDef: contactDef, value: value}));
	                }
	            });

	            return (
	                React.createElement("ul", {style: styleList}, contactItems)
	            );
	        }
	    });


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var SymbolDiv = __webpack_require__(9);

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            colors: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            initial: React.PropTypes.bool,
	            categoryDef: React.PropTypes.object,
	            selected: React.PropTypes.bool,
	            onCategorySelected: React.PropTypes.func
	        },

	        onClick: function () {
	            this.props.onCategorySelected(this.props.categoryDef);
	        },

	        render: function () {
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

	            return (
	                React.createElement("li", {style: styleItem, "aria-clicked": props.selected, onClick: this.onClick}, 
	                    React.createElement(SymbolDiv, {layout: layout, srcImage: categoryDef.srcImage}), 
	                    React.createElement("span", {style: styleText}, categoryDef.text)
	                )
	            );
	        }
	    });


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({displayName: "exports",
	    propTypes: {
	        layout: React.PropTypes.object,
	        srcImage: React.PropTypes.string,
	        srcImageOptional: React.PropTypes.string,
	    },

	    render: function () {
	        var props = this.props,
	            layout = props.layout,
	            width = layout.widthSymbol,
	            styleDiv = {
	                flexShrink: 0,
	                display: 'flex',
	                alignItems: 'flex-start',
	                marginRight: layout.marginNarrow
	            },
	            styleSpan = {
	                flexShrink: 0,
	                width: width,
	                textAlign: 'center'
	            },
	            styleImage = {
	                height: width
	            },
	            img = function (srcImage) {
	                if (srcImage) {
	                    return (
	                        React.createElement("img", {style: styleImage, src: srcImage})
	                    );
	                }
	            },
	            span = function (srcImage) {
	                return (
	                    React.createElement("span", {style: styleSpan}, img(srcImage))
	                );
	            };

	        return (
	            React.createElement("div", {style: styleDiv}, 
	                span(props.srcImageOptional), 
	                span(props.srcImage)
	            )
	        );
	    }
	});


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var SymbolDiv = __webpack_require__(9);

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            colors: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            contactDef: React.PropTypes.object,
	            value: React.PropTypes.string
	        },

	        onClick: function () {
	            var props = this.props;

	            props.contactDef.callback(props.value);
	        },

	        render: function () {
	            var props = this.props,
	                layout = props.layout;
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

	            return (
	                React.createElement("li", {style: styleItem, onClick: this.onClick}, 
	                    React.createElement(SymbolDiv, {layout: layout, srcImage: props.contactDef.srcImage}), 
	                    React.createElement("span", {style: styleValue}, props.value)
	                )
	            );
	        }
	    });


/***/ }
/******/ ]);