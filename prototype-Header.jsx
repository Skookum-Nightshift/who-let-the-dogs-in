var SymbolDiv = require('./prototype-SymbolDiv.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.objecta,
            srcImageLeft: React.PropTypes.string,
            srcImageRight: React.PropTypes.string
        },

        render: function () {
            var props = this.props,
                colors = props.colors,
                layout = props.layout,
                marginWide = layout.marginWide,
                srcImageLeft = props.srcImageLeft,
                srcImageRight = props.srcImageRight,
                styleHeader = {
                    display: 'flex',
                    alignItems: 'flex-start',
                    boxSizing: 'border-box',
                    lineHeight: layout.lineHeightMeta,
                    width: '100%',
                    paddingLeft: srcImageLeft ? 0 : marginWide,
                    paddingRight: srcImageRight ? 0 : marginWide,
                    color: colors.colorMeta,
                    backgroundColor: colors.colorBackground,
                    borderWidth: '2px',
                    borderBottomStyle: 'solid'
                },
                styleHeading = {
                    flexShrink: 1,
                    fontSize: '1.25rem'
                },
                symbolDiv = function(srcImage, alignment) {
                    if (srcImage) {
                        return (
                            <SymbolDiv layout={layout} srcImage={srcImage} alignment={alignment} />
                        );
                    }
                },
                symbolDivLeft = symbolDiv(srcImageLeft, 'left'),
                symbolDivRight = symbolDiv(srcImageRight, 'right');

            return (
                <header style={styleHeader}>
                    {symbolDivLeft}
                    <h1 style={styleHeading}>Dogs-in</h1>
                    {symbolDivRight}
                </header>
            );
        }
    });
