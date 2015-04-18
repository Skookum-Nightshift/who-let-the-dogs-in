var ResultItem = require('./prototype-ResultItem.jsx');

module.exports = React.createClass({
        propTypes: {
            items: React.PropTypes.object,
            idsFiltered: React.PropTypes.array,
            layout: React.PropTypes.object
        },
        style: {
            listStyle: 'none'
        },
        render: function () {
            var props = this.props,
                items = props.items,
                layout = props.layout,
                resultItems = props.idsFiltered.map(function (id) {
                        return (
                            <ResultItem item={items[id]} layout={layout} />
                        );
                    });

            return (
                <ul id='list' style={this.style}>{resultItems}</ul>
            );
        },
    });
