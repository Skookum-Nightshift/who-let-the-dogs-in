var Symbol = require('./prototype-Symbol.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            contactDef: React.PropTypes.object,
            value: React.PropTypes.string
        },

        onClick: function () {
            var props = this.props;

            props.contactDef.callback(props.value);
        },

        render: function () {
            var props = this.props,
                layout = props.layout,
                styleItem = {
                    display: 'flex',
                    alignItems: 'center',
                    lineHeight: layout.lineHeightMeta,
                    color: props.colors.colorLink
                },
                styleValue = {
                    flexShrink: 1,
                    marginRight: layout.marginNarrow,
                    whiteSpace: 'nowrap', // TODO: or 2 lines for web address?
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                };

            return (
                <li style={styleItem} onClick={this.onClick}>
                    <Symbol layout={layout} srcImage={props.contactDef.srcImage} />
                    <span style={styleValue}>{props.value}</span>
                </li>
            );
        }
    });
