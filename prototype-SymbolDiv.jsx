module.exports = React.createClass({
    propTypes: {
        layout: React.PropTypes.object,
        srcImage: React.PropTypes.string,
        srcImageOptional: React.PropTypes.string,
    },

    render: function () {
        var props = this.props,
            layout = props.layout,
            width = layout.widthSymbol,
            styleDiv = {
                flexShrink: 0,
                display: 'flex',
                alignItems: 'flex-start',
                marginRight: layout.marginNarrow
            },
            styleSpan = {
                flexShrink: 0,
                width: width,
                textAlign: 'center'
            },
            styleImage = {
                height: width
            },
            img = function (srcImage) {
                if (srcImage) {
                    return (
                        <img style={styleImage} src={srcImage} />
                    );
                }
            },
            span = function (srcImage) {
                return (
                    <span style={styleSpan}>{img(srcImage)}</span>
                );
            };

        return (
            <div style={styleDiv}>
                {span(props.srcImageOptional)}
                {span(props.srcImage)}
            </div>
        );
    }
});
