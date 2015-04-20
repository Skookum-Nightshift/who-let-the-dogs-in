var Header = require('./prototype-Header.jsx'),
    ResultItem = require('./prototype-ResultItem.jsx'),
    ContactList = require('./prototype-ContactList.jsx');

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
                styleList = {
                    marginTop: '200px' // leave space for item image
                },
                item = props.item;

            // TODO: neighborhood, description, hours, amenities, directions
            return (
                <div>
                    <Header colors={colors} layout={layout} />
                    <ul style={styleList}>
                        <ResultItem item={item} layout={layout} />
                    </ul>
                    <ContactList colors={colors} layout={layout} contactDefs={props.contactDefs} contacts={item.contacts} />
                </div>
            );
        }
    });
