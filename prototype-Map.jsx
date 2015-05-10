module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object
            //item: React.PropTypes.object
        },

        render: function () {
            var props = this.props,
                layout = props.layout,
                styleMap = {
                    display: 'block',
                    width: '100%',
                    boxSizing: 'border-box',
                    height: layout.heightCategoryList,
                    borderWidth: '1px',
                    borderBottomStyle: 'solid'
                };

            return (
                <img style={styleMap} src='TODO.jpg' alt='Map' />
            );
        }
    });
