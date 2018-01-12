//created by anonymous on Mon Mar 20 2017 12:36:08 GMT+0530 (IST)

var urls = require('./urls');
var baseUrl = urls.getURL().tech.url;
var request = require("request");
var mongojs = require('mongojs')
var db = mongojs("onboarding", ["Merchant"]);

var execute = function(merchantInstance, executeObj) {
  return new Promise(function(resolve, reject) {
    if (true) {
      resolve()
    } else {
      reject()
    }
  })
}

module.exports = {};
module.exports.execute = execute;
