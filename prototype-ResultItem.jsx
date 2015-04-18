module.exports = React.createClass({
        propTypes: {
            item: React.PropTypes.object,
            layout: React.PropTypes.object
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
                styleCategory: {
                    flexShrink: 0,
                    width: layout.widthCategorySymbol
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

        render: function () {
            var item = this.props.item,
                distance = item.distance + 'mi',
                state = this.state;

            return (
                <li style={state.styleItem}>
                    <span style={state.styleCategory}></span>
                    <div style={state.styleDiv}>
                        <p>{item.name}</p>
                        <p>{item.address}</p>
                    </div>
                    <span style={state.styleDistance}>{distance}</span>
                </li>
            );
        }
    });
