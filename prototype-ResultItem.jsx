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
                inResultPage = !props.setItemPage,
                styleItem = {
                    display: 'flex',
                    alignItems: 'flex-start',
                    paddingTop: layout.marginNarrow,
                    paddingBottom: layout.marginNarrow,
                    borderWidth: '1px',
                    borderBottomStyle: inResultPage ? 'none' : 'solid'
                },
                styleDiv = {
                    flexShrink: 1
                },
                styleDistance = {
                    flexShrink: 0,
                    marginLeft: 'auto' // align right
                },
                item = props.item,
                city = function () {
                    if (inResultPage) {
                        return (
                            <p>{item.city + ', ' + item.state + ' ' + item.postalCode}</p>
                        );
                    }
                },
                distance = item.distance + 'mi',
                index;

            if (props.mapIndexDemo) {
                index = item.indexMap;
            }

            return (
                <li style={styleItem} onClick={this.onClick}>
                    <SymbolDiv layout={layout} srcImage={item.categoryDef.srcImage} srcImageOptional={item.dogFriendly ? 'paw.svg' : ''} />
                    <div style={styleDiv}>
                        <p>{item.name}</p>
                        <p>{item.address}</p>
                        {city()}
                    </div>
                    <span style={styleDistance}>{distance}</span>
                    <MapIndex colors={props.colors} layout={layout} index={index} />
                </li>
            );
        }
    });
