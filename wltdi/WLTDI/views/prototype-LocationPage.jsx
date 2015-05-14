var Header = require('./prototype-Header.jsx'),
    Map = require('./prototype-Map.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            item: React.PropTypes.object,
            setPrevPage: React.PropTypes.func
        },

        onClickOK: function () {
            // TODO setLocation()
            this.props.setPrevPage();
        },

        onClickCancel: function () {
            this.props.setPrevPage();
        },

        render: function () {
            var props = this.props,
                colors = props.colors,
                layout = props.layout,
                marginWide = layout.marginWide,
                lineHeight = layout.lineHeightMeta,
                styleDiv = {
                },
                styleForm = {
                    boxSizing: 'border-box',
                    width: '100%',
                    paddingLeft: marginWide,
                    paddingRight: marginWide
                },
                styleFieldsetInput = {
                    marginTop: '1rem',
                },
                styleInput = {
                    boxSizing: 'border-box',
                    width: '100%',
                    lineHeight: lineHeight,
                    borderColor: colors.colorItem,
                    borderWidth: '1px',
                    borderStyle: 'solid'
                },
                styleFieldsetButtons = {
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginTop: '1rem'
                },
                styleButton = {
                    width: '45%',
                    backgroundColor: colors.colorBackground,
                    borderColor: colors.colorItem,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    paddingLeft: layout.marginNarrow,
                    paddingRight: layout.marginNarrow,
                    lineHeight: lineHeight
                };

            return (
                <div style={styleDiv}>
                    <Header colors={colors} layout={layout} />
                    <Map layout={layout} />
                    <div style={styleForm}>
                        <div style={styleFieldsetInput}>
                            <input type='text' style={styleInput} />
                        </div>
                        <div style={styleFieldsetButtons}>
                            <button style={styleButton} onClick={this.onClickOK}>OK</button>
                            <button style={styleButton} onclick={this.onClickCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            );
        }
    });
