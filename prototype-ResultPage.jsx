var Header = require('./prototype-Header.jsx'),
    CategoryList = require('./prototype-CategoryList.jsx'),
    ResultList = require('./prototype-ResultList.jsx');

module.exports = React.createClass({
        propTypes: {
            colors: React.PropTypes.object,
            layout: React.PropTypes.object,
            categoryDefs: React.PropTypes.array,
            items: React.PropTypes.object,
            idsOrdered: React.PropTypes.array,
            onResultItemSelected: React.PropTypes.func
        },

        getInitialState: function () {
            var items = this.props.items,
                categoriesSelected = {},
                props = this.props;

            props.categoryDefs.forEach(function (categoryDef) {
                categoriesSelected[categoryDef.key] = false; // all false means unfiltered
            });

            return {
                initial: true,
                categoriesSelected: categoriesSelected,
                idsFiltered: props.idsOrdered.concat() // copy
            };
        },

        onCategorySelected: function (categoryDef) {
            var categoriesSelected = Object.create(this.state.categoriesSelected),
                key = categoryDef.key,
                noneSelected = true,
                items = this.props.items,
                idsFiltered = [];

            categoriesSelected[key] = !categoriesSelected[key];
            this.props.categoryDefs.forEach(function (categoryDef) {
                noneSelected = noneSelected && !categoriesSelected[categoryDef.key];
            });

            this.props.idsOrdered.forEach(function (id) {
                if (noneSelected || categoriesSelected[items[id].categoryKey] === true) {
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
                colors = props.colors,
                layout = props.layout,
                state = this.state,
                styleSideBySide = {
                    display: 'flex',
                    alignItems: 'flex-start',
                    width: '100%'
                },
                styleMap = {
                    flexGrow: 1,
                    flexShrink: 1,
                    boxSizing: 'border-box',
                    height: layout.heightCategoryList,
                    borderColor: colors.colorMeta,
                    borderWidth: '1px',
                    borderLeftStyle: 'solid',
                    borderBottomStyle: 'solid'
                },
                map;

            if (!state.initial) {
                map = <img style={styleMap} src='TODO.jpg' alt='Map' />
            }

            return (
                <div>
                    <Header colors={colors} layout={layout} />
                    <div style={styleSideBySide}>
                        <CategoryList colors={colors} layout={layout} initial={state.initial} categoryDefs={props.categoryDefs} categoriesSelected={state.categoriesSelected} onCategorySelected={this.onCategorySelected} />
                        {map}
                    </div>
                    <ResultList items={props.items} idsFiltered={state.idsFiltered} layout={props.layout} onResultItemSelected={props.onResultItemSelected} />
                </div>
            );
        }
    });
