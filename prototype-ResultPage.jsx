var Header = require('./prototype-Header.jsx'),
    CategoryList = require('./prototype-CategoryList.jsx'),
    Map = require('./prototype-Map.jsx'),
    ResultList = require('./prototype-ResultList.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            categoryDefs: React.PropTypes.array,
            provider: React.PropTypes.object,
            location: React.PropTypes.object,
            setItemPage: React.PropTypes.func,
            setLocationPage: React.PropTypes.func
        },

        getInitialState: function () {
            var categoriesSelected = {},
                props = this.props;

            props.categoryDefs.forEach(function (categoryDef) {
                categoriesSelected[categoryDef.key] = false; // all false means unfiltered
            });

            return {
                categoriesSelected: categoriesSelected,
                itemsSorted: [],
                itemsFiltered: []
            };
        },

        componentWillMount: function () {
            var props = this.props;

            props.provider.search(props.location, this.setItems);
        },

        setItems: function (items) {
            var comparison = function (itemA, itemB) {
                    var distanceA = itemA.getDistanceMeters(),
                        distanceB = itemB.getDistanceMeters();

                    return distanceA === distanceB ? 0 :
                        typeof distanceB !== 'number' || distanceA < distanceB ? -1 :
                        1;
                },
                itemsSorted = items.sort(comparison),
                categoryMap = {},
                indexMap = 0;

            this.props.categoryDefs.forEach(function (categoryDef) {
                categoryMap[categoryDef.key] = categoryDef;
            });

            itemsSorted.forEach(function (item) {
console.log(item.getCategory());
                // TODO: Ask Enrique if it is okay to add a property to a props object?
                item.categoryDef = categoryMap[item.getCategory()];
                item.indexMap = ++indexMap; // demo
            });

            this.setState({
                itemsSorted: itemsSorted,
                itemsFiltered: itemsSorted // TODO
            });
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

            this.state.itemsSorted.forEach(function (item) {
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
