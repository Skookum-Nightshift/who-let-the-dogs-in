var CategoryItem = require('./prototype-CategoryItem.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            initial: React.PropTypes.bool,
            categoryDefs: React.PropTypes.array,
            categoriesSelected: React.PropTypes.object,
            onCategorySelected: React.PropTypes.func
        },

        render: function () {
            var props = this.props,
                categoriesSelected = props.categoriesSelected,
                onCategorySelected = props.onCategorySelected,
                colors = props.colors,
                layout = props.layout,
                initial = props.initial,
                style = {
                    listStyle: 'none',
                    width: initial ? '100%' : layout.marginWide
                },
                categoryItems = props.categoryDefs.map(function (categoryDef) {
                    return <CategoryItem colors={colors} layout={layout} initial={initial} categoryDef={categoryDef} selected={categoriesSelected[categoryDef.key]} onCategorySelected={onCategorySelected} />;
                });

            return (
                <ul style={style}>{categoryItems}</ul>
            );
        }
    });
