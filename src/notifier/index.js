const config = require('config');
const User = require('../models/User');
const queue = require('../queue');
const { log } = require('../logger')('notifier');

const notifyUsers = async (data) => {
  const users = await User.find();

  users.map(user => {
    const apartments = user.filterApartments(data);
    queue.produce(config.notificationsQueue, { chatId: user.chatId, data: apartments });
  });

  log(`${users.length} users was notified`);
};

queue.consume(config.updatesQueue, notifyUsers);
