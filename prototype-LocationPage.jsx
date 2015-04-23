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
                styleDiv = {
                };

            return (
                <div style={styleDiv}>
                    <Header colors={colors} layout={layout} />
                    <form>
                        <fieldset>
                            <button onClick={this.onClickOK}>OK</button>
                            <button onclick={this.onClickCancel}>Cancel</button>
                        </fieldset>
                    </form>
                </div>
            );
        }
    });
