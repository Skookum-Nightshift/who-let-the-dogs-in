var Symbol = require('./prototype-Symbol.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            linkLeft: React.PropTypes.object,
            categoryList: React.PropTypes.Object,
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
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    lineHeight: layout.lineHeightMeta,
                    //width: '100%',
                    paddingLeft: linkLeft ? 0 : marginWide,
                    paddingRight: linkRight ? 0 : marginWide,
                    color: colors.colorMeta,
                    backgroundColor: colors.colorBackground,
                    borderWidth: '2px',
                    borderBottomStyle: 'solid'
                },
                elementCenter = props.categoryList || <span>&#xA0;</span>,
                symbol = function(link, alignment) {
                    if (link) {
                        return (
                            <Symbol layout={layout} srcImage={link.srcImage} alignment={alignment} onClick={link.setPage} />
                        );
                    }
                },
                symbolLeft = symbol(linkLeft, 'left'),
                symbolRight = symbol(linkRight, 'right');

            return (
                <header style={styleHeader}>
                    {symbolLeft}
                    {elementCenter}
                    {symbolRight}
                </header>
            );
        }
    });
