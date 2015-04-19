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
	            categories: React.PropTypes.array,
	            items: React.PropTypes.object
	        },

	        getDefaultProps: function () {
	            return {
	                colors: {
	                    colorMeta: '#0a5a83', // blue
	                    colorItem: '#000000', // black
	                    colorBackground: '#ffffff' // white
	                },
	                layout: {
	                    lineHeightMeta: '2.5rem',
	                    widthCategorySymbol: '2rem',
	                    padding: '0.5rem'
	                },
	                categories: [{ 
	                    key: 'bar',
	                    text: 'Bars',
	                    symbol: 'glass'
	                }, {
	                    key: 'restaurant',
	                    text: 'Restaurants',
	                    symbol: 'cutlery'
	                }, {
	                    key: 'park',
	                    text: 'Parks',
	                    symbol: 'compass'
	                }, {
	                    key: 'event',
	                    text: 'Events',
	                    symbol: 'calendar'
	                }]
	            };
	        },

	        getInitialState: function () {
	            var props = this.props,
	                items = props.items,
	                idsItems = Object.keys(items),
	                categoriesMap = {};

	            props.categories.forEach(function (category) {
	                categoriesMap[category.key] = category;
	            });
	            idsItems.forEach(function (id) {
	                var item = items[id];

	                // TODO: Ask Enrique if it is okay to add a property to a props object?
	                item.categoryObject = categoriesMap[item.categoryKey];
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
	                    React.createElement(ItemPage, {colors: props.colors, layout: props.layout, item: itemSelected})
	                );
	            } else {
	                // TO DO: LocationPage?
	                return (
	                    React.createElement(ResultPage, {colors: props.colors, layout: props.layout, categories: props.categories, items: props.items, idsOrdered: state.idsOrdered, onResultItemSelected: this.onResultItemSelected})
	                );
	            }
	        }
	    });

	React.render(React.createElement(DogsApp, {items: items}), document.getElementsByTagName('body')[0]);

	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var CategoryList = __webpack_require__(3),
	    ResultList = __webpack_require__(4);

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            colors: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            categories: React.PropTypes.array,
	            items: React.PropTypes.object,
	            idsOrdered: React.PropTypes.array,
	            onResultItemSelected: React.PropTypes.func
	        },

	        getInitialState: function () {
	            var items = this.props.items,
	                categoriesSelected = {},
	                props = this.props,
	                layout = props.layout,
	                colors = props.colors;

	            this.props.categories.forEach(function (category) {
	                categoriesSelected[category.key] = false; // all false means unfiltered
	            });

	            return {
	                initial: true,
	                categoriesSelected: categoriesSelected,
	                idsFiltered: props.idsOrdered.concat(), // copy
	                styleHeader: {
	                    //dispay: 'flex',
	                    lineHeight: layout.lineHeightMeta,
	                    paddingLeft: layout.widthCategorySymbol,
	                    paddingRight: layout.padding,
	                    color: colors.colorMeta,
	                    backgroundColor: colors.colorBackground,
	                    borderWidth: '3px',
	                    borderBottomStyle: 'solid'
	                },
	                styleHeading: {
	                    fontSize: '1.25rem'
	                }
	            };
	        },

	        onCategorySelected: function (category) {
	            var categoriesSelected = Object.create(this.state.categoriesSelected),
	                key = category.key,
	                noneSelected = true,
	                items = this.props.items,
	                idsFiltered = [];

	            categoriesSelected[key] = !categoriesSelected[key];
	            this.props.categories.forEach(function (category) {
	                noneSelected = noneSelected && !categoriesSelected[category.key];
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
	                state = this.state;

	            // TODO: Header class?
	            return (
	                React.createElement("div", null, 
	                    React.createElement("header", {style: state.styleHeader}, 
	                        React.createElement("h1", {style: state.styleHeading}, "Dogs-in")
	                    ), 
	                    React.createElement(CategoryList, {colors: props.colors, layout: props.layout, categories: props.categories, categoriesSelected: state.categoriesSelected, onCategorySelected: this.onCategorySelected}), 
	                    React.createElement(ResultList, {items: props.items, idsFiltered: state.idsFiltered, layout: props.layout, onResultItemSelected: props.onResultItemSelected})
	                )
	            );
	        }
	    });


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            colors: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            item: React.PropTypes.object
	        },

	        getInitialState: function () {
	            var items = this.props.items,
	                categoriesSelected = {},
	                props = this.props,
	                layout = props.layout,
	                colors = props.colors;

	            return {
	                styleNav: {
	                    lineHeight: layout.lineHeightMeta,
	                    paddingRight: layout.padding,
	                    color: colors.colorMeta,
	                    backgroundColor: colors.colorBackground,
	                    borderWidth: '3px',
	                    borderBottomStyle: 'solid'
	                },
	                styleNavList: {
	                    display: 'flex',
	                    alignItems: 'baseline',
	                    listStyle: 'none'
	                },
	                styleNavListItem: {
	                    display: 'flex',
	                    alignItems: 'center'
	                },
	                styleSymbol: {
	                    flexShrink: 0,
	                    width: layout.widthCategorySymbol,
	                    textAlign: 'center'
	                },
	                styleSymbolImage: {
	                    height: '1em'
	                },
	                styleItemHeading: {
	                    display: 'flex',
	                    alignItems: 'baseline',
	                    marginTop: '200px', // leave space for item image
	                    paddingTop: layout.padding
	                },
	                styleItemName: {
	                    // fontSize: '1.25rem'
	                },
	                styleSection: {
	                    paddingLeft: layout.widthCategorySymbol,
	                    paddingRight: layout.padding
	                }
	            };
	        },

	        render: function () {
	            var item = this.props.item,
	                srcSymbolImage = item.categoryObject.symbol + '.svg',
	                state = this.state;

	            // TODO: nav class?
	            return (
	                React.createElement("div", null, 
	                    React.createElement("nav", {style: state.styleNav}, 
	                        React.createElement("ul", {style: state.styleNavList}, 
	                            React.createElement("li", {style: state.styleNavListItem}, 
	                                React.createElement("span", {style: state.styleSymbol}, 
	                                    React.createElement("img", {style: state.styleSymbolImage, src: "angle-left.svg"})
	                                ), 
	                                React.createElement("span", null, "Back")
	                            )
	                        )
	                    ), 
	                    React.createElement("article", null, 
	                        React.createElement("header", {style: state.styleArticleHeader}, 
	                            React.createElement("h1", {style: state.styleItemHeading}, 
	                                React.createElement("span", {style: state.styleSymbol}, 
	                                    React.createElement("img", {style: state.styleSymbolImage, src: srcSymbolImage})
	                                ), 
	                                React.createElement("span", {style: state.styleItemName}, item.name)
	                            )
	                        ), 
	                        React.createElement("section", {style: state.styleSection}, 
	                            React.createElement("p", null, item.address)
	                        )
	                    )
	                )
	            );
	        }
	    });


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var CategoryItem = __webpack_require__(5);

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            colors: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            categories: React.PropTypes.array,
	            categoriesSelected: React.PropTypes.object,
	            onCategorySelected: React.PropTypes.func
	        },

	        style: {
	            listStyle: 'none',
	        },

	        render: function () {
	            var props = this.props,
	                categoriesSelected = props.categoriesSelected,
	                onCategorySelected = props.onCategorySelected,
	                colors = props.colors,
	                layout = props.layout,
	                categoryItems = props.categories.map(function (category) {
	                    return React.createElement(CategoryItem, {colors: colors, layout: layout, category: category, selected: categoriesSelected[category.key], onCategorySelected: onCategorySelected});
	                });

	            return (
	                React.createElement("ul", {id: "categories", style: this.style}, categoryItems)
	            );
	        }
	    });


