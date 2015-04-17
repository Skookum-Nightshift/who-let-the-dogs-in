document.addEventListener('DOMContentLoaded', function () {

var DogsApp = React.createClass({
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
                    <ResultPage colors={this.props.colors} layout={this.props.layout} categories={this.props.categories} items={this.props.items} idsOrdered={this.state.idsOrdered} />
                );
            }
        }
    }),

    ResultPage = React.createClass({
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
                <div>
                    <header style={this.state.styleHeader}>
                        <h1>Dogs-in</h1>
                    </header>
                    <CategoryList colors={props.colors} layout={props.layout} categories={props.categories} categoriesSelected={state.categoriesSelected} onCategorySelected={this.onCategorySelected} />
                    <ResultList items={props.items} idsFiltered={state.idsFiltered} layout={props.layout} />
                </div>
            );
        }
    }),

    CategoryList = React.createClass({
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
                    return <CategoryItem colors={colors} layout={layout} category={category} selected={categoriesSelected[category.key]} onCategorySelected={onCategorySelected} />;
                });

            return (
                <ul id='categories' style={this.style}>{categoryItems}</ul>
            );
        }
    }),

    CategoryItem = React.createClass({
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
                <li style={state.styleItem} aria-selected={this.props.selected} onClick={this.onClick}>
                    <span style={state.styleSymbol} className='symbol'></span>
                    <span style={state.styleText} className='text'>{this.props.category.text}</span>
                </li>
            );
        }
    }),

    ResultList = React.createClass({
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
                            <ResultItem item={items[id]} layout={layout} />
                        );
                    });

            return (
                <ul id='list' style={this.style}>{resultItems}</ul>
            );
        },
    }),

    ResultItem = React.createClass({
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
                <li style={state.styleItem}>
                    <span className='category' style={state.styleCategory}></span>
                    <div style={state.styleDiv}>
                        <p className='name'>{item.name}</p>
                        <p className='address'>{item.address}</p>
                    </div>
                    <span className='distance' style={state.styleDistance}>{distance}</span>
                </li>
            );
        }
    });

React.render(<DogsApp items={items} />, document.getElementsByTagName('body')[0]);

});
