var Header = require('./prototype-Header.jsx'),
    ResultItem = require('./prototype-ResultItem.jsx'),
    ContactList = require('./prototype-ContactList.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            contactDefs: React.PropTypes.array,
            item: React.PropTypes.object,
            setPrevPage: React.PropTypes.func,
            setDirectionsPage: React.PropTypes.func
        },

        onClickDirections: function () {
            // TODO: location too?
            this.props.setDirectionsPage(this.props.item);
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
                stylePara = {
                    display: 'flex',
                    alignItems: 'baseline',
                    marginLeft: marginWide
                },
                styleDirections = {
                    color: colors.colorLink,
                    marginLeft: 'auto',
                    padding: layout.marginNarrow,
                    borderWidth: '1px',
                    borderStyle: 'solid'
                },
                linkLeft = {
                    srcImage: 'angle-left.svg',
                    setPage: props.setPrevPage
                },
                item = props.item;

            // TODO: description, hours, amenities
            return (
                <div style={styleDiv}>
                    <Header colors={colors} layout={layout} linkLeft={linkLeft} />
                    <img style={styleImage} src='TODO.jpg' alt='Picture' />
                    <ul style={styleList}>
                        <ResultItem colors={colors} layout={layout} item={item} />
                        <li>
                            <p style={stylePara}>
                                <span>{item.neighborhood}</span>
                                <span style={styleDirections} onClick={this.onClickDirections}>Directions</span>
                            </p>
                        </li>
                    </ul>
                    <ContactList colors={colors} layout={layout} contactDefs={props.contactDefs} contacts={item.contacts} />
                </div>
            );
        }
    });
