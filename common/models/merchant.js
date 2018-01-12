'use strict';

var Promise = require('bluebird');
var request = require('request');
var mongojs = require('mongojs')
var db = mongojs("onboarding", ["Merchant"])

var rejectKaro = function(message, code) {
  var toSend = new Error(message)
  toSend.statusCode = code;
  return toSend;
}

module.exports = function(Merchant) {
  Merchant.disableRemoteMethodByName("create", true);
  Merchant.disableRemoteMethodByName("find", true);
  Merchant.disableRemoteMethodByName("findById", true);
  Merchant.disableRemoteMethodByName("update", true);
  Merchant.disableRemoteMethodByName("exists", true);
  Merchant.disableRemoteMethodByName("upsert", true);
  Merchant.disableRemoteMethodByName("count", true);
  Merchant.disableRemoteMethodByName("delete", true);
  Merchant.disableRemoteMethodByName("deleteById", true);
  Merchant.disableRemoteMethodByName("updateAll", true);
  Merchant.disableRemoteMethodByName("createChangeStream", true);
  Merchant.disableRemoteMethodByName("findOne", true);
  Merchant.disableRemoteMethodByName("updateAttributes", true);
  Merchant.disableRemoteMethodByName("__get__customer", false);
  Merchant.disableRemoteMethodByName('__count__accessTokens', false);
  Merchant.disableRemoteMethodByName('__create__accessTokens', false);
  Merchant.disableRemoteMethodByName('__delete__accessTokens', false);
  Merchant.disableRemoteMethodByName('__destroyById__accessTokens', false);
  Merchant.disableRemoteMethodByName('__findById__accessTokens', false);
  Merchant.disableRemoteMethodByName('__updateById__accessTokens', false);
  Merchant.disableRemoteMethodByName('__get__accessTokens', false);
  Merchant.disableRemoteMethodByName("confirm", true);
  Merchant.disableRemoteMethodByName("logout", true);
  Merchant.disableRemoteMethodByName("login", true);
  Merchant.disableRemoteMethodByName("resetPassword", true);

  Merchant.afterRemote("findById", function(ctx, result, next) {
    if (ctx.req.headers.authorization && ctx.args.id) {
      ctx.result = {
        email: doc.email,
        phone: doc.phone,
        merchantData: doc.merchantData,
        verificationData: doc.verificationData,
        formData: doc.formData
      }
      next();
    } else {
      next(rejectKaro("Invalid inputs", 400))
    }
  })

  Merchant.remoteMethod(
    'execute', {
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

  Merchant.execute = function(req, res, cb) {
    if (req.body.merchantId == "undefined" || req.body.inputData == "undefined") {
      res.type('application/json');
      res.status(422).send({
        type: "Error",
        status: 422,
        code: "missing_params",
        statusCode: 422,
      });
    } else {
      db.Merchant.find({
        "merchantId": req.body.merchantId
      }, function(err, doc) {
        if (!err && doc.length > 0) {
          cb(null, response);
        } else if (err) {
          cb(rejectKaro(err, 503))
        } else {
          cb(rejectKaro("Record not found", 400));
        }
      })
    }
  };
}
