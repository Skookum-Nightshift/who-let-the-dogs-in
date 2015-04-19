module.exports = React.createClass({
        propTypes: {
            item: React.PropTypes.object,
            layout: React.PropTypes.object,
            onResultItemSelected: React.PropTypes.func
        },

        getInitialState: function () {
            var layout = this.props.layout;

            return {
                styleItem: {
                    display: 'flex',
                    alignItems: 'flex-start',
                    paddingTop: layout.padding,
                    paddingBottom: layout.padding,
                    borderWidth: '1px',
                    borderBottomStyle: 'dotted'
                },
                styleSymbol: {
                    flexShrink: 0,
                    width: layout.widthCategorySymbol,
                    textAlign: 'center'
                },
                styleImage: {
                    height: '1em'
                },
                styleDiv: {
                    flexShrink: 1
                },
                styleDistance: {
                    flexShrink: 0,
                    marginLeft: 'auto', // align right
                    marginRight: layout.padding
                }
            }
        },

        onClick: function () {
            var props = this.props;

            props.onResultItemSelected(props.item);
        },

        render: function () {
            var item = this.props.item,
                pathImage = item.categoryObject.symbol + '.svg',
                distance = item.distance + 'mi',
                state = this.state;

            return (
                <li style={state.styleItem} onClick={this.onClick}>
                    <span style={state.styleSymbol}>
                        <img style={state.styleImage} src={pathImage} />
                    </span>
                    <div style={state.styleDiv}>
                        <p>{item.name}</p>
                        <p>{item.address}</p>
                    </div>
                    <span style={state.styleDistance}>{distance}</span>
                </li>
            );
        }
    });
