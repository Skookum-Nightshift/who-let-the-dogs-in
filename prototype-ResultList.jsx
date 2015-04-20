var ResultItem = require('./prototype-ResultItem.jsx');

module.exports = React.createClass({
        propTypes: {
            items: React.PropTypes.object,
            idsFiltered: React.PropTypes.array,
            mapIndexDemo: React.PropTypes.bool,
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            onResultItemSelected: React.PropTypes.func
        },
        style: {
            listStyle: 'none'
        },
        render: function () {
            var props = this.props,
                items = props.items,
                colors = props.colors,
                layout = props.layout,
                resultItems = props.idsFiltered.map(function (id) {
                        return (
                            <ResultItem item={items[id]} mapIndexDemo={props.mapIndexDemo} colors={colors} layout={layout} onResultItemSelected={props.onResultItemSelected} />
                        );
                    });

            return (
                <ul id='list' style={this.style}>{resultItems}</ul>
            );
        },
    });
