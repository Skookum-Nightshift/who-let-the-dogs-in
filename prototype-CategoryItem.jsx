var SymbolDiv = require('./prototype-SymbolDiv.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            categoryDef: React.PropTypes.object,
            selected: React.PropTypes.bool,
            onCategorySelected: React.PropTypes.func
        },

        getInitialState: function () {
            var props = this.props,
                selected = props.selected,
                colors = props.colors,
                colorMeta = colors.colorMeta,
                colorBackground = colors.colorBackground,
                layout = props.layout;

            return {
                styleItem: {
                    display: 'flex',
                    alignItems: 'flex-start',
                    lineHeight: layout.lineHeightMeta,
                    color: selected ? colorBackground : colorMeta,
                    backgroundColor: selected ? colorMeta : colorBackground,
                    borderWidth: '1px',
                    borderBottomStyle: 'solid'
                },
                styleText: {
                    flexShrink: 1,
                    marginLeft: layout.marginNarrow,
                    marginRight: layout.marginNarrow
                }
            };
        },

        onClick: function () {
            this.props.onCategorySelected(this.props.categoryDef);
        },

        render: function () {
            var props = this.props,
                categoryDef = props.categoryDef,
                state = this.state;

            return (
                <li style={state.styleItem} aria-clicked={props.selected} onClick={this.onClick}>
                    <SymbolDiv srcImage={categoryDef.srcImage} />
                    <span style={state.styleText}>{categoryDef.text}</span>
                </li>
            );
        }
    });
