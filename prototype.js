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
	                    key: 'bars',
	                    text: 'Bars',
	                    symbol: 'glass'
	                }, {
	                    key: 'restaurants',
	                    text: 'Restaurants',
	                    symbol: 'cutlery'
	                }, {
	                    key: 'parks',
	                    text: 'Parks',
	                    symbol: 'compass'
	                }, {
	                    key: 'events',
	                    text: 'Events',
	                    symbol: 'calendar'
	                }]
	            };
	        },
	        getInitialState: function () {
	            var items = this.props.items;

	            return {
	                idSelected: null,
	                idsOrdered: Object.keys(items).sort(function (idA, idB) {
	                    return items[idA].distance - items[idB].distance;
	                })
	            };
	        },
	        render: function () {
	            if (this.state.idSelected) {
	                // TODO: DirectionsPage?
	                //return (
	                    // TODO: DetailsPage
	                //);
	            } else {
	                // TO DO: LocationPage?
	                return (
	                    React.createElement(ResultPage, {colors: this.props.colors, layout: this.props.layout, categories: this.props.categories, items: this.props.items, idsOrdered: this.state.idsOrdered})
	                );
	            }
	        }
	    });

	React.render(React.createElement(DogsApp, {items: items}), document.getElementsByTagName('body')[0]);

	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var CategoryList = __webpack_require__(2),
	    ResultList = __webpack_require__(3);

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            colors: React.PropTypes.object,
	            layout: React.PropTypes.object,
	            categories: React.PropTypes.array,
	            items: React.PropTypes.object,
	            idsOrdered: React.PropTypes.array
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
	                if (noneSelected || categoriesSelected[items[id].category] === true) {
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
	                    React.createElement(ResultList, {items: props.items, idsFiltered: state.idsFiltered, layout: props.layout})
	                )
	            );
	        }
	    });


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var CategoryItem = __webpack_require__(4);

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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var ResultItem = __webpack_require__(5);

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            items: React.PropTypes.object,
	            idsFiltered: React.PropTypes.array,
	            layout: React.PropTypes.object
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
	                            React.createElement(ResultItem, {item: items[id], layout: layout})
	                        );
	                    });

	            return (
	                React.createElement("ul", {id: "list", style: this.style}, resultItems)
	            );
	        },
	    });


/***/ },
/* 4 */
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
	                    width: layout.widthCategorySymbol
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
	            var state = this.state;

	            // TODO: SVG for category symbol
	            return (
	                React.createElement("li", {style: state.styleItem, "aria-selected": this.props.selected, onClick: this.onClick}, 
	                    React.createElement("span", {style: state.styleSymbol}), 
	                    React.createElement("span", {style: state.styleText}, this.props.category.text)
	                )
	            );
	        }
	    });


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.createClass({displayName: "exports",
	        propTypes: {
	            item: React.PropTypes.object,
	            layout: React.PropTypes.object
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
	                styleCategory: {
	                    flexShrink: 0,
	                    width: layout.widthCategorySymbol
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

	        render: function () {
	            var item = this.props.item,
	                distance = item.distance + 'mi',
	                state = this.state;

	            return (
	                React.createElement("li", {style: state.styleItem}, 
	                    React.createElement("span", {style: state.styleCategory}), 
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