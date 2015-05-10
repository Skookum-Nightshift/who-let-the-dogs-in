var Header = require('./prototype-Header.jsx'),
    CategoryList = require('./prototype-CategoryList.jsx'),
    Map = require('./prototype-Map.jsx'),
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
                categoryList= <CategoryList colors={colors} layout={layout} categoryDefs={props.categoryDefs} categoriesSelected={state.categoriesSelected} onCategorySelected={this.onCategorySelected} />,
                linkRight = {
                    srcImage: 'search.svg',
                    setPage: props.setLocationPage
                };

            return (
                <div>
                    <Header colors={colors} layout={layout} categoryList={categoryList} linkRight={linkRight} />
                    <Map layout={layout} />
                    <ResultList items={state.itemsFiltered} mapIndexDemo={true} colors={colors} layout={props.layout} setItemPage={props.setItemPage} />
                </div>
            );
        }
    });
