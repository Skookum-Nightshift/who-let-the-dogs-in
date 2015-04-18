var CategoryItem = require('./prototype-CategoryItem.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            categories: React.PropTypes.array,
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
                categoryItems = props.categories.map(function (category) {
                    return <CategoryItem colors={colors} layout={layout} category={category} selected={categoriesSelected[category.key]} onCategorySelected={onCategorySelected} />;
                });

            return (
                <ul id='categories' style={this.style}>{categoryItems}</ul>
            );
        }
    });
