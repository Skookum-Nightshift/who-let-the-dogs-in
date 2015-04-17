document.addEventListener('DOMContentLoaded', function () {

var categories = [{
            key: 'bars',
            text: 'Bars',
            symbol: 'glass'
        }, {
            key: 'restaurants',
            text: 'Restaurants',
            symbol: 'cutlery'
        }, {
            key: 'parks',
            text: 'Parks',
            symbol: 'compass'
        }, {
            key: 'events',
            text: 'Events',
            symbol: 'calendar'
        }],

    idsOrdered = Object.keys(items).sort(function (idA, idB) {
        return items[idA].distance - items[idB].distance;
    }),

    CategoryItem = React.createClass({
        propTypes: {
            category: React.PropTypes.object,
            selected: React.PropTypes.bool,
            onCategorySelected: React.PropTypes.func
        },
        onClick: function () {
            this.props.onCategorySelected(this.props.category);
        },
        render: function () {
            var category = this.props.category,
                classSymbol = 'fa fa-' + category.symbol;

            return (
                <li aria-selected={this.props.selected} onClick={this.onClick}>
                    <span className='symbol'>{'\uf000'}</span>
                    <span className='text'>{category.text}</span>
                </li>
            );
        }
    }),

    CategoryList = React.createClass({
        propTypes: {
            categories: React.PropTypes.array,
            categoriesSelected: React.PropTypes.object,
            onCategorySelected: React.PropTypes.func
        },
        render: function () {
            var categoriesSelected = this.props.categoriesSelected,
                onCategorySelected = this.props.onCategorySelected,
                categoryItems = this.props.categories.map(function (category) {
                    return <CategoryItem category={category} selected={categoriesSelected[category.key]} onCategorySelected={onCategorySelected} />;
                });

            return (
                <ul id='categories'>{categoryItems}</ul>
            );
        }
    }),

    ResultItem = React.createClass({
        propTypes: {
            item: React.PropTypes.object
        },
        render: function () {
            var item = this.props.item,
                distance = item.distance + 'mi';

            return (
                <li>
                    <span className='category'>{'\uf000'}</span>
                    <div>
                        <span className='name'>{item.name}</span>
                        <span className='address'>{item.address}</span>
                    </div>
                    <span className='distance'>{distance}</span>
                </li>
            );
        }
    }),

    ResultList = React.createClass({
        propTypes: {
            items: React.PropTypes.object,
            idsFiltered: React.PropTypes.array
        },
        render: function () {
            var items = this.props.items,
                resultItems = this.props.idsFiltered.map(function (id) {
                        return (
                            <ResultItem item={items[id]} />
                        );
                    });

            return (
                <ul id='list'>{resultItems}</ul>
            );
        },
    }),

    ResultPage = React.createClass({
        propTypes: {
            categories: React.PropTypes.array,
            items: React.PropTypes.object,
            idsOrdered: React.PropTypes.array
        },
        getInitialState: function () {
            var items = this.props.items,
                categoriesSelected = {};

            this.props.categories.forEach(function (category) {
                categoriesSelected[category.key] = false; // all false means unfiltered
            });

            return {
                initial: true,
                categoriesSelected: categoriesSelected,
                idsFiltered: this.props.idsOrdered.concat() // copy
            };
        },
        onCategorySelected: function (category) {
            var categoriesSelected = Object.create(this.state.categoriesSelected),
                key = category.key,
                noneSelected = true,
                items = this.props.items,
                idsFiltered = [];

console.dir(categoriesSelected);
            categoriesSelected[key] = !categoriesSelected[key];
console.dir(categoriesSelected);
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
            // TODO: Header class?
            return (
                <div>
                    <header>
                        <h1>Dogs-in</h1>
                    </header>
                    <CategoryList categories={this.props.categories} categoriesSelected={this.state.categoriesSelected} onCategorySelected={this.onCategorySelected} />
                    <ResultList items={this.props.items} idsFiltered={this.state.idsFiltered} />
                </div>
            );
        }
    });

React.render(<ResultPage categories={categories} items={items} idsOrdered={idsOrdered}/>, document.getElementsByTagName('body')[0]);

});
