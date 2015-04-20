var SymbolDiv = require('./prototype-SymbolDiv.jsx');

module.exports = React.createClass({
        propTypes: {
            item: React.PropTypes.object,
            layout: React.PropTypes.object,
            onResultItemSelected: React.PropTypes.func
        },

        onClick: function () {
            var props = this.props,
                onResultItemSelected = props.onResultItemSelected;

            if (onResultItemSelected) {
                onResultItemSelected(props.item);
            }
        },

        render: function () {
            var props = this.props,
                layout = props.layout,
                inResultPage = !props.onResultItemSelected,
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
                    marginLeft: 'auto', // align right
                    marginRight: layout.marginNarrow
                },
                item = props.item,
                city = function () {
                    if (inResultPage) {
                        return (
                            <p>{item.city + ', ' + item.state + ' ' + item.postalCode}</p>
                        );
                    }
                },
                distance = item.distance + 'mi';

            return (
                <li style={styleItem} onClick={this.onClick}>
                    <SymbolDiv layout={layout} srcImage={item.categoryDef.srcImage} srcImageOptional={item.dogFriendly ? 'paw.svg' : ''} />
                    <div style={styleDiv}>
                        <p>{item.name}</p>
                        <p>{item.address}</p>
                        {city()}
                    </div>
                    <span style={styleDistance}>{distance}</span>
                </li>
            );
        }
    });
