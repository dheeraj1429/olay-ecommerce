const EventEmitter = require('node:events');

class events extends EventEmitter {}

events.on('saleOpenEvent', function () {
   console.log('sale open');
});

events.on('saleCloseEvent', function () {
   console.log('sale close');
});

module.exports = events;
