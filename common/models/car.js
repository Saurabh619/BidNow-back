'use strict';

var Promise = require('bluebird');
var request = require('request');
var mongojs = require('mongojs')
var db = mongojs("bidnow", ["Car"]);

var rejectKaro = function(message, code) {
  var toSend = new Error(message)
  toSend.statusCode = code;
  return toSend;
}

module.exports = function(Car) {

  Car.remoteMethod(
    'rent', {
      http: {
        verb: 'post'
      },
      accepts: [{
        arg: 'req',
        type: 'object',
        http: {
          source: 'req'
        }
      }, {
        arg: 'res',
        type: 'object',
        'http': {
          source: 'res'
        }
      }],
      returns: {
        arg: 'object',
        type: 'object'
      }
    }
  );

  Car.rent = function(req, res, cb) {
    if (req.body.name == "undefined" || req.body.clientId == "undefined" || req.body.inputData == "undefined") {
      res.type('application/json');
      res.status(422).send({
        type: "Error",
        status: 422,
        code: "missing_params",
        statusCode: 422,
      });
    } else {
      db.Car.update({
        name: req.body.name
      }, {
        $set: {
          ['clientId']: req.body.clientId,
          ['allowRent']: true
        }
      }, function(err, doc) {
        if (!err && doc) {
          console.log('doc', doc);
          cb(null, doc);
        }
        else if (err) {
          cb(rejectKaro(err, 503))
        } else {
          cb(rejectKaro("Record not found", 400));
        }
      })
    }
  };
};
