var SymbolDiv = require('./prototype-SymbolDiv.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            initial: React.PropTypes.bool,
            categoryDef: React.PropTypes.object,
            selected: React.PropTypes.bool,
            onCategorySelected: React.PropTypes.func
        },

        onClick: function () {
            this.props.onCategorySelected(this.props.categoryDef);
        },

        render: function () {
            var props = this.props,
                categoryDef = props.categoryDef,
                selected = props.selected,
                colors = props.colors,
                colorMeta = colors.colorMeta,
                colorBackground = colors.colorBackground,
                layout = props.layout,
                styleItem = {
                    display: 'flex',
                    alignItems: 'flex-start',
                    lineHeight: layout.lineHeightMeta,
                    color: selected ? colorBackground : colorMeta,
                    backgroundColor: selected ? colorMeta : colorBackground,
                    borderWidth: '1px',
                    borderBottomStyle: 'solid'
                },
                styleText = {
                    flexShrink: 1,
                    marginRight: layout.marginNarrow
                };

            if (!props.initial) {
                styleText.display = 'none';
            }

            return (
                <li style={styleItem} aria-clicked={props.selected} onClick={this.onClick}>
                    <SymbolDiv layout={layout} srcImage={categoryDef.srcImage} setPage={this.onClick} />
                    <span style={styleText}>{categoryDef.text}</span>
                </li>
            );
        }
    });
