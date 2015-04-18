document.addEventListener('DOMContentLoaded', function () {

var ResultPage = require('./prototype-ResultPage.jsx'),
    DogsApp = React.createClass({
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
    });

React.render(<DogsApp items={items} />, document.getElementsByTagName('body')[0]);

});
