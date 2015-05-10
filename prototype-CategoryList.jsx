var CategoryItem = require('./prototype-CategoryItem.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
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
                style = {
                    //width: '100%',
                    flexShrink: 0,
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'flex-start',
                    listStyle: 'none'
                },
                categoryItems = props.categoryDefs.map(function (categoryDef) {
                    return <CategoryItem colors={colors} layout={layout} categoryDef={categoryDef} selected={categoriesSelected[categoryDef.key]} onCategorySelected={onCategorySelected} />;
                });

            return (
                <ul style={style}>{categoryItems}</ul>
            );
        }
    });
