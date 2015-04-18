module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            category: React.PropTypes.object,
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
                styleSymbol: {
                    flexShrink: 0,
                    width: layout.widthCategorySymbol
                },
                styleText: {
                    flexShrink: 1
                }
            };
        },

        onClick: function () {
            this.props.onCategorySelected(this.props.category);
        },

        render: function () {
            var state = this.state;

            // TODO: SVG for category symbol
            return (
                <li style={state.styleItem} aria-selected={this.props.selected} onClick={this.onClick}>
                    <span style={state.styleSymbol}></span>
                    <span style={state.styleText}>{this.props.category.text}</span>
                </li>
            );
        }
    });
