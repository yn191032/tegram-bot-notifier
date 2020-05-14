const api = require('../api');
const config = require('config');
const queue = require('../queue');
const { log, error } = require('../logger')('updater');

let prev = null;

const diff = (prev, actual) => {
  return actual.filter(a => !prev.some(p => a.id === p.id));
};

const update = async () => {
  const actual = await api.get();
  
  if (!actual) {
    log(`No data from api.`);
    return;
  }

  if (!prev) {
    prev = [...actual];
    return;
  }

  const newApartments = diff(prev, actual);
  
  if (newApartments.length > 0) {
    log(`${newApartments.length} new apartments`);
    prev = [...actual];
    return queue.produce(config.updatesQueue, newApartments);
  }

  log(`Nothing new.`);
};

update();
const intervalId = setInterval(update, config.updateRate*1000*60); // 10min = 1000*60*10
