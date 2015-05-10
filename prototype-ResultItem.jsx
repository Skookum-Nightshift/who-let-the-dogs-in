var SymbolDiv = require('./prototype-SymbolDiv.jsx'),
    MapIndex = require('./prototype-MapIndex.jsx');

module.exports = React.createClass({
        propTypes: {
            item: React.PropTypes.object,
            mapIndexDemo: React.PropTypes.bool,
            layout: React.PropTypes.object,
            setItemPage: React.PropTypes.func
        },

        onClick: function () {
            var props = this.props,
                setItemPage = props.setItemPage;

            if (setItemPage) {
                setItemPage(props.item);
            }
        },

        render: function () {
            var props = this.props,
                layout = props.layout,
                inItemPage = !props.setItemPage,
                styleItem = {
                    display: 'flex',
                    alignItems: 'flex-start',
                    paddingTop: layout.marginNarrow,
                    paddingBottom: layout.marginNarrow,
                    borderWidth: '1px',
                    borderBottomStyle: inItemPage ? 'none' : 'solid'
                },
                styleDiv = {
                    flexShrink: 1
                },
                styleDistance = {
                    flexShrink: 0,
                    marginLeft: 'auto' // align right
                },
                item = props.item,
                neighborhood = function () {
                    if (inItemPage && item.getNeighborhood()) {
                        return (
                            <p>{item.getNeighborhood()}</p>
                        );
                    }
                },
                city = function () {
                    if (inItemPage) {
                        return (
                            <p>{item.getCity() + ', ' + item.getState() + ' ' + item.getPostalCode()}</p>
                        );
                    }
                },
                distance = item.getDistanceMiles() + 'mi', // TODO: Foursquare only?
                index;

            if (props.mapIndexDemo) {
                index = item.indexMap;
            }

            return (
                <li style={styleItem} onClick={this.onClick}>
                    <SymbolDiv layout={layout} srcImage={item.categoryDef.srcImage} />
                    <div style={styleDiv}>
                        <p>{item.getName()}</p>
                        <p>{item.getAddress()}</p>
                        {neighborhood()}
                        {city()}
                    </div>
                    <span style={styleDistance}>{distance}</span>
                    <MapIndex colors={props.colors} layout={layout} index={index} />
                </li>
            );
        }
    });
