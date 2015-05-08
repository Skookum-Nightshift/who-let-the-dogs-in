var srcImage = function (name) {
        return name + '.svg';
    };

module.exports = [ /* {
        key: 'phone',
        srcImage: srcImage('phone'),
        callback: function (number) {
            window.alert('Call phone number: ' + number);
        }
    }, */ {
        key: 'web',
        srcImage: srcImage('external-link-square'),
        callback: function (address) {
            window.open(address); 
        }
    }];
