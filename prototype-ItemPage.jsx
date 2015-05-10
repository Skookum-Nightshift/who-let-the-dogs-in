var Header = require('./prototype-Header.jsx'),
    Map = require('./prototype-Map.jsx'),
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
                marginNarrow = layout.marginNarrow,
                // TODO: align ContactList at bottom?
                styleDiv = {
                    //display: 'flex',
                    //alignItems: 'flex-start',
                    //alignContent: 'flex-start',
                    //flexWrap: 'wrap',
                    //overflow: 'hidden'
                },
                styleDirectionsList = {
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginTop: marginNarrow,
                    marginLeft: marginWide,
                    marginRight: marginWide,
                    listStyle: 'none'
                },
                styleDirectionsItem = {
                    flexGrow: 1,
                    flexShrink: 1,
                    textAlign: 'center',
                    padding: marginNarrow,
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
                    <Map layout={layout} />
                    <ResultItem colors={colors} layout={layout} item={item} mapIndexDemo={true} />
                    <ContactList colors={colors} layout={layout} contactDefs={props.contactDefs} item={item} />
                    <ul style={styleDirectionsList}>
                        <li style={styleDirectionsItem} onClick={this.onClickDirections}><span>Driving</span></li>
                        <li style={styleDirectionsItem} onClick={this.onClickDirections}><span>Walking</span></li>
                        <li style={styleDirectionsItem} onClick={this.onClickDirections}><span>Bicycling</span></li>
                    </ul>
                </div>
            );
        }
    });
