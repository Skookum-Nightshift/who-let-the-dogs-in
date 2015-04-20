module.exports = React.createClass({
    propTypes: {
        srcImage: React.PropTypes.string,
        srcImageOptional: React.PropTypes.string,
        width: React.PropTypes.string,
        height: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            width: '1rem',
            height: '1rem'
        };
    },

    render: function () {
        var props = this.props,
            styleDiv = {
                flexShrink: 0,
                display: 'flex',
                alignItems: 'flex-start'
            },
            styleSpan = {
                flexShrink: 0,
                width: props.width,
                textAlign: 'center'
            },
            styleImage = {
                height: props.height
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
