/* global require, module */
'use strict';

var request = require('superagent');

function mapToURI(object, prevKey) {
  prevKey = prevKey || '';

  var keys = Object.keys(object);
  var formatedUri = keys.map((key) => {
    if (typeof object[key] === 'object') {
      return mapToURI(object[key], key);
    }
    var formatedKey = key;
    if (prevKey.length > 0) { formatedKey = '%5B'+key+'%5D'; }
    return prevKey + formatedKey + '=' + encodeURIComponent(object[key]);
  }).join('&');

  return formatedUri;
}

function urlForNormalQuery(path, data) {
  var querystring = mapToURI(data);
  return `https://wltdi.herokuapp.com/api/${path}.json?${querystring}`;
}

function urlForQuery(path) {
  return `https://wltdi.herokuapp.com/api/${path}.json?`;
}

function _executeRequest(method, path, data, callback, user) {
  if (user && user.id.length > 0 && user.token.length > 0) {
    data.user = {};
    data.user.id = user.id;
    data.user.token = user.token;
  }

  if (method === 'GET') {
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.onreadystatechange = () => {
      if (xmlRequest.readyState !== 4) {
        return;
      }
      if (xmlRequest.status === 200) {
        xmlRequest.text = xmlRequest.responseText;
        callback(null, xmlRequest);
      } else {
        callback("error", null);
      }
    };

    xmlRequest.open(method, urlForNormalQuery(path, data));
    xmlRequest.send();
  } else {
    var query;
    switch(method) {
      case 'POST':
        query = request.post(urlForQuery(path));
        break;
      case 'PUT':
        query = request.put(urlForQuery(path));
        break;
      case 'DELETE':
        query = request.delete(urlForQuery(path));
        break;
    }

    query
      .send(data)
      .end(callback);
  }


}


var Utils = {
  getRequest: _executeRequest.bind(null, 'GET'),

  postRequest: _executeRequest.bind(null, 'POST'),

  putRequest: _executeRequest.bind(null, 'PUT'),

  deleteRequest: _executeRequest.bind(null, 'DELETE')
};

module.exports = Utils;