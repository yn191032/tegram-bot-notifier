const { EventEmitter } = require('events');

const ee = new EventEmitter();

const produce = (queue, data) => {
  ee.emit(queue, data);
};

const consume = (queue, cb) => {
  ee.on(queue, cb);
};

module.exports = {
  produce,
  consume
}