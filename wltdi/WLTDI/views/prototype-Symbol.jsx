module.exports = React.createClass({
    propTypes: {
        layout: React.PropTypes.object,
        srcImage: React.PropTypes.string,
        onClick: React.PropTypes.func
    },

    render: function () {
        var props = this.props,
            layout = props.layout,
            margin = layout.marginNarrow,
            width = layout.widthSymbol,
            styleImage = {
                marginLeft: margin,
                width: width,
                marginRight: margin,
                height: width
            };

        return (
            <img style={styleImage} src={props.srcImage} onClick={props.onClick} />
        );
    }
});
