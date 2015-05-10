var Header = require('./prototype-Header.jsx'),
    Map = require('./prototype-Map.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            item: React.PropTypes.object,
            setPrevPage: React.PropTypes.func
        },

        render: function () {
            var props = this.props,
                colors = props.colors,
                layout = props.layout,
                styleDiv = {
                },
                linkLeft = {
                    srcImage: 'angle-left.svg',
                    setPage: props.setPrevPage
                };

            return (
                <div style={styleDiv}>
                    <Header colors={colors} layout={layout} linkLeft={linkLeft} />
                    <Map layout={layout} />
                </div>
            );
        }
    });
