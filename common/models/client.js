'use strict';

var Promise = require('bluebird');
var request = require('request');
var mongojs = require('mongojs');

var db = mongojs("bidnow", ["Client"])

module.exports = function(Client) {

};
