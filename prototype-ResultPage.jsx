var CategoryList = require('./prototype-CategoryList.jsx'),
    ResultList = require('./prototype-ResultList.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            categories: React.PropTypes.array,
            items: React.PropTypes.object,
            idsOrdered: React.PropTypes.array
        },

        getInitialState: function () {
            var items = this.props.items,
                categoriesSelected = {},
                props = this.props,
                layout = props.layout,
                colors = props.colors;

            this.props.categories.forEach(function (category) {
                categoriesSelected[category.key] = false; // all false means unfiltered
            });

            return {
                initial: true,
                categoriesSelected: categoriesSelected,
                idsFiltered: props.idsOrdered.concat(), // copy
                styleHeader: {
                    //dispay: 'flex',
                    lineHeight: layout.lineHeightMeta,
                    paddingLeft: layout.widthCategorySymbol,
                    paddingRight: layout.padding,
                    color: colors.colorMeta,
                    backgroundColor: colors.colorBackground,
                    borderWidth: '3px',
                    borderBottomStyle: 'solid'
                },
                styleHeading: {
                    fontSize: '1.25rem'
                }
            };
        },

        onCategorySelected: function (category) {
            var categoriesSelected = Object.create(this.state.categoriesSelected),
                key = category.key,
                noneSelected = true,
                items = this.props.items,
                idsFiltered = [];

            categoriesSelected[key] = !categoriesSelected[key];
            this.props.categories.forEach(function (category) {
                noneSelected = noneSelected && !categoriesSelected[category.key];
            });

            this.props.idsOrdered.forEach(function (id) {
                if (noneSelected || categoriesSelected[items[id].category] === true) {
                    idsFiltered.push(id);
                }
            });

            this.setState({
                initial: false,
                categoriesSelected: categoriesSelected,
                idsFiltered: idsFiltered
            });
        },

        render: function () {
            var props = this.props,
                state = this.state;

            // TODO: Header class?
            return (
                <div>
                    <header style={state.styleHeader}>
                        <h1 style={state.styleHeading}>Dogs-in</h1>
                    </header>
                    <CategoryList colors={props.colors} layout={props.layout} categories={props.categories} categoriesSelected={state.categoriesSelected} onCategorySelected={this.onCategorySelected} />
                    <ResultList items={props.items} idsFiltered={state.idsFiltered} layout={props.layout} />
                </div>
            );
        }
    });
