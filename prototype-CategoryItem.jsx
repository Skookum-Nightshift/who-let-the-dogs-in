var Symbol = require('./prototype-Symbol.jsx');

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
                    flexGrow: 1,
                    textAlign: 'center',
                    lineHeight: layout.lineHeightMeta,
                    color: selected ? colorBackground : colorMeta,
                    backgroundColor: selected ? colorMeta : colorBackground,
                    borderWidth: '1px',
                    borderLeftStyle: 'solid',
                    borderRightStyle: 'solid'
                };

            return (
                <li style={styleItem} aria-clicked={props.selected} onClick={this.onClick}>
                    <Symbol layout={layout} srcImage={categoryDef.srcImage} />
                </li>
            );
        }
    });
