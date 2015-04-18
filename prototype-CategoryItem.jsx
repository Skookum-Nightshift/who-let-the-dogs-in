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
                    width: layout.widthCategorySymbol,
                    textAlign: 'center'
                },
                styleImage: {
                    height: '1em'
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
            var props = this.props,
                category = props.category,
                pathImage = category.symbol + '.svg',
                state = this.state;

            return (
                <li style={state.styleItem} aria-clicked={props.selected} onClick={this.onClick}>
                    <span style={state.styleSymbol}>
                        <img style={state.styleImage} src={pathImage}/>
                    </span>
                    <span style={state.styleText}>{category.text}</span>
                </li>
            );
        }
    });
