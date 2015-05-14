document.addEventListener('DOMContentLoaded', function () {

var categoryDefs = require('./prototype-CategoryDefs.js'),
    contactDefs = require('./prototype-ContactDefs.js'),

    //providers = require('./data/providersOnline.js'),
    providers = require('../lib/api/providersOffline.js'),
    // providerKey = 'Yelp',
    providerKey = 'Foursquare',

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
                provider = props.providers.map[providerKey],
                // Skookum in Charlotte, NC
                location = {
                    latitude: 35.226074,
                    longitude: -80.844034
                };

            return {
                provider: provider,
                location: location,
                page: <ResultPage colors={props.colors} layout={props.layout} categoryDefs={props.categoryDefs} provider={provider} location={location} setItemPage={this.setItemPage} setLocationPage={this.setLocationPage} />
            };
        },

        setPage: function (page) {
            this.setState({
                page: page
            });
        },

        setLocation: function (location) {
            this.setState({
                location: location,
                page: <ResultPage colors={props.colors} layout={props.layout} categoryDefs={props.categoryDefs} provider={provider} location={location} setItemPage={this.setItemPage} />
            });
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
React.render(<DogsApp providers={providers} />, document.getElementsByTagName('body')[0]);

});
