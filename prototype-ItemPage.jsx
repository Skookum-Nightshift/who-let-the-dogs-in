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
                marginWide = layout.marginWide,
                // TO DO: align ContactList at bottom?
                styleDiv = {
                    //display: 'flex',
                    //alignItems: 'flex-start',
                    //alignContent: 'flex-start',
                    //flexWrap: 'wrap',
                    //overflow: 'hidden'
                },
                styleImage = {
                    boxSizing: 'border-box',
                    width: '100%',
                    height: layout.heightCategoryList,
                    borderWidth: '1px',
                    borderBottomStyle: 'solid'
                },
                styleList = {
                    listStyle: 'none',
                    width: '100%'
                },
                styleItem = {
                    marginLeft: marginWide
                }
                item = props.item;

            // TODO: description, hours, amenities, directions
            return (
                <div style={styleDiv}>
                    <Header colors={colors} layout={layout} />
                    <img style={styleImage} src='TODO.jpg' alt='Picture' />
                    <ul style={styleList}>
                        <ResultItem item={item} layout={layout} />
                        <li style={styleItem}>
                            <p>{item.neighborhood}</p>
                        </li>
                    </ul>
                    <ContactList colors={colors} layout={layout} contactDefs={props.contactDefs} contacts={item.contacts} />
                </div>
            );
        }
    });
