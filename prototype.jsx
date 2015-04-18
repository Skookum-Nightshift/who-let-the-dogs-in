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
    });

React.render(<DogsApp items={items} />, document.getElementsByTagName('body')[0]);

});
