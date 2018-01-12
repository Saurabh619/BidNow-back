var global = require('../server/boot/global.js');

var urls = {
   tech: {
       url: "",
   },
   xyz: {
       url: "",
   },
};


if (ONBOARDING.env == 'local') {
  urls.tech.url = 'https://preproduction.signzy.tech/api/v2';
  urls.xyz.url = 'https://preproduction.signzy.xyz/';
}

if (ONBOARDING.env == 'development') {
  urls.tech.url = 'https://development.signzy.tech/api/v2';
  urls.xyz.url = 'https://development.signzy.xyz/';
}

if (ONBOARDING.env == 'staging') {
  urls.tech.url = 'https://staging.signzy.tech/api/v2';
  urls.xyz.url = 'https://staging.signzy.xyz/';
}

if (ONBOARDING.env == 'preproduction') {
   urls.tech.url = 'https://preproduction.signzy.tech/api/v2';
   urls.xyz.url = 'https://preproduction.signzy.xyz/';
}

if (ONBOARDING.env == 'production') {
  urls.tech.url = 'https://signzy.tech/api/v2';
  urls.xyz.url = 'https://signzy.xyz/';
}

console.log("urls.tech.url", urls.tech.url);
console.log("urls.xyz.url", urls.xyz.url);

var getURL = function() {
   return urls;
};

module.exports = {};
module.exports.getURL = getURL;
