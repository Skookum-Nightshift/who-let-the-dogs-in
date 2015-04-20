module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object
        },

        render: function () {
            var props = this.props,
                colors = props.colors,
                layout = props.layout,
                styleHeader = {
                    //dispay: 'flex',
                    lineHeight: layout.lineHeightMeta,
                    paddingLeft: layout.marginWide,
                    paddingRight: layout.marginNarrow,
                    color: colors.colorMeta,
                    backgroundColor: colors.colorBackground,
                    borderWidth: '2px',
                    borderBottomStyle: 'solid'
                },
                styleHeading = {
                    fontSize: '1.25rem'
                };

            return (
                <header style={styleHeader}>
                    <h1 style={styleHeading}>Dogs-in</h1>
                </header>
            );
        }
    });
