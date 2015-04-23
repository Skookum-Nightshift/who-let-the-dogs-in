var items = require('./prototype-data.js'),
    categoryDefs = require('./prototype-CategoryDefs.js');

document.addEventListener('DOMContentLoaded', function () {

var ResultPage = require('./prototype-ResultPage.jsx'),
    ItemPage = require('./prototype-ItemPage.jsx'),
    DogsApp = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            categoryDefs: React.PropTypes.array,
            contactDefs: React.PropTypes.array,
            items: React.PropTypes.array
        },

        getDefaultProps: function () {
            var srcImage = function (name) {
                    return name + '.svg';
                };

            return {
                categoryDefs: categoryDefs, 
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
                page: <ResultPage colors={props.colors} layout={props.layout} categoryDefs={props.categoryDefs} items={items} onResultItemSelected={this.onResultItemSelected} />
            };
        },

        setPage: function (page) {
            this.setState({
                page: page
            });
        },

        render: function () {
            return this.state.page;
        }
    });

React.render(<DogsApp items={items} />, document.getElementsByTagName('body')[0]);

});
