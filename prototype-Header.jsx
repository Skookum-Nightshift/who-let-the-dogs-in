var SymbolDiv = require('./prototype-SymbolDiv.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            linkLeft: React.PropTypes.object,
            linkRight: React.PropTypes.object
        },

        render: function () {
            var props = this.props,
                colors = props.colors,
                layout = props.layout,
                linkLeft = props.linkLeft,
                linkRight = props.linkRight,
                marginWide = layout.marginWide,
                styleHeader = {
                    display: 'flex',
                    alignItems: 'flex-start',
                    boxSizing: 'border-box',
                    lineHeight: layout.lineHeightMeta,
                    width: '100%',
                    paddingLeft: linkLeft ? 0 : marginWide,
                    paddingRight: linkRight ? 0 : marginWide,
                    color: colors.colorMeta,
                    backgroundColor: colors.colorBackground,
                    borderWidth: '2px',
                    borderBottomStyle: 'solid'
                },
                styleHeading = {
                    flexShrink: 1,
                    fontSize: '1.25rem'
                },
                symbolDiv = function(link, alignment) {
                    if (link) {
                        return (
                            <SymbolDiv layout={layout} srcImage={link.srcImage} alignment={alignment} setPage={link.setPage} />
                        );
                    }
                },
                symbolDivLeft = symbolDiv(linkLeft, 'left'),
                symbolDivRight = symbolDiv(linkRight, 'right');

            return (
                <header style={styleHeader}>
                    {symbolDivLeft}
                    <h1 style={styleHeading}>Dogs-in</h1>
                    {symbolDivRight}
                </header>
            );
        }
    });
