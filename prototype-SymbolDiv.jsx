module.exports = React.createClass({
    propTypes: {
        layout: React.PropTypes.object,
        srcImage: React.PropTypes.string,
        srcImageOptional: React.PropTypes.string,
        alignment: React.PropTypes.string,
        setPage: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            alignment: 'left'
        };
    },

    onClick: function () {
        this.props.setPage();
    },

    render: function () {
        var props = this.props,
            layout = props.layout,
            width = layout.widthSymbol,
            marginNarrow = layout.marginNarrow,
            left = props.alignment === 'left',
            styleDiv = {
                flexShrink: 0,
                display: 'flex',
                alignItems: 'flex-start',
                marginLeft: left ? 0 : 'auto',
                paddingLeft: left ? 0 : marginNarrow,
                paddingRight: left ? marginNarrow : 0
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
            },
            spanImage = span(props.srcImage),
            spanImageOptional = span(props.srcImageOptional);

        return (
            <div style={styleDiv} onClick={this.onClick}>
                {left ? spanImageOptional : spanImage}
                {left ? spanImage : spanImageOptional}
            </div>
        );
    }
});
