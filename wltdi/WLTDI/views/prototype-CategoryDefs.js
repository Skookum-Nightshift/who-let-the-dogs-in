var srcImage = function (name) {
        return name + '.svg';
    };

module.exports = [{ 
        key: 'bar',
        text: 'Bars',
        srcImage: srcImage('glass')
    }, {
        key: 'restaurant',
        text: 'Restaurants',
        srcImage: srcImage('cutlery')
    }, {
        key: 'lodging',
        text: 'Lodging',
        srcImage: srcImage('bed')
    }, {
        key: 'park',
        text: 'Parks',
        srcImage: srcImage('compass')
    }];
