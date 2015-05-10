var srcImage = function (name) {
        return name + '.svg';
    };

module.exports = [{
        key: 'getPhoneNumber',
        srcImage: srcImage('phone'),
        callback: function (number) {
            window.alert('Call phone number: ' + number);
        }
    }, {
        key: 'getWebsiteUri',
        srcImage: srcImage('external-link-square'),
        callback: function (address) {
            window.open(address); 
        }
    }];
