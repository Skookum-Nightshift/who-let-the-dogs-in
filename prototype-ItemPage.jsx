module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            item: React.PropTypes.object
        },

        getInitialState: function () {
            var items = this.props.items,
                categoriesSelected = {},
                props = this.props,
                layout = props.layout,
                colors = props.colors;

            return {
                styleNav: {
                    lineHeight: layout.lineHeightMeta,
                    paddingRight: layout.padding,
                    color: colors.colorMeta,
                    backgroundColor: colors.colorBackground,
                    borderWidth: '3px',
                    borderBottomStyle: 'solid'
                },
                styleNavList: {
                    display: 'flex',
                    alignItems: 'baseline',
                    listStyle: 'none'
                },
                styleNavListItem: {
                    display: 'flex',
                    alignItems: 'center'
                },
                styleSymbol: {
                    flexShrink: 0,
                    width: layout.widthCategorySymbol,
                    textAlign: 'center'
                },
                styleSymbolImage: {
                    height: '1em'
                },
                styleItemHeading: {
                    display: 'flex',
                    alignItems: 'baseline',
                    marginTop: '200px', // leave space for item image
                    paddingTop: layout.padding
                },
                styleItemName: {
                    // fontSize: '1.25rem'
                },
                styleSection: {
                    paddingLeft: layout.widthCategorySymbol,
                    paddingRight: layout.padding
                }
            };
        },

        render: function () {
            var item = this.props.item,
                srcSymbolImage = item.categoryObject.symbol + '.svg',
                state = this.state;

            // TODO: nav class?
            return (
                <div>
                    <nav style={state.styleNav}>
                        <ul style={state.styleNavList}>
                            <li style={state.styleNavListItem}>
                                <span style={state.styleSymbol}>
                                    <img style={state.styleSymbolImage} src='angle-left.svg' />
                                </span>
                                <span>Back</span>
                            </li>
                        </ul>
                    </nav>                      
                    <article>
                        <header style={state.styleArticleHeader}>
                            <h1 style={state.styleItemHeading}>
                                <span style={state.styleSymbol}>
                                    <img style={state.styleSymbolImage} src={srcSymbolImage} />
                                </span>
                                <span style={state.styleItemName}>{item.name}</span>
                            </h1>
                        </header>
                        <section style={state.styleSection}>
                            <p>{item.address}</p>
                        </section>
                    </article>
                </div>
            );
        }
    });
