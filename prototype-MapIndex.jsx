module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            index: React.PropTypes.number
        },

        render: function () {
            var props = this.props,
                colors = props.colors,
                layout = props.layout,
                styleDiv = {
                    flexShrink: 0,
                    marginLeft: layout.marginNarrow,
                    minWidth: '2rem', // 2 * layout.widthSymbol,
                    textAlign: 'right'
                },
                padding = '0.25em',
                styleSpan = {
                    fontWeight: 'bold',
                    color: colors.colorBackground,
                    backgroundColor: colors.colorItem,
                    paddingLeft: padding,
                    paddingRight: padding,
                    borderTopLeftRadius: padding,
                    borderBottomLeftRadius: padding
                },
                index = props.index,
                span;

            if (index) {
                span = <span style={styleSpan}>{index}</span>;
            }

            return (
                <div style={styleDiv}>
                    {span}
                </div>
            );
        }
    });
