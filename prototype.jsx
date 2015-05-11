document.addEventListener('DOMContentLoaded', function () {

var items = require('./prototype-data.js'),
    categoryDefs = require('./prototype-CategoryDefs.js'),
    contactDefs = require('./prototype-ContactDefs.js'),

    providers = require('./../lib/api/providersOffline.js'),

    ResultPage = require('./prototype-ResultPage.jsx'),
    LocationPage = require('./prototype-LocationPage.jsx'),
    ItemPage = require('./prototype-ItemPage.jsx'),
    DirectionsPage = require('./prototype-DirectionsPage.jsx'),

    DogsApp = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            categoryDefs: React.PropTypes.array,
            contactDefs: React.PropTypes.array,
            items: React.PropTypes.array, // TODO: superseded by providers
            providers: React.PropTypes.object
        },

        getDefaultProps: function () {
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
                    lineHeightMeta: '2rem', // 32px
                    heightCategoryList: '12rem', // 192px
                    widthSymbol: '1rem', // 16px
                    marginNarrow: '0.5rem', // 8px
                    marginWide: '2rem' // 2 * widthSymbol
                }
            };
        },

        getInitialState: function () {
            var props = this.props,
                layout = props.layout,
                colors = props.colors,
                // Skookum in Charlotte, NC
                location = {
                    latitude: 35.226074,
                    longitude: -80.844034
                },
                comparison = function (itemA, itemB) {
                    var distanceA = itemA.getDistanceMeters(),
                        distanceB = itemB.getDistanceMeters();

                    return distanceA === distanceB ? 0 :
                        typeof distanceB !== 'number' || distanceA < distanceB ? -1 :
                        1;
                },
                items = props.providers.map['Foursquare'].getItems(location).sort(comparison),
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
                page: <ResultPage colors={props.colors} layout={props.layout} categoryDefs={props.categoryDefs} items={items} setItemPage={this.setItemPage} setLocationPage={this.setLocationPage} />
            };
        },

        componentWillMount: function () {
            // TODO: search for items
        },

        setPage: function (page) {
            this.setState({
                page: page
            });
        },

        setItems: function (items) {
            var props = this.props;

            this.setState({
                page: <ResultPage colors={props.colors} layout={props.layout} categoryDefs={props.categoryDefs} items={items} setItemPage={this.setItemPage} />
            });
        },

        setLocation: function (location) {
            // TODO: get items for new location
            this.setItems(items);
        },

        setLocationPage: function () {
            var props = this.props,
                setPrevPage = this.setPage.bind(this, this.state.page);

            this.setState({
                page: <LocationPage colors={props.colors} layout={props.layout} setLocation={this.setLocation} setPrevPage={setPrevPage} />
            });
        },

        setItemPage: function (item) {
            var props = this.props,
                setPrevPage = this.setPage.bind(this, this.state.page);

            this.setState({
                page: <ItemPage colors={props.colors} layout={props.layout} contactDefs={props.contactDefs} item={item} setPrevPage={setPrevPage} setDirectionsPage={this.setDirectionsPage} />
            });
        },

        setDirectionsPage: function (item) {
            var props = this.props,
                setPrevPage = this.setPage.bind(this, this.state.page);

            this.setState({
                page: <DirectionsPage colors={props.colors} layout={props.layout} item={item} setPrevPage={setPrevPage} />
            });
        },

        render: function () {
            return this.state.page;
        }
    });

// TODO: property will become the data API object
React.render(<DogsApp items={items} providers={providers} />, document.getElementsByTagName('body')[0]);

});
