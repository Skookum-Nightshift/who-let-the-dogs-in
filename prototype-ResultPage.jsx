var Header = require('./prototype-Header.jsx'),
    CategoryList = require('./prototype-CategoryList.jsx'),
    ResultList = require('./prototype-ResultList.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            categoryDefs: React.PropTypes.array,
            items: React.PropTypes.array,
            setItemPage: React.PropTypes.func,
            setLocationPage: React.PropTypes.func
        },

        getInitialState: function () {
            var items = this.props.items,
                categoriesSelected = {},
                props = this.props;

            props.categoryDefs.forEach(function (categoryDef) {
                categoriesSelected[categoryDef.key] = false; // all false means unfiltered
            });

            return {
                initial: false,
                categoriesSelected: categoriesSelected,
                itemsFiltered: items.concat() // shallow copy
            };
        },

        onCategorySelected: function (categoryDef) {
            var categoriesSelected = Object.create(this.state.categoriesSelected),
                key = categoryDef.key,
                noneSelected = true,
                itemsFiltered = [];

            categoriesSelected[key] = !categoriesSelected[key];
            this.props.categoryDefs.forEach(function (categoryDef) {
                noneSelected = noneSelected && !categoriesSelected[categoryDef.key];
            });

            this.props.items.forEach(function (item) {
                if (noneSelected || categoriesSelected[item.getCategory()] === true) {
                    itemsFiltered.push(item);
                }
            });

            this.setState({
                categoriesSelected: categoriesSelected,
                itemsFiltered: itemsFiltered
            });
        },

        render: function () {
            var props = this.props,
                colors = props.colors,
                layout = props.layout,
                state = this.state,
                styleMap = {
                    display: 'block',
                    width: '100%',
                    boxSizing: 'border-box',
                    height: layout.heightCategoryList,
                    borderColor: colors.colorMeta,
                    borderWidth: '1px',
                    borderBottomStyle: 'solid'
                },
                linkRight = {
                    srcImage: 'search.svg',
                    setPage: props.setLocationPage
                };

            return (
                <div>
                    <Header colors={colors} layout={layout} linkRight={linkRight} />
                    <CategoryList colors={colors} layout={layout} categoryDefs={props.categoryDefs} categoriesSelected={state.categoriesSelected} onCategorySelected={this.onCategorySelected} />
                    <img style={styleMap} src='TODO.jpg' alt='Map' />;
                    <ResultList items={state.itemsFiltered} mapIndexDemo={!initial} colors={colors} layout={props.layout} setItemPage={props.setItemPage} />
                </div>
            );
        }
    });
