var ResultItem = require('./prototype-ResultItem.jsx');

module.exports = React.createClass({
        propTypes: {
            items: React.PropTypes.array,
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            setItemPage: React.PropTypes.func
        },
        style: {
            listStyle: 'none'
        },
        render: function () {
            var props = this.props,
                colors = props.colors,
                layout = props.layout,
                resultItems = props.items.map(function (item) {
                        return (
                            <ResultItem item={item} colors={colors} layout={layout} setItemPage={props.setItemPage} />
                        );
                    });

            return (
                <ul style={this.style}>{resultItems}</ul>
            );
        },
    });
