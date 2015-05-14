var ContactItem = require('./prototype-ContactItem.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            contactDefs: React.PropTypes.array,
            item: React.PropTypes.object
        },

        render: function () {
            var props = this.props,
                colors = props.colors,
                layout = props.layout,
                item = props.item,
                styleList = {
                    listStyle: 'none',
                    width: '100%',
                    marginTop: layout.marginNarrow
                },
                contactItems = [];

            props.contactDefs.forEach(function (contactDef) {
                var value = item[contactDef.key].call(item);
console.log(contactDef.key, value);

                if (value) {
                    contactItems.push(<ContactItem colors={colors} layout={layout} contactDef={contactDef} value={value} />);
                }
            });

            return (
                <ul style={styleList}>{contactItems}</ul>
            );
        }
    });
