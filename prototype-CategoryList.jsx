var CategoryItem = require('./prototype-CategoryItem.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            categoryDefs: React.PropTypes.array,
            categoriesSelected: React.PropTypes.object,
            onCategorySelected: React.PropTypes.func
        },

        style: {
            listStyle: 'none',
        },

        render: function () {
            var props = this.props,
                categoriesSelected = props.categoriesSelected,
                onCategorySelected = props.onCategorySelected,
                colors = props.colors,
                layout = props.layout,
                categoryItems = props.categoryDefs.map(function (categoryDef) {
                    return <CategoryItem colors={colors} layout={layout} categoryDef={categoryDef} selected={categoriesSelected[categoryDef.key]} onCategorySelected={onCategorySelected} />;
                });

            return (
                <ul style={this.style}>{categoryItems}</ul>
            );
        }
    });
