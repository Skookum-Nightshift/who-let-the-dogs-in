document.addEventListener('DOMContentLoaded', function () {

var items = require('./prototype-data.js'),
    categoryDefs = require('./prototype-CategoryDefs.js'),
    contactDefs = require('./prototype-ContactDefs.js'),

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
            items: React.PropTypes.array
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
                page: <ResultPage colors={props.colors} layout={props.layout} categoryDefs={props.categoryDefs} items={items} setItemPage={this.setItemPage} setLocationPage={this.setLocationPage} />
            };
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
React.render(<DogsApp items={items} />, document.getElementsByTagName('body')[0]);

});
