/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  MapView,
} = React;

var Utils =  require('./lib/utils');

var wltdi = React.createClass({

  getInitialState() {
    return {
      json: {},
      initialPosition: 'unknown',
    };
  },

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.gotData,
      this.errorHandler
    );
  },

  gotData(initialPosition) {
    this.setState({ initialPosition }, this.getYelpData);
  },

  errorHandler(error) {

  },

  getYelpData() {
    var last = this.state.initialPosition;
    var ll = `${last.coords.latitude},${last.coords.longitude}`;
    Utils.getRequest('yelp', { 'll': ll, 'query': 'dog friendly' }, (error, data) => {
      var state = {json: error};
      if (!error) {
        state.json = JSON.parse(data.text);
      }
      this.setState(state);
    });
  },


  render: function() {

    var annotations=[];
    if (Object.keys(this.state.json).length > 0){
      var businesses = this.state.json.businesses;
      for (var i=0; i<businesses.length; i++){
        var business = businesses[i];
        annotations.push({ 
          latitude: parseFloat(business.location.coordinate.latitude, 10), 
          longitude: parseFloat(business.location.coordinate.longitude, 10),
          title: business.name,
          subtitle: "",
        });
      }
    }

    return (
      <View style={styles.container}>
        <MapView annotations={annotations} style={{flex: 1, height: 150, width: 375, flexDirection: 'row'}} region={null} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('wltdi', () => wltdi);
