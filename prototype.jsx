document.addEventListener('DOMContentLoaded', function () {

var ResultPage = require('./prototype-ResultPage.jsx'),
    ItemPage = require('./prototype-ItemPage.jsx'),
    DogsApp = React.createClass({
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
                categoryMap = {},
                indexMap = 0;

            props.categoryDefs.forEach(function (categoryDef) {
                categoryMap[categoryDef.key] = categoryDef;
            });
            idsItems.forEach(function (id) {
                var item = items[id];

                // TODO: Ask Enrique if it is okay to add a property to a props object?
                item.categoryDef = categoryMap[item.categoryKey];
                item.indexMap = ++indexMap;
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
                    <ItemPage colors={props.colors} layout={props.layout} contactDefs={props.contactDefs} item={itemSelected} />
                );
            } else {
                // TO DO: LocationPage?
                return (
                    <ResultPage colors={props.colors} layout={props.layout} categoryDefs={props.categoryDefs} items={props.items} idsOrdered={state.idsOrdered} onResultItemSelected={this.onResultItemSelected} />
                );
            }
        }
    });

React.render(<DogsApp items={items} />, document.getElementsByTagName('body')[0]);

});
