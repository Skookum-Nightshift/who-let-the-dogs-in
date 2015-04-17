var $body = $("body"),
    $list = $("#list"),
    toggle = function (booleanString) {
        return booleanString === 'true' ? 'false' : 'true';
    },

    idsOrdered = Object.keys(items).sort(function (idA, idB) {
        return items[idA].distance - items[idB].distance;
    }),

    categories = [{
            className: 'bars',
            text: 'Bars',
            symbol: 'glass'
        }, {
            className: 'restaurants',
            text: 'Restaurants',
            symbol: 'cutlery'
        }, {
            className: 'parks',
            text: 'Parks',
            symbol: 'compass'
        }, {
            className: 'events',
            text: 'Events',
            symbol: 'calendar'
        }],
    categoriesSelected = {},
    matches = function (item) {
        return typeof item === 'Object' && categoriesSelected[item.category] === true;
    },
    filter = function (items, idsOrdered, matches) {
        var idsFiltered = [];

        items.forEach(function (id) {
            if (matches(items[id])) {
                idsFiltered.push(id);
            }
        });
        return idsFiltered;
    },

    CategoryItem = React.createClass({
        render: function () {
            var category = this.props.category,
                classSymbol = 'fa fa-' + category.symbol;

            return (
                <li>
                    <span className='symbol'>{'\uf000'}</span>
                    <span className='text'>{category.text}</span>
                </li>
            );
        }
    }),
    CategoryList = React.createClass({
        render: function () {
            var //categoriesSelected = this.props.categoriesSelected,
                categoryItems = this.props.categories.map(function (category) {
                    return <CategoryItem category={category} />;
                });

            return (
                <ul id='categories'>{categoryItems}</ul>
            );
        }
    }),

    ResultItem = React.createClass({
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
        render: function () {
            var items = this.props.items,
                resultItems = this.props.idsOrdered.map(function (id) {
                        return (
                            <ResultItem item={items[id]} />
                        );
                    });

            return (
                <ul id='list'>{resultItems}</ul>
            );
        }
    }),

    ResultPage = React.createClass({
        propTypes: {
            categories: React.PropTypes.array,
            items: React.PropTypes.object,
            idsOrdered: React.PropTypes.array
        },
        getInitialState: function () {
            var initialState = {
                initial: true,
                nSelected: 0
            };
            console.log(this.props.categories);
            return initialState;
        },
        render () {
            // TODO: Header class?
            // TODO: idsFiltered from idsOrdered and categoriesSelected
            return (
                <div>
                    <header>
                        <h1>Dogs-in</h1>
                    </header>
                    <CategoryList categories={this.props.categories}/>
                    <ResultList items={items} idsOrdered={idsOrdered}/>
                </div>
            );
        }
    });

categories.forEach(function (category) {
    categoriesSelected[category.className] = true;
});

//React.render(<CategoryList categories={categories} categoriesSelected={categoriesSelected} />, document.getElementById('categories'));

//React.render(<ResultList items={items} idsOrdered={idsOrdered} />, document.getElementById('list'));

React.render(<ResultPage categories={categories} items={items} idsOrdered={idsOrdered}/>, document.getElementById('page'));

$("#views a").click(function (event) {
    var a = event.currentTarget,
        $a = $(a);

    $body.removeClass('explore').toggleClass(a.className);
    $a.attr('aria-selected', toggle($a.attr('aria-selected')));
    event.preventDefault();
});

$("#categories a").click(function (event) {
    var a = event.currentTarget,
        $a = $(a);

    $a.attr('aria-selected', toggle($a.attr('aria-selected')));
    $list.toggleClass(a.className);
    $body.removeClass('explore');
    console.log($body.get(0).className);
    event.preventDefault();
});
