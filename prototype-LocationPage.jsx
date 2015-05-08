var Header = require('./prototype-Header.jsx');

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
                styleDiv = {
                },
                styleMap = {
                    display: 'block',
                    width: '100%',
                    boxSizing: 'border-box',
                    height: layout.heightCategoryList,
                    borderColor: colors.colorMeta,
                    borderWidth: '1px',
                    borderBottomStyle: 'solid'
                },
                styleForm = {
                    marginLeft: marginWide,
                    marginRight: marginWide
                },
                styleFieldsetInput = {
                    marginTop: '1rem'
                },
                styleInput = {
                    borderColor: colors.colorItem,
                    borderWidth: '1px',
                    borderStyle: 'solid'
                },
                styleFieldsetButtons = {
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginTop: '1rem'
                },
                styleButton = {
                    backgroundColor: colors.colorBackground,
                    borderColor: colors.colorItem,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    padding: layout.marginNarrow,
                    marginLeft: marginWide
                };

            return (
                <div style={styleDiv}>
                    <Header colors={colors} layout={layout} />
                    <img style={styleMap} src='TODO.jpg' alt='Map' />;
                    <form style={styleForm}>
                        <fieldset style={styleFieldsetInput}>
                            <input type='text' style={styleInput} />
                        </fieldset>
                        <fieldset style={styleFieldsetButtons}>
                            <button style={styleButton} onClick={this.onClickOK}>OK</button>
                            <button style={styleButton} onclick={this.onClickCancel}>Cancel</button>
                        </fieldset>
                    </form>
                </div>
            );
        }
    });
