var SymbolDiv = require('./prototype-SymbolDiv.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
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
                    flexGrow: 1,
                    flexShrink: 1,
                    boxSizing: 'border-box',
                    width: '25%', // TODO: make dependent on data
                    textAlign: 'center',
                    lineHeight: layout.lineHeightMeta,
                    color: selected ? colorBackground : colorMeta,
                    backgroundColor: selected ? colorMeta : colorBackground,
                    borderWidth: '1px',
                    borderLeftStyle: 'solid',
                    borderRightStyle: 'solid'
                },
                styleText = {
                    display: 'none',
                    flexShrink: 1,
                    marginRight: layout.marginNarrow,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                };

            //if (/* TODO: media query? */) {
            //    styleText.display = 'none';
            //}

            return (
                <li style={styleItem} aria-clicked={props.selected} onClick={this.onClick}>
                    <SymbolDiv layout={layout} srcImage={categoryDef.srcImage} onClick={this.onClick} />
                    <span style={styleText}>{categoryDef.text}</span>
                </li>
            );
        }
    });
