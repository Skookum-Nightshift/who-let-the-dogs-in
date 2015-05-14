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
        key: 'park',
        text: 'Parks',
        srcImage: srcImage('compass')
    }, {
        key: 'event',
        text: 'Events',
        srcImage: srcImage('calendar')
    }];