/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            colors: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            category: React.PropTypes.object,
	            selected: React.PropTypes.bool,
	            onCategorySelected: React.PropTypes.func
	        },

	        getInitialState: function () {
	            var props = this.props,
	                selected = props.selected,
	                colors = props.colors,
	                colorMeta = colors.colorMeta,
	                colorBackground = colors.colorBackground,
	                layout = props.layout;

	            return {
	                styleItem: {
	                    display: 'flex',
	                    alignItems: 'flex-start',
	                    lineHeight: layout.lineHeightMeta,
	                    color: selected ? colorBackground : colorMeta,
	                    backgroundColor: selected ? colorMeta : colorBackground,
	                    borderWidth: '1px',
	                    borderBottomStyle: 'solid'
	                },
	                styleSymbol: {
	                    flexShrink: 0,
	                    width: layout.widthCategorySymbol,
	                    textAlign: 'center'
	                },
	                styleImage: {
	                    height: '1em'
	                },
	                styleText: {
	                    flexShrink: 1
	                }
	            };
	        },

	        onClick: function () {
	            this.props.onCategorySelected(this.props.category);
	        },

	        render: function () {
	            var props = this.props,
	                category = props.category,
	                pathImage = category.symbol + '.svg',
	                state = this.state;

	            return (
	                React.createElement("li", {style: state.styleItem, "aria-clicked": props.selected, onClick: this.onClick}, 
	                    React.createElement("span", {style: state.styleSymbol}, 
	                        React.createElement("img", {style: state.styleImage, src: pathImage})
	                    ), 
	                    React.createElement("span", {style: state.styleText}, category.text)
	                )
	            );
	        }
	    });


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            item: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            onResultItemSelected: React.PropTypes.func
	        },

	        getInitialState: function () {
	            var layout = this.props.layout;

	            return {
	                styleItem: {
	                    display: 'flex',
	                    alignItems: 'flex-start',
	                    paddingTop: layout.padding,
	                    paddingBottom: layout.padding,
	                    borderWidth: '1px',
	                    borderBottomStyle: 'dotted'
	                },
	                styleSymbol: {
	                    flexShrink: 0,
	                    width: layout.widthCategorySymbol,
	                    textAlign: 'center'
	                },
	                styleImage: {
	                    height: '1em'
	                },
	                styleDiv: {
	                    flexShrink: 1
	                },
	                styleDistance: {
	                    flexShrink: 0,
	                    marginLeft: 'auto', // align right
	                    marginRight: layout.padding
	                }
	            }
	        },

	        onClick: function () {
	            var props = this.props;

	            props.onResultItemSelected(props.item);
	        },

	        render: function () {
	            var item = this.props.item,
	                pathImage = item.categoryObject.symbol + '.svg',
	                distance = item.distance + 'mi',
	                state = this.state;

	            return (
	                React.createElement("li", {style: state.styleItem, onClick: this.onClick}, 
	                    React.createElement("span", {style: state.styleSymbol}, 
	                        React.createElement("img", {style: state.styleImage, src: pathImage})
	                    ), 
	                    React.createElement("div", {style: state.styleDiv}, 
	                        React.createElement("p", null, item.name), 
	                        React.createElement("p", null, item.address)
	                    ), 
	                    React.createElement("span", {style: state.styleDistance}, distance)
	                )
	            );
	        }
	    });


/***/ }
/******/ ]);